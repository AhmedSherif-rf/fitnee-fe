import moment from "moment";
import { Link } from "react-router-dom";
import { GrCurrency } from "react-icons/gr";
import PhoneInput from "react-phone-input-2";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../Shared/Pagination";
import React, { useState, useCallback, useEffect } from "react";
import PageHeading from "../../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import {
  getWalletData,
  releasePayment,
} from "../../../../Redux/features/Admin/Wallet/walletApi";
import ListingTable from "../../../../Shared/AdminShared/Components/ListingTable";
import {
  CURRENCY,
  PER_PAGE_COUNT,
  PENDING_PAYMENTS,
  ADMIN_RELEASE_PAYMENT_URL,
} from "../../../../utils/constants";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const WalletOverview = (props) => {
  const today = moment();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [walletData, setWalletData] = useState(null);
  const [stcPayNumber, setStcPayNumber] = useState("");

  const { loading } = useSelector((state) => state.wallet);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    getWalletHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, stcPayNumber]);

  const getWalletHistory = () => {
    const data = {
      apiEndpoint: `${PENDING_PAYMENTS}?page=${page}&stc_pay=${stcPayNumber}`,
    };

    dispatch(getWalletData(data)).then((res) => {
      if (res.type === "getWalletData/fulfilled") {
        setSizePages(res.payload.data.count);
        setWalletData(res.payload.data.results);
      }
    });
  };

  const handlePayClick = (transaction_id) => {
    const data = {
      apiEndpoint: ADMIN_RELEASE_PAYMENT_URL,
      requestData: JSON.stringify({ id: transaction_id }),
    };

    dispatch(releasePayment(data)).then((res) => {
      if (res.type === "releasePayment/fulfilled") {
        getWalletHistory();
      }
    });
  };

  useEffect(() => {
    if (walletData && walletData.length > 0) {
      let traineeListArray = [];

      walletData?.forEach((wallet) => {
        wallet?.transactions.forEach((transaction) => {
          traineeListArray.push({
            full_name: (
              <Link
                to={`/admin/serviceProviderProfile/${wallet?.service_provider?.uuid}`}
              >
                <div className="d-md-flex align-items-center">
                  <div
                    className="bgProperties rounded-circle me-2 mb-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundImage:
                        wallet?.service_provider?.profile_pic === null
                          ? `url(${Images.USER_DUMMY_IMG})`
                          : `url(${wallet?.service_provider?.profile_pic})`,
                    }}
                  ></div>
                  <div className="tableResponsiveWidth">
                    {" "}
                    <h6 className="text-secondary fw-bold mb-0">
                      {wallet?.service_provider?.full_name}
                    </h6>
                  </div>
                </div>
              </Link>
            ),
            stc_pay: wallet?.service_provider?.stc_pay,
            amount: `${CURRENCY} ${transaction?.amount}`,
            status: (
              <div className="d-flex align-items-center justify-content-md-center">
                <div
                  className={`me-2 ${
                    transaction?.is_paid ? "bg-success" : "bg-danger"
                  } rounded-circle`}
                  style={{ minWidth: "8px", minHeight: "8px" }}
                ></div>
                <span>{transaction?.is_paid ? "Paid" : "Pending"}</span>
              </div>
            ),
            total_amount: `${CURRENCY} ${transaction?.total_amount}`,
            discount:
              wallet?.discounted_price === null
                ? "N/A"
                : `${CURRENCY} ${wallet?.discounted_price}`,
            release_date: (
              <p
                className={
                  today.isSame(moment(transaction?.payment_date), "day")
                    ? "text-success fw-bold"
                    : today.isAfter(moment(transaction?.payment_date), "day")
                    ? "text-danger fw-bold"
                    : "text-dark"
                }
              >
                {moment(transaction?.payment_date).format("DD/MM/YYYY")}
              </p>
            ),
            action: (
              <UncontrolledDropdown className={`UncontrolledDropdown`}>
                <DropdownToggle
                  className={`p-0 d-flex align-items-center justify-content-center`}
                  nav
                >
                  <div className=" rounded-circle text-black-custom">
                    <FaEllipsisVertical size={18} className="fs-3" />
                  </div>
                </DropdownToggle>
                <DropdownMenu
                  className={`DropdownMenu`}
                  style={{ right: 0, left: "auto" }}
                >
                  <DropdownItem className={`p-1 DropdownItem`}>
                    <div
                      className="d-flex align-items-center px-2"
                      onClick={() => handlePayClick(transaction?.id)}
                    >
                      <GrCurrency className="me-2" />
                      <span className="fs-6">Click to pay</span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ),
          });
        });
      });

      setTableData(traineeListArray);
    } else {
      setTableData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletData]);

  const columns = [
    { label: "FullName", dataKey: "full_name" },
    { label: "STC Phone No", dataKey: "stc_pay", align: "center" },
    { label: "Amount", dataKey: "amount" },
    { label: "Status", dataKey: "status", align: "center" },
    {
      label: "Total Subscription Amount",
      dataKey: "total_amount",
      align: "center",
    },
    {
      label: "Discount",
      dataKey: "discount",
      align: "center",
    },
    { label: "Release Date", dataKey: "release_date", align: "center" },
    { label: "Action", dataKey: "action", align: "center" },
  ];

  return (
    <Row className="h-100">
      <Col md={12}>
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0 p-0">
            <Row className="align-items-center">
              <Col md={6}>
                <PageHeading headingText="Wallet Overview" categoryText="" />
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
                    setStcPayNumber(value);
                  }}
                />
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="tableBodyWrapperPagination p-md-2 p-0">
            {loading === "pending" && <LoadingScreen />}
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
export default WalletOverview;
