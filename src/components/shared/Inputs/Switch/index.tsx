import styles from "./Switch.module.scss";
import { FC } from "react";

type SwitchProps = {
  state: boolean;
  setState: (value: boolean) => void;
  callback?: () => void;
  styling?: string;
};

const Switch: FC<SwitchProps> = ({
  state,
  setState,

  callback,
  styling,
}) => {
  return (
    <div
      onClick={() => {
        setState(!state);
        callback && callback();
      }}
      className={`${styles.switch} ${state ? styles.on : styles.off} ${styling && styles[styling]}`}
    >
      <div className={styles.thumb}></div>
    </div>
  );
};

export default Switch;
