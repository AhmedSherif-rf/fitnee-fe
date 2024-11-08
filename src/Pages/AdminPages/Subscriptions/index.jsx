import moment from "moment";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../../Shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import {
  ADMIN_SUBSCRIPTION_LISTING_URL,
  CURRENCY,
  PER_PAGE_COUNT,
} from "../../../utils/constants";
import { getSubscription } from "../../../Redux/features/Admin/UserListing/userListingApi";

const Subscriptions = (props) => {
  const dispatch = useDispatch();
  const { date } = useParams();
  const { loading } = useSelector((state) => state.userListing);

  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    const data = {
      apiEndpoint: `${ADMIN_SUBSCRIPTION_LISTING_URL}?date=${date}&page=${page}`,
    };

    dispatch(getSubscription(data)).then((res) => {
      if (res.type === "getSubscription/fulfilled") {
        setSizePages(res.payload.data.count);
        setSubscriptionData(res.payload.data.results);
      }
    });
  }, [date, dispatch, page]);

  useEffect(() => {
    if (subscriptionData && subscriptionData.length > 0) {
      let subscriptionArray = [];

      subscriptionData.forEach((subscription) => {
        subscriptionArray.push({
          trainee: (
            <Link
              to={`/admin/traineeProviderProfile/${subscription?.trainee?.id}`}
            >
              <div className="d-md-flex align-items-center">
                <div
                  className="bgProperties rounded-circle me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundImage:
                      subscription?.trainee?.profile_pic === null
                        ? `url(${Images.USER_DUMMY_IMG})`
                        : `url(${subscription?.trainee?.profile_pic})`,
                  }}
                ></div>
                <h6 className="text-secondary fw-bold mb-0">
                  {`${subscription?.trainee?.first_name} ${subscription?.trainee?.last_name}`}
                </h6>
              </div>
            </Link>
          ),
          serviceProvider: (
            <Link
              to={`/admin/serviceProviderProfile/${subscription?.serviceprovider?.uuid}`}
            >
              <div className="d-md-flex align-items-center">
                <div
                  className="bgProperties rounded-circle me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundImage:
                      subscription?.serviceprovider?.profile_pic === null
                        ? `url(${Images.USER_DUMMY_IMG})`
                        : `url(${subscription?.serviceprovider?.profile_pic})`,
                  }}
                ></div>
                <h6 className="text-secondary fw-bold mb-0">
                  {`${subscription?.serviceprovider?.full_name}`}
                </h6>
              </div>
            </Link>
          ),
          price: (
            <p className="fw-bold mb-0">
              {CURRENCY} {subscription?.transition?.current_price}
            </p>
          ),
          duration: (
            <div>{`${moment(subscription?.created_at).format(
              "DD/MM/YYYY"
            )} - ${moment(subscription?.expire_date).format(
              "DD/MM/YYYY"
            )}`}</div>
          ),
        });
      });

      setTableData(subscriptionArray);
    } else {
      setTableData([]);
    }
  }, [subscriptionData]);

  const columns = [
    { label: "Trainee", dataKey: "trainee" },
    { label: "Service Provider", dataKey: "serviceProvider" },
    { label: "Price", dataKey: "price", align: "center" },
    { label: "Duration", dataKey: "duration", align: "center" },
  ];

  return (
    <Container fluid>
      <Row className="h-100">
        {loading === "pending" && <LoadingScreen />}
        <Col md={12}>
          <Card className="border-0 h-100 text-start border border-danger">
            <CardHeader className="bg-transparent border-0 p-0 d-md-flex align-items-center justify-content-between">
              <PageHeading headingText="Subscriptions" categoryText="" />
            </CardHeader>
            <CardBody className="tableBodyWrapperPagination p-0">
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

export default Subscriptions;
