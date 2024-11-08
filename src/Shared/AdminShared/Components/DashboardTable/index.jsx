import React, { memo } from "react";
import { Link } from "react-router-dom";
import ListingTable from "../ListingTable";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";

const DashboardTable = (props) => {
  const { data, columns, link, headingText } = props;

  return (
    <Card className="onlyBorderRadius fw-bold text-start overflowY-scroll mb-3 h-100 shadow border-0">
      <CardHeader
        className={`bgNotification border-0 onlyBorderRadius d-flex align-items-center py-3 `}
      >
        <h6 className="fw-bold mb-0">{headingText}</h6>
      </CardHeader>
      <CardBody className="py-2 px-1 p-0">
        <ListingTable data={data} columns={columns} />
      </CardBody>
      <CardFooter className="text-end bg-transparent border-0 pt-0 mb-2">
        <Link to={link} className="textYellow">
          See More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default memo(DashboardTable);
