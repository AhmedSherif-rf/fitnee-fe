import React from "react";
import { Col, Container, Row } from "reactstrap";
import BMRCalculationWrapper from "../../../Shared/BMRCalculationWrapper";

const BMR = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <BMRCalculationWrapper />
        </Col>
      </Row>
    </Container>
  );
};

export default BMR;
