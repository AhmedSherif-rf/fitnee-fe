import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useState, useCallback } from "react";
import Pagination from "../../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import ListingTable from "../../../../Shared/AdminShared/Components/ListingTable";
import {
  USER_STATUS_LISTING_URL,
  PER_PAGE_COUNT,
} from "../../../../utils/constants";
import { getTraineeListing } from "../../../../Redux/features/Admin/UserListing/userListingApi";

const UserList = (props) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
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
    const data = {
      apiEndpoint: `${USER_STATUS_LISTING_URL}?status=${slug}&page=${page}&phone_number=${phoneNumber}`,
    };

    dispatch(getTraineeListing(data)).then((res) => {
      if (res.type === "getTraineeListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setTraineesData(res.payload.data.results);
      }
    });
  }, [dispatch, page, phoneNumber, slug]);

  useEffect(() => {
    if (traineesData && traineesData.length > 0) {
      let traineeListArray = [];

      traineesData.forEach((trainee) => {
        traineeListArray.push({
          name: (
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
              <h6 className="text-secondary fw-bold mb-0">
                {`${trainee?.first_name} ${trainee?.last_name}`}
              </h6>
            </div>
          ),
          role: trainee?.role,
          email: trainee?.email,
          phone_number: trainee?.phone_number,
          status: (
            <div className="d-flex align-items-center justify-content-center">
              <div
                className={`me-2 ${
                  trainee?.is_active ? "bg-success" : "bg-warning"
                } rounded-circle`}
                style={{ minWidth: "8px", minHeight: "8px" }}
              ></div>
              <span>
                {trainee?.is_active ? "Active" : "Incomplete Profile"}
              </span>
            </div>
          ),
        });
      });

      setTableData(traineeListArray);
    } else {
      setTableData([]);
    }
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
  ];

  return (
    <Row className="h-100">
      {loading === "pending" && <LoadingScreen />}
      <Col md={12}>
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0 p-0">
            <PageHeading headingText="User List" categoryText="" />
          </CardHeader>
          <CardBody className="tableBodyWrapperPagination">
            <Row className="justify-content-end py-1">
              <Col md={4}>
                <PhoneInput
                  inputProps={{
                    name: "stc_pay",
                    required: true,
                    className:
                      "form-control-lg w-100 py-1 px-4 customPhoneInput border",
                  }}
                  country={"sa"}
                  value={phoneNumber}
                  className="border ltr"
                  onChange={(value) => {
                    setPage(1);
                    setPhoneNumber(value);
                  }}
                />
              </Col>
            </Row>
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

export default UserList;
