import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Confirm.scss";

class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      callback: null
    };
  }

  openConfirmationModal = callback => event => {
    event.preventDefault();

    event = {
      ...event,
      target: { ...event.target, value: event.target.value }
    };

    this.setState({
      show: true,
      callback: () => callback(event)
    });
  };

  hideConfirmationModal = () => this.setState({ show: false, callback: null });

  confirm = () => {
    this.state.callback();
    this.hideConfirmationModal();
  };

  render() {
    const header = this.props.header || "Confirm";
    const body = this.props.message || "Please confirm";
    return (
      <React.Fragment>
        {this.props.children(this.openConfirmationModal)}

        <Modal
          className="confirmation-modal"
          show={this.state.show}
          onHide={this.hideConfirmationModal}
          centered
        >
          <Modal.Header>{header}</Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.confirm}>Confirm</Button>
            <Button onClick={this.hideConfirmationModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Confirm;
