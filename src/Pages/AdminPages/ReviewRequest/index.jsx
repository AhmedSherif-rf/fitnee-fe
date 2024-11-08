import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import React, { useState, useEffect, useCallback } from "react";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { ADMIN_REVIEW_REQUEST_URL } from "../../../utils/constants";
import { BsFillPersonXFill, BsPersonCheckFill } from "react-icons/bs";
import RejectionReasonModal from "../../../Shared/Modal/RejectionReasonModal";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import {
  getReviewRequestListing,
  approveReviewRequest,
  rejectReviewRequest,
} from "../../../Redux/features/Admin/ReviewRequest/ReviewRequestApi";
import {
  ADMIN_APPROVE_REVIEW_REQUEST_URL,
  PER_PAGE_COUNT,
  ADMIN_REJECT_REVIEW_REQUEST_URL,
} from "../../../utils/constants";

const ReviewRequest = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [stcPayNumber, setStcPayNumber] = useState("");
  const [rejectedEmail, setRejectedEmail] = useState("");
  const [reviewRequests, setReviewRequests] = useState([]);
  const [showRejectionReasonModal, setShowRejectionReasonModal] =
    useState(false);
  const { loading } = useSelector((state) => state.reviewRequest);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchReviewRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, stcPayNumber]);

  const fetchReviewRequests = () => {
    const data = {
      apiEndpoint: `${ADMIN_REVIEW_REQUEST_URL}?page=${page}&stc_pay=${stcPayNumber}`,
    };

    dispatch(getReviewRequestListing(data)).then((res) => {
      if (res.type === "getReviewRequestListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setReviewRequests(res.payload.data.results);
      }
    });
  };

  const handleApproveRequestClick = (email) => {
    const data = {
      apiEndpoint: ADMIN_APPROVE_REVIEW_REQUEST_URL,
      requestData: JSON.stringify({ email }),
    };

    dispatch(approveReviewRequest(data)).then((res) => {
      if (res.type === "approveReviewRequest/fulfilled") {
        setPage(1);
        fetchReviewRequests();
      }
    });
  };

  const handleRejectRequestClick = useCallback(
    (values) => {
      const data = {
        apiEndpoint: ADMIN_REJECT_REVIEW_REQUEST_URL,
        requestData: JSON.stringify({ ...values, email: rejectedEmail }),
      };

      dispatch(rejectReviewRequest(data)).then((res) => {
        if (res.type === "rejectReviewRequest/fulfilled") {
          setPage(1);
          fetchReviewRequests();
          setShowRejectionReasonModal(false);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, rejectedEmail]
  );

  useEffect(() => {
    if (reviewRequests.length > 0) {
      let requestArray = [];
      reviewRequests.forEach((request) =>
        requestArray.push({
          full_name: (
            <Link to={`/admin/reviewRequestDetail/${request?.uuid}`}>
              <div className="d-md-flex align-items-center ">
                <div
                  className="bgProperties rounded-circle mb-2 me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundImage:
                      request?.profile_pic === null
                        ? `url(${Images.USER_DUMMY_IMG})`
                        : `url(${request?.profile_pic})`,
                  }}
                ></div>
                <div className="tableResponsiveWidth">
                  <h6 className="text-secondary fw-bold mb-0">
                    {request?.full_name}
                  </h6>
                </div>
              </div>
            </Link>
          ),
          role: request?.role,
          request_id: (
            <div className="fw-bold text-secondary">{request?.request_id}</div>
          ),
          email: request?.email,
          stc_pay: request?.stc_pay,
          action: (
            <div className="d-flex align-items-center justify-content-md-center">
              <span
                className={`iconBadge px-2 cursorPointer`}
                onClick={() => {
                  setRejectedEmail(request?.email);
                  setShowRejectionReasonModal(true);
                }}
              >
                <BsFillPersonXFill size={22} className="rejectUser mb-1" />
              </span>
              <span
                className={`iconBadge px-2 cursorPointer`}
                onClick={() => handleApproveRequestClick(request?.email)}
              >
                <BsPersonCheckFill size={22} className="approveUser mb-1" />
              </span>
            </div>
          ),
        })
      );
      setTableData(requestArray);
    } else {
      setTableData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewRequests]);

  const columns = [
    { label: "Full Name", dataKey: "full_name" },
    { label: "Role", dataKey: "role" },
    { label: "Ticket ID", dataKey: "request_id" },
    { label: "Email", dataKey: "email", align: "center" },
    { label: "STC Phone No", dataKey: "stc_pay", align: "center" },
    { label: "Action", dataKey: "action", align: "center" },
  ];

  return (
    <Row className="h-100">
      {loading === "pending" && <LoadingScreen />}
      <Col md={12}>
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0 p-0">
            <Row className="align-items-center px-2">
              <Col md={6}>
                <PageHeading headingText="Review Requests" categoryText="" />
              </Col>
              <Col md={6} className="mb-3 px-md-2 px-3 mt-2">
                <PhoneInput
                  inputProps={{
                    name: "stc_pay",
                    required: true,
                    className:
                      "form-control-lg w-100 py-3 px-4 mb-0 customPhoneInput border-0",
                  }}
                  country={"sa"}
                  value={stcPayNumber}
                  className="border ltr"
                  onChange={(value) => {
                    setPage(1);
                    setStcPayNumber(value);
                  }}
                />
              </Col>
            </Row>
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
    </Row>
  );
};

export default ReviewRequest;
