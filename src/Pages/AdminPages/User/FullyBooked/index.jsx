import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useState, useCallback } from "react";
import Pagination from "../../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import ListingTable from "../../../../Shared/AdminShared/Components/ListingTable";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import {
  ADMIN_SERVICE_PROVIDER_FULLY_BOOKED_URL,
  PER_PAGE_COUNT,
} from "../../../../utils/constants";
import { getServiceProviderListing } from "../../../../Redux/features/Admin/UserListing/userListingApi";

const FullyBooked = (props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userListing);

  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [stcPayNumber, setStcPayNumber] = useState("");
  const [serviceProvidersData, setServiceProvidersData] = useState(null);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    const data = {
      apiEndpoint: `${ADMIN_SERVICE_PROVIDER_FULLY_BOOKED_URL}?page=${page}&stc_pay=${stcPayNumber}`,
    };

    dispatch(getServiceProviderListing(data)).then((res) => {
      if (res.type === "getServiceProviderListing/fulfilled") {
        setSizePages(res.payload.data.count);
        setServiceProvidersData(res.payload.data.results);
      }
    });
  }, [dispatch, page, stcPayNumber]);

  useEffect(() => {
    if (serviceProvidersData && serviceProvidersData.length > 0) {
      let ServiceProviderListArray = [];

      serviceProvidersData.forEach((serviceProvider, index) => {
        ServiceProviderListArray.push({
          full_name: (
            <Link to={`/admin/serviceProviderProfile/${serviceProvider?.uuid}`}>
              <div className="d-md-flex align-items-center">
                <div
                  className="bgProperties rounded-circle me-2 mb-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundImage:
                      serviceProvider?.profile_pic === null
                        ? `url(${Images.USER_DUMMY_IMG})`
                        : `url(${serviceProvider?.profile_pic})`,
                  }}
                ></div>
                <h6 className="text-secondary fw-bold mb-0">
                  {serviceProvider?.full_name}
                </h6>
              </div>
            </Link>
          ),
          role: serviceProvider?.role,
          email: serviceProvider?.email,
          stc_pay: serviceProvider.stc_pay,
          status: (
            <span>
              {serviceProvider?.is_fully_booked ? (
                <Badge
                  href="#"
                  color="danger"
                  className="d-flex align-items-center justify-content-center p-1"
                >
                  Booked
                </Badge>
              ) : (
                <Badge
                  href="#"
                  color="success"
                  className="d-flex align-items-center justify-content-center"
                >
                  Available
                </Badge>
              )}
            </span>
          ),
        });
      });

      setTableData(ServiceProviderListArray);
    } else {
      setTableData([]);
    }
  }, [serviceProvidersData]);

  const columns = [
    { label: "FullName", dataKey: "full_name" },
    {
      label: "Role",
      dataKey: "role",
      align: "center",
    },

    { label: "Email", dataKey: "email", align: "center" },
    { label: "STC Phone No", dataKey: "stc_pay", align: "center" },
    { label: "Status", dataKey: "status", align: "center" },
  ];

  return (
    <Row className="h-100">
      {loading === "pending" && <LoadingScreen />}
      <Col md={12}>
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0 p-0">
            <Row className="align-items-center py-1">
              <Col md={6}>
                <PageHeading
                  headingText="Fully Booked Service Provider List"
                  categoryText=""
                />
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
    </Row>
  );
};

export default FullyBooked;
