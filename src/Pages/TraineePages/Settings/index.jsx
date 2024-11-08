import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OutlineBtn from "../../../Shared/Buttons/OutlineBtn";
import PageHeading from "../../../Shared/Headings/PageHeading";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Index = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("");

  const handlePaymentClick = useCallback(() => {
    navigate("/trainee/myWallet");
  }, [navigate]);

  const handleEditProfileClick = useCallback(() => {
    navigate("/trainee/editProfile/trainee");
  }, [navigate]);

  const handleSubscriptionHistoryClick = useCallback(() => {
    navigate("/trainee/subscriptionHistory");
  }, [navigate]);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card className="BorderRadius contentCard border-0">
            <CardBody className={`${i18n.dir()} px-4`}>
              <Row className="align-items-center text-black-custom justify-content-center text-black-custom py-2 mb-2">
                <Col className="mb-md-0 mb-2">
                  <PageHeading
                    headingText={t("settings.settingsText")}
                    categoryText=""
                  />
                </Col>
              </Row>
              <Row className="align-items-center text-black-custom justify-content-start text-black-custom py-2 mb-2">
                <Col md={6} className="mb-md-0 mb-2">
                  <OutlineBtn
                    handleOnClick={handleEditProfileClick}
                    className="w-100 mb-2 py-3"
                    text={t("topBar.myProfileText")}
                  />
                </Col>
                <Col md={6} className="mb-md-0 mb-2">
                  <OutlineBtn
                    className="w-100 mb-2 py-3"
                    text={t("traineeDashboard.mySubscriptionHistoryText")}
                    handleOnClick={handleSubscriptionHistoryClick}
                  />
                </Col>
                <Col md={6} className="mb-md-0 mb-2">
                  <OutlineBtn
                    className="w-100 mb-2 py-3"
                    handleOnClick={handlePaymentClick}
                    text={t("traineeDashboard.myWalletText")}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
