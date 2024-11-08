import React from "react";
import { Col, Container, Row } from "reactstrap";
import BMICalculationWrapper from "../../../Shared/BMICalculationWrapper";

const BMI = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <BMICalculationWrapper />
        </Col>
      </Row>
    </Container>
  );
};

export default BMI;
