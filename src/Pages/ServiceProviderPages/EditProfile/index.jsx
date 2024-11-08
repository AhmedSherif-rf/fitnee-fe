import { Container, Row, Card, Col } from "reactstrap";
import SignUpForm from "../../../Shared/SignUp/SignUpForm";

const EditProfile = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="BorderRadius contentCard px-3">
            <SignUpForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
