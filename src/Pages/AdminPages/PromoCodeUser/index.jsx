import moment from "moment";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../Shared/Headings/PageHeading";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { ADMIN_PROMOCODE_USER_URL } from "../../../utils/constants";
import { Card, CardBody, Col, Row, CardHeader, CardFooter } from "reactstrap";
import ListingTable from "../../../Shared/AdminShared/Components/ListingTable";
import { getToolRecords } from "../../../Redux/features/Admin/PromoCode/promoCodeApi";

const ToolRecord = () => {
  const dispatch = useDispatch();
  const { promoCodeId } = useParams();
  const [tableData, setTableData] = useState([]);
  const [promoCodeData, setPromoCodeData] = useState(null);
  const { loading } = useSelector((state) => state.promoCode);

  useEffect(() => {
    fetchToolRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchToolRecords = () => {
    const data = {
      apiEndpoint: `${ADMIN_PROMOCODE_USER_URL}/${promoCodeId}`,
    };

    dispatch(getToolRecords(data)).then((res) => {
      if (res.type === "getToolRecords/fulfilled") {
        setPromoCodeData(res?.payload?.data?.usages);
      }
    });
  };

  useEffect(() => {
    if (promoCodeData && promoCodeData.length > 0) {
      let promoCodeArray = [];
      promoCodeData.forEach((data) => {
        promoCodeArray.push({
          user: (
            <Link to={`/admin/traineeProviderProfile/${data?.user?.id}`}>
              <div className="d-md-flex align-items-center">
                <div
                  className="bgProperties rounded-circle me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundImage:
                      data?.user?.profile_pic === null
                        ? `url(${Images.USER_DUMMY_IMG})`
                        : `url(${data?.user?.profile_pic})`,
                  }}
                ></div>
                <div className="tableResponsiveWidth">
                  <h6 className="text-secondary fw-bold mb-0">
                    {`${data?.user?.first_name} ${data?.user?.last_name}`}
                  </h6>
                </div>
              </div>
            </Link>
          ),
          email: data?.user?.email,
          phoneNumber: data?.user?.phone_number,
          discounted_price: `SAR ${data?.user?.discounted_price}`,
          date: moment(data?.usage_date).format("DD/MM/YYYY"),
        });
      });
      setTableData(promoCodeArray);
    } else {
      setTableData([]);
    }
  }, [promoCodeData]);

  const columns = [
    { label: "User", dataKey: "user", align: "center" },
    { label: "Email", dataKey: "email" },
    { label: "Phone Number", dataKey: "phoneNumber" },
    { label: "Discounted Price", dataKey: "discounted_price", align: "center" },
    { label: "Transaction Date", dataKey: "date", align: "center" },
  ];

  return (
    <Row className="h-100">
      <Col md={12}>
        {loading === "pending" && <LoadingScreen />}
        <Card className="border-0 h-100 text-start">
          <CardHeader className="bg-transparent border-0">
            <PageHeading headingText="Promo Code Usage" categoryText="" />
          </CardHeader>
          <CardBody className="tableBodyWrapperPagination p-md-2 p-0">
            <ListingTable data={tableData} columns={columns} />
          </CardBody>
          <CardFooter className="bg-transparent text-end pb-0 pt-2">
            <div>{`Total Amount : SAR ${
              promoCodeData?.total_discounted_amount || 0
            }`}</div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};
export default ToolRecord;
