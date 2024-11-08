import moment from "moment";
import GoBack from "../GoBack";
import { db } from "../../../../firebase";
import ListingTable from "../ListingTable";
import { BsChatText } from "react-icons/bs";
import { useParams } from "react-router-dom";
import BarChart from "../../../Chart/Barchart";
import { useTranslation } from "react-i18next";
import DocumentCard from "../../../DocumentCard";
import { useSelector, useDispatch } from "react-redux";
import { onValue, ref, orderByChild } from "firebase/database";
import AvailableHourListing from "../../../AvailableHourListing";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import IndividualChatModal from "../../../Modal/IndividualChatModal";
import ProfileInformationCard from "../../../ProfileInformationCard";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import React, { memo, useState, useEffect, useCallback } from "react";
import { Row, Container, Col, Card, CardBody, Badge } from "reactstrap";
import {
  ADMIN_SERVICE_PROVIDER_BLOCK_UNBLOCK_URL,
  ADMIN_SERVICE_PROVIDER_PROFILE_URL,
  CURRENCY,
} from "../../../../utils/constants";
import { MdOutlinePersonOff, MdOutlinePersonOutline } from "react-icons/md";
import { userBlockUnblock } from "../../../../Redux/features/Admin/UserListing/userListingApi";
import { getServiceProviderDetail } from "../../../../Redux/features/Admin/ReviewRequest/ReviewRequestApi";

const ServiceProviderProfileWrapper = (props) => {
  const { uuid } = useParams();
  const { loading } = useSelector((state) => state.reviewRequest);
  const { loading: userListingLoading } = useSelector(
    (state) => state.userListing
  );

  const [messages, setMessages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [serviceProviderProfile, setServiceProviderProfile] = useState(null);
  const [
    serviceProviderPerformanceData,
    setServiceProviderPerformanceData,
  ] = useState({
    labels: [],
    datasets: [],
  });

  const serviceProviderPerformanceGraphOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Performance",
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");

  useEffect(() => {
    fetchServiceProviderProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, uuid]);

  const fetchServiceProviderProfile = () => {
    const data = {
      apiEndpoint: ADMIN_SERVICE_PROVIDER_PROFILE_URL.replace("userId", uuid),
    };

    dispatch(getServiceProviderDetail(data)).then((res) => {
      if (res.type === "getServiceProviderDetail/fulfilled") {
        setServiceProviderProfile(res?.payload?.data);
        populateServiceProviderPerformanceGraphData(res?.payload?.data);
      }
    });
  };

  const populateServiceProviderPerformanceGraphData = (data) => {
    const labels = data?.monthly_data?.map((item) => item.month);

    const traineeData = data?.monthly_data?.map((item) => item.trainee);
    const resubscriberData = data?.monthly_data?.map(
      (item) => item.resubscribe
    );

    setServiceProviderPerformanceData({
      labels,
      datasets: [
        {
          label: "Trainees",
          data: traineeData,
          backgroundColor: "#E3BD99",
          borderWidth: 2,
        },
        {
          label: "Resubscriber",
          data: resubscriberData,
          backgroundColor: "#97694F",
          borderWidth: 2,
        },
      ],
    });
  };

  const handleChatModalClose = useCallback(() => {
    setShowChatModal(false);
  }, []);

  const fetchChat = (traineeId, trainerId, recipient) => {
    const query = ref(
      db,
      `Messages/${trainerId}/${traineeId}`,
      orderByChild("messageTime")
    );

    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setMessages(data ? Object.values(data) : []);
    });

    setRecipient(recipient);
    setShowChatModal(true);
  };

  useEffect(() => {
    if (
      serviceProviderProfile &&
      serviceProviderProfile.active_subscriptions.length > 0
    ) {
      let subscriptionArray = [];

      serviceProviderProfile.active_subscriptions.forEach((membership) => {
        subscriptionArray.push({
          sp: (
            <div className="d-flex align-items-center">
              <div
                className="bgProperties rounded-circle me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundImage:
                    membership?.trainee?.profile_pic === null
                      ? `url(${Images.USER_DUMMY_IMG})`
                      : `url(${membership?.trainee?.profile_pic})`,
                }}
              ></div>
              <h6 className="text-secondary fw-bold mb-0">
                {membership?.trainee?.first_name}{" "}
                {membership?.trainee?.last_name}
              </h6>
            </div>
          ),
          price: (
            <p className="fw-bold mb-0">
              {CURRENCY} {membership?.transition?.current_price}
            </p>
          ),
          duration: (
            <p className="mb-0">{`${membership?.subscription?.duration} Months`}</p>
          ),
          Status: (
            <>
              {!membership?.is_expired && !membership?.is_refund && (
                <div className="mb-md-0 mb-2 BorderYellow text-center p-2 rounded-3">
                  <span>{`Start Date : ${moment(membership?.created_at).format(
                    "DD/MM/YYYY"
                  )}`}</span>
                  <br />
                  <span>{`End Date : ${moment(membership?.expire_date).format(
                    "DD/MM/YYYY"
                  )}`}</span>
                </div>
              )}
              {membership?.is_expired && !membership?.is_refund && (
                <div className="mb-md-0 mb-2 BorderYellow text-center p-2 rounded-3">
                  {`Expired On : ${moment(membership?.expire_date).format(
                    "DD/MM/YYYY"
                  )}`}
                </div>
              )}
              {membership?.is_refund && (
                <div className="mb-md-0 mb-2 BorderYellow text-center p-2 rounded-3">
                  Refunded
                </div>
              )}
            </>
          ),
          action: (
            <p
              className="mb-0 text-decoration-underline cursorPointer"
              onClick={() =>
                fetchChat(
                  membership?.trainee?.id,
                  serviceProviderProfile?.id,
                  membership?.trainee
                )
              }
            >
              <BsChatText size={25} />
            </p>
          ),
        });
      });

      setTableData(subscriptionArray);
    } else {
      setTableData([]);
    }
  }, [serviceProviderProfile]);

  const handleActionClick = (id) => {
    const data = {
      apiEndpoint: ADMIN_SERVICE_PROVIDER_BLOCK_UNBLOCK_URL.replace(
        "userId",
        id
      ),
    };
    dispatch(userBlockUnblock(data)).then((res) => {
      if (res.type === "userBlockUnblock/fulfilled") {
        fetchServiceProviderProfile();
      }
    });
  };

  const columns = [
    { label: "Trainee", dataKey: "sp" },
    {
      label: "Price",
      dataKey: "price",
      align: "center",
    },
    { label: "Duration", dataKey: "duration", align: "center" },
    { label: "Status", dataKey: "Status", align: "center" },
    { label: "Action", dataKey: "action", align: "center" },
  ];

  return (
    <Container fluid className="p-2">
      <GoBack />
      <Row className="tableBodyWrapperPagination py-2">
        {(loading === "pending" || userListingLoading === "pending") && (
          <LoadingScreen />
        )}
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
                      <div className="d-flex align-items-center gap-2">
                        <h3 className="fw-bold my-2">
                          {serviceProviderProfile?.full_name}
                        </h3>
                        {serviceProviderProfile?.is_fully_booked && (
                          <span>
                            <Badge
                              color="danger"
                              className="me-2 mb-1 text-white fw-normal custom-badge px-3 small text-center"
                            >
                              Fully Booked
                            </Badge>
                          </span>
                        )}
                      </div>
                      <div>
                        {!serviceProviderProfile?.is_deleted && (
                          <div className="d-flex align-items-center justify-content-md-center">
                            {!serviceProviderProfile?.is_blocked && (
                              <span
                                className={`iconBadge me-1`}
                                id={`userId_${serviceProviderProfile?.id}`}
                                onClick={() =>
                                  handleActionClick(serviceProviderProfile?.id)
                                }
                              >
                                <MdOutlinePersonOutline
                                  size={25}
                                  className={`cursorPointer ${
                                    serviceProviderProfile?.is_blocked === false
                                      ? "text-success"
                                      : ""
                                  }`}
                                />
                              </span>
                            )}

                            {serviceProviderProfile?.is_blocked && (
                              <span
                                className={`iconBadge me-1`}
                                id={`userId_${serviceProviderProfile?.id}`}
                                onClick={() =>
                                  handleActionClick(serviceProviderProfile?.id)
                                }
                              >
                                <MdOutlinePersonOff
                                  size={25}
                                  className={`cursorPointer ${
                                    serviceProviderProfile?.is_blocked === true
                                      ? ""
                                      : "text-danger"
                                  }`}
                                />
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="overflow-scroll onlyBorderRadius p-3 border border-light"
                      style={{ maxHeight: "100px" }}
                    >
                      <p className="small">{serviceProviderProfile?.bio}</p>
                    </div>

                    <Row>
                      <div className="lh-1 mt-4">
                        <h6 className="fw-bold">Phone Number</h6>
                        <p className="small">
                          {serviceProviderProfile?.phone_number}
                        </p>
                      </div>
                    </Row>

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
                    {serviceProviderProfile?.specialities.length > 0 && (
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
                    <Row className="mt-4">
                      <Col md={12} className="d-flex align-items-center gap-4">
                        <h5 className="fw-bold">Wallet Amount :</h5>
                        <h5 className="fw-bold">
                          {CURRENCY} {serviceProviderProfile?.current_wallet}
                        </h5>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={12} className="my-4">
                        <BarChart
                          data={serviceProviderPerformanceData}
                          options={serviceProviderPerformanceGraphOptions}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={12}>
                        <h5 className="fw-bold my-2">Subscriptions</h5>
                      </Col>
                      <Col md={12}>
                        <ListingTable data={tableData} columns={columns} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      <IndividualChatModal
        size={"lg"}
        TOneClassName={"mb-4 fs-5 text-center"}
        className={"p-4"}
        isOpen={showChatModal}
        onClose={handleChatModalClose}
        messages={messages}
        recipient={recipient}
      />
    </Container>
  );
};

export default memo(ServiceProviderProfileWrapper);
