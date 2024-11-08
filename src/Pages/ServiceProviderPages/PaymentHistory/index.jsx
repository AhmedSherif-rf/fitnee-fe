import { Card, Col, Container, Row } from "reactstrap";
import PaymentHistoryWrapper from "../../../Shared/PaymentHistoryWrapper";

const PaymentHistory = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="BorderRadius contentCard overflow-x-hidden text-black-custom">
            <PaymentHistoryWrapper />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentHistory;
