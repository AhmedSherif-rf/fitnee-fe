import { useTranslation } from "react-i18next";
import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import React, { useState, useCallback, useEffect } from "react";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import SubscriptionDetailRow from "../../../Shared/SubscriptionDetailRow";
import { PER_PAGE_COUNT, MEMBERSHIP_URL } from "../../../utils/constants";
import { getMyServiceProviders } from "../../../Redux/features/User/userApi";
import { Card, CardBody, CardFooter, Col, Container, Row } from "reactstrap";

const Index = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { loading } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState([]);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  const handleRefreshData = useCallback(() => {
    setPage(1);
    fetchSubscriptionsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSubscriptionsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const fetchSubscriptionsData = () => {
    const data = {
      apiEndpoint: `${MEMBERSHIP_URL}?page=${page}`,
    };

    dispatch(getMyServiceProviders(data)).then((res) => {
      if (res.type === "getMyServiceProviders/fulfilled") {
        setSizePages(res.payload.data.count);
        setSubscriptionData(res.payload.data.results);
      }
    });
  };

  return (
    <Container fluid className="">
      {loading === "pending" && <LoadingScreen />}
      <Row>
        <Col md={12}>
          <Card className="BorderRadius contentCard px-3">
            <CardBody className={`px-md-4 ${i18n.dir()}`}>
              <Row>
                <Col md={12}>
                  <PageHeading
                    headingText={t(
                      "traineeSubscriptionDetail.subscriptionDetailsText"
                    )}
                    categoryText=""
                  />
                </Col>
              </Row>
              <Row className="align-items-center justify-content-center d-md-flex d-none text-black-custom border-bottom py-2 mb-2">
                <Col md={2} className="mb-md-0 mb-2">
                  <div>
                    <h6
                      className={`mb-0 w-100 fs-5 fw-bold ${
                        i18n.dir() === "ltr" ? "text-start" : "text-end"
                      }`}
                    >
                      {t("traineeSubscriptionDetail.nameText")}
                    </h6>
                  </div>
                </Col>
                <Col md={2} className="mb-md-0 mb-2  text-center">
                  <h6 className="mb-0 w-100 fs-5 fw-bold">
                    {t("traineeSubscriptionDetail.durationText")}
                  </h6>
                </Col>

                <Col md={3} className="d-md-block d-none text-center">
                  <div className="mb-md-0 py-2">
                    <h6 className="mb-0 w-100 fs-5 fw-bold">
                      {t("traineeSubscriptionDetail.feeText")}
                    </h6>
                  </div>
                </Col>

                <Col md={3}>
                  <div className=" text-center pe-4">
                    <h6 className="mb-0 w-100 fs-5 fw-bold">
                      {t("traineeSubscriptionDetail.actionText")}
                    </h6>
                  </div>
                </Col>
              </Row>
              {subscriptionData?.map((data, index) => {
                return (
                  <SubscriptionDetailRow
                    data={data}
                    index={index}
                    key={index}
                    handleRefreshData={handleRefreshData}
                  />
                );
              })}
              {subscriptionData.length <= 0 && (
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
