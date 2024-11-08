import "./styles.scss";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const InformationModal = (props) => {
  const {
    onClose,
    isOpen,
    className,
    size,
    heading,
    ModalTextOne,
    ModalTextTwo,
    TOneClassName,
    TTwoClassName,
    ButtonOne,
    ButtonTwo,
    ButtonThree,
  } = props;

  const { i18n } = useTranslation("");

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size}
      isOpen={isOpen}
      toggle={onClose}
      className={`${className} ${i18n.dir()}`}
      backdrop={"static"}
    >
      {heading && (
        <ModalHeader className="border-0 pt-3 pb-0">
          <b>{heading}</b>
        </ModalHeader>
      )}

      <ModalBody className="py-4 text-black-custom">
        <Row>
          <Col md={12} className="mb-2">
            <div className={`${TOneClassName}`}> {ModalTextOne}</div>
          </Col>
          <Col md={12} className="mb-2">
            <div className={`${TTwoClassName}`}> {ModalTextTwo}</div>
          </Col>
          <Col md={12} className="mb-2">
            <div className="w-100 text-center">{ButtonThree}</div>
          </Col>
          {!ButtonTwo && (
            <>
              <Col md={12} className="mb-2 text-center">
                <div>{ButtonOne}</div>
              </Col>
            </>
          )}
          {ButtonTwo && (
            <>
              <Col md={6} className="mb-2 text-center">
                <div>{ButtonOne}</div>
              </Col>
              <Col md={6} className="mb-2 text-center">
                <div>{ButtonTwo}</div>
              </Col>
            </>
          )}
        </Row>
      </ModalBody>
    </Modal>
  );
};

InformationModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  size: PropTypes.string,
};

InformationModal.defaultProps = {
  className: "",
  size: "sm",
  isOpen: false,
  onClose: () => {},
};

export default memo(InformationModal);
