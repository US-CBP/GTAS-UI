// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, {useContext, useState} from "react";
import {asArray} from "../../utils/utils";
import {OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {LookupContext} from "../../context/data/LookupContext";

const ToolTipWrapper = props => {
    const {getCachedKeyValues} = useContext(LookupContext);
    const initToolTipState = "Loading...";
    const [toolTipVal, setToolTipVal] = useState(initToolTipState);

    const renderTooltip = (val, props) => (
        <Tooltip id="tooltipWrapper-tooltip" {...props}>
            {toolTipVal}
        </Tooltip>
    );

    const getToolTipValue = (val, codeType) => {
        setToolTipVal(initToolTipState);
        getCachedKeyValues(codeType).then(types => {
            asArray(types).forEach(type => {
                if (type.value === val) {
                    console.log("tooltip found! " + val);
                    setToolTipVal(type.title);
                }
            })
        })
    };

    const data = {
        "val": props.data.val,
        "lookup": props.data.lkup
    };

    return (
        <div>
            <OverlayTrigger
                placement="top"
                delay={{show: 250, hide: 400}}
                onEnter={() => getToolTipValue(data.val, data.lookup)}
                //onExited={() => setToolTipVal(initToolTipState)}
                overlay={renderTooltip()}
            >
                <span>{data.val}</span>
            </OverlayTrigger>
        </div>
    );
};

export default ToolTipWrapper;
