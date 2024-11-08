import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import Notifications from "../../../Shared/Notification";

const ServiceProviderNotifications = () => {
  return (
    <Container>
      <Row className={`justify-content-center`}>
        <Col md={7}>
          <Card className="contentCard">
            <Notifications />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceProviderNotifications;
