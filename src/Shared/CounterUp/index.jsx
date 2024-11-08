import PropTypes from "prop-types";
import React, { memo } from "react";
import CountUp from "react-countup";
import styles from "./style.module.scss";

const CounterUp = (props) => {
  const { start, end, duration } = props;

  return (
    <>
      <CountUp
        className={`text-white fw-bold fs-md-2 fs-sm-3 ${styles.CountUp}`}
        start={start}
        end={end}
        duration={duration}
      />
    </>
  );
};

CounterUp.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  duration: PropTypes.number,
};

export default memo(CounterUp);
