import React, { useRef, useState, useEffect } from "react";
import RQueryBuilder from "react-querybuilder";
import {
  initQuery,
  addressFieldArray,
  FIELDS,
  EntitySelect,
  gtasoparray
} from "./constants.js";
import { hasData } from "../../utils/utils";

import "./QueryBuilder.scss";

const QueryBuilder = props => {
  const qbref = useRef(null);
  const editQuery = props.query || initQuery;
  const [ruleState, setRuleState] = useState([]);
  const [entState, setEntState] = useState([]);

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
    // console.log("ON ENTITY CHANGE");

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
        if (type === "g-") parseRawQuery(rule, obj); //if the rule is a Group, parse it.
        if (type === "r-") {
          // const derivedEntity = hasData(rule.field)
          //   ? rule.field.split(".")[0].toUpperCase()
          //   : "";
          let resarray = rule.field;
          result[rule.id] = resarray;
        }
      });
    }
    return result;
  };

  const updateQuery = query => {
    console.log(query);
    const params = parseRawQuery(query);

    setRuleState(params);
  };

  const syncEnts = () => {
    let ents = entState;

    for (const key in entState) {
      if (ruleState[key] === undefined) {
        delete ents[key];
      }
    }

    setEntState(ents);
  };

  // const buildRuleState = query => {
  // };

  // give react time to sync with the dom changes. Once updateQuery has updated the ruleState, call insertEntityControl.
  // If we call insertEntityControl directly from updateQuery after adding a new rule, querySelectorAll won't find it.
  useEffect(() => {
    insertEntityControl();
    syncEnts();
  }, [ruleState]);

  const insertEntityControl = () => {
    // console.log("INSERT ENTITY CONTROL");
    // console.log("ruleState");
    // console.log(entState);

    const qb = qbref.current.children[0];

    qb.querySelectorAll(".rule").forEach(rule => {
      const ruleid = rule.getAttribute("data-rule-id");
      const selectedValue = ruleState[ruleid];
      let ent = rule.querySelector(".rule-entities") || {};
      let fld = rule.querySelector(".rule-fields") || {};

      if (!hasData(ent)) {
        ent = document.createElement("select");
        ent.innerHTML = EntitySelect;
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
        query={editQuery}
        operators={gtasoparray}
        onQueryChange={updateQuery}
      ></RQueryBuilder>
    </div>
  );
};

export default QueryBuilder;
