import CommentCard from "../CommentCard";
import DocumentCard from "../DocumentCard";
import OutlineBtn from "../Buttons/OutlineBtn";
import { useTranslation } from "react-i18next";
import FillBtn from "../../Shared/Buttons/FillBtn";
import { useSelector, useDispatch } from "react-redux";
import AvailableHourList from "../AvailableHourListing";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import ProfileInformationCard from "../ProfileInformationCard";
import Images from "../../HelperMethods/Constants/ImgConstants";
import React, { useCallback, memo, useState, useEffect } from "react";
import { Row, Col, Container, Card, CardBody, Badge } from "reactstrap";
import { getServiceProviderProfile } from "../../Redux/features/Guest/guestApi";
import { getServiceProviderFeedbacks } from "../../Redux/features/User/userApi";
import { setServiceProvider } from "../../Redux/features/Subscription/subscriptionSlice";
import {
  GUEST_SERVICE_PROVIDER_PROFILE_URL,
  GET_SERVICE_PROVIDER_COMMENTS_URL,
  NUTRITIONIST_ROLE,
  TRAINER_ROLE,
} from "../../utils/constants";

const ServiceProviderProfileWrapper = (props) => {
  const { uuid, id, role, userRole } = useParams();
  const { subscriptionLink } = props;
  const { loading } = useSelector((state) => state.guest);
  const { loading: userLoading } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [commentData, setCommentData] = useState([]);
  const [hasNextComment, setHasNextComment] = useState(true);
  const [serviceProviderProfile, setServiceProviderProfile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("");

  useEffect(() => {
    const data = {
      apiEndpoint: `${GUEST_SERVICE_PROVIDER_PROFILE_URL}?uuid=${uuid}`,
    };

    dispatch(getServiceProviderProfile(data)).then((res) => {
      if (res.type === "getServiceProviderProfile/fulfilled") {
        setServiceProviderProfile(res.payload.data[0]);
        fetchServiceProviderComments();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, uuid]);

  const fetchServiceProviderComments = useCallback(() => {
    if (hasNextComment) {
      const data = {
        apiEndpoint: `${GET_SERVICE_PROVIDER_COMMENTS_URL}?page_size=4&page=${page}`.replace(
          "serviceProviderId",
          id
        ),
      };

      dispatch(getServiceProviderFeedbacks(data)).then((res) => {
        if (res.type === "getServiceProviderFeedbacks/fulfilled") {
          setPage(page + 1);
          setHasNextComment(res.payload.data.next);
          setCommentData([...commentData, ...res.payload.data.results]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentData, dispatch, hasNextComment, id]);

  const handleSubscribeClick = useCallback(() => {
    dispatch(setServiceProvider({ ...serviceProviderProfile, role }));
    navigate(`${subscriptionLink}/${uuid}`);
  }, [
    dispatch,
    navigate,
    role,
    serviceProviderProfile,
    subscriptionLink,
    uuid,
  ]);

  return (
    <Container fluid className={i18n.dir()}>
      {(loading === "pending" || userLoading === "pending") && (
        <LoadingScreen />
      )}
      {serviceProviderProfile ? (
        <Row>
          <Col md={12}>
            <Card className="contentCard bg-transparent overflow-x-hidden">
              <Row>
                <Col lg={3} md={4}>
                  <div className="mb-2">
                    <ProfileInformationCard
                      providerProfile={serviceProviderProfile}
                    />
                  </div>
                  <div className="mb-3">
                    {serviceProviderProfile?.is_fully_booked ? (
                      <OutlineBtn
                        className="w-100 py-2"
                        text={t("trainer.fullyBookedText")}
                      />
                    ) : !serviceProviderProfile?.serviceprovider_available ? (
                      <OutlineBtn
                        className="w-100 py-2"
                        text={t("trainer.alreadySubscribedText")}
                      />
                    ) : (
                      <FillBtn
                        className="w-100 py-2"
                        text={t("guest.subscribeText")}
                        handleOnClick={handleSubscribeClick}
                      />
                    )}
                  </div>
                  <div>
                    <h6 className="fw-bold text-white">
                      {t("guest.availableHoursText")}
                    </h6>
                    <AvailableHourList
                      data={serviceProviderProfile?.profile_availability}
                    />
                  </div>
                </Col>
                <Col lg={9} md={8}>
                  <Card className="BorderRadius border-0 text-black-custom">
                    <CardBody>
                      <Row>
                        <Col md={12}>
                          <h5 className="fw-bold my-2">
                            {t("guest.providedServicesText")}
                          </h5>
                          <Badge
                            color="custom"
                            className="me-2 mb-2 text-black-custom fw-normal custom-badge px-3 small text-center"
                          >
                            {userRole === TRAINER_ROLE.toLowerCase()
                              ? t("guest.trainerTagText")
                              : userRole === NUTRITIONIST_ROLE.toLowerCase()
                              ? t("registerAs.nutritionistText")
                              : t("guest.bothTagText")}
                          </Badge>
                        </Col>
                      </Row>
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
                                key={index}
                                className="BorderYellow"
                                documentTitle={certificate?.title}
                                documentImg={certificate?.certificate_image}
                              />
                            )
                          )}
                      </Row>
                      {serviceProviderProfile?.specialities &&
                        serviceProviderProfile?.specialities.length > 0 && (
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

                      <Row>
                        {commentData.length > 0 && (
                          <>
                            <Col md={12}>
                              <h5 className="fw-bold mt-3 text-black-custom">
                                {t("guest.commentsText")}
                              </h5>
                              {commentData.map((item, index) => {
                                return (
                                  <CommentCard
                                    key={index}
                                    index={index}
                                    data={item}
                                  />
                                );
                              })}
                            </Col>
                            {hasNextComment && (
                              <Col md={12}>
                                <div className="text-center">
                                  <FillBtn
                                    className="py-2"
                                    text={t("guest.seeMoreText")}
                                    disabled={hasNextComment ? false : true}
                                    handleOnClick={fetchServiceProviderComments}
                                  />
                                </div>
                              </Col>
                            )}
                          </>
                        )}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          {loading !== "pending" && (
            <img
              className="img-fluid"
              src={Images.NO_DATA_FOUND_IMG}
              alt="no-data-found"
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default memo(ServiceProviderProfileWrapper);
