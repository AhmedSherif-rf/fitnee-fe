import React from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import GuestServiceProviderListWrapper from "../../../Shared/GuestServiceProviderListWrapper";

const ServiceProviderList = (props) => {
  const { roleType } = useParams();

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <GuestServiceProviderListWrapper roleType={roleType} />
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceProviderList;
