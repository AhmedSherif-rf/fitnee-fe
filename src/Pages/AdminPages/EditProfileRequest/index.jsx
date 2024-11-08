import styles from "./style.module.scss";
import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PER_PAGE_COUNT } from "../../../utils/constants";
import PageHeading from "../../../Shared/Headings/PageHeading";
import React, { useState, useEffect, useCallback } from "react";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { BsFillPersonXFill, BsPersonCheckFill } from "react-icons/bs";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import {
  UPDATE_PROFILE_REQUEST_LISTING_URL,
  UPDATE_PROFILE_REQUEST_CHANGE_STATUS_URL,
} from "../../../utils/constants";
import {
  getEditProfileRequestListing,
  changeProfileUpdateRequestStatus,
} from "../../../Redux/features/Admin/EditProfileRequest/EditProfileRequestApi";

const EditProfileRequest = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [showFullImage, setShowFullImage] = useState(false);
  const [FullImage, setFullImage] = useState(false);
  const [editProfileRequests, setEditProfileRequests] = useState([]);
  const { loading } = useSelector((state) => state.EditProfileRequest);

  const handleToggleClick = (fullImage) => {
    setShowFullImage(!showFullImage);
    setFullImage(fullImage);
  };
  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchProfileUpdateRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchProfileUpdateRequests = () => {
    const data = {
      apiEndpoint: `${UPDATE_PROFILE_REQUEST_LISTING_URL}?page=${page}`,
    };

    dispatch(getEditProfileRequestListing(data)).then((res) => {
      if (res.type === "getEditProfileRequestListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setEditProfileRequests(res.payload.data.results);
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    const data = {
      apiEndpoint: UPDATE_PROFILE_REQUEST_CHANGE_STATUS_URL.replace(
        "requestId",
        id
      ),
      requestData: JSON.stringify({ request_status: status }),
    };

    dispatch(changeProfileUpdateRequestStatus(data)).then((res) => {
      if (res.type === "changeProfileUpdateRequestStatus/fulfilled") {
        setPage(1);
        fetchProfileUpdateRequests();
      }
    });
  };

  useEffect(() => {
    if (editProfileRequests.length > 0) {
      let requestArray = [];
      editProfileRequests.forEach((request) =>
        requestArray.push({
          name: (
            <div className="d-md-flex align-items-center">
              <div
                className="bgProperties rounded-circle me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundImage:
                    request.service_provider?.profile_pic === null
                      ? `url(${Images.USER_DUMMY_IMG})`
                      : `url(${request.service_provider?.profile_pic})`,
                }}
              ></div>
              <div className="tableResponsiveWidth">
                <h6 className="text-black-custom fw-bold mb-0">
                  {`${request.service_provider?.full_name}`}
                  <p className="mb-0 small fw-bold">{`(${request.service_provider?.role})`}</p>
                </h6>
              </div>
            </div>
          ),
          license: request?.license,
          stc_pay: request?.stc_pay,
          saudireps_number: request?.saudireps_number,
          certificate: (
            <div
              className="d-md-flex gap-1 overflow-hidden"
              style={{ maxWidth: "160px" }}
            >
              {request &&
                request.certificate &&
                request.certificate.map((certificate, index) => (
                  <div
                    key={index}
                    className="bgProperties border-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundImage: `url(${certificate.certificate_image})`,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleToggleClick(certificate.certificate_image)
                    }
                  />
                ))}
              {showFullImage && (
                <div className={styles.fullImageOverlay} onClick="">
                  <img src={showFullImage} alt="" />
                </div>
              )}
            </div>
          ),

          request_status: (
            <div className="d-flex align-items-center justify-content-center">
              <div
                className={`me-2 ${
                  request?.request_status === "Pending"
                    ? "bg-warning"
                    : request?.request_status === "Declined"
                    ? "bg-danger"
                    : "bg-success"
                } rounded-circle`}
                style={{ minWidth: "8px", minHeight: "8px" }}
              ></div>
              <span>{request?.request_status}</span>
            </div>
          ),
          action: (
            <div className="d-flex align-items-center justify-content-md-center">
              <span
                className={`iconBadge px-2 cursorPointer`}
                onClick={() => handleChangeStatus(request?.id, "Declined")}
              >
                <BsFillPersonXFill size={22} className="rejectUser mb-1" />
              </span>
              <span
                className={`iconBadge px-2 cursorPointer`}
                onClick={() => handleChangeStatus(request?.id, "Approved")}
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
  }, [editProfileRequests]);

  const columns = [
    { label: "Name", dataKey: "name" },
    { label: "License Number", dataKey: "license" },
    { label: "STC Phone No", dataKey: "stc_pay" },
    { label: "Saudireps Number", dataKey: "saudireps_number" },
    { label: "Certificates", dataKey: "certificate" },
    { label: "Status", dataKey: "request_status", align: "center" },
    { label: "Action", dataKey: "action", align: "center" },
  ];

  return (
    <Row className="h-100">
      {loading === "pending" && <LoadingScreen />}
      <Col md={12}>
        <Card className="border-0 h-100 text-start ">
          <CardHeader className="bg-transparent border-0 p-0">
            <PageHeading headingText="Edit Profile Requests" categoryText="" />
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
      {showFullImage && (
        <div
          className={` ${styles.fullImageOverlay}`}
          onClick={handleToggleClick}
        >
          <img src={FullImage} alt="" />
        </div>
      )}
    </Row>
  );
};

export default EditProfileRequest;
