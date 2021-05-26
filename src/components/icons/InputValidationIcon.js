import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { hasData } from "../../utils/utils";
import Overlay from "../overlay/Overlay";

const InputValidationIcon = props => {
  const noIcontoDisplay = "";
  const [info, setInfo] = useState();
  const [valid, setValid] = useState(false);
  const [validationIcon, setValidationIcon] = useState(noIcontoDisplay);

  const getIconStyle = (valid, info) => {
    if (!hasData(props.value)) return noIcontoDisplay;

    setValid(valid);
    setInfo(info);
    const iconForValidInput = "fa fa-check-circle valid-input-checkbox";
    const iconForInvalidInput = hasData(info)
      ? "fa fa-info-circle invalid-input-checkbox"
      : "fa fa-check-circle invalid-input-checkbox";

    return valid ? iconForValidInput : iconForInvalidInput;
  };

  useEffect(() => {
    const { valid, info } = props.validateInput(props.value);
    setValidationIcon(getIconStyle(valid, info));
  }, [props.value]);

  return (
    <Overlay trigger={!valid ? ["click", "hover"] : ""} content={info} placement="left">
      <i class={validationIcon}></i>
    </Overlay>
  );
};

InputValidationIcon.propTypes = {
  validateInput: PropTypes.func,
  value: PropTypes.any
};

export default InputValidationIcon;
