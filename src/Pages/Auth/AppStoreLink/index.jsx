import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import Images from "../../../HelperMethods/Constants/ImgConstants";

const AppStoreLink = () => {
  const { i18n } = useTranslation("");
  return (
    <Container fluid className={i18n.dir()}>
      <Row className="justify-content-center m-0">
        <Col lg="5" md={6}>
          <Card className="contentCard BorderRadius h-100">
            <CardBody className="d-flex align-items-center justify-content-center">
              <div className="text-center">
                <div className="w-100 mb-2">
                  <a
                    href="https://apps.apple.com/us/app/fitnee/id6473802571"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={Images.APP_STORE_IMG}
                      className="img-fluid "
                      alt=""
                    />
                  </a>
                </div>

                <div className="w-100">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.fitneeapplication"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={Images.GOOGLE_PLAY_IMG}
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppStoreLink;
