import React from "react";
import { Card, CardBody } from "reactstrap";

const DashboardCard = (props) => {
  const {
    textOne,
    textTwo,
    cardIcon,
    AdminClass,
    CardBodyClass,
    cardIconClass,
  } = props;
  return (
    <Card className={`onlyBorderRadius border-0 h-100   ${AdminClass}`}>
      <CardBody className={`${CardBodyClass}`}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="w-100">
            <div className="w-100 text-start px-2 ">
              <h4 className={`fw-bold mb-0`}>{textOne}</h4>
            </div>
            <div className="w-100 text-start px-2">
              <p className="small mb-0 mt-2">{textTwo}</p>
            </div>
          </div>
          <div
            className={`d-flex align-items-center justify-content-center textYellow ${cardIconClass}`}
          >
            {cardIcon}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DashboardCard;
