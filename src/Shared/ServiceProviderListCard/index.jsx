import styles from "./style.module.scss";
import MyRatingComponent from "../Rating";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardFooter } from "reactstrap";
import React, { memo, useEffect, useState } from "react";
import Images from "../../HelperMethods/Constants/ImgConstants";

const TrainerListCard = (props) => {
  const { serviceProvider, className, handleOnClick } = props;
  const [screenSize, setScreenSize] = useState(true);
  const { t, i18n } = useTranslation("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setScreenSize(true);
      } else {
        setScreenSize(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Card
      className={`BorderRadius bgProperties ${className} ${styles.Card}`}
      onClick={handleOnClick}
      style={{
        backgroundImage: `${
          serviceProvider?.profile_pic === null
            ? `url(${Images.USER_DUMMY_IMG})`
            : `url(${serviceProvider?.profile_pic})`
        }`,
        height: `38vh`,
      }}
    >
      <CardBody className="p-0">
        <div className="p-0  ImgBorder"></div>
      </CardBody>
      <CardFooter
        className={`bgBlur ${styles.infoContainer}`}
        onClick={screenSize ? (e) => e.stopPropagation() : null}
      >
        <h6 className="fw-700 fs-4 mb-0 px-2 text-white">
          {serviceProvider?.full_name}
        </h6>
        <div
          className={`d-flex text-white align-items-end justify-content-between`}
        >
          <div className="d-flex align-items-center ps-3">
            <img
              className="img-fluid"
              src={Images.SHORTLOGO_IMG}
              alt="info logo"
            />
            <p className={`ms-2 fw-bold mb-0 no-Wrap text-white ${i18n.dir()}`}>
              {i18n.dir() === "ltr" &&
                `${serviceProvider?.experience} ${t("guest.yearsText")}`}
              {i18n.dir() === "rtl"
                ? serviceProvider?.experience === 1
                  ? "سنة"
                  : serviceProvider?.experience === 2
                  ? "سنتين"
                  : serviceProvider?.experience >= 3 &&
                    serviceProvider?.experience <= 10
                  ? `${serviceProvider?.experience} سنوات`
                  : `${serviceProvider?.experience} سنة`
                : ""}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <MyRatingComponent rating={serviceProvider?.Avg_rating} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default memo(TrainerListCard);
