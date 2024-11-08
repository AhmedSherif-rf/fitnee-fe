import Pagination from "../Pagination";
import { useTranslation } from "react-i18next";
import PageHeading from "../Headings/PageHeading";
import TransactionDetail from "../TransactionDetail";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import { memo, useEffect, useState, useCallback } from "react";
import { getTransactionHistory } from "../../Redux/features/User/userApi";
import { CardBody, CardHeader, Card, Col, Row, CardFooter } from "reactstrap";
import {
  TRANSACTION_HISTORY_URL,
  PER_PAGE_COUNT,
  CURRENCY,
} from "../../utils/constants";

const PaymentHistoryWrapper = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { loading } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [totalSize, setSizePages] = useState(0);
  const [transactionHistoryData, setTransactionHistoryData] = useState([]);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchTransactionHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchTransactionHistory = () => {
    const data = {
      apiEndpoint: `${TRANSACTION_HISTORY_URL}?page=${page}`,
    };

    dispatch(getTransactionHistory(data)).then((res) => {
      if (res.type === "getTransactionHistory/fulfilled") {
        setSizePages(res?.payload?.data?.count);
        setTransactionHistoryData(res?.payload?.data?.results);
      }
    });
  };

  return (
    <>
      {loading === "pending" && <LoadingScreen />}
      <CardHeader className={`bg-transparent border-0 p-0 ${i18n.dir()}`}>
        <PageHeading
          headingText={t("paymentHistory.paymentHistoryTitleText")}
          className="mb-0"
          categoryText=""
        />
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={12}>
            <Card className="BorderYellow text-black-custom BorderRadius px-2">
              <CardBody className="">
                <div className="w-100 text-center">
                  <h3 className="fw-bold">
                    {t("paymentHistory.availableBalanceText")}
                  </h3>
                </div>
                <div className="w-100 text-center">
                  <h1 className="fw-bold mb-0">
                    {CURRENCY}{" "}
                    {transactionHistoryData[0]?.account?.balance ?? "0.00"}
                  </h1>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className={`my-2 text-black-custom ${i18n.dir()}`}>
          <Col md={12}>
            {transactionHistoryData &&
              transactionHistoryData.map((item, index) => {
                return <TransactionDetail key={index} data={item} />;
              })}
            {transactionHistoryData && transactionHistoryData.length <= 0 && (
              <div className="d-flex justify-content-center py-4 text-black-custom">
                {t("messages.noDataFoundText")}
              </div>
            )}
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        {totalSize > PER_PAGE_COUNT && (
          <Pagination
            size={totalSize}
            handlePageChange={handlePageChange}
            page={page}
          />
        )}
      </CardFooter>
    </>
  );
};

export default memo(PaymentHistoryWrapper);
