import moment from "moment";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Rating from "../../../Shared/Rating";
import { useState, useCallback } from "react";
import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "../../../Shared/ToggleSwitch";
import PageHeading from "../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import {
  PER_PAGE_COUNT,
  ADMIN_PLATFORM_FEEDBACK_LISTING_URL,
  ADMIN_CHANGE_PLATFORM_FEEDBACK_STATUS_URL,
} from "../../../utils/constants";
import {
  getPlatformFeedbackListing,
  updatePlatformFeedbackStatus,
} from "../../../Redux/features/Admin/Feedback/FeedbackApi";

const PlatformFeedback = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [platformFeedback, setPlatformFeedback] = useState([]);

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
      apiEndpoint: `${ADMIN_PLATFORM_FEEDBACK_LISTING_URL}?page=${page}`,
    };

    dispatch(getPlatformFeedbackListing(data)).then((res) => {
      if (res.type === "getPlatformFeedbackListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setPlatformFeedback(res.payload.data.results);
      }
    });
  };

  const handleToggle = useCallback(
    (id, status) => {
      const data = {
        apiEndpoint: ADMIN_CHANGE_PLATFORM_FEEDBACK_STATUS_URL.replace(
          "feedbackId",
          id
        ),
        requestData: JSON.stringify({
          status: status === "approved" ? "rejected" : "approved",
          rejection_reason: "anything",
        }),
      };

      dispatch(updatePlatformFeedbackStatus(data)).then((res) => {
        if (res.type === "updatePlatformFeedbackStatus/fulfilled") {
          setPage(1);
          fetchPlatformFeedbacks();
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  useEffect(() => {
    if (platformFeedback.length > 0) {
      let feedbackArray = [];
      platformFeedback.forEach((feedback) =>
        feedbackArray.push({
          reviewer: (
            <Link
              to={`/admin/traineeProviderProfile/${feedback?.reviewer?.id}`}
            >
              <div className="d-md-flex align-items-center">
                <div
                  className="bgProperties rounded-circle me-2 mb-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundImage:
                      feedback?.reviewer?.profile_pic === null
                        ? `url(${Images.USER_DUMMY_IMG})`
                        : `url(${feedback?.reviewer?.profile_pic})`,
                  }}
                ></div>
                <div className="tableResponsiveWidth">
                  <h6 className="text-secondary fw-bold mb-0">
                    {feedback?.reviewer?.first_name}{" "}
                    {feedback?.reviewer?.last_name}
                  </h6>
                </div>
              </div>
            </Link>
          ),
          rating: <Rating rating={feedback?.platform_rating} />,
          message: (
            <div className="mb-0 messageWidth">
              {feedback?.platform_review}
            </div>
          ),
          date: moment(feedback?.created_on).format("DD/MM/YYYY"),
          publish: (
            <div className="d-flex align-items-center justify-content-md-center">
              <ToggleSwitch
                id={`feedback_${feedback?.id}`}
                isOn={feedback?.status === "approved" ? true : false}
                handleToggle={() =>
                  handleToggle(feedback?.id, feedback?.status)
                }
              />
            </div>
          ),
        })
      );
      setTableData(feedbackArray);
    } else {
      setTableData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platformFeedback]);

  const columns = [
    { label: "Reviewer", dataKey: "reviewer" },
    { label: "Rating", dataKey: "rating", align: "center" },
    {
      label: "Feedback Message",
      dataKey: "message",
      align: "left",
    },

    { label: "Date", dataKey: "date", align: "center" },
    { label: "Publish / UnPublish", dataKey: "publish", align: "center" },
  ];

  return (
    <Row className="h-100">
      {loading === "pending" && <LoadingScreen />}
      <Col md={12}>
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0">
            <PageHeading headingText="Platform Feedback" categoryText="" />
          </CardHeader>
          <CardBody className="tableBodyWrapperPagination p-md-3 p-0">
            <ListingTable data={tableData} columns={columns} />
          </CardBody>
          <CardFooter className="bg-transparent text-end p-0">
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

export default PlatformFeedback;
