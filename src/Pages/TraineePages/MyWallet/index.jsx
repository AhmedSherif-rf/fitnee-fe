import { Container, Row, Col, Card } from "reactstrap";
import TraineeWalletWrapper from "../../../Shared/TraineeWalletWrapper";

const MyWallet = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="BorderRadius contentCard overflow-x-hidden text-black-custom">
            <TraineeWalletWrapper />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyWallet;
