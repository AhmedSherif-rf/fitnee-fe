import GoBack from "../GoBack";
import { useTranslation } from "react-i18next";
import DocumentCard from "../../../DocumentCard";
import { useSelector, useDispatch } from "react-redux";
import React, { memo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AvailableHourListing from "../../../AvailableHourListing";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import ProfileInformationCard from "../../../ProfileInformationCard";
import { BsFillPersonXFill, BsPersonCheckFill } from "react-icons/bs";
import { Row, Container, Col, Card, CardBody, Badge } from "reactstrap";
import {
  ADMIN_SERVICE_PROVIDER_PROFILE_URL,
  CURRENCY,
} from "../../../../utils/constants";
import {
  ADMIN_APPROVE_REVIEW_REQUEST_URL,
  ADMIN_REJECT_REVIEW_REQUEST_URL,
} from "../../../../utils/constants";
import {
  approveReviewRequest,
  rejectReviewRequest,
  getServiceProviderDetail,
} from "../../../../Redux/features/Admin/ReviewRequest/ReviewRequestApi";
import RejectionReasonModal from "../../../../Shared/Modal/RejectionReasonModal";

const ReviewRequestWrapper = (props) => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.reviewRequest);

  const [rejectedEmail, setRejectedEmail] = useState("");
  const [serviceProviderProfile, setServiceProviderProfile] = useState(null);
  const [showRejectionReasonModal, setShowRejectionReasonModal] = useState(
    false
  );

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");

  useEffect(() => {
    const data = {
      apiEndpoint: ADMIN_SERVICE_PROVIDER_PROFILE_URL.replace("userId", uuid),
    };

    dispatch(getServiceProviderDetail(data)).then((res) => {
      if (res.type === "getServiceProviderDetail/fulfilled") {
        setServiceProviderProfile(res.payload.data);
      }
    });
  }, [dispatch, uuid]);

  const handleApproveRequestClick = (email) => {
    const data = {
      apiEndpoint: ADMIN_APPROVE_REVIEW_REQUEST_URL,
      requestData: JSON.stringify({ email }),
    };

    dispatch(approveReviewRequest(data)).then((res) => {
      if (res.type === "approveReviewRequest/fulfilled") {
        navigate("/admin/reviewRequest");
      }
    });
  };

  const handleRejectRequestClick = (values) => {
    const data = {
      apiEndpoint: ADMIN_REJECT_REVIEW_REQUEST_URL,
      requestData: JSON.stringify({ ...values, email: rejectedEmail }),
    };

    dispatch(rejectReviewRequest(data)).then((res) => {
      if (res.type === "rejectReviewRequest/fulfilled") {
        setShowRejectionReasonModal(false);
        navigate("/admin/reviewRequest");
      }
    });
  };

  return (
    <Container fluid className="p-2">
      <GoBack />
      <Row className="tableBodyWrapperPagination py-2">
        {loading === "pending" && <LoadingScreen />}
        {serviceProviderProfile && (
          <Col md={12} className="text-start">
            <Row>
              <Col lg={3} md={4}>
                <ProfileInformationCard
                  providerProfile={serviceProviderProfile}
                />
                <div className="mt-2">
                  <h6 className="fw-bold text-dark">Available Hours</h6>
                  <AvailableHourListing
                    data={serviceProviderProfile?.profile_availability}
                  />
                </div>
              </Col>
              <Col lg={9} md={8}>
                <Card className="BorderRadius border-0 text-black-custom">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold my-2">
                          {serviceProviderProfile?.full_name}
                        </h3>
                      </div>
                      <div>
                        <span
                          className={`iconBadge px-2 cursorPointer`}
                          onClick={() => {
                            setRejectedEmail(serviceProviderProfile?.email);
                            setShowRejectionReasonModal(true);
                          }}
                        >
                          <BsFillPersonXFill
                            size={22}
                            className="rejectUser mb-1"
                          />
                        </span>
                        <span
                          className={`iconBadge px-2 cursorPointer`}
                          onClick={() =>
                            handleApproveRequestClick(
                              serviceProviderProfile?.email
                            )
                          }
                        >
                          <BsPersonCheckFill
                            size={22}
                            className="approveUser mb-1"
                          />
                        </span>
                      </div>
                    </div>
                    <div
                      className="overflow-scroll onlyBorderRadius p-3 border border-light"
                      style={{ maxHeight: "100px" }}
                    >
                      <p className="small">{serviceProviderProfile?.bio}</p>
                    </div>

                    <Row>
                      <Col md={12}>
                        <h5 className="fw-bold my-2">
                          {t("guest.qualificationExperienceText")}
                        </h5>
                      </Col>
                      {serviceProviderProfile?.ServiceProvider_Certification &&
                        serviceProviderProfile?.ServiceProvider_Certification?.map(
                          (certificate, index) => (
                            <DocumentCard
                              index={index}
                              className="BorderYellow"
                              documentTitle={certificate?.title}
                              documentImg={certificate?.certificate_image}
                            />
                          )
                        )}
                    </Row>
                    {serviceProviderProfile?.specialities?.length > 0 && (
                      <Row>
                        <Col md={12}>
                          <h5 className="fw-bold my-2">
                            {t("guest.areaSpecialtyText")}
                          </h5>
                          {serviceProviderProfile?.specialities &&
                            serviceProviderProfile?.specialities?.map(
                              (specialty, index) => (
                                <Badge
                                  key={index}
                                  color="custom"
                                  className="me-2 mb-2 text-black-custom fw-normal custom-badge px-3 small text-center"
                                >
                                  {i18n.dir() === "ltr"
                                    ? specialty.name
                                    : specialty.arabic_name}
                                </Badge>
                              )
                            )}
                        </Col>
                      </Row>
                    )}

                    {serviceProviderProfile?.profile_subscriptions && (
                      <Row>
                        <h5 className="fw-bold my-2">Subscription Plans</h5>
                        {serviceProviderProfile?.profile_subscriptions?.map(
                          (plan, index) => (
                            <Col md={4} key={index}>
                              <Card className="border-0">
                                <div className="d-flex justify-content-between align-items-center p-4 BorderRadius shadow-sm">
                                  <p className="mb-0">
                                    {plan?.duration} Months
                                  </p>
                                  <p className="mb-0 fw-bold">
                                    {CURRENCY} {plan?.price}
                                  </p>
                                </div>
                              </Card>
                            </Col>
                          )
                        )}
                      </Row>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <RejectionReasonModal
        size={"md"}
        className={"p-4"}
        isOpen={showRejectionReasonModal}
        heading={"Rejection Reason"}
        onClose={() => {
          setShowRejectionReasonModal(false);
        }}
        handleSubmit={handleRejectRequestClick}
      />
    </Container>
  );
};

export default memo(ReviewRequestWrapper);
