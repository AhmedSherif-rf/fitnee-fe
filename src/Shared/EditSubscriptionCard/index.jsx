import Toaster from "../Toaster";
import InputField from "../InputField";
import styles from "./style.module.scss";
import FillBtn from "../Buttons/FillBtn";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardFooter } from "reactstrap";
import Images from "../../HelperMethods/Constants/ImgConstants";
import React, { memo, useCallback, useState, useEffect } from "react";
import {
  CURRENCY,
  TRAINER_TYPE,
  TRAINER_ROLE,
  NUTRITIONIST_ROLE,
  TRAINER_NUTRITIONIST_ROLE,
} from "../../utils/constants";

const EditSubscriptionCard = (props) => {
  const { user } = useSelector((state) => state.user);
  const {
    id,
    duration,
    price,
    isDummy,
    handleOnEdit,
    handleOnAdd,
    type,
  } = props;
  const { t, i18n } = useTranslation("");
  const [packagePrice, setPackagePrice] = useState(price);

  useEffect(() => {
    setPackagePrice(price);
  }, [price]);

  const handleSubmit = () => {
    if (packagePrice === "") {
      Toaster.error(t("traineeSubscription.addPriceErrorText"));
    } else {
      if (isDummy) {
        handleOnAdd(
          {
            price: Number(packagePrice),
            duration: duration,
            membership_type: user === TRAINER_TYPE ? "Trainer" : "Nutrition",
          },
          duration
        );
      } else {
        handleOnEdit(
          {
            price: Number(packagePrice),
          },
          id
        );
      }
    }
  };

  const handlePriceChange = useCallback((e) => {
    setPackagePrice(e.target.value);
  }, []);

  const getSubscriptionCardImage = (duration, type) => {
    if (type === TRAINER_ROLE) {
      if (duration === 1) {
        return Images.TRAINER_ONE_MONTH_IMG;
      } else if (duration === 2) {
        return Images.TRAINER_TWO_MONTH_IMG;
      } else {
        return Images.TRAINER_THREE_MONTH_IMG;
      }
    } else if (type === NUTRITIONIST_ROLE) {
      if (duration === 1) {
        return Images.NUTRITIONIST_ONE_MONTH_IMG;
      } else if (duration === 2) {
        return Images.NUTRITIONIST_TWO_MONTH_IMG;
      } else {
        return Images.NUTRITIONIST_THREE_MONTH_IMG;
      }
    } else if (type === TRAINER_NUTRITIONIST_ROLE) {
      if (duration === 1) {
        return Images.BOTH_T_AND_N_ONE_MONTH_IMG;
      } else if (duration === 2) {
        return Images.BOTH_T_AND_N_TWO_MONTH_IMG;
      } else {
        return Images.BOTH_T_AND_N_THREE_MONTH_IMG;
      }
    }
  };

  return (
    <Card
      className={`text-center BorderRadius text-black-custom p-0 mb-5 ${
        styles.cardHeaderDesign
      } ${i18n.dir()}`}
    >
      <div className="text-center d-flex justify-content-center">
        <div className={`${styles.headerCard} BorderRadius shadow-sm`}>
          {duration === 1
            ? t("trainerPackages.monthText")
            : duration === 2
            ? t("trainerPackages.twoMonthText")
            : t("trainerPackages.threeMonthText")}
        </div>
      </div>

      <CardBody className="mt-5">
        <h4 className="m-0">{CURRENCY}</h4>
        <div className="d-flex justify-content-center">
          <InputField
            placeholder={t("traineeSubscription.addPriceText")}
            className="text-center fs-4 border-0 w-50"
            type="number"
            value={packagePrice}
            onChangeHandle={handlePriceChange}
          />
        </div>
        <img
          className="fluid w-50 my-2"
          src={getSubscriptionCardImage(duration, type)}
          alt=""
        />
      </CardBody>
      <CardFooter className="bg-transparent border-0 py-3">
        {isDummy && (
          <FillBtn
            className={"px-5"}
            text={t("trainer.addText")}
            handleOnClick={handleSubmit}
          />
        )}
        {!isDummy && (
          <FillBtn
            className={"px-5"}
            text={t("trainer.editText")}
            disabled={packagePrice === price ? true : false}
            handleOnClick={handleSubmit}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default memo(EditSubscriptionCard);
