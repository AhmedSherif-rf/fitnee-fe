import styles from "./style.module.scss";
import FillBtn from "../Buttons/FillBtn";
import functions from "../../utils/functions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardFooter } from "reactstrap";
import Images from "../../HelperMethods/Constants/ImgConstants";
import { setSubscriptionPlan } from "../../Redux/features/Subscription/subscriptionSlice";
import {
  CURRENCY,
  TRAINER_ROLE,
  NUTRITIONIST_ROLE,
  EXERCISE_MEMBERSHIP_TYPE,
  TRAINER_NUTRITIONIST_ROLE,
} from "../../utils/constants";

const SubscriptionCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { duration, price, id, type } = props;
  const { user } = useSelector((state) => state.user);

  const handleSubscribeClick = useCallback(() => {
    if (user) {
      dispatch(setSubscriptionPlan({ id, duration, price, type }));
      navigate("/trainee/subscription/creditCardDetail");
    } else {
      navigate("/signIn");
    }
  }, [dispatch, duration, id, navigate, price, type, user]);

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
    } else {
      return Images.EXERCISE_SUBSCRIPTION_IMG;
    }
  };

  return (
    <Card
      className={`text-center BorderRadius text-black-custom p-0 h-100 mb-5 ${
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

      <CardBody className={type !== EXERCISE_MEMBERSHIP_TYPE && "mt-5"}>
        {type === EXERCISE_MEMBERSHIP_TYPE && (
          <small>{t("guest.exercisePackageText")}</small>
        )}
        <h1 className="mt-2">
          {`${CURRENCY} ${functions.addVatPrice(price)}`}
        </h1>
        <img
          className="fluid w-50"
          src={getSubscriptionCardImage(duration, type)}
          alt=""
        />
      </CardBody>
      <CardFooter className="bg-transparent border-0">
        <FillBtn
          className={"px-5"}
          text={t("guest.subscribeText")}
          handleOnClick={handleSubscribeClick}
        />
      </CardFooter>
    </Card>
  );
};

export default memo(SubscriptionCard);
