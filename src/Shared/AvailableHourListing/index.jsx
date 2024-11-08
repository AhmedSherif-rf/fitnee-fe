import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import AvailableHourCard from "../AvailableHourCard";

const AvailableHourList = (props) => {
  const { data: hoursData } = props;
  const { i18n } = useTranslation("");

  return (
    <>
      {hoursData?.map((item, index) => {
        return (
          <AvailableHourCard
            className={`rounded-3 BorderRadius bg-white`}
            day={i18n.dir() === "ltr" ? item.day : item.day_ar}
            time={`${moment(item?.starttime, "HH:mm:ss").format(
              "h:mm a"
            )} - ${moment(item?.endtime, "HH:mm:ss").format("h:mm a")}`}
            index={index}
            key={index}
          />
        );
      })}
    </>
  );
};

export default memo(AvailableHourList);
