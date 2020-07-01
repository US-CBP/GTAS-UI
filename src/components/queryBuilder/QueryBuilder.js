import React, { useRef, useState, useEffect } from "react";
import RQueryBuilder from "react-querybuilder";
import {
  initQuery,
  addressFieldArray,
  FIELDS,
  EntitySelect,
  gtasoparray,
  fakequery
} from "./constants.js";
import { importQuery, exportQuery } from "./QBUtils";
import { hasData } from "../../utils/utils";

import "./QueryBuilder.scss";

const QueryBuilder = props => {
  const qbref = useRef(null);
  const editQuery = props.data ? importQuery(props.data) : initQuery;
  const [data, setData] = useState(editQuery);
  const [ruleState, setRuleState] = useState([]);
  const [entState, setEntState] = useState([]);
  const [rawQuery, setRawQuery] = useState();

  const fieldMap = {
    ADDRESS: FIELDS.addressFields,
    BAG: FIELDS.bagFields,
    CREDITCARD: FIELDS.creditcardFields,
    DOCUMENT: FIELDS.documentFields,
    EMAIL: FIELDS.emailFields,
    BOOKINGDETAIL: FIELDS.legFields,
    FLIGHT: FIELDS.flightFields,
    FREQUENTFLYER: FIELDS.frequentFlyerFields,
    PASSENGER: FIELDS.passengerFields,
    PAYMENTFORM: FIELDS.paymentFields,
    AGENCY: FIELDS.agencyFields,
    DWELLTIME: FIELDS.dwelltimeFields,
    PHONE: FIELDS.phoneFields,
    PNR: FIELDS.pnrFields
  };

  const onEntityChange = ev => {
    const ruleid = ev.target?.parentNode?.dataset?.ruleId;
    if (!ruleid) return;

    const selectedEntity = ev.target.value;

    const flds = ev.target.parentNode.querySelector(".rule-fields");
    flds.options.length = 0;
    flds.innerHTML = fieldMap[selectedEntity];
    let estate = entState;
    estate[ruleid] = selectedEntity;
    setEntState(estate);
  };

  /**
   * iterate through an existing query (when mode= Edit) to correct the Field dropdowns and set the initial selections */
  const parseRawQuery = (rawQuery, obj = {}) => {
    let result = obj;

    if (rawQuery.rules) {
      rawQuery.rules.forEach(rule => {
        const type = rule.id.substring(0, 2);
        if (type === "g-") return parseRawQuery(rule, obj); //if the rule is a Group, parse it.
        // if (rule.field !== undefined) parseRawQuery(rule, obj); //if the rule is a Group, parse it.
        // if (type === "r-") {

        // if (!entState[rule.id]) {
        //   const derivedEntity = hasData(rule.field)
        //     ? rule.field.split(".")[0].toUpperCase()
        //     : "";
        //   let estate = entState;
        //   estate[rule.id] = derivedEntity;
        //   setEntState(estate);
        // }
        let resarray = rule.field;
        result[rule.id] = resarray;
        // }
      });
    }
    return result;
  };

  const updateQuery = query => {
    const params = parseRawQuery(query);

    setRawQuery(query);
    setRuleState(params);
  };

  const syncEnts = () => {
    let ents = entState;

    for (const key in entState) {
      if (ruleState[key] === undefined) {
        delete ents[key];
      }
    }

    for (const key in ruleState) {
      if (!entState[key] && !!ruleState[key]) {
        ents[key] = ruleState[key].split(".")[0].toUpperCase();
      }
    }

    setEntState(ents);
  };

  const parentCallback = data => {
    const result = exportQuery(data, true);
    props.dataCallback(result);
  };

  // give react time to sync with the dom changes. Once updateQuery has updated the ruleState, call insertEntityControl.
  // If we call insertEntityControl directly from updateQuery after adding a new rule, querySelectorAll won't find it.
  useEffect(() => {
    insertEntityControl();
    syncEnts();
    parentCallback(rawQuery);
  }, [ruleState]);

  const insertEntityControl = () => {
    if (!hasData(ruleState)) return;

    const qb = qbref.current.children[0];

    // Control updates the rule ids/keys without notice, so we attempt to pull them from state by key first,
    // but can resort to referencing them by index since their order doesn't change. Potentially risky.
    qb.querySelectorAll(".rule").forEach((rule, idx) => {
      const ruleid = rule.getAttribute("data-rule-id");
      const selectedValue = ruleState[ruleid] || ruleState[Object.keys(ruleState)[idx]];

      let ent = rule.querySelector(".rule-entities") || {};
      let fld = rule.querySelector(".rule-fields") || {};

      if (!hasData(ent)) {
        ent = document.createElement("select");
        ent.innerHTML = EntitySelect.toString();
        ent.className = "rule-entities";
      }

      if (hasData(selectedValue)) {
        const selectedEntity = selectedValue.split(".")[0].toUpperCase();

        if (ent.value !== selectedEntity) {
          ent.value = selectedEntity;

          let estate = entState;
          estate[ruleid] = selectedEntity;
          setEntState(estate);

          fld.options.length = 0;
          fld.innerHTML = fieldMap[selectedEntity];
          fld.value = selectedValue;
        }
      } else if (hasData(entState[ruleid])) {
        ent.value = entState[ruleid];
      } else {
        let estate = entState;
        estate[ruleid] = "ADDRESS";
        setEntState(estate);
      }

      if (!rule.querySelector(".rule-entities")) {
        ent.addEventListener("change", ev => onEntityChange(ev, ruleState));
        rule.insertBefore(ent, fld);
      }
    });
  };

  return (
    <div ref={qbref}>
      <RQueryBuilder
        fields={addressFieldArray}
        query={data}
        operators={gtasoparray}
        onQueryChange={updateQuery}
      ></RQueryBuilder>
    </div>
  );
};

export default QueryBuilder;
