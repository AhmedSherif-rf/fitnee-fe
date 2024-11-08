import React, { memo } from "react";
import { Col, Container, Row } from "reactstrap";
import { ShimmerSimpleGallery, ShimmerButton } from "react-shimmer-effects";

const ShimmerScreen = () => {
  return (
    <Container fluid>
      <Row className="justify-content-between align-items-center">
        <Col md={12}>
          <ShimmerButton size="lg" />
        </Col>
        <Col md={12} sm={12} xs={12}>
          {window.innerWidth < 576 ? (
            <ShimmerSimpleGallery row={2} col={1} />
          ) : (
            <ShimmerSimpleGallery row={2} col={4} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default memo(ShimmerScreen);
