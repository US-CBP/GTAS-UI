// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, {useContext, useState} from "react";
import {asArray, hasData} from "../../utils/utils";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {LookupContext} from "../../context/data/LookupContext";

const ToolTipWrapper = props => {
    const {getCachedKeyValues} = useContext(LookupContext);
    const initToolTipState = "Loading...";
    const [toolTipVal, setToolTipVal] = useState(initToolTipState);

    const renderTooltip = (props) => (
        <Tooltip id="tooltipWrapper-tooltip" {...props}>
            {toolTipVal}
        </Tooltip>
    );

    const getToolTipValue = (val, codeType) => {
        setToolTipVal(initToolTipState);
        getCachedKeyValues(codeType).then(types => {
            const type = asArray(types).find( t => {
                return t.value === val;
            });
            setToolTipVal(type.title);
        })
    };

    const data = {
        "val": props.data.val,
        "lookup": props.data.lkup,
        "placement": hasData(props.data.placement) ? props.data.placement : "top",
        "show": hasData(props.data.show) ? props.data.show : 250,
        "hide": hasData(props.data.hide) ? props.data.hide : 400
    };

    return (
            <OverlayTrigger
                placement={data.placement}
                delay={{show: data.show, hide: data.hide}}
                onEnter={() => getToolTipValue(data.val, data.lookup)}
                //onExited={() => setToolTipVal(initToolTipState)}
                overlay={renderTooltip()}
            >
                <span>{data.val}</span>
            </OverlayTrigger>
    );
};

export default ToolTipWrapper;
