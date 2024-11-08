import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Card } from "reactstrap";
import React, { useState, useCallback, useEffect } from "react";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import { SUBSCRIPTION_PLAN_URL } from "../../../utils/constants";
import EditSubscriptionCard from "../../../Shared/EditSubscriptionCard";
import {
  editSubscriptionPlan,
  createSubscriptionPlan,
  getTraineeSubscriptionPlans,
} from "../../../Redux/features/SubscriptionPlan/subscriptionPlanApi";

const Subscription = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation("");
  const { loading } = useSelector((state) => state.subscriptionPlan);

  const [subscriptionData, setSubscriptionData] = useState([]);

  useEffect(() => {
    fetchServiceProviderSubscriptionPlan();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchServiceProviderSubscriptionPlan = () => {
    const data = {
      apiEndpoint: SUBSCRIPTION_PLAN_URL,
    };
    dispatch(getTraineeSubscriptionPlans(data)).then((res) => {
      if (res.type === "getTraineeSubscriptionPlans/fulfilled") {
        filterSubscriptionPackageData(res.payload.data);
      }
    });
  };

  const filterSubscriptionPackageData = (packageArray) => {
    const durationsPresent = packageArray.map((item) => item.duration);

    const requiredDurations = [1, 2, 3];
    const missingDurations = requiredDurations.filter(
      (duration) => !durationsPresent.includes(duration)
    );

    missingDurations.forEach((duration) => {
      const dummyPackage = {
        id: "",
        price: "",
        isDummy: true,
        duration: duration,
      };

      packageArray.push(dummyPackage);
    });

    packageArray.sort((a, b) => a.duration - b.duration);

    setSubscriptionData(packageArray);
  };

  const handleOnEdit = useCallback(
    (values, id) => {
      const data = {
        apiEndpoint: `${SUBSCRIPTION_PLAN_URL}${id}/`,
        requestData: JSON.stringify(values),
      };
      dispatch(editSubscriptionPlan(data)).then((res) => {
        if (res.type === "editSubscriptionPlan/fulfilled") {
          fetchServiceProviderSubscriptionPlan();
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const handleOnAdd = useCallback(
    (values) => {
      const data = {
        apiEndpoint: SUBSCRIPTION_PLAN_URL,
        requestData: JSON.stringify(values),
      };
      dispatch(createSubscriptionPlan(data)).then((res) => {
        if (res.type === "createSubscriptionPlan/fulfilled") {
          fetchServiceProviderSubscriptionPlan();
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  return (
    <Container fluid className={`vh-100 ${i18n.dir()}`}>
      {loading === "pending" && <LoadingScreen />}
      <Row className="justify-content-center align-items-center">
        <Col md={9} className="">
          <Card className="contentCard px-3 pt-5 bg-transparent">
            <Row className="">
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
                    <EditSubscriptionCard
                      id={item.id}
                      price={item.price}
                      isDummy={item?.isDummy}
                      duration={item.duration}
                      handleOnAdd={handleOnAdd}
                      handleOnEdit={handleOnEdit}
                      type={item?.membership_type}
                    />
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscription;
