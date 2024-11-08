import moment from "moment";
import React, { memo } from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { CURRENCY } from "../../utils/constants";
import Images from "../../HelperMethods/Constants/ImgConstants";

const WalletDetail = (props) => {
  const { index, data } = props;
  const { t } = useTranslation("");

  return (
    <Row className="mb-2" key={index}>
      <Col md={12}>
        <div className="d-flex align-items-center border-bottom py-2">
          <div className="me-2">
            <img
              src={
                data?.Transaction_status === "debit"
                  ? Images.ARROW_UP_IMG
                  : Images.ARROW_DOWN_IMG
              }
              height={50}
              alt="paymentTypeImg"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="px-2">
              <div>
                <small className="fw-bold">
                  {data?.Transaction_status === "debit"
                    ? t("traineeDashboard.walletAmountUsedText")
                    : t("traineeDashboard.amountRefundedText")}
                </small>
              </div>
              <span className="small text-black-custom">
                {moment(data?.date_created).format("MM/DD/YYYY hh:mm A")}
              </span>
            </div>
            <div className="ltr">
              {data?.Transaction_status === "debit" ? (
                <h4 className="mb-0 fs-6 text-center">{`- ${CURRENCY} ${
                  data?.total_amount === 0
                    ? data?.fitnee_wallet
                    : data?.total_amount
                }`}</h4>
              ) : (
                <h4 className="mb-0 fs-6 text-center">{`+ ${CURRENCY} ${
                  data?.total_amount === 0
                    ? data?.fitnee_wallet
                    : data?.total_amount
                }`}</h4>
              )}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default memo(WalletDetail);
