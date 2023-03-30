import { FC } from "react";
import styles from "./DataCard.module.scss";

type DataCardProps = {
  type?: "plain" | "alerts" | "good" | "bad" | "temperature" |"minTemp" | "maxTemp";
  title: string;
  value: string | number;
};

const DataCard: FC<DataCardProps> = ({ type, title, value }) => {
  return (
    <article
      className={`${styles.container} ${styles[type ?? "plain"]} 
      ${!type && styles.plain}
      ${type === "alerts" && (value >= 1 ? styles.bad : styles.good)}`}
    >
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.value}>{value}</span>
    </article>
  );
};

export default DataCard;
