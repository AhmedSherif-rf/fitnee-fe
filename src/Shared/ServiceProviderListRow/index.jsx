import moment from "moment";
import React, { memo } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  CURRENCY,
  NUTRITIONIST_ROLE,
  TRAINEE_ROLE,
  TRAINER_ROLE,
} from "../../utils/constants";
import Images from "../../HelperMethods/Constants/ImgConstants";

const Index = (props) => {
  const { data, index } = props;
  const navigate = useNavigate();

  const { t } = useTranslation("");
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Row
        className="align-items-center justify-content-center text-black-custom border-bottom text-black-custom py-2 mb-2"
        key={index}
      >
        <Col md={3} className="mb-md-0 mb-2">
          <div
            className="d-flex align-items-center"
            onClick={() => {
              if (data?.serviceprovider) {
                const role =
                  data?.serviceprovider?.role === NUTRITIONIST_ROLE
                    ? NUTRITIONIST_ROLE
                    : TRAINER_ROLE;
                navigate(
                  `/trainee/serviceProviderProfile/${data?.serviceprovider?.uuid}/${data?.serviceprovider?.id}/${role}/${data?.serviceprovider?.role}`
                );
              }
            }}
          >
            {user?.role === TRAINEE_ROLE && data?.serviceprovider && (
              <div
                className="me-2 bgProperties rounded-circle"
                style={{
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  backgroundImage:
                    data?.serviceprovider?.profile_pic === null
                      ? `url(${Images.USER_DUMMY_IMG})`
                      : `url(${data?.serviceprovider?.profile_pic})`,
                  border: "1px solid transparent",
                }}
              ></div>
            )}
            {user?.role !== TRAINEE_ROLE && data?.trainee && (
              <div
                className="me-2 bgProperties rounded-circle"
                style={{
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  backgroundImage:
                    data?.trainee?.profile_pic === null
                      ? `url(${Images.USER_DUMMY_IMG})`
                      : `url(${data?.trainee?.profile_pic})`,
                  border: "1px solid transparent",
                }}
              ></div>
            )}
            <div>
              <h6 className="mb-0 fw-bold mx-2">
                {data?.serviceprovider
                  ? data?.serviceprovider?.full_name
                  : `${data?.trainee?.first_name} ${data?.trainee?.last_name}`}
              </h6>
              <span className="text-black-custom mx-2">
                {data?.serviceprovider
                  ? data?.serviceprovider?.role === TRAINER_ROLE
                    ? t("registerAs.trainerText")
                    : data?.serviceprovider?.role === NUTRITIONIST_ROLE
                    ? t("registerAs.nutritionistText")
                    : t("registerAs.trainerNutritionistText")
                  : t("registerAs.traineeText")}
              </span>
              <div className="mb-md-0 d-md-none d-block py-2 mx-2">
                <h6 className="mb-0 w-100 small fw-bold ">
                  {CURRENCY}{" "}
                  {data?.transition?.total_amount === null
                    ? data?.transition?.current_price
                    : data?.transition?.total_amount}
                </h6>
              </div>
            </div>
          </div>
        </Col>
        <Col md={2} className="d-md-block d-none">
          <div className="mb-md-0 mb-2 BorderYellow text-center p-2 rounded-3">
            {data?.subscription?.duration === 1
              ? t("trainerPackages.monthText")
              : data?.subscription?.duration === 2
              ? t("trainerPackages.twoMonthText")
              : t("trainerPackages.threeMonthText")}
          </div>
        </Col>
        <Col md={2} className="d-md-block d-none">
          <div className="mb-md-0 text-center py-2 rounded-3">
            <h6 className="mb-0 w-100 fs-5 fw-bold ">
              {CURRENCY}{" "}
              {data?.transition?.total_amount === null
                ? data?.transition?.current_price
                : data?.transition?.total_amount}
            </h6>
          </div>
        </Col>
        <Col md={4}>
          <div className="BorderYellow p-2 rounded-3 d-md-flex d-block align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <p className="mb-0 small">
                {moment(data?.created_at).format("DD/MM/YYYY")}
              </p>
              <span className="mb-0 mx-1">-</span>
              <p className="mb-0 small">
                {moment(data?.expire_date).format("DD/MM/YYYY")}
              </p>
            </div>
            <span className="d-md-none d-block textDark text-center">
              {data?.subscription?.duration === 1
                ? t("trainerPackages.monthText")
                : data?.subscription?.duration === 2
                ? t("trainerPackages.twoMonthText")
                : t("trainerPackages.threeMonthText")}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default memo(Index);
