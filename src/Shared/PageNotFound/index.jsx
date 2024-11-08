import React from "react";
import { Link } from "react-router-dom";
import FillBtn from "../Buttons/FillBtn";
import { Col, Container, Row } from "reactstrap";

const PageNotFound = () => {
  return (
    <Container className="vh-100">
      <Row className="justify-content-center h-100">
        <Col md="8" className="h-100">
          <div className="text-center h-100 d-flex align-items-center justify-content-center">
            <div className="">
              <p className="display-1 text-white fw-bolder mb-0 ">404</p>
              <p className="h6 text-white mb-3">Page Not Found</p>
              <Link to="/" className="textYellow fs-5">
                <FillBtn text={<p className="mb-0">Go To Home</p>} />
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
