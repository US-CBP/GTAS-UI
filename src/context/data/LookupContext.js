import React, { createContext, useReducer, useEffect } from "react";
import Dexie from "dexie";
import { codeEditor, hitcats } from "../../services/lookupService";
import { LK } from "../../utils/constants";
import { formatBytes } from "../../utils/utils";
import { showEstimatedQuota } from "./utils";

const initialState = [];
const version = 1;
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
db.version(version).stores({
  status: "&id, name",
  airport: "id, name, iata, favorite, archived",
  carrier: "id, name, iata, archived",
  country: "id, name, iso3, archived",
  cctype: "id, code, archived",
  hitcats: "id, label, archived",
  roles: "role_id, role_description"
  // notetypes: "id, nt_type, archived"
});

db.open();

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
        // let caller trigger a partial refresh
        return refresh(action.type, true);
      }
      case "fullRefresh": {
        // let the caller force a full refresh
        return refresh(action.type, false, true);
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
    console.log("CREATE IDB");
    Dexie.exists(lookupDB).then(function(exists) {
      if (!exists) populateStatusTable();
      // else updateStatusTable();
    });

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

  const createMissingStatusRec = type => {
    console.info("CREATE MISSING STATUS TABLE RECORD");

    const missingRecord = statusData.find(item => item.name === type);

    if (!missingRecord) {
      console.log(`No status record initialization data found for type ${type}`);
      return STATUS.ERROR;
    }

    return db.status
      .put(missingRecord)
      .then(res => {
        db.open();
        return missingRecord;
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
    return codeEditor;
  };

  const updateCacheAndStatus = (res, type, returnResults) => {
    const interval =
      statusData.find(item => item.name === type)?.interval || shortInterval;

    return cacheData(res, type).then(stat => {
      if (stat === STATUS.SUCCESS) setStatusData(type, interval);
      if (returnResults) return getLookupCache(type);
    });
  };

  const refreshAndReturn = type => {
    return refresh(type, true, false, true);
  };

  const refresh = (type, forcePartial, forceFull, returnResults) => {
    if (!svc(type)) {
      console.log(`No service found for type ${type}`);
      return;
    }

    return db.status.where({ name: type }).first(rec => {
      if (!rec) {
        createMissingStatusRec(type).then(res => {
          if (res === STATUS.ERROR) return res;

          return dataSync(res, forcePartial, forceFull, returnResults);
        });
      }
      return dataSync(rec, forcePartial, forceFull, returnResults);
    });
  }; // refresh

  // // background refresh. Use state vars to trigger idb update.
  // const refresh = (type, forcePartial, forceFull) => {
  //   if (!svc(type)) {
  //     console.log(`No service found for type ${type}`);
  //     return;
  //   }

  //   db.status.where({ name: type }).first(rec => {
  //     if (!rec) {
  //       createMissingStatusRec(type).then(res => {
  //         if (res === STATUS.ERROR) return res;

  //         backgroundDataSync(res, forcePartial, forceFull);
  //       });
  //     }
  //     backgroundDataSync(rec, forcePartial, forceFull);
  //   });
  // }; // refresh

  // Supports periodic fetches that sync once per interval unless forced.
  // forcePartial - forces a partial update (data changed since the last partial fetch) before the nextUpdateDate has passed
  // forceFull - forces a full refresh on all data.
  const dataSync = (rec, forcePartial, forceFull, returnResults) => {
    const lastDt = rec.lastUpdated;
    const nextDt = rec.nextUpdate;

    if (!lastDt || forceFull) {
      return svc(rec.name)
        .get(rec.name)
        .then(res => {
          return updateCacheAndStatus(res, rec.name, returnResults);
        });
    } else {
      if (forcePartial || !nextDt || nextDt < new Date().toISOString()) {
        return svc(rec.name)
          .getUpdated(rec.name, lastDt)
          .then(res => {
            return updateCacheAndStatus(res, rec.name, returnResults);
          })
          .catch(error => {
            return error;
          });
      }
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
        .then(res => {
          return STATUS.SUCCESS;
        })
        .catch(ex => {
          console.log("error", ex);
          return STATUS.ERROR;
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
    { lk: LK.CARRIER, fields: ["name", "iata"], sortBy: "iata" },
    { lk: LK.COUNTRY, fields: ["name", "iso3"], sortBy: "iso3" },
    { lk: LK.CCTYPE, fields: ["description", "code"], sortBy: "code" },
    { lk: LK.HITCAT, fields: ["label", "id"], sortBy: "label", useLabel: true }
  ];

  const getLookupState = type => {
    return JSON.parse(localStorage.getItem(type)) || initialState;
  };

  const getCachedKeyValues = (type, includeArchived) => {
    return refresh(type).then(res => {
      return getLookupCache(type, true, includeArchived);
    });
  };

  const getCached = (type, includeArchived) => {
    return refresh(type).then(res => {
      return getLookupCache(type, false, includeArchived);
    });
  };

  const getLookupCache = (type, coreFieldsOnly, includeArchived) => {
    const tbl = db.table(type);
    const fieldMap = lkCoreFields.find(item => item.lk === type);

    if (!fieldMap) {
      console.log(`No fieldMap exists for type ${type}`);
      return [];
    }

    const fields = fieldMap.fields;
    const useLabel = fieldMap.useLabel;

    const archiveFilter = includeArchived ? rec => rec : rec => rec.archived !== true;
    const coreFilter = coreFieldsOnly
      ? res => {
          return res.map(item => {
            if (useLabel)
              return {
                label: item[fields[0]],
                value: item[fields[1]],
                arch: item.archived
              };
            return {
              title: `${item[fields[1]]} ${item[fields[0]]}`,
              value: item[fields[1]],
              arch: item.archived
            };
          });
        }
      : res => res;

    return tbl
      .orderBy(fieldMap.sortBy || fields[1])
      .filter(archiveFilter)
      .toArray()
      .then(coreFilter);
  };

  return (
    <Provider
      value={{
        getLookupState,
        getCached,
        getCachedKeyValues,
        refreshAndReturn,
        lookupAction
      }}
    >
      {children}
    </Provider>
  );
};

export default LookupProvider;
