import React from "react";
import { Container, Row, Col, Card } from "reactstrap";
import ResetPasswordWrapper from "../../../Shared/ResetPassword/ResetPasswordWrapper";

const ResetPassword = () => {
  return (
    <Container fluid className="vh-100">
      <Row>
        <Col>
          <Card className="contentCard BorderRadius">
            <ResetPasswordWrapper />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ResetPassword;
