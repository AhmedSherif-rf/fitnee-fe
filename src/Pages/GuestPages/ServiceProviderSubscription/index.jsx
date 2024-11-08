import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import SubscriptionCard from "../../../Shared/SubscriptionCard";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { GUEST_SUBSCRIPTION_PLAN_URL } from "../../../utils/constants";
import { getGuestServiceProviderSubscriptionPlans } from "../../../Redux/features/SubscriptionPlan/subscriptionPlanApi";

const ServiceProviderSubscription = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const { i18n } = useTranslation("");
  const [subscriptionData, setSubscriptionData] = useState([]);
  const { loading } = useSelector((state) => state.subscriptionPlan);

  useEffect(() => {
    fetchGuestServiceProviderSubscriptionPlan();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchGuestServiceProviderSubscriptionPlan = () => {
    const data = {
      apiEndpoint: `${GUEST_SUBSCRIPTION_PLAN_URL}?uuid=${uuid}`,
    };
    dispatch(getGuestServiceProviderSubscriptionPlans(data)).then((res) => {
      if (res.type === "getGuestServiceProviderSubscriptionPlans/fulfilled") {
        setSubscriptionData(res.payload.data);
      }
    });
  };

  return (
    <Container fluid className={`vh-100 ${i18n.dir()}`}>
      {loading === "pending" && <LoadingScreen />}
      {subscriptionData.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <Col md={9} className="">
            <Card className="contentCard px-3 pt-5 bg-transparent">
              <Row className="pt-2">
                {subscriptionData?.map((item, index) => {
                  return (
                    <Col
                      md={4}
                      key={index}
                      className={`mb-md-0 mb-5 ${
                        index === 1 && window.innerWidth >= 768
                          ? "middle-subscription-card"
                          : ""
                      }`}
                    >
                      <SubscriptionCard
                        id={item?.id}
                        price={item?.price}
                        duration={item?.duration}
                        type={item?.membership_type}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          {loading !== "pending" && subscriptionData.length <= 0 && (
            <img src={Images.NO_DATA_FOUND_IMG} alt="no-data-found" />
          )}
        </div>
      )}
    </Container>
  );
};

export default ServiceProviderSubscription;
