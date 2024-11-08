import moment from "moment";
import GoBack from "../GoBack";
import { db } from "../../../../firebase";
import ListingTable from "../ListingTable";
import { BsChatText } from "react-icons/bs";
import { useParams } from "react-router-dom";
import BarChart from "../../../Chart/Barchart";
import { useSelector, useDispatch } from "react-redux";
import { onValue, ref, orderByChild } from "firebase/database";
import { Row, Container, Col, Card, CardBody } from "reactstrap";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import ProfileInformationCard from "../../../ProfileInformationCard";
import IndividualChatModal from "../../../Modal/IndividualChatModal";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import {
  getTraineeDetail,
  userBlockUnblock,
} from "../../../../Redux/features/Admin/UserListing/userListingApi";
import React, { memo, useState, useEffect, useCallback } from "react";
import {
  ADMIN_SERVICE_PROVIDER_BLOCK_UNBLOCK_URL,
  ADMIN_TRAINEE_PROFILE_URL,
  CURRENCY,
} from "../../../../utils/constants";
import { MdOutlinePersonOff, MdOutlinePersonOutline } from "react-icons/md";

const TraineeProfileWrapper = (props) => {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.userListing);

  const [messages, setMessages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [traineeProfile, setTraineeProfile] = useState(null);
  const [traineeSubscriptionData, setTraineeSubscriptionData] = useState({
    labels: [],
    datasets: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTraineeProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const fetchTraineeProfile = () => {
    const data = {
      apiEndpoint: ADMIN_TRAINEE_PROFILE_URL.replace("userId", id),
    };

    dispatch(getTraineeDetail(data)).then((res) => {
      if (res.type === "getTraineeDetail/fulfilled") {
        setTraineeProfile({ ...res.payload.data, role: "Trainee" });
        populateTraineeSubscriptionsGraphData(res.payload.data);
      }
    });
  };

  const populateTraineeSubscriptionsGraphData = (data) => {
    const labels = data?.monthly_data?.map((item) => item.month);

    const bothData = data?.monthly_data?.map((item) => item.both);

    const trainersData = data?.monthly_data?.map((item) => item.trainer);

    const nutritionistsData = data?.monthly_data?.map(
      (item) => item.nutritionist
    );

    const exercisesData = data?.monthly_data?.map((item) => item.exercise);

    setTraineeSubscriptionData({
      labels,
      datasets: [
        {
          label: "Both",
          data: bothData,
          backgroundColor: "#E3BD99",
          borderWidth: 2,
          stack: "Stack 0",
        },
        {
          label: "Trainers",
          data: trainersData,
          backgroundColor: "#BB99E3",
          borderWidth: 2,
          stack: "Stack 0",
        },
        {
          label: "Nutritionists",
          data: nutritionistsData,
          backgroundColor: "#9BE3BD",
          borderWidth: 2,
          stack: "Stack 0",
        },
        {
          label: "Exercises",
          data: exercisesData,
          backgroundColor: "rgba(18, 55, 45, 0.8)",
          borderWidth: 2,
          stack: "Stack 1",
        },
      ],
    });
  };

  useEffect(() => {
    if (traineeProfile && traineeProfile.membership.length > 0) {
      let subscriptionArray = [];

      traineeProfile.membership.forEach((membership) => {
        subscriptionArray.push({
          sp: (
            <div className="d-flex align-items-center">
              <div
                className="bgProperties rounded-circle me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundImage:
                    membership?.serviceprovider?.profile_pic === null
                      ? `url(${Images.USER_DUMMY_IMG})`
                      : `url(${membership?.serviceprovider?.profile_pic})`,
                }}
              ></div>
              <h6 className="text-secondary fw-bold mb-0">
                {membership?.serviceprovider?.full_name}
              </h6>
            </div>
          ),
          price: (
            <p className="fw-bold mb-0">
              {CURRENCY} {membership?.transition?.total_amount}
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
                  id,
                  membership?.serviceprovider?.id,
                  membership?.serviceprovider
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
  }, [id, traineeProfile]);

  const fetchChat = (traineeId, trainerId, recipient) => {
    const query = ref(
      db,
      `Messages/${traineeId}/${trainerId}`,
      orderByChild("messageTime")
    );

    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setMessages(data ? Object.values(data) : []);
    });

    setRecipient(recipient);
    setShowChatModal(true);
  };

  const handleChatModalClose = useCallback(() => {
    setShowChatModal(false);
  }, []);

  const handleActionClick = (id) => {
    const data = {
      apiEndpoint: ADMIN_SERVICE_PROVIDER_BLOCK_UNBLOCK_URL.replace(
        "userId",
        id
      ),
    };
    dispatch(userBlockUnblock(data)).then((res) => {
      if (res.type === "userBlockUnblock/fulfilled") {
        fetchTraineeProfile();
      }
    });
  };

  const columns = [
    { label: "Service Provider", dataKey: "sp" },
    {
      label: "Price",
      dataKey: "price",
      align: "center",
    },
    { label: "Duration", dataKey: "duration", align: "center" },
    { label: "Status", dataKey: "Status", align: "center" },
    { label: "Action", dataKey: "action", align: "center" },
  ];

  const traineeSubscriptionsGraphOptions = {
    responsive: true,
    type: "bar",
    plugins: {
      title: {
        display: true,
        text: "Trainee Subscriptions",
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Container fluid className="p-2">
      <GoBack />
      <Row className="tableBodyWrapperPagination py-2">
        {loading === "pending" && <LoadingScreen />}
        {traineeProfile && (
          <Col md={12} className="text-start">
            <Row>
              <Col lg={3} md={4}>
                <ProfileInformationCard providerProfile={traineeProfile} />
              </Col>
              <Col lg={9} md={8}>
                <Card className="BorderRadius border-0 text-black-custom">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold my-2">
                          {traineeProfile?.first_name}{" "}
                          {traineeProfile?.last_name}
                        </h3>
                      </div>
                      <div>
                        {!traineeProfile?.is_deleted && (
                          <div className="d-flex align-items-center justify-content-md-center">
                            {!traineeProfile?.is_blocked && (
                              <span
                                className={`iconBadge me-1`}
                                id={`userId_${traineeProfile?.id}`}
                                onClick={() =>
                                  handleActionClick(traineeProfile?.id)
                                }
                              >
                                <MdOutlinePersonOutline
                                  size={25}
                                  className={`cursorPointer ${
                                    traineeProfile?.is_blocked === false
                                      ? "text-success"
                                      : ""
                                  }`}
                                />
                              </span>
                            )}

                            {traineeProfile?.is_blocked && (
                              <span
                                className={`iconBadge me-1`}
                                id={`userId_${traineeProfile?.id}`}
                                onClick={() =>
                                  handleActionClick(traineeProfile?.id)
                                }
                              >
                                <MdOutlinePersonOff
                                  size={25}
                                  className={`cursorPointer ${
                                    traineeProfile?.is_blocked === true
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
                    <div className="lh-1 mt-2">
                      <h6 className="fw-bold">Gender</h6>
                      <p className="small">{traineeProfile?.gender}</p>
                    </div>
                    <div className="lh-1 mt-2">
                      <h6 className="fw-bold">Phone Number</h6>
                      <p className="small">{traineeProfile?.phone_number}</p>
                    </div>
                    <div className="lh-1 mt-2">
                      <h6 className="fw-bold">Date of Birth</h6>
                      <p className="small">
                        {moment(traineeProfile?.date_of_birth).format(
                          "MMMM Do YYYY"
                        )}
                      </p>
                    </div>

                    {traineeProfile?.body_images !== null &&
                      traineeProfile?.body_images !== "" && (
                        <Row>
                          <Col md={12}>
                            <h5 className="fw-bold my-2">InBody</h5>
                          </Col>
                          <Col md={4}>
                            <img
                              src={traineeProfile?.body_images}
                              alt="body_images"
                              className="uploaded-image BorderRadius"
                              style={{
                                width: "100%",
                                height: "170px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                          </Col>
                        </Row>
                      )}
                    <Row className="mt-4">
                      <Col md={12} className="d-flex align-items-center gap-4">
                        <h5 className="fw-bold">Wallet Amount :</h5>
                        <h5 className="fw-bold">
                          {CURRENCY} {traineeProfile?.current_wallet}
                        </h5>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={12} className="my-4">
                        <BarChart
                          data={traineeSubscriptionData}
                          options={traineeSubscriptionsGraphOptions}
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

export default memo(TraineeProfileWrapper);
