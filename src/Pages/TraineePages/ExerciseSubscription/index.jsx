import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import SubscriptionCard from "../../../Shared/SubscriptionCard";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { EXERCUSE_SUBSCRIPITION_PLAN_URL } from "../../../utils/constants";
import { getExerciseSubscriptionPlans } from "../../../Redux/features/SubscriptionPlan/subscriptionPlanApi";

const ExerciseSubscription = () => {
  const dispatch = useDispatch();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const { loading } = useSelector((state) => state.subscriptionPlan);

  useEffect(() => {
    fetchExerciseSubscriptionPlan();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchExerciseSubscriptionPlan = () => {
    const data = {
      apiEndpoint: EXERCUSE_SUBSCRIPITION_PLAN_URL,
    };
    dispatch(getExerciseSubscriptionPlans(data)).then((res) => {
      if (res.type === "getExerciseSubscriptionPlans/fulfilled") {
        setSubscriptionData(res.payload.data);
      }
    });
  };

  return (
    <Container fluid className="vh-100">
      {loading === "pending" && <LoadingScreen />}
      {subscriptionData ? (
        <Row className="justify-content-center align-items-center">
          <Col md={9} className="">
            <Card className="contentCard px-3 pt-5 bg-transparent">
              <Row className="pt-2 justify-content-center">
                <Col
                  md={4}
                  className={`mb-md-0 mb-5 ${"middle-subscription-card"}`}
                >
                  <SubscriptionCard
                    id={subscriptionData?.id}
                    price={subscriptionData?.price}
                    duration={subscriptionData?.duration}
                    type={subscriptionData?.membership_type}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          {loading !== "pending" && (
            <img src={Images.NO_DATA_FOUND_IMG} alt="no-data-found" />
          )}
        </div>
      )}
    </Container>
  );
};

export default ExerciseSubscription;
