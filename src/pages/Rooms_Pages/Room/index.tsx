import InfoMessage from "../../../components/shared/Feedback/InfoMessage";
import DataCard from "../../../components/shared/Cards/DataCard";
import BoxCard from "../../../components/shared/Cards/BoxCard";

import styles from "./Room.module.scss";

import { ReactComponent as Edit } from "../../../assets/icons/Edit.svg";
import { ReactComponent as Delete } from "../../../assets/icons/Delete.svg";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";
import { ReactComponent as Check } from "../../../assets/icons/Success.svg";

import { useContext, useEffect, useMemo, useState } from "react";
import CategorySelector from "../../../components/shared/Inputs/CategorySelector";
import LineChart from "../../../components/shared/Chart";
import Switch from "../../../components/shared/Inputs/Switch";
import { redirect, useNavigate, useParams } from "react-router-dom";

import { computeAverage } from "../../../utils/computeAverage";

import notificationContext from "../../../contexts/notificationContext";
import { useForm } from "react-hook-form";
import {
  useEffectOnce,
  useLocalStorage,
  useReadLocalStorage,
} from "usehooks-ts";
import { DeviceType } from "../../../../types/DeviceType";
import { RoomType } from "../../../../types/RoomType";
import { CategoryType } from "../../../../types/CategoryType";
import { DataSampleType } from "../../../../types/DataSampleType";
import { categories } from "../../../initialData";
import dayjs from "dayjs";
import { ChartData } from "chart.js/auto";
import { toggleSamplingOfRoom } from "../../../utils/toggleSamplingOfRoom";

const Room = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit} = useForm();
  const { setNotification } = useContext(notificationContext);

  const [sampling, setSampling] = useState(false);
  const [timeChanged, setTimeChanged] = useState(false);
  const [rooms, setRooms] = useLocalStorage<RoomType[]>("rooms", []);
  const room = useMemo(
    () => rooms && rooms.find((room) => room.uuid.toString() === uuid),
    [uuid]
  );

  if (!room) {
    setNotification({
      show: true,
      type: "error",
      text: "Cette pièce n'existe pas",
    });
    redirect("/rooms");
    return <></>;
  }


  const [devices, setDevices] = useLocalStorage<DeviceType[]>("devices", []);
  const roomsDevices = useMemo(
    () =>
      devices &&
      devices.filter((device) => {
        if (uuid) return device.roomUuid === parseInt(uuid);

        return false;
      }),
    [uuid]
  );
  const devicesNotInRoom: DeviceType[] | null = useMemo(
    () =>
      devices &&
      devices.filter((device) => {
        if (uuid) {
          return !(device.roomUuid === parseInt(uuid));
        }
        return false;
      }),
    [uuid]
  );

  const [selectedDeviceUuid, setSelectedDeviceUuid] = useState<number | null>(
    null
  );

  const data = useReadLocalStorage<DataSampleType[]>("data_samples");
  const [last, setLast] = useState<DataSampleType | null>(null);

  const [category, setCategory] = useState<CategoryType>(categories[0]);

  const onlyNumbers = (e: any) => {
    if (!timeChanged) {
      setTimeChanged(true);
    }
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
  };
  const [chartData, setChartData] = useState<
    ChartData<"line", number[], string>
  >({
    labels: [],

    datasets: [
      {
        label: "--",
        fill: true,
        backgroundColor: "hsla(181, 60%, 50%, 0.1)",
        borderColor: "hsl(181, 60%, 50%)",
        data: [],
        // @ts-ignore
        lineTension: 0.24,
      },
    ],
  });

  useEffectOnce(() => {
    window.scrollTo(0, 0);
    setLast(data && data[data.length - 1]);
    setSampling(room.sampling);
  });

  useEffect(() => {
    if (data && data.length > 0 && category) {
      setSelectedValues(
        data.map((data) => {
          //@ts-ignore
          return data[category.name];
        })
      );

      setChartData({
        labels: data.map((data) => {
          return dayjs(data.timestamp).format("HH:mm");
        }),

        datasets: [
          {
            label: category.displayName,
            fill: true,
            backgroundColor: "hsla(181, 60%, 50%, 0.1)",
            borderColor: "hsl(181, 60%, 50%)",
            data: data.map((data) => {
              //@ts-ignore
              return data[category.name];
            }),
            // @ts-ignore

            lineTension: 0.24,
          },
        ],
      });
    }
  }, [data, category]);

  const selectDevice = (uuid: number) => {
    setSelectedDeviceUuid(uuid);
  };

  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const handleEdit = () => {
    if (uuid) {
      navigate(`/rooms/${uuid}/edit`);
    }
  };

  const handleDelete = () => {
    if (
      uuid &&
      roomsDevices &&
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette pièce ? Cela entrainera l'oubli des appareils qui y sont assignées"
      )
    ) {
      setRooms(rooms.filter((room) => room.uuid.toString() !== uuid));
      const unassigned: DeviceType[] = roomsDevices.map((device) => {
        device.roomUuid = undefined;
        return device;
      });

      setDevices([...devicesNotInRoom, ...unassigned]);

      setNotification({
        show: true,
        type: "success",
        text: "Salle supprimée avec succès !",
      });
      navigate("/devices");
    }
  };

  const onSubmit = () => {
    setTimeChanged(false);
    setNotification({
      show: true,
      type: "success",
      text: "Intervalle de relevé mis à jour",
    });
  };

  const handleSampling = () => {
    if (!toggleSamplingOfRoom(rooms, setRooms, room.uuid)) {
      setNotification({
        show: true,
        type: "error",
        text: "Une erreur est survenue",
      });
      return;
    }

    setNotification({
      show: true,
      type: "info",
      text: `Relevés dans ${room.name} ${!sampling ? "ON" : "OFF"}`,
    });
  };

  // @ts-ignore
  return (
    <main>
      <header className={styles.pageHead}>
        <div className={`row ${styles.headRow}`}>
          <div className={`row ${styles.topRow}`}>
            <div
              className={styles.color}
              style={
                //@ts-ignore
                { "--color": room.color }
              }
            ></div>
            <h2 className="pageTitle">{room.name}</h2>
          </div>
          <Switch
            styling="bigSwitch"
            callback={handleSampling}
            state={sampling}
            setState={setSampling}
          />
        </div>
        <div className={styles.actions}>
          <Edit className={styles.edit} onClick={handleEdit} />
          <Delete className={styles.delete} onClick={handleDelete} />
        </div>
      </header>
      {roomsDevices && roomsDevices.length > 0 ? (
        <section className="section">
          <h2 className="sectionTitle">Sélectionnez une boite</h2>
          <div className={`row wrap ${styles.row}`}>
            {roomsDevices.map((device, index) => {
              return (
                <BoxCard
                  key={index}
                  uuid={device.uuid}
                  macAddress={device.macAddress}
                  name={device.name}
                  type="selection"
                  selectedBox={selectedDeviceUuid}
                  setSelectedBox={selectDevice}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <InfoMessage
          type="warning"
          title="Aucun appareil n'est assigné à cette pièce"
          link="/devices"
          linkText="Ajouter un ou plusieurs appareils"
        />
      )}
      {selectedDeviceUuid && (
        <div className="reveal">
          <section className="section">
            <h2 className="sectionTitle">Informations</h2>
            <section className={styles.messages}>
              {sampling ? (
                <InfoMessage
                  type="success"
                  title="Tout roule !"
                  message="Les appareils de cette pièce fonctionnent normalement"
                />
              ) : (
                <InfoMessage
                  type="error"
                  title="Relevés désactivés dans cette pièce"
                  message="Vous avez désactivé les relevés dans cette pièce, réactivez-les pour voir les données actualisées"
                />
              )}
            </section>
          </section>
          <section className="section">
            <h2 className="sectionTitle">Relevés</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="form-group">
              <label className="label">Intervalle de relevés</label>
              <div className={styles.intervalRow}>
                <div className="input timeInput">
                  <input
                    {...register("hours")}
                    type="text"
                    defaultValue={1}

                    onChange={(e) => onlyNumbers(e)}
                    maxLength={2}
                  />
                  <span>h</span>
                  <input
                    {...register("minutes")}
                    type="text"
                    maxLength={2}
                    defaultValue={0}
                    onChange={(e) => onlyNumbers(e)}
                  />
                  <span>min</span>
                  <input
                    {...register("seconds")}
                    type="text"
                    maxLength={2}
                    defaultValue={0}

                    onChange={(e) => onlyNumbers(e)}
                  />
                  <span>sec</span>
                </div>
                {timeChanged && (
                  <button
                    type="submit"
                    className={`${styles.intervalBtn} reveal`}
                  >
                    <Check />
                  </button>
                )}
              </div>
            </form>
            <div className="list">
              <DataCard
                type="plain"
                title="Relevés aujourd'hui"
                value={data ? data.length : "--"}
              />
              <DataCard
                type="plain"
                title="Heure du dernier relevé"
                value={last ? dayjs(last.timestamp).format("HH:mm") : "--"}
              />
            </div>
            <section className={`section ${styles.dataSection}`}>
              <h2 className="sectionTitle">Données</h2>
              <CategorySelector
                categories={categories}
                selected={category}
                setSelected={setCategory}
              />

              {category && (
                <article className={`${styles.data} reveal`}>
                  <DataCard
                    title="Dernier relevé"
                    value={`${
                      //@ts-ignore
                      last ? last[category.name].toFixed(1) : "--"
                    } ${category.unit}`}
                  />
                  {category.name === "gas" && (
                    <div className="list">
                      <DataCard
                        type="good"
                        title="Présence de CO"
                        value="Non"
                      />
                      <DataCard
                        type="good"
                        title="Présence de Butane"
                        value="Non"
                      />
                      <DataCard
                        type="bad"
                        title="Présence de Propane"
                        value="Oui"
                      />
                    </div>
                  )}

                  <article className={styles.tracking}>
                    <header className={styles.header}>
                      <h2>{`${category.displayName} ${category.unit}`}</h2>
                      <div className={styles.dateSelector}>
                        <Arrow className={styles.previous} />
                        <span className={styles.day}>Aujourd'hui</span>
                        <Arrow className={styles.next} />
                      </div>
                    </header>
                    <div className="list">
                      <DataCard
                        type="minTemp"
                        title={`${category.displayName} min`}
                        value={`${
                          selectedValues.length > 0
                            ? Math.min(...selectedValues).toFixed(1)
                            : "--"
                        } ${category.unit}`}
                      />
                      <DataCard
                        type={
                          ["temperature", "humidity"].includes(category.name)
                            ? "temperature"
                            : "plain"
                        }
                        title={`${category.displayName} moy`}
                        value={`${
                          selectedValues.length > 0
                            ? computeAverage(selectedValues).toFixed(1)
                            : "--"
                        } ${category.unit}`}
                      />
                      <DataCard
                        type="maxTemp"
                        title={`${category.displayName} max`}
                        value={`${
                          selectedValues.length > 0
                            ? Math.max(...selectedValues).toFixed(1)
                            : "--"
                        } ${category.unit}`}
                      />
                      <LineChart
                        className={styles.chart}
                        chartData={chartData}
                        min={0}
                        max={Math.round(
                          Math.ceil(Math.max(...selectedValues)) +
                            (10 - (Math.ceil(Math.max(...selectedValues)) % 10))
                        )}
                      />
                    </div>
                  </article>
                </article>
              )}
            </section>
          </section>
        </div>
      )}
    </main>
  );
};

export default Room;
