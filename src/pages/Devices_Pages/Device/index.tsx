import Selector from "../../../components/shared/Inputs/Selector";

import styles from "./Device.module.scss";
import { useForm } from "react-hook-form";

import { useContext, useMemo, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import notificationContext from "../../../contexts/notificationContext";
import InfoMessage from "../../../components/shared/Feedback/InfoMessage";
import {
  useEffectOnce,
  useLocalStorage,
  useReadLocalStorage,
} from "usehooks-ts";

import { RoomType } from "../../../../types/RoomType";
import { DeviceType } from "../../../../types/DeviceType";

const Device = () => {
  const { uuid } = useParams();
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const rooms = useReadLocalStorage<RoomType[]>("rooms");
  const [room, setRoom] = useState<number[]>([]);
  const [devices, setDevices] = useLocalStorage<DeviceType[]>("devices", []);

  const currentDevice: DeviceType | undefined = useMemo(
    () => devices.find((device) => device.uuid.toString() === uuid),
    [uuid]
  );
  const { setNotification } = useContext(notificationContext);

  if (!currentDevice) {
    setNotification({
      show: true,
      type: "error",
      text: "Cet appareil n'existe pas",
    });
    redirect("/devices");


    return <></>
  }

  const devicesWithoutCurrent: DeviceType[] = useMemo(
    () => devices.filter((device) => device.uuid.toString() !== uuid),
    [uuid]
  );

  useEffectOnce(() => {
    window.scrollTo(0, 0);
    currentDevice.roomUuid ? setRoom([currentDevice.roomUuid]) : setRoom([]);
  });

  const handleAssignment = () => {
    if (room[0]) {
      currentDevice.roomUuid = room[0];
      setDevices([...devicesWithoutCurrent, currentDevice]);
      setNotification({
        show: true,
        type: "success",
        text: "Appareil associé avec succès !",
      });
      return navigate("/devices");
    }

    setNotification({
      show: true,
      type: "error",
      text: "Veuillez sélectionner une pièce",
    });
  };

  const handleUpdate = (formData: any) => {
    currentDevice.name = formData.name;
    setDevices([...devicesWithoutCurrent, currentDevice]);
    setNotification({
      show: true,
      type: "success",
      text: "Appareil modifié avec succès !",
    });
    return navigate("/devices");
  };
  const handleUnpair = () => {
    currentDevice.roomUuid = undefined;
    currentDevice.name = undefined;

    setDevices([...devicesWithoutCurrent, currentDevice]);
    setNotification({
      show: true,
      type: "success",
      text: "Appareil dissocié avec succès !",
    });
    return navigate("/devices");
  };

  return (
    <main>
      <div className="head">
        <h1 className="pageTitle">{currentDevice.name}</h1>
      </div>
      <section className="section">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <h2 className="sectionTitle">Informations</h2>
          <div className="form-group">
            <label className="label">Nom</label>
            <input
              defaultValue={currentDevice.name}
              {...register("name")}
              type="text"
              className="input"
              placeholder="Nom de l'appareil"
            />
          </div>
          <button type="submit" className="button">
            Modifier
          </button>
        </form>
      </section>

      <section className="section">
        <h2 className="sectionTitle">Pièce</h2>
        {rooms && rooms.length > 0 ? (
          <>
            <div className={`form-group ${styles.list}`}>
              {rooms.map((instance) => {
                return (
                  <Selector
                    type="radio"
                    key={instance.uuid}
                    name={instance.name}
                    id={instance.uuid}
                    group={instance.groupUuid}
                    selection={room}
                    setSelection={setRoom}
                  />
                );
              })}
            </div>
            <button type="submit" onClick={handleAssignment} className="button">
              Assigner
            </button>
          </>
        ) : (
          <InfoMessage
            type="warning"
            title="Vous n'avez pas créé de pièce"
            message="Cet appareil ne peut être assigné à aucune pièce"
          />
        )}
      </section>
      <section className="section">
        <h2 className="sectionTitle">Actions sur votre appareil</h2>
        <div className="row">
          <div onClick={handleUnpair} className="bigButton errorButton">
            Oublier l'appareil
          </div>
        </div>
      </section>
    </main>
  );
};

export default Device;
