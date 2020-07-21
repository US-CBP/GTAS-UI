import React, { Component } from "react";
import PropTypes from "prop-types";
import CheckboxInput from "../inputs/checkbox/Checkbox";
import CheckboxGroup from "../inputs/checkboxGroup/CheckboxGroup";
import TextInput from "../inputs/text/Text";
import TextareaInput from "../inputs/textarea/Textarea";
import FileInput from "../inputs/file/File";
import SelectInput from "../inputs/select/Select";
import LabelInput from "../inputs/label/Label";
import { hasData, alt } from "../../utils/utils";
import { FormGroup } from "react-bootstrap";
import "./LabelledInput.css";

const textTypes = ["text", "number", "password", "email", "search", "tel"];
const boolTypes = ["radio", "checkbox", "toggle"];
const selectType = ["select", "multiSelect"];
const checkboxGroup = "checkboxGroup";
const textareaType = "textarea";
const fileType = "file";
const REQUIRED = "required";

// TODO - refac as a passthru hook!!!
// Pass props through directly, remove all awareness of specific child types
// remove all proptypes not related to the label or form group
class LabelledInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.onMultiSelecChange = this.onMultiSelecChange.bind(this);

    this.state = {
      isValid: true,
      labelText: alt(props.labelText),
      inputVal: alt(props.inputVal),
      options: props.options,
      placeholder: alt(props.placeholder),
      required: alt(props.required),
      visibleStyle: alt(props.isVisible)
    };
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({
      inputVal: value,
      selected: value,
      isValid: hasData(value) || this.props.required !== REQUIRED
    });

    if (e.target.name === "showDateTimePicker") {
      this.props.toggleDateTimePicker(e.target.value);
    }
    this.props.callback(e.target);
    if (hasData(this.props.onChange)) {
      this.props.onChange(e.target);
    }
  }

  onChangeArray(e, label) {
    this.setState({
      inputVal: e.value,
      isValid: hasData(e) || this.props.required !== REQUIRED
    });

    this.props.callback(e);
  }

  onMultiSelecChange(e) {
    this.setState({
      inputVal: e,
      isValid: hasData(e) || this.props.required !== REQUIRED
    });

    this.props.callback({ value: e, name: this.props.name });
  }

  //APB - REFACTOR
  getInputByType() {
    const type = this.props.inputType;
    const inputStyle = `${alt(type)} ${alt(this.props.className)}`;

    if (type === textareaType) {
      return (
        <TextareaInput
          className={inputStyle}
          alt={this.props.alt}
          name={this.props.name}
          inputType={this.props.inputType}
          inputVal={alt(this.state.inputVal)}
          callback={this.onChange}
          required={this.state.required}
          placeholder={this.state.placeholder}
          readOnly={this.props.readOnly}
        />
      );
    }

    if (type === "label") {
      return (
        <LabelInput
          className={this.props.inputStyle}
          alt={this.props.alt}
          name={this.props.name}
          inputVal={this.props.inputVal}
          inline={this.props.inline}
        />
      );
    }

    if (textTypes.includes(type)) {
      return (
        <TextInput
          autoFocus={this.props.autoFocus}
          pattern={this.props.pattern}
          className={this.props.className}
          alt={this.props.alt}
          name={this.props.name}
          inputType={this.props.inputType}
          inputVal={alt(this.state.inputVal)}
          callback={this.onChange}
          required={this.state.required}
          placeholder={this.state.placeholder}
          readOnly={this.props.readOnly}
        />
      );
    }
    if (selectType.includes(type)) {
      return (
        <SelectInput
          autoFocus={this.props.autoFocus}
          className={inputStyle}
          alt={this.props.alt}
          name={this.props.name}
          inputType={this.props.inputType}
          selected={this.props.inputVal}
          callback={type === "select" ? this.onChange : this.onMultiSelecChange}
          required={this.state.required}
          placeholder={this.state.placeholder}
          options={this.state.options}
          readOnly={this.props.readOnly}
        />
      );
    }
    if (boolTypes.includes(type)) {
      return (
        <React.Fragment>
          {this.props.labelText && <br />}
          <CheckboxInput
            className={inputStyle}
            name={this.props.name}
            key={this.props.name}
            inputType={this.props.inputType}
            inputVal={this.props.inputVal}
            callback={this.onChange}
            required={this.state.required}
            selected={this.props.selected}
            placeholder={this.state.placeholder}
            alt={this.props.alt}
            readOnly={this.props.readOnly}
          />
        </React.Fragment>
      );
    }
    if (checkboxGroup === type) {
      return (
        <React.Fragment>
          {this.props.labelText && <br />}
          <CheckboxGroup
            collection={this.props.collection}
            className={inputStyle}
            name={this.props.name}
            label={this.props.labelText}
            key={this.props.name}
            inputType="checkbox"
            inputVal={this.props.inputVal}
            callback={this.onChangeArray}
            required={this.state.required}
            selected={this.props.selected}
            placeholder={this.state.placeholder}
            alt={this.props.alt}
            readOnly={this.props.readOnly}
          />
        </React.Fragment>
      );
    }
    if (type === fileType) {
      return (
        <FileInput
          className={inputStyle}
          name={this.props.name}
          inputType={this.props.inputType}
          inputVal={this.props.inputVal}
          options={this.state.options}
          callback={this.onChange}
          required={this.state.required}
          placeholder={this.state.placeholder}
          alt={this.props.alt}
        />
      );
    }

    return null;
  }

  render() {
    const cls = !!this.props.spacebetween ? "space-between" : "";
    const textlabelStyle = this.props.inputType === "multiSelect" ? "" : "txtlabel";
    return (
      <FormGroup className={`${cls} ${this.state.visibleStyle}`}>
        <label className={textlabelStyle}>{this.state.labelText}</label>
        {this.getInputByType()}
      </FormGroup>
    );
  }
}

LabelledInput.propTypes = {
  name: PropTypes.string,
  alt: PropTypes.string.isRequired,
  autoFocus: PropTypes.oneOf([true, ""]),
  labelText: PropTypes.string,
  inputType: PropTypes.oneOf([
    "text",
    "textarea",
    "number",
    "password",
    "select",
    "radio",
    "checkbox",
    "checkboxGroup",
    "toggle",
    "email",
    "search",
    "tel",
    "label",
    "file",
    "multiSelect"
  ]).isRequired,
  callback: PropTypes.func,
  inputVal: PropTypes.any,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  required: PropTypes.oneOf([REQUIRED, "", true]),
  isVisible: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  toggleDateTimePicker: PropTypes.func
};

export default LabelledInput;
