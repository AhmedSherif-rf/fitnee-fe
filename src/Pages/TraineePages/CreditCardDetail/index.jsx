import React from "react";
import { Col, Container, Row, Card } from "reactstrap";
import CreditCardDetailWrapper from "../../../Shared/CreditCardDetailWrapper";

const CreditCardDetail = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card className="BorderRadius contentCard">
            <CreditCardDetailWrapper />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreditCardDetail;
