import styles from "./Selector.module.scss";

import { ReactComponent as Success } from "../../../../assets/icons/Success.svg";
import { FC } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { GroupType } from "../../../../../types/GroupType";

type SelectorProps = {
  id: number;
  group?: number;
  type: "checkbox" | "radio";
  name: string;
  selection: number[];
  setSelection: (selection: number[]) => void;
};

const Selector: FC<SelectorProps> = ({
  id,
  group,
  type,
  name,
  selection,
  setSelection,
}) => {
  const groups = useReadLocalStorage<GroupType[]>("groups");
  const currentGroupName = groups?.find((el) => el.uuid === group)?.name;

  const handleCheck = () => {
    if (selection.includes(id)) {
      let newArray: number[] = [];
      selection.reduce((deviceId) => {
        if (deviceId !== id) {
          newArray.push(deviceId);
        }
        return deviceId;
      });
      setSelection(newArray);
    } else {
      let newArray = selection ? [...selection] : [];
      newArray.push(id);
      setSelection(newArray);
    }
  };

  const handleSelect = () => {
    if (selection[0] !== id) {
      setSelection([id]);
    } else {
      setSelection([]);
    }
  };

  return (
    <article
      className={styles.container}
      onClick={() => {
        if (type === "checkbox") handleCheck();
        if (type === "radio") handleSelect();
      }}
    >
      <div
        className={`${styles.checkbox} 
        ${
          (type === "checkbox" && selection && selection.includes(id)) ||
          (type === "radio" && selection && selection[0] === id)
            ? styles.checked
            : ""
        }
        `}
      >
        {type === "checkbox" && <Success className={styles.icon} />}
        {type === "radio" && <div className={styles.point}></div>}
      </div>
      <div className={styles.column}>
        <div className={styles.name}>{name}</div>
        {currentGroupName && <div className={styles.subName}>{currentGroupName}</div>}
      </div>
    </article>
  );
};

export default Selector;
