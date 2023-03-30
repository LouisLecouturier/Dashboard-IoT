import styles from "./EditRoom.module.scss";

import { useContext, useEffect, useState } from "react";
import InfoMessage from "../../../components/shared/Feedback/InfoMessage";
import BoxSelector from "../../../components/shared/Inputs/Selector";

import { useForm } from "react-hook-form";

import { redirect, useNavigate, useParams } from "react-router-dom";
import notificationContext from "../../../contexts/notificationContext";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { DeviceType } from "../../../../types/DeviceType";
import { RoomType } from "../../../../types/RoomType";

const CreateRoom = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { setNotification } = useContext(notificationContext);

  const { register, handleSubmit, setValue } = useForm();

  const [color, setColor] = useState("#33c9cc");
  const [colorValue, setColorValue] = useState(null);

  const [rooms, setRooms] = useLocalStorage<RoomType[]>("rooms", []);
  const currentRoom: RoomType | undefined = rooms.find(
    (room) => room.uuid.toString() === uuid
  );

  if (!currentRoom) {
    setNotification({
      show: true,
      type: "error",
      text: "Cette pièce n'existe pas",
    });
    redirect("/rooms");
    return <></>;
  }

  const roomsWithoutCurrent: RoomType[] = rooms.filter(
    (room) => room.uuid.toString() !== uuid
  );


  const [devices, setDevices] = useLocalStorage<DeviceType[]>("devices", []);
  const roomsDevices: number[] = devices.filter(
    (device) => device.roomUuid === currentRoom.uuid
    )?.map((device) => device.uuid);
  const [selection, setSelection] = useState<number[]>(roomsDevices);
  const [unAssignedDevices, setUnAssignedDevices] = useState<DeviceType[]>([]);
  const [newDevices, setNewDevices] = useState<DeviceType[]>([]);

  useEffect(() => {
    // @ts-ignore
    setColorValue({ "--color": color });
  }, [color]);

  useEffectOnce(() => {
    window.scrollTo(0, 0);

    if (devices) {
      setUnAssignedDevices(
        devices.filter((device) => !device.roomUuid && device.name)
      );
      setNewDevices(
        devices.filter((device) => !device.roomUuid && !device.name)
      );
    }
  });

  const onSubmit = (formData: any) => {
    let updatedRoom = {
      ...currentRoom,
      ...formData,
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
        roomUuid: currentRoom.uuid,
      }));

      setDevices([...devicesWithoutSelection, ...devicesToPass]);
    }

    setRooms([...roomsWithoutCurrent, updatedRoom]);
    setNotification({
      show: true,
      type: "success",
      text: "Salle créée avec succès !",
    });
    navigate("/rooms");
  };

  return (
    <main>
      <h1 className="pageTitle">{currentRoom.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="section">
          <h2 className="sectionTitle">Informations</h2>
          <div className="form-group">
            <label className="label">Nom de la pièce</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Nom de la pièce"
              defaultValue={currentRoom.name}
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
                value={currentRoom.color}
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
            <h2 className="sectionTitle">Gérer les appareils de la pièce</h2>

            {newDevices.length > 0 && (
              <InfoMessage
                type="warning"
                message="Certains appareils sont en attente d'être configurés, configurez les
          avant de pouvoir les assigner à une pièce"
                link="/devices"
                linkText="C'est parti !"
              />
            )}
            {devices.length > 0 && (
              <>
                <div className={styles.list}>
                  {devices.map((device) => {
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
                <section className="section">
                  <button type="submit" className="bigButton">
                    Modifier la pièce
                  </button>
                </section>
              </>
            )}
          </section>
        )}
      </form>
    </main>
  );
};

export default CreateRoom;
