import styles from "./InfoMessage.module.scss";

import { ReactComponent as Success } from "../../../../assets/icons/Success.svg";
import { ReactComponent as Info } from "../../../../assets/icons/Info.svg";
import { ReactComponent as Warning } from "../../../../assets/icons/Warning.svg";
import { ReactComponent as Error } from "../../../../assets/icons/Error.svg";
import { FC } from "react";
import { Link } from "react-router-dom";

type InfoMessageProps = {
  type: "success" | "info" | "warning" | "error";
  title?: string;
  link?: string;
  linkText?: string;
  message?: string;
};

const InfoMessage: FC<InfoMessageProps> = ({
  type,
  title,
  message,
  link,
  linkText,
}) => {
  return (
    <article
      className={`${styles.container} ${type === "success" && styles.success} ${
        type === "info" && styles.info
      } ${type === "warning" && styles.warning} ${
        type === "error" && styles.error
      }`}
    >
      {type === "success" && <Success className={styles.icon} />}
      {type === "info" && <Info className={styles.icon} />}
      {type === "warning" && <Warning className={styles.icon} />}
      {type === "error" && <Error className={styles.icon} />}
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div>
          {message && <p className={styles.message}>{message}</p>}
          {link && (
            <Link to={link} className={styles.link}>
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default InfoMessage;
