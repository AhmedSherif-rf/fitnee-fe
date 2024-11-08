import moment from "moment";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Rating from "../../../Shared/Rating";
import { useState, useCallback } from "react";
import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { BsFillPersonXFill, BsPersonCheckFill } from "react-icons/bs";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import {
  PER_PAGE_COUNT,
  ADMIN_SERVICE_PROVIDER_FEEDBACK_LISTING_URL,
  ADMIN_CHANGE_SERVICE_PROVIDER_FEEDBACK_STATUS_URL,
} from "../../../utils/constants";
import {
  getServiceProviderFeedbackListing,
  updateServiceProviderFeedbackStatus,
} from "../../../Redux/features/Admin/Feedback/FeedbackApi";

const ServiceProviderFeedback = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [spFeedback, setSpFeedback] = useState([]);

  const { loading } = useSelector((state) => state.feedback);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchPlatformFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const fetchPlatformFeedbacks = () => {
    const data = {
      apiEndpoint: `${ADMIN_SERVICE_PROVIDER_FEEDBACK_LISTING_URL}?page=${page}`,
    };

    dispatch(getServiceProviderFeedbackListing(data)).then((res) => {
      if (res.type === "getServiceProviderFeedbackListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setSpFeedback(res.payload.data.results);
      }
    });
  };

  const handleAction = useCallback(
    (id, status) => {
      const data = {
        apiEndpoint: ADMIN_CHANGE_SERVICE_PROVIDER_FEEDBACK_STATUS_URL.replace(
          "feedbackId",
          id
        ),
        requestData: JSON.stringify({
          status: status,
          rejection_reason: "anything",
        }),
      };

      dispatch(updateServiceProviderFeedbackStatus(data)).then((res) => {
        if (res.type === "updateServiceProviderFeedbackStatus/fulfilled") {
          setPage(1);
          fetchPlatformFeedbacks();
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  useEffect(() => {
    if (spFeedback.length > 0) {
      let feedbackArray = [];
      spFeedback.forEach((feedback) =>
        feedbackArray.push({
          reviewer: (
            <Link
              to={`/admin/traineeProviderProfile/${feedback?.reviewer?.id}`}
            >
              <div className="d-md-flex align-items-center">
                <div className="mb-2">
                  <div
                    className="bgProperties rounded-circle me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundImage:
                        feedback?.reviewer?.profile_pic === null
                          ? `url(${Images.USER_DUMMY_IMG})`
                          : `url(${feedback?.reviewer?.profile_pic})`,
                    }}
                  ></div>
                </div>
                <div className="tableResponsiveWidth">
                  <h6 className="text-secondary fw-bold mb-0">
                    {feedback?.reviewer?.first_name}{" "}
                    {feedback?.reviewer?.last_name}
                  </h6>
                </div>
              </div>
            </Link>
          ),
          serviceProvider: (
            <Link
              to={`/admin/serviceProviderProfile/${feedback?.service_provider?.uuid}`}
            >
              <div className="d-md-flex align-items-center">
                <div className="mb-2">
                  <div
                    className="bgProperties rounded-circle me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundImage:
                        feedback?.service_provider?.profile_pic === null
                          ? `url(${Images.USER_DUMMY_IMG})`
                          : `url(${feedback?.service_provider?.profile_pic})`,
                    }}
                  ></div>
                </div>
                <div className="tableResponsiveWidth">
                  <h6 className="text-secondary fw-bold mb-0">
                    {feedback?.service_provider?.full_name}
                  </h6>
                </div>
              </div>
            </Link>
          ),
          rating: <Rating rating={feedback?.sp_rating} />,
          message: (
            <div
              className="d-flex align-items-center"
              style={{ maxWidth: "200px" }}
            >
              <div className="mb-0 tableResponsiveWidth">
                {feedback?.sp_review}
              </div>
            </div>
          ),
          status: (
            <div className="d-flex align-items-center justify-content-center">
              <div
                className={`me-2 ${
                  feedback?.status === "rejected"
                    ? "bg-danger"
                    : feedback?.status === "approved"
                    ? "bg-success"
                    : "bg-warning"
                } rounded-circle`}
                style={{ minWidth: "8px", minHeight: "8px" }}
              ></div>
              <span>
                {feedback?.status === "rejected"
                  ? "Rejected"
                  : feedback?.status === "approved"
                  ? "Approved"
                  : "Pending"}
              </span>
            </div>
          ),
          date: moment(feedback?.created_on).format("DD/MM/YYYY"),
          action: (
            <div className="d-flex align-items-center justify-content-md-center">
              <span
                className={`iconBadge px-2 cursorPointer`}
                onClick={() => handleAction(feedback?.id, "rejected")}
              >
                <BsFillPersonXFill size={22} className="rejectUser mb-1" />
              </span>
              <span
                className={`iconBadge px-2 cursorPointer`}
                onClick={() => handleAction(feedback?.id, "approved")}
              >
                <BsPersonCheckFill size={22} className="approveUser mb-1" />
              </span>
            </div>
          ),
        })
      );
      setTableData(feedbackArray);
    } else {
      setTableData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spFeedback]);

  const columns = [
    { label: "Reviewer", dataKey: "reviewer" },
    { label: "Service Provider", dataKey: "serviceProvider" },
    { label: "Rating", dataKey: "rating", align: "center" },
    {
      label: "Feedback Message",
      dataKey: "message",
      align: "left",
    },
    { label: "Status", dataKey: "status", align: "center" },
    { label: "Date", dataKey: "date", align: "center" },
    { label: "Action", dataKey: "action", align: "center" },
  ];

  return (
    <Row className="h-100">
      {loading === "pending" && <LoadingScreen />}
      <Col md={12}>
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0 p-0">
            <PageHeading
              headingText="Service Provider Feedback"
              categoryText=""
            />
          </CardHeader>
          <CardBody className="tableBodyWrapperPagination p-md-2 p-0">
            <ListingTable data={tableData} columns={columns} />
          </CardBody>
          <CardFooter className="bg-transparent text-end pb-0 pt-2">
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
  );
};

export default ServiceProviderFeedback;
