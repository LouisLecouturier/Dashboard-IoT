import styles from "./CreateRoom.module.scss";

import { useContext, useEffect, useState } from "react";
import InfoMessage from "../../../components/shared/Feedback/InfoMessage";
import BoxSelector from "../../../components/shared/Inputs/Selector";

import { useForm } from "react-hook-form";

import { redirect, useNavigate, useParams } from "react-router-dom";
import notificationContext from "../../../contexts/notificationContext";
import { useLocalStorage } from "usehooks-ts";
import { DeviceType } from "../../../../types/DeviceType";
import { RoomType } from "../../../../types/RoomType";

const CreateRoom = () => {
  const { uuid } = useParams();
  if (!uuid) {
    redirect("/rooms")
    return <></>;
  }

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  const [color, setColor] = useState("#33c9cc");
  const [colorValue, setColorValue] = useState(null);

  const [rooms, setRooms] = useLocalStorage<RoomType[]>("rooms", []);

  const [selection, setSelection] = useState<number[]>([]);

  const [devices, setDevices] = useLocalStorage<DeviceType[]>("devices", []);
  const [unAssignedDevices, setUnAssignedDevices] = useState<DeviceType[]>([]);
  const [newDevices, setNewDevices] = useState<DeviceType[]>([]);

  const { setNotification } = useContext(notificationContext);

  useEffect(() => {
    // @ts-ignore
    setColorValue({ "--color": color });
  }, [color]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (devices) {
      setUnAssignedDevices(
        devices.filter((device) => !device.roomUuid && device.name)
      );
      setNewDevices(
        devices.filter((device) => !device.roomUuid && !device.name)
      );
    }
  }, []);

  const onSubmit = (formData: any) => {
    const roomUuid = rooms.length + 1;
    let dataToPass = {
      uuid: roomUuid,
      groupUuid: parseInt(uuid),
      ...formData,
      sampling: true,
    };

    if (selection && selection.length > 0) {
      const selectedDevices: DeviceType[] = [];

      selection.forEach((selection) => {
        const device = devices.find((device) => device.uuid === selection);
        if (device) {
          selectedDevices.push(device);
        }
      });

      const devicesWithoutSelection: DeviceType[] = [
        ...newDevices,
        ...unAssignedDevices,
      ].filter((device) => !selection.includes(device.uuid));
      const devicesToPass: DeviceType[] = selectedDevices.map((device) => ({
        ...device,
        roomUuid,
      }));

      setDevices([...devicesWithoutSelection, ...devicesToPass]);
    }

    setRooms([...rooms, dataToPass]);
    setNotification({
      show: true,
      type: "success",
      text: "Salle créée avec succès !",
    });
    navigate("/rooms");
  };

  return (
    <main>
      <h1 className="pageTitle">Créer une pièce</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="section">
          <h2 className="sectionTitle">Informations</h2>
          <div className="form-group">
            <label className="label">Nom de la pièce</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Nom de la pièce"
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Couleur de la pièce</label>
            {/* @ts-ignore */}
            <label htmlFor="color" style={colorValue} className="colorPicker">
              <input
                {...register("color")}
                type="color"
                id="color"
                value="#33c9cc"
                onChange={(e) => {
                  setValue("color", e.target.value);
                  setColor(e.target.value);
                }}
                className="colorPickerInput"
              />
            </label>
          </div>
        </section>
        {(unAssignedDevices || newDevices) && (
          <section className="section">
            <h2 className="sectionTitle">Ajouter des appareils à la pièce</h2>

            {newDevices.length > 0 && (
              <InfoMessage
                type="warning"
                message="Certains appareils sont en attente d'être configurés, configurez les
          avant de pouvoir les assigner à une pièce"
                link="/devices"
                linkText="C'est parti !"
              />
            )}
            {unAssignedDevices.length > 0 && (
              <>
                <div className={styles.list}>
                  {unAssignedDevices.map((device) => {
                    return (
                      <BoxSelector
                        key={device.macAddress}
                        type="checkbox"
                        id={device.uuid}
                        name={device.name ?? device.macAddress}
                        selection={selection}
                        setSelection={setSelection}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </section>
        )}
        <section className="section">
          <button type="submit" className="bigButton">
            Créer la pièce
          </button>
        </section>
      </form>
    </main>
  );
};

export default CreateRoom;
