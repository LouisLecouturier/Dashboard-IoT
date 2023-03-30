import BoxCard from "../../../components/shared/Cards/BoxCard";
import InfoMessage from "../../../components/shared/Feedback/InfoMessage";
import { useEffectOnce, useReadLocalStorage } from "usehooks-ts";
import { DeviceType } from "../../../../types/DeviceType";

const Devices = () => {
  const devices = useReadLocalStorage<DeviceType[]>("devices");

  const newDevices =
    devices && devices.filter((device) => !device.roomUuid && !device.name);

  const pendingDevices =
    devices && devices.filter((device) => !device.roomUuid && device.name);

  const assignedDevices =
    devices && devices.filter((device) => device.roomUuid);


  useEffectOnce(() => {
      console.log(devices);
  });

  return (
    <main className="reveal">
      <h1 className="pageTitle">Vos appareils</h1>
      {newDevices && newDevices.length !== 0 && (
        <section className="section">
          <h2 className="sectionTitle">Nouvelles connexions</h2>
          <InfoMessage
            type="success"
            title="Nouveaux appareils en attente"
            message="Une ou plusieurs boites se sont connectées à votre serveur et sont en attente d'être configurées"
          />
          <div className="list">
            {newDevices.map((device) => {
              return (
                <BoxCard
                  key={device.uuid}
                  type="configuration"
                  uuid={device.uuid}
                  macAddress={device.macAddress}
                />
              );
            })}
          </div>
        </section>
      )}
      {pendingDevices && pendingDevices.length > 0 && (
        <section className="section">
          <h2 className="sectionTitle">En attente d'assignation</h2>

          <div className="list">
            {pendingDevices.map((device) => {
              return (
                <BoxCard
                  key={device.uuid}
                  uuid={device.uuid}
                  name={device.name}
                  macAddress={device.macAddress}
                  type="link"
                  link={`/devices/${device.uuid}`}
                />
              );
            })}
          </div>
        </section>
      )}
      <section className="section">
        <h2 className="sectionTitle">Vos appareils</h2>

        {assignedDevices && assignedDevices.length > 0 ? (
          <div className="list">
            {assignedDevices.map((device) => {
              return (
                <BoxCard
                  key={device.uuid}
                  uuid={device.uuid}
                  name={device.name}
                  macAddress={device.macAddress}
                  type="link"
                  link={`/devices/${device.uuid}`}
                />
              );
            })}
          </div>
        ) : (
          <InfoMessage type="info" message="Aucune boite n'a été assignée" />
        )}
      </section>
    </main>
  );
};

export default Devices;
