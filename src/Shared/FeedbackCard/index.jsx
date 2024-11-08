import React from "react";
import StarRating from "../Rating";
import styles from "./style.module.scss";
import { LuArrowUp } from "react-icons/lu";
import { Card, CardFooter } from "reactstrap";
import { useTranslation } from "react-i18next";

const FeedbackCard = (props) => {
  const { i18n } = useTranslation("");
  const { header, image, des } = props;

  return (
    <Card
      className={`rounded-0 w-100 customCard ${i18n.dir()}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <CardFooter className={`text-center w-100 p-0 m-0 customCardFooter`}>
        <div
          className={`customCardFooterText d-flex align-items-end justify-content-center`}
        >
          <div className="">
            <p className="fs-3 mb-0">{header}</p>
            <div className={`descriptionDiv px-3 pt-1`}>
              <div className={`divider px-3 my-2`}></div>
              <small>{des}</small>
              <br />
              <br />
              <StarRating />
            </div>
          </div>
        </div>
      </CardFooter>
      <div
        className={`position-absolute rounded-circle d-md-none d-flex align-items-center justify-content-center textParrotGreen ${styles.arrowCircle}`}
      >
        <LuArrowUp />
      </div>
    </Card>
  );
};

export default FeedbackCard;
