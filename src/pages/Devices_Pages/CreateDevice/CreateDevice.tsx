import { useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import notificationContext from "../../../contexts/notificationContext";
import { useLocalStorage } from "usehooks-ts";
import { DeviceType } from "../../../../types/DeviceType";

const CreateDevice = () => {
  const { uuid } = useParams();
  let navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { setNotification } = useContext(notificationContext);

  const [devices, setDevices] = useLocalStorage<DeviceType[]>("devices", []);
  const currentDevice = useMemo(
    () => devices.find((device) => device.uuid.toString() === uuid),
    [uuid]
  );
  const devicesWithoutCurrent = useMemo(
    () => devices.filter((device) => device.uuid.toString() !== uuid),
    [uuid]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (formData: any) => {
    if (currentDevice) {
      currentDevice.name = formData.name;
      setDevices([...devicesWithoutCurrent, currentDevice]);
      setNotification({
        show: true,
        type: "success",
        text: "Appareil créé avec succès !",
      });
      navigate("/devices");
    } else {
      setNotification({
        show: true,
        type: "error",
        text: "Une erreur est survenue",
      });
    }
  };
  return (
    <main>
      <h1 className="pageTitle">Configurer un nouvel appareil</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="section">
          <h2 className="sectionTitle">Informations</h2>
          <div className="form-group">
            <label className="label">Donnez un nom à votre appareil</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Nom de l'appareil"
              className="input"
            />
          </div>
        </section>
        <button type="submit" className="bigButton">
          Enregistrer
        </button>
      </form>
    </main>
  );
};

export default CreateDevice;
