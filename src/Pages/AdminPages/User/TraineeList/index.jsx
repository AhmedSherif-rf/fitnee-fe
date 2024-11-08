import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useState, useCallback } from "react";
import Pagination from "../../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import { MdOutlinePersonOff, MdOutlinePersonOutline } from "react-icons/md";
import ListingTable from "../../../../Shared/AdminShared/Components/ListingTable";
import {
  ADMIN_TRAINEE_LISTING_URL,
  ADMIN_SERVICE_PROVIDER_BLOCK_UNBLOCK_URL,
  PER_PAGE_COUNT,
} from "../../../../utils/constants";
import {
  getTraineeListing,
  userBlockUnblock,
} from "../../../../Redux/features/Admin/UserListing/userListingApi";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";

const TraineeList = (props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userListing);

  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [traineesData, setTraineesData] = useState(null);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchTraineeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, phoneNumber, page]);

  const fetchTraineeList = () => {
    const data = {
      apiEndpoint: `${ADMIN_TRAINEE_LISTING_URL}?page=${page}&phone_number=${phoneNumber}`,
    };

    dispatch(getTraineeListing(data)).then((res) => {
      if (res.type === "getTraineeListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setTraineesData(res.payload.data.results);
      }
    });
  };

  const handleActionClick = (id) => {
    const data = {
      apiEndpoint: ADMIN_SERVICE_PROVIDER_BLOCK_UNBLOCK_URL.replace(
        "userId",
        id
      ),
    };
    dispatch(userBlockUnblock(data)).then((res) => {
      if (res.type === "userBlockUnblock/fulfilled") {
        fetchTraineeList();
      }
    });
  };

  useEffect(() => {
    if (traineesData && traineesData.length > 0) {
      let traineeListArray = [];

      traineesData.forEach((trainee) => {
        traineeListArray.push({
          name: (
            <Link to={`/admin/traineeProviderProfile/${trainee?.id}`}>
              <div className="d-md-flex align-items-center">
                <div
                  className="bgProperties rounded-circle me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundImage:
                      trainee?.profile_pic === null
                        ? `url(${Images.USER_DUMMY_IMG})`
                        : `url(${trainee?.profile_pic})`,
                  }}
                ></div>
                <div className="tableResponsiveWidth">
                  <h6 className="text-secondary fw-bold mb-0">
                    {`${trainee?.first_name} ${trainee?.last_name}`}
                  </h6>
                </div>
              </div>
            </Link>
          ),
          role: trainee?.role,
          email: (
            <p className="mb-0 d-md-block text-center tableResponsiveWidth">
              {trainee?.email}
            </p>
          ),
          phone_number: trainee?.phone_number,
          status: (
            <div className="d-flex align-items-center justify-content-center">
              <div
                className={`me-2 ${
                  trainee?.is_deleted
                    ? "bg-danger"
                    : trainee?.is_blocked
                    ? "bg-danger"
                    : trainee?.is_active
                    ? "bg-success"
                    : "bg-warning"
                } rounded-circle`}
                style={{ minWidth: "8px", minHeight: "8px" }}
              ></div>
              <span>
                {trainee?.is_deleted
                  ? "Deleted"
                  : trainee?.is_blocked
                  ? "Blocked"
                  : trainee?.is_active
                  ? "Registered"
                  : "Incomplete Profile"}
              </span>
            </div>
          ),
          action: !trainee?.is_deleted && (
            <div className="d-flex align-items-center justify-content-md-center">
              {!trainee?.is_blocked && (
                <span
                  className={`iconBadge me-1`}
                  id={`userId_${trainee?.id}`}
                  onClick={() => handleActionClick(trainee?.id)}
                >
                  <MdOutlinePersonOutline
                    size={25}
                    className={`cursorPointer ${
                      trainee?.is_blocked === false ? "text-success" : ""
                    }`}
                  />
                </span>
              )}

              {trainee?.is_blocked && (
                <span
                  className={`iconBadge me-1`}
                  id={`userId_${trainee?.id}`}
                  onClick={() => handleActionClick(trainee?.id)}
                >
                  <MdOutlinePersonOff
                    size={25}
                    className={`cursorPointer ${
                      trainee?.is_blocked === true ? "" : "text-danger"
                    }`}
                  />
                </span>
              )}
            </div>
          ),
        });
      });

      setTableData(traineeListArray);
    } else {
      setTableData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traineesData]);

  const columns = [
    { label: "Name", dataKey: "name" },
    {
      label: "Role",
      dataKey: "role",
      align: "center",
    },
    { label: "Email", dataKey: "email", align: "center" },
    { label: "Phone No", dataKey: "phone_number", align: "center" },
    { label: "Status", dataKey: "status", align: "center" },
    { label: "Block / UnBlock", dataKey: "action", align: "center" },
  ];

  return (
    <Container fluid>
      <Row className="h-100">
        {loading === "pending" && <LoadingScreen />}
        <Col md={12} className="p-md-2 p-0">
          <Card className="border-0 h-100 text-start">
            <CardHeader className="bg-transparent border-0 p-0">
              <Row className="align-items-center">
                <Col md={6}>
                  <PageHeading headingText="Trainee List" categoryText="" />
                </Col>
                <Col md={6} className="mb-3 px-4 mt-2">
                  <PhoneInput
                    inputProps={{
                      name: "stc_pay",
                      required: true,
                      className:
                        "form-control-lg w-100 py-3 px-4 customPhoneInput border-0",
                    }}
                    country={"sa"}
                    value={phoneNumber}
                    className="border ltr"
                    onChange={(value) => {
                      // setPage(1);
                      setPhoneNumber(value);
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
      </Row>
    </Container>
  );
};

export default TraineeList;
