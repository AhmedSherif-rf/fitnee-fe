import { Col } from "reactstrap";
import StarRating from "../Rating";
import React, { memo } from "react";
import Images from "../../HelperMethods/Constants/ImgConstants";

const CommentsCard = (props) => {
  const { data, index } = props;

  return (
    <Col md={12} key={index}>
      <div class="d-flex align-items-center px-2">
        <div>
          <div
            className="bgProperties"
            style={{
              borderRadius: "100%",
              width: "70px",
              height: "70px",
              backgroundImage:
                data?.reviewer?.profile_pic === null
                  ? `url(${Images.USER_DUMMY_IMG})`
                  : `url(${data?.reviewer?.profile_pic})`,
            }}
          ></div>
        </div>
        <div className="ms-3 px-2">
          <span className="d-flex align-items-end mb-2 gap-2">
            <h6 className="mb-0 fw-bold">
              {data?.reviewer?.first_name} {data?.reviewer?.last_name}
            </h6>
            <StarRating rating={data?.sp_rating} />
          </span>
          <p className="mb-0 small lh-1"> {data?.sp_review}</p>
        </div>
      </div>
      <hr className="text-black-custom mx-3" />
    </Col>
  );
};

export default memo(CommentsCard);
