import PropTypes from "prop-types";
import React, { memo } from "react";
import Message from "../../AdminShared/Components/Message";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";

const IndividualChatModal = (props) => {
  const { onClose, isOpen, className, size, messages, recipient } = props;

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size}
      isOpen={isOpen}
      onClosed={onClose}
      toggle={onClose}
      className={`${className}`}
    >
      <ModalHeader className="border-0 bgYellow">
        <div className="d-flex align-items-center">
          <div
            className="bgProperties rounded-circle me-2"
            style={{
              width: "50px",
              height: "50px",
              backgroundImage:
                recipient?.profile_pic === null
                  ? `url(${Images.USER_DUMMY_IMG})`
                  : `url(${recipient?.profile_pic})`,
            }}
          ></div>
          <h5 className="text-secondary fw-bold mb-0">
            {recipient?.full_name
              ? recipient?.full_name
              : `${recipient?.first_name} ${recipient?.last_name}`}
          </h5>
        </div>
      </ModalHeader>
      <ModalBody className="p-4">
        <Row>
          {messages.map((message, index) => {
            return (
              <Col
                md={12}
                className={`text-start ${
                  parseInt(message?.messageFrom) === recipient?.id
                    ? "ltr"
                    : "rtl"
                }`}
                key={index}
              >
                <Message
                  member={null}
                  message={message}
                  recipient={recipient}
                />
              </Col>
            );
          })}
          {messages.length <= 0 && (
            <p className="mb-0 text-center">No messages found</p>
          )}
        </Row>
      </ModalBody>
    </Modal>
  );
};
IndividualChatModal.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};
IndividualChatModal.defaultProps = {
  className: "",
  size: "sm",
  isOpen: false,
  onClose: () => {},
};

export default memo(IndividualChatModal);
