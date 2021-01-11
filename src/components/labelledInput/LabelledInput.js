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
import ReactDateTimePicker from "../inputs/dateTimePicker/DateTimePicker";
import { FormGroup } from "react-bootstrap";
import "./LabelledInput.css";

const textTypes = ["text", "number", "password", "email", "search", "tel"];
const boolTypes = ["radio", "checkbox", "toggle"];
const selectType = ["select", "multiSelect"];
const checkboxGroup = "checkboxGroup";
const textareaType = "textarea";
const fileType = "file";
const REQUIRED = "required";
const dateTime = "dateTime";

// TODO - refac as a passthru hook!!!
// Pass props through directly, remove all awareness of specific child types
// remove all proptypes not related to the label or form group
class LabelledInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.onMultiSelectChange = this.onMultiSelectChange.bind(this);
    this.onChangeDatePicker = this.onChangeDatePicker.bind(this);

    this.state = {
      isValid: true,
      labelText: alt(props.labelText),
      inputval: alt(props.inputval),
      options: props.options,
      placeholder: alt(props.placeholder),
      required: alt(props.required),
      visibleStyle: alt(props.isVisible)
    };
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({
      inputval: value,
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
      inputval: e.value,
      isValid: hasData(e) || this.props.required !== REQUIRED
    });

    this.props.callback(e);
  }

  onMultiSelectChange(e) {
    this.setState({
      inputval: e,
      isValid: hasData(e) || this.props.required !== REQUIRED
    });

    this.props.callback({ value: e, name: this.props.name });
  }

  onChangeDatePicker(e) {
    this.setState({
      inputval: e,
      isValid: hasData(e) || this.props.required !== REQUIRED
    });
    this.props.callback({ value: e, name: this.props.name });
  }

  //APB - REFACTOR
  getInputByType() {
    const type = this.props.inputtype;
    const inputStyle = `${alt(type)} ${alt(this.props.className)}`;

    if (type === textareaType) {
      return (
        <TextareaInput
          className={inputStyle}
          alt={this.props.alt}
          name={this.props.name}
          inputtype={this.props.inputtype}
          inputval={alt(this.state.inputval)}
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
          inputval={this.props.inputval}
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
          inputtype={this.props.inputtype}
          inputval={alt(this.state.inputval)}
          required={this.state.required}
          placeholder={this.state.placeholder}
          maxLength={this.props.maxlength}
          readOnly={this.props.readOnly}
          callback={this.onChange}
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
          inputtype={this.props.inputtype}
          selected={this.props.inputval}
          callback={type === "select" ? this.onChange : this.onMultiSelectChange}
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
            inputtype={this.props.inputtype}
            inputval={this.props.inputval}
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
            inputtype="checkbox"
            inputval={this.props.inputval}
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
          inputtype={this.props.inputtype}
          inputval={this.props.inputval}
          options={this.state.options}
          callback={this.onChange}
          required={this.state.required}
          placeholder={this.state.placeholder}
          alt={this.props.alt}
        />
      );
    }

    if (type === dateTime) {
      return (
        <ReactDateTimePicker
          className={inputStyle}
          name={this.props.name}
          inputval={this.props.inputval}
          callback={this.onChangeDatePicker}
          required={this.state.required}
          readOnly={this.props.readOnly}
          format={this.props.format}
          disableCalendar={this.props.disableCalendar}
        />
      );
    }

    return null;
  }

  render() {
    const cls = !!this.props.spacebetween ? " space-between" : "";
    const inline = !!this.props.inline ? " input-group-append" : "";
    const textlabelStyle = this.props.inputtype === "multiSelect" ? "" : "txtlabel";
    return (
      <FormGroup className={`${this.state.visibleStyle}${cls}${inline}`}>
        <label className={textlabelStyle}>{this.state.labelText}</label>
        {this.getInputByType()}
      </FormGroup>
    );
  }
}

LabelledInput.propTypes = {
  name: PropTypes.string,
  autoFocus: PropTypes.oneOf([true, ""]),
  labelText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inputtype: PropTypes.oneOf([
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
    "multiSelect",
    "dateTime"
  ]).isRequired,
  callback: PropTypes.func,
  inputval: PropTypes.any,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  required: PropTypes.oneOf([REQUIRED, "", true]),
  isVisible: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  toggleDateTimePicker: PropTypes.func,
  disableCalendar: PropTypes.bool,
  format: PropTypes.string
};

export default LabelledInput;
