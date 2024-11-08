import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Shared/Pagination";
import FillBtn from "../../../Shared/Buttons/FillBtn";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import React, { useState, useCallback, useEffect } from "react";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import ServiceProvider from "../../../Shared/ServiceProviderListRow";
import {
  PER_PAGE_COUNT,
  MEMBERSHIP_URL,
  TRAINER_ROLE,
} from "../../../utils/constants";
import { getMyServiceProviders } from "../../../Redux/features/User/userApi";
import { Card, CardBody, CardFooter, Col, Container, Row } from "reactstrap";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("");
  const { loading } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [trainersData, setTrainersData] = useState([]);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchTrainersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const fetchTrainersData = () => {
    const data = {
      apiEndpoint: `${MEMBERSHIP_URL}?role=${TRAINER_ROLE}&page=${page}`,
    };

    dispatch(getMyServiceProviders(data)).then((res) => {
      if (res.type === "getMyServiceProviders/fulfilled") {
        setSizePages(res.payload.data.count);
        setTrainersData(res.payload.data.results);
      }
    });
  };

  const handleAllServiceProviderClick = useCallback(() => {
    navigate("/trainee/allServiceProvider/trainer");
  }, [navigate]);

  return (
    <Container fluid>
      {loading === "pending" && <LoadingScreen />}
      <FillBtn
        className={`mb-2 py-2 ${
          i18n.dir() === "ltr"
            ? "allServiceProvidersFloatingBtnRight"
            : "allServiceProvidersFloatingBtnLeft"
        }`}
        text={t("traineeDashboard.trainerListText")}
        handleOnClick={handleAllServiceProviderClick}
      />
      <Row>
        <Col md={12}>
          <Card className="BorderRadius contentCard border-0">
            <CardBody className={`${i18n.dir()} px-4`}>
              <Row>
                <Col md={12}>
                  <PageHeading
                    headingText={t(
                      "traineeServiceProviderList.myCurrentTrainerText"
                    )}
                    categoryText=""
                  />
                </Col>
              </Row>
              <Row className="align-items-center text-black-custom justify-content-center   d-md-flex d-none border-bottom text-black-custom py-2 mb-2">
                <Col md={3} className="mb-md-0 mb-2">
                  <div className="px-5">
                    <h6 className="mb-0 fw-bold ">
                      {t("traineeServiceProviderList.nameText")}
                    </h6>
                  </div>
                </Col>
                <Col md={2}>
                  <div className="fw-bold text-center p-2 rounded-3">
                    <h6 className="mb-0 fw-bold ">
                      {t("traineeServiceProviderList.durationText")}
                    </h6>
                  </div>
                </Col>

                <Col md={2}>
                  <div className="fw-bold text-center p-2 rounded-3">
                    <h6 className="mb-0 fw-bold ">
                      {t("traineeServiceProviderList.priceText")}
                    </h6>
                  </div>
                </Col>
                <Col md={4}>
                  <Row className="align-items-center h-100 ">
                    <Col md={12} xs={12} className="text-center">
                      <div className="p-2 rounded-3 d-md-flex d-block align-items-center justify-content-center">
                        <div className="d-flex align-items-center justify-content-center">
                          <h6 className="mb-0 fw-bold">
                            {t("traineeServiceProviderList.startDateText")}
                          </h6>
                          <span className="mb-0 mx-1"> - </span>
                          <h6 className="mb-0 fw-bold">
                            {t("traineeServiceProviderList.endDateText")}
                          </h6>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {trainersData?.map((data, index) => {
                if (
                  !data?.is_expired &&
                  !data?.is_refund &&
                  !data?.have_exercise_subscription
                ) {
                  return (
                    <ServiceProvider key={index} data={data} index={index} />
                  );
                }
                return null;
              })}
              {trainersData.length <= 0 && (
                <div className="d-flex justify-content-center py-4 text-black-custom">
                  {t("messages.noDataFoundText")}
                </div>
              )}
            </CardBody>
            <CardFooter>
              {totalSize > PER_PAGE_COUNT && (
                <Pagination
                  size={totalSize}
                  handlePageChange={handlePageChange}
                  page={page}
                />
              )}
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
