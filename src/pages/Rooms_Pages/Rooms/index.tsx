import InfoMessage from "../../../components/shared/Feedback/InfoMessage";
import BoxCard from "../../../components/shared/Cards/BoxCard";

import styles from "./Rooms.module.scss";

import { ReactComponent as Plus } from "../../../assets/icons/Plus.svg";
import { Link } from "react-router-dom";
import { useEffect,  useMemo } from "react";
import GroupContainer from "../../../components/shared/GroupContainer";

import { useReadLocalStorage } from "usehooks-ts";
import { GroupType } from "../../../../types/GroupType";
import { DeviceType } from "../../../../types/DeviceType";

const Rooms = () => {
  const groups = useReadLocalStorage<GroupType[]>("groups");
  const devices = useReadLocalStorage<DeviceType[]>("devices");

  const newDevices = useMemo(() => devices && devices.filter((device) => !device.roomUuid && !device.name), [devices]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <h1 className="pageTitle">Vos pièces</h1>
      {newDevices && (
        <section className="section">
          <h2 className="sectionTitle">Nouvelles connexions</h2>
          <InfoMessage
            type="success"
            title="Nouveaux appareils en attente"
            message="Une ou plusieurs boites se sont connectées à votre serveur et sont en attente d'être configurées"
          />
          <div className="list">
            {newDevices.map((box) => {
              return (
                <BoxCard
                  key={box.uuid}
                  uuid={box.uuid}
                  type="configuration"
                  macAddress={box.macAddress}
                />
              );
            })}
          </div>
        </section>
      )}
      <section className="section">
        <div className={`row ${styles.title}`}>
          <h2 className="sectionTitle">Vos groupes</h2>
          <Link to="/groups/create">
            <Plus className={styles.add} />
          </Link>
        </div>
        <div className="list">
            {groups && groups.length > 0 ? (
                groups.map((group) => {
                  return (
                      <GroupContainer
                          key={group.name}
                          uuid={group.uuid}
                          name={group.name}
                      />
                  );
                })
            ) : (
                <InfoMessage
                    type="info"
                    message="Vous n'avez créé aucun groupe"
                    link="/groups/create"
                    linkText="En créer un"
                />
            )}
        </div>
      </section>
    </main>
  );
};

export default Rooms;
