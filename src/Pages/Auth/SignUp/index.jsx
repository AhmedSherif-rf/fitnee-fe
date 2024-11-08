import React from "react";
import { Container, Card, Row, Col } from "reactstrap";
import SignUpForm from "../../../Shared/SignUp/SignUpForm";

const SignUp = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="BorderRadius contentCard">
            <SignUpForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
