import Switch from "../../Inputs/Switch";

import styles from "./RoomCard.module.scss";

import { ReactComponent as Battery } from "../../../../assets/icons/Battery.svg";
import { ReactComponent as Thermometer } from "../../../../assets/icons/Thermometer.svg";
import { ReactComponent as Drop } from "../../../../assets/icons/Drop.svg";
import { ReactComponent as Sun } from "../../../../assets/icons/Sun.svg";

import { FC, useContext,  useMemo, useState } from "react";
import { Link } from "react-router-dom";
import notificationContext from "../../../../contexts/notificationContext";
import {
  useLocalStorage,
  useUpdateEffect
} from "usehooks-ts";
import { RoomType } from "../../../../../types/RoomType";
import generateRandomNumberBetween from "../../../../utils/randomNumberBetween";
import { toggleSamplingOfRoom } from "../../../../utils/toggleSamplingOfRoom";

type RoomCardProps = {
  uuid: number;
};
const RoomCard: FC<RoomCardProps> = ({ uuid }) => {

  const [rooms, setRooms] = useLocalStorage<RoomType[]>("rooms", []);
  const currentRoom = rooms && rooms.find((room) => room.uuid === uuid);
  const [isSwitchedOn, setIsSwitchedOn] = useState(currentRoom?.sampling ?? false);

  const batteryLevel = useMemo(() => generateRandomNumberBetween(16, 100), []);
  const temperature = useMemo(() => generateRandomNumberBetween(16, 24), []);
  const humidity = useMemo(() => generateRandomNumberBetween(16, 24), []);
  const luminosity = useMemo(() => generateRandomNumberBetween(25, 200), []);


  const { setNotification } = useContext(notificationContext);



  useUpdateEffect(() => {
    if (currentRoom) {
      setNotification({
        show: true,
        type: "info",
        text: `Relevés ${isSwitchedOn ? "ON" : "OFF"} dans ${currentRoom.name}`,
      });

    } else {
      setNotification({
        show: true,
        type: "error",
        text: "Une erreur est survenue",
      });
    }
  }, [isSwitchedOn]);


  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link
          to={uuid ? "/rooms/" + uuid + "/" : "/"}
          className={styles.headerLeft}
        >
          <div
            className={styles.color}
            style={{
              // @ts-ignore
              "--color": currentRoom.color ?? "#000",
            }}
          ></div>
          <h2>{currentRoom?.name}</h2>
        </Link>
        <div className={styles.headerRight}>
          <Switch
            callback={() => toggleSamplingOfRoom(rooms, setRooms, currentRoom?.uuid)}
            state={isSwitchedOn}
            setState={setIsSwitchedOn}
          />
        </div>
      </header>
      <ul className={styles.list}>
        <li className={styles.detail}>
          <div className={styles.icon}>
            <Thermometer className={styles.thermometer} />
          </div>
          <span className={styles.value}>
            {`${temperature} °C`}
          </span>
        </li>
        <li className={styles.detail}>
          <div className={styles.icon}>
            <Drop className={styles.drop} />
          </div>
          <span className={styles.value}>
            {`${humidity} %`}
          </span>
        </li>

        <li className={styles.detail}>
          <div className={styles.icon}>
            <Sun className={styles.sun} />
          </div>
          <span className={styles.value}>
            {`${luminosity} lux`}
          </span>
        </li>
      </ul>

      <footer className={styles.footer}>
        <div className={styles.batteryContainer}>
          <div className={styles.batteryIndicatorContainer}>
            <Battery className={styles.batteryIcon} />
            <div className={styles.battery}>
              <div
                className={`${styles.batteryIndicator} ${
                  batteryLevel <= 25 && styles.low
                } ${50 > batteryLevel && batteryLevel > 25 && styles.medium} ${
                  batteryLevel >= 50 && styles.high
                }`}
                style={{
                  // @ts-ignore
                  "--battery": batteryLevel + "%",
                }}
              ></div>
            </div>
          </div>
          <span>{`${batteryLevel} %`}</span>
        </div>
        <Link to={uuid ? "/rooms/" + uuid + "/" : "/"} className={styles.link}>
          Voir la pièce
        </Link>
      </footer>
    </article>
  );
};

export default RoomCard;
