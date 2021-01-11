import React from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { hasData, asArray, isObject, alt } from "../../utils/utils";
import Title from "../title/Title";
import Xl8 from "../xl8/Xl8";
import Loading from "../loading/Loading";
import { Button, Form as RBForm, ButtonToolbar } from "react-bootstrap";
import { navigate } from "@reach/router";

import { ACTION } from "../../utils/constants";
import "./Form.css";
import Confirm from "../confirmationModal/Confirm";

/**
 * **Generic form that can add a new record or fetch and edit an existing one.**
 */

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormCancel = this.onFormCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

    let fields = [];
    let fieldMap = [];

    asArray(this.props.children).forEach((child, idx) => {
      const datafield = child.props.datafield;

      if (datafield) {
        const noname = `unnamedfield${idx}`;
        const componentname = child.props.name || noname;
        const fieldname = datafield === true ? componentname : datafield;

        // Either the name or datafield prop must contain a string
        if (fieldname === noname) {
          throw new Error(`The child collection contains a "datafield" element whose name is not defined in the 
          "name" or "datafield" props. Remove the "datafield" prop or define a name for the element.`);
        }

        fieldMap[componentname] = fieldname;
        fields[fieldMap[componentname]] = "";
      }
    });

    this.state = {
      fields: fields, // array of data fields and their current vals. This gets saved to the DB.
      fieldMap: fieldMap, // maps the names of the child components to the data fields.
      getSuccess: "",
      kids: [],
      formkey: 1
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let fields = [];
    this.setState({ showPending: true });
    if ((this.isEdit() || this.isRefresh()) && hasData(this.props.getService)) {
      this.props.getService(this.props.recordId).then(res => {
        if (hasData(res)) {
          // If res is an object, let it pass
          // If its an array with 1 object item, use that item
          // otherwise, assume it's an invalid result. Use an empty object to set the form values.
          let singleRecord = isObject(res)
            ? res
            : Array.isArray(res) && res.length === 1 && isObject(res[0])
            ? res[0]
            : {};

          let populatedFields = {};
          for (let field in this.state.fields) {
            populatedFields[field] = singleRecord[field];
          }

          const parseData = this.props.parseData;

          fields = hasData(parseData) ? parseData(populatedFields) : populatedFields;
        }
        this.bindChildren(fields);
      });
      // .catch, throw error
    } else if (hasData(this.props.data)) this.bindChildren(this.props.data);
    else this.bindChildren(fields);
  }

  canSubmit() {
    const isedit = this.isEdit();
    return !isedit || (isedit && this.state.getSuccess === true);
  }

  isEdit() {
    return this.props.action === "edit";
  }

  // view-only data we want to fetch on load and refetch on submit
  isRefresh() {
    return this.props.action === "refresh";
  }

  onChange(ev) {
    const componentname = ev.name;
    const value = ev.value;

    let newfields = this.state.fields;
    let datafieldname = this.state.fieldMap[componentname];

    newfields[datafieldname] = value;

    this.setState({
      fields: newfields
    });
  }

  onConfirm(ev) {}

  onFormSubmit(e) {
    this.setState({ showPending: true });
    if (!this.props.shouldConfirm) e.preventDefault();

    let operation = this.props.submitService;

    if (operation === undefined) {
      return this.fetchData();
    }

    const params = this.props.recordId
      ? [this.props.recordId, this.state.fields]
      : [this.state.fields];

    const parsedParams = hasData(this.props.paramCallback)
      ? this.props.paramCallback(params)
      : params;

    const validParams = hasData(this.props.validateInputs)
      ? this.props.validateInputs(parsedParams)
      : true;

    if (validParams) {
      operation(...parsedParams).then(res => {
        if (hasData(this.props.callback)) this.props.callback(ACTION.SAVE, alt(res));
        if (this.props.refreshOnSubmit) {
          this.fetchData();
        } else {
          this.setState({ showPending: false });
        }
      });
    } else this.setState({ showPending: false });
  }

  onFormCancel() {
    if (this.props.redirectTo !== undefined) navigate(this.props.redirectTo);
    this.props.callback(ACTION.CANCEL);
    // else window.history.back();
  }

  // bind children containing form data to the ev handler and state
  bindChildren(populatedFields) {
    let assignInputVals = false;
    if (populatedFields.length === 0) {
      assignInputVals = true;
    }
    let boundChildren = asArray(this.props.children).map((child, idx) => {
      if (!child.props.datafield) return child;

      let cleanprops = Object.assign({}, child.props);
      delete cleanprops.callback;
      if (assignInputVals) {
        populatedFields[child.props.name] = child.props.inputval;
      }

      let newchild = React.cloneElement(child, {
        key: idx,
        callback: this.onChange,
        inputval: populatedFields[this.state.fieldMap[child.props.name]],
        ...cleanprops
      });

      return newchild;
    });

    const newkey = this.state.formkey + 1;

    this.setState({
      kids: boundChildren,
      fields: populatedFields,
      formkey: newkey,
      getSuccess: hasData(populatedFields),
      showPending: false
    });
  }

  render() {
    const defaultMessage = <Xl8 xid="form005">Please confirm submission</Xl8>;
    const defaultHeader = <Xl8 xid="form006">Form Confirmation</Xl8>;
    const showSubmit = this.props.action !== "readonly";
    const disabled = this.canSubmit() ? "" : "disabled";
    const header = this.props.confirmationHeader || defaultHeader;
    const message = this.props.confirmationMessage || defaultMessage;

    return (
      <div>
        {this.state.showPending && <Loading></Loading>}

        {!this.state.showPending && (
          <Confirm header={header} message={message}>
            {confirm => (
              <RBForm
                onSubmit={
                  this.props.shouldConfirm
                    ? confirm(this.onFormSubmit)
                    : this.onFormSubmit
                }
                key={this.state.formkey}
              >
                {this.props.title && <Title title={this.props.title}></Title>}

                <ErrorBoundary message="Form children could not be rendered">
                  {this.state.kids}
                </ErrorBoundary>
                <ButtonToolbar className="container">
                  {this.props.cancellable && (
                    <Button
                      type="button"
                      className="m-2 button btn fullwidth"
                      variant="outline-dark"
                      onClick={this.onFormCancel}
                    >
                      {this.props.cancelText || <Xl8 xid="form001">Cancel</Xl8>}
                    </Button>
                  )}
                  {showSubmit && (
                    <Button
                      className={`m-2 button block fullwidth ${disabled}`}
                      type="submit"
                    >
                      {this.props.submitText || <Xl8 xid="form002">Submit</Xl8>}
                    </Button>
                  )}

                  {this.props.customButtons}
                </ButtonToolbar>
              </RBForm>
            )}
          </Confirm>
        )}
      </div>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string,
  submitText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cancellable: PropTypes.oneOf(["true", true, ""]),
  cancelText: PropTypes.string,
  redirectTo: PropTypes.string,
  getService: PropTypes.func,
  submitService: PropTypes.func,
  action: PropTypes.oneOf(["add", "edit", "readonly", "refresh", ""]),
  recordId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.object,
  callback: PropTypes.func.isRequired,
  paramCallback: PropTypes.func,
  shouldConfirm: PropTypes.bool,
  validateInputs: PropTypes.func,
  parseData: PropTypes.func
};

export default Form;
