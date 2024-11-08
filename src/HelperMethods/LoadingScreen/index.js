import React from "react";
import { Spinner } from "reactstrap";
import styles from "./style.module.scss";

const LoadingScreen = (props) => (
  <div className={styles.loadingOverlay}>
    <div className={styles.loadingContent}>
      <Spinner className={styles.spinner} type="grow" />
      {props?.text && <p className="textYellow">{props?.text}</p>}
    </div>
  </div>
);

export default LoadingScreen;