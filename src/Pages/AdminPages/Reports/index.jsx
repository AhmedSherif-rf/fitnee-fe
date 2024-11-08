import moment from "moment";
import { Col, Row } from "reactstrap";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { ref, set } from "firebase/database";
import { useState, useCallback } from "react";
import Toaster from "../../../Shared/Toaster";
import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import {
  PER_PAGE_COUNT,
  ADMIN_REPORTS_LISTING_URL,
  TRAINEE_ROLE,
} from "../../../utils/constants";
import { getReportsListing } from "../../../Redux/features/Admin/Feedback/FeedbackApi";

const Report = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [reportData, setReportData] = useState([]);

  const { loading } = useSelector((state) => state.feedback);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const fetchReports = () => {
    const data = {
      apiEndpoint: `${ADMIN_REPORTS_LISTING_URL}?page=${page}`,
    };

    dispatch(getReportsListing(data)).then((res) => {
      if (res.type === "getReportsListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setReportData(res.payload.data.results);
      }
    });
  };

  const handleDeleteMessage = (message) => {
    const messageRef = ref(
      db,
      `GroupMessages/${message.messageTo}/${message.messageId}`
    );
    set(messageRef, { ...message, isDeleted: true })
      .then(() => Toaster.error("Message deleted"))
      .catch((error) => console.error("Error updating isDeleted:", error));
  };

  useEffect(() => {
    if (reportData.length > 0) {
      let reportArray = [];
      reportData.forEach((report) =>
        reportArray.push({
          reporter:
            report?.reporting_user?.role === TRAINEE_ROLE ? (
              <Link
                to={`/admin/traineeProviderProfile/${report?.reporting_user?.id}`}
              >
                <div className="d-md-flex align-items-center">
                  <div>
                    <div
                      className="bgProperties rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundImage:
                          report?.reporting_user?.profile_pic === null
                            ? `url(${Images.USER_DUMMY_IMG})`
                            : `url(${report?.reporting_user?.profile_pic})`,
                      }}
                    ></div>
                  </div>
                  <div className="tableResponsiveWidth">
                    <h6 className="text-secondary fw-bold mb-0">
                      {report?.reporting_user?.first_name}{" "}
                      {report?.reporting_user?.last_name}
                    </h6>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to={`/admin/serviceProviderProfile/${report?.reporting_user?.uuid}`}
              >
                <div className="d-md-flex align-items-center">
                  <div>
                    <div
                      className="bgProperties rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundImage:
                          report?.reporting_user?.profile_pic === null
                            ? `url(${Images.USER_DUMMY_IMG})`
                            : `url(${report?.reporting_user?.profile_pic})`,
                      }}
                    ></div>
                  </div>
                  <div className="tableResponsiveWidth">
                    <h6 className="text-secondary fw-bold mb-0">
                      {report?.reporting_user?.full_name}
                    </h6>
                  </div>
                </div>
              </Link>
            ),
          reported:
            report?.reported_user?.role !== TRAINEE_ROLE ? (
              <Link
                to={`/admin/serviceProviderProfile/${report?.reported_user?.uuid}`}
              >
                <div className="d-md-flex align-items-center">
                  <div className="">
                    <div
                      className="bgProperties rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundImage:
                          report?.reported_user?.profile_pic === null
                            ? `url(${Images.USER_DUMMY_IMG})`
                            : `url(${report?.reported_user?.profile_pic})`,
                      }}
                    ></div>
                  </div>
                  <div className="tableResponsiveWidth">
                    <h6 className="text-secondary fw-bold mb-0">
                      {report?.reported_user?.full_name}
                    </h6>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to={`/admin/traineeProviderProfile/${report?.reported_user?.id}`}
              >
                <div className="d-md-flex align-items-center">
                  <div className="">
                    <div
                      className="bgProperties rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundImage:
                          report?.reported_user?.profile_pic === null
                            ? `url(${Images.USER_DUMMY_IMG})`
                            : `url(${report?.reported_user?.profile_pic})`,
                      }}
                    ></div>
                  </div>
                  <div className="tableResponsiveWidth">
                    <h6 className="text-secondary fw-bold mb-0">
                      {report?.reported_user?.first_name}{" "}
                      {report?.reported_user?.last_name}
                    </h6>
                  </div>
                </div>
              </Link>
            ),
          report: (
            <p className="mb-0 tableResponsiveWidth">
              {report?.message}
            </p>
          ),
          type:
            report?.message_data !== null || report?.type === "message" ? (
              <>
                <p className="mb-0">FitNee Community</p>
                <p className="fw-bold">{report?.message_data?.messageText}</p>
              </>
            ) : (
              <p>Individual</p>
            ),
          date: moment(report?.created_on).format("DD/MM/YYYY"),
          action: report?.message_data !== null && (
            <p
              className="text-danger text-decoration-underline cursorPointer"
              onClick={() => handleDeleteMessage(report?.message_data)}
            >
              Delete Message
            </p>
          ),
        })
      );
      setTableData(reportArray);
    } else {
      setTableData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportData]);

  const columns = [
    { label: "Reporter User", dataKey: "reporter" },
    { label: "Reported User", dataKey: "reported" },
    { label: "Report", dataKey: "report", width: "30" },
    { label: "Type", dataKey: "type", align: "center" },
    { label: "Date", dataKey: "date", align: "center" },
    { label: "Action", dataKey: "action", align: "center" },
  ];

  return (
    <Row className="h-100">
      {loading === "pending" && <LoadingScreen />}
      <Col md={12}>
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0">
            <PageHeading headingText="Reports" categoryText="" />
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

export default Report;
