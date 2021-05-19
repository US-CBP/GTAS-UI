// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.
import React, { createContext, useReducer, useEffect } from "react";
import Dexie from "dexie";
import { codeEditor, hitcats, roles, notetype } from "../../services/lookupService";
import { LK, FORCE } from "../../utils/constants";
import { formatBytes } from "../../utils/utils";
import { showEstimatedQuota } from "./utils";

const initialState = [];
const lookupDB = "lookupDB";
const STATUS = {
  SUCCESS: 0,
  ERROR: 1
};
const shortInterval = 1; // 1 hour
const longInterval = 100; // 100 hours
export const LookupContext = createContext();

const setStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

const db = new Dexie(lookupDB);

const version = 2;
db.version(version).stores({
  status: "&id, name",
  airport: "id, name, iata, favorite, archived",
  carrier: "id, name, iata, favorite, archived",
  country: "id, name, iso3, archived",
  cctype: "id, code, archived",
  hitcats: "id, label, archived",
  role: "roleId, roleDescription",
  notetype: "id, noteType, archived"
});

db.version(1).stores({
  status: "&id, name",
  airport: "id, name, iata, favorite, archived",
  carrier: "id, name, iata, archived",
  country: "id, name, iso3, archived",
  cctype: "id, code, archived",
  hitcats: "id, label, archived",
  role: "roleId, roleDescription",
  notetype: "id, noteType, archived"
});

try {
  db.open();
} catch (ex) {
  console.error("IDB is inaccessible: ", ex);
}

/** Return true for tables with a "favorite" column (currently Carrier and Airport).
 * The favorite col sets the default records to return for tables with large-ish row counts (over 1000)
 * to reduce the fetch size */
const hasFavorites = type => type === LK.CARRIER || type === LK.AIRPORT;

const statusData = [
  { id: 1, name: LK.ROLE, lastUpdated: "", nextUpdate: "", interval: longInterval },
  { id: 2, name: LK.AIRPORT, lastUpdated: "", nextUpdate: "", interval: shortInterval },
  { id: 3, name: LK.COUNTRY, lastUpdated: "", nextUpdate: "", interval: shortInterval },
  { id: 4, name: LK.CARRIER, lastUpdated: "", nextUpdate: "", interval: shortInterval },
  { id: 5, name: LK.CCTYPE, lastUpdated: "", nextUpdate: "", interval: shortInterval },
  { id: 6, name: LK.HITCAT, lastUpdated: "", nextUpdate: "", interval: shortInterval },
  { id: 7, name: LK.NOTETYPE, lastUpdated: "", nextUpdate: "", interval: shortInterval }
];

const LookupProvider = ({ children }) => {
  const { Provider } = LookupContext;

  const LookupReducer = (state, action) => {
    switch (action.method) {
      case "add": {
        setStorage(action.type, action.data);
        return action.data;
      }
      case "delete": {
        localStorage.removeItem(action.type);
        return action.data;
      }
      case "create": {
        // createDb(); // on login
        return;
      }
      case "refresh": {
        // let caller trigger a partial refresh, does not return results
        return refresh(action.type, FORCE.PARTIAL);
      }
      case "fullRefresh": {
        // let the caller force a full refresh, does not return results
        return refresh(action.type, FORCE.FULL);
      }
      default:
        return [];
    }
  };

  useEffect(() => {
    createDb();
  }, []);

  /**
   * 1. move query actions to user context
   * 2. use context directly. Will refactor the rest at the same time we hookify the service wrapper.
   * 3. Distinguish between updatable lookups and static ones like roles
   * 4. Roles should be fetched how often? Once a day? Once per session? Update by logging out and in.
   * 5. Basic fetch and refresh logic
   */
  const createDb = () => {
    console.info("CREATE IDB");
    Dexie.exists(lookupDB)
      .then(function(exists) {
        if (!exists) populateStatusTable();
        // else updateStatusTable();

        db.status.count().then(count => {
          if (count < statusData.length) populateStatusTable();
        });

        showEstimatedQuota().then(res => {
          if (!res) return;

          console.table({
            quota: formatBytes(res.quota),
            usage: formatBytes(res.usage),
            caches: formatBytes(res.usageDetails?.caches),
            indexedDB: formatBytes(res.usageDetails?.indexedDB),
            serviceWorkerRegistrations: formatBytes(
              res.usageDetails?.serviceWorkerRegistrations
            )
          });
        });
      })
      .catch(ex => {
        console.info("IDB is inaccessible: ", ex);
      });
  };

  const populateStatusTable = () => {
    console.info("POPULATE STATUS TABLE");

    let lastkeyinserted;
    db.status
      .bulkPut(statusData)
      .then(lastKey => {
        lastkeyinserted = lastKey;
        db.open();
      })
      .catch(Dexie.BulkError, function(e) {
        console.error(
          `There were ${e.failures.length} record insert failures. The last updated id was ${lastkeyinserted}`
        );
      });
  };

  /**
   * Inserts initial status records for each type into the Status table, which tracks metadata for the individual lookup
   * tables, including when they were last updated. If the record is not found in refresh(), we re-create it here. This
   * could happen if the entire table got dropped by the browser to reclaim space, or the user manually removed the data, etc. */
  const createMissingStatusRec = type => {
    const defaultStatusRecordForType = statusData.find(item => item.name === type);

    if (!defaultStatusRecordForType) {
      console.error(`No status record initialization record was found for type ${type}`);
      return STATUS.ERROR;
    }

    return db.status
      .put(defaultStatusRecordForType)
      .then(() => {
        db.open();
        return defaultStatusRecordForType;
      })
      .catch(Dexie.BulkError, function(e) {
        console.error(`The missing status record was not inserted for type ${type}`);
        return STATUS.ERROR;
      });
  };

  // update script for table structure changes
  const updateStatusTable = () => {
    // console.info("UPDATE STATUS TABLE");
    // db.status
    //   .toCollection()
    //   .modify({ interval: 1 })
    //   .catch(Dexie.BulkError, function(e) {
    //     console.error(`There were ${e.failures.length} record insert failures.`);
    //   });
    // db.status
    //   .where({ id: 3 })
    //   .modify({ interval: 100 })
    //   .catch(Dexie.BulkError, function(e) {
    //     console.error(`There were ${e.failures.length} record insert failures.`);
    //   });
  };

  const svc = lkType => {
    if (lkType === LK.HITCAT) return hitcats;
    if (lkType === LK.ROLE) return roles;
    if (lkType === LK.NOTETYPE) return notetype;
    return codeEditor;
  };

  const refreshPartial = type => {
    return refresh(type, FORCE.PARTIAL, true);
  };

  const refresh = (type, forceLevel = FORCE.PARTIAL, returnResults) => {
    if (!svc(type)) {
      console.error(`No service found for type ${type}`);
      return;
    }

    return db.status
      .where({ name: type })
      .first(rec => {
        if (!rec) {
          createMissingStatusRec(type).then(res => {
            if (res === STATUS.ERROR) return res;

            return dataSync(res, forceLevel, returnResults);
          });
        } else return dataSync(rec, forceLevel, returnResults);
      })
      .catch(ex => {
        console.error("Refresh - unhandled exception", ex);
      });
  }; // refresh

  /** Given updated data (res) from the remote db, we cache the results to the type table and update the status table with a current timestamp.
   * When we query for partial updates later, we ask for anything that changed after this timestamp. */
  const updateCacheAndStatus = (res, type, returnResults) => {
    const interval =
      statusData.find(item => item.name === type)?.interval || shortInterval;

    return cacheData(res, type).then(stat => {
      if (stat === STATUS.SUCCESS) setStatusData(type, interval);
      if (returnResults) return getLookupCache(type);
    });
  };

  // Supports periodic fetches that sync once per interval unless forced.
  // forcePartial - forces a partial update (data changed since the last partial fetch) before the nextUpdateDate has passed
  // forceFull - forces a full refresh on all data.
  const dataSync = (rec, forceLevel, returnResults) => {
    const lastDt = rec.lastUpdated;
    // const nextDt = rec.nextUpdate;

    if (!lastDt || forceLevel === FORCE.FULL) {
      return svc(rec.name)
        .get(rec.name)
        .then(res => {
          return updateCacheAndStatus(res, rec.name, returnResults);
        });
    } else {
      //default? is there a use case for not syncing here?
      // if (forceLevel === FORCE.PARTIAL || !nextDt || nextDt < new Date().toISOString()) {
      return svc(rec.name)
        .getUpdated(rec.name, lastDt)
        .then(res => {
          return updateCacheAndStatus(res, rec.name, returnResults);
        })
        .catch(error => {
          return error;
        });
      // }
    }
  };

  const setStatusData = (type, interval) => {
    const nextUpdateDate = new Date();
    nextUpdateDate.setHours(nextUpdateDate.getHours() + interval);

    db.status
      .where({ name: type })
      .modify({
        lastUpdated: new Date().toISOString(),
        nextUpdate: nextUpdateDate.toISOString()
      })
      .catch(Dexie.ModifyError, error => {
        console.error("Context could not modify lookup type: ", type);
        console.error("error: ", error.failures);
      })
      .catch(error => {
        console.error("Generic error: ", error);
      });
  };

  const cacheData = (newData, type) => {
    const tbl = db.table(type);
    return db.transaction("rw", tbl, async () => {
      return await tbl
        .bulkPut(newData)
        .then(() => STATUS.SUCCESS)
        .catch(ex => {
          if (ex.failures?.length === 1 && ex.failures[0].name === "ConstraintError") {
            // log to cached log
            return STATUS.SUCCESS; // disregard constraint issues, signal the caller to update the status
          }
          console.error("error", type, ex);
          return STATUS.ERROR;
        });
    });
  };

  const markFavorite = (type, key) => {
    if (!hasFavorites(type)) return;

    const tbl = db.table(type);
    return db.transaction("rw", tbl, async () => {
      return await tbl
        .where({ iata: key })
        .modify({ favorite: true })
        .catch(Dexie.ModifyError, error => {
          console.error("Context could not modify favorite for: ", type, key);
          console.error("error: ", error.failures);
        })
        .catch(error => {
          console.error("Generic error: ", error);
        });
    });
  };

  const [lookupState, lookupAction] = useReducer(
    LookupReducer,
    localStorage.getItem(initialState)
  );

  // field mapping from the raw lookup data to the {title: "", value: ""} structure needed by dropdowns and popovers
  const lkCoreFields = [
    { lk: LK.AIRPORT, fields: ["name", "iata"], sortBy: "iata" },
    { lk: LK.CARRIER, fields: ["name", "iata", "icon"], sortBy: "iata" },
    { lk: LK.COUNTRY, fields: ["name", "iso3", "icon"], sortBy: "iso3" },
    { lk: LK.CCTYPE, fields: ["description", "code"], sortBy: "code" },
    { lk: LK.HITCAT, fields: ["label", "id"], sortBy: "label", useLabel: true },
    { lk: LK.ROLE, fields: ["label", "id"], sortBy: "label" },
    { lk: LK.NOTETYPE, fields: ["noteType", "id"], sortBy: "noteType", useLabel: true }
  ];

  const getLookupState = type => {
    return JSON.parse(localStorage.getItem(type)) || initialState;
  };

  /** Refresh and return the core (name and id) fields marked as favorites */
  const getCachedCoreFields = (type, includeArchived) => {
    const favesOnly = hasFavorites(type);
    return refresh(type).then(() => {
      return getLookupCache(type, true, includeArchived, undefined, favesOnly);
    });
  };

  /** Refresh and return all fields for the type. Pulls from faves for carriers and airports to reduce the fetch size */
  const getCachedAllFields = (type, includeArchived) => {
    const favesOnly = hasFavorites(type);
    return refresh(type).then(() => {
      return getLookupCache(type, false, includeArchived, undefined, favesOnly);
    });
  };

  /** Returns only a single record matching "key" from cache. If there are multiple, returns the first.
   * Does not refresh
   * Does not filter out non-favorites
   * It pulls from all available records as a backup to getCachedCore and getCachedAll. It pulls records that
   * are not favorites yet, and marks them as favorites.
   * Still nearly as expensive as getCachedCoreFields, which returns all values for a type. Use sparingly. */
  const getSingleKeyValue = (type, includeArchived, key) => {
    // const m = getLookupCache(type, true, includeArchived, key, false);
    // const firstRec = m[0] || {};

    // if (!firstRec.fave) markFavorite(type, key);
    // return firstRec;

    return getLookupCache(type, true, includeArchived, key, false).then(m => {
      const firstRec = m[0] || {};

      if (!firstRec.fave) markFavorite(type, key);
      return firstRec;
    });
  };

  // fetch all matching cached values as an array
  const getLookupCache = (type, coreFieldsOnly, includeArchived, keyMatch, favesOnly) => {
    const tbl = db.table(type);
    const fieldMap = lkCoreFields.find(item => item.lk === type);

    if (!fieldMap) {
      console.error(`No fieldMap exists for type ${type}`);
      return [];
    }

    const fields = fieldMap.fields;

    const archiveFilter = includeArchived ? rec => rec : rec => rec.archived !== true;
    const faveFilter = favesOnly ? rec => rec.favorite === true : rec => rec;
    const keyFilter = keyMatch ? rec => rec[fields[1]] === keyMatch : rec => rec;
    const fieldFormat = coreFieldsOnly
      ? res => {
          return res.map(item => {
            if (fieldMap.useLabel)
              return {
                label: item[fields[0]],
                value: item[fields[1]],
                arch: item.archived,
                fave: item.favorite
              };
            return {
              title: `${item[fields[1]]} - ${item[fields[0]]}`,
              value: item[fields[1]],
              arch: item.archived,
              fave: item.favorite
            };
          });
        }
      : res => res;

    return tbl
      .orderBy(fieldMap.sortBy || fields[1])
      .filter(faveFilter)
      .filter(keyFilter)
      .filter(archiveFilter)
      .toArray()
      .then(fieldFormat)
      .catch(error => {
        console.error(
          "Generic error in getLookupCache: ",
          error,
          type,
          coreFieldsOnly,
          includeArchived,
          keyMatch,
          favesOnly
        );
      });
  };

  return (
    <Provider
      value={{
        getLookupState,
        getCachedAllFields,
        getCachedCoreFields,
        getSingleKeyValue,
        refreshPartial,
        lookupAction
      }}
    >
      {children}
    </Provider>
  );
};

export default LookupProvider;
