import React, { memo } from "react";
import { Col, Row, Container } from "reactstrap";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordWrapper = () => {
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={12} xs={12}>
          <ResetPasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default memo(ResetPasswordWrapper);
