import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardHeader } from "reactstrap";

const ProgressHistoryWrapper = (props) => {
  const { data } = props;
  const { t } = useTranslation("");

  return (
    <Card className="BorderRadius">
      <CardHeader className={`border-0 BorderRadius`}>
        <span className="fw-bold small">
          {t("traineeDashboard.dateText")}:{" "}
        </span>
        <span>{moment(data?.date_recorded).format("DD/MM/YYYY")}</span>
      </CardHeader>
      <CardBody>
        <div className="m-2 d-flex align-items-center">
          <div className="me-3">
            <p className="mb-0">{t("traineeDashboard.weightText")}:</p>
            <p className="mb-0">{t("traineeDashboard.smmText")}:</p>
            <p className="mb-0">{t("traineeDashboard.bfmText")}:</p>
            <p className="mb-0">{t("traineeDashboard.proteinText")}:</p>
          </div>
          <div className="px-2">
            <p className="mb-0">{data?.weight} Kg</p>
            <p className="mb-0">{data?.skeletal_muscel_mass} Kg</p>
            <p className="mb-0">{data?.body_fat_mass} Kg</p>
            <p className="mb-0">{data?.protien} g/kg</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default memo(ProgressHistoryWrapper);
