import { ReactComponent as HardDrive } from "../../../../assets/icons/HardDrive.svg";
import { ReactComponent as Arrow } from "../../../../assets/icons/Arrow.svg";

import styles from "./Connection.module.scss";
import { FC } from "react";


const Connection:FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <div className={styles.arrow}>
          <Arrow />
        </div>
        <div className={styles.server}>
          <HardDrive />
        </div>
      </div>
      <div className={styles.content}>
        <h2>IP du Raspberry Pi :</h2>
        <p>127.0.0.1</p>
      </div>
    </div>
  );
};

export default Connection;
