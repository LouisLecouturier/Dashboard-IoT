import GroupContainer from "../../components/shared/GroupContainer";
import InfoMessage from "../../components/shared/Feedback/InfoMessage";
import DataCard from "../../components/shared/Cards/DataCard";
import BoxCard from "../../components/shared/Cards/BoxCard";
import Connection from "../../components/shared/Feedback/Connection";

import styles from "./Dashboard.module.scss";

import { ReactComponent as Plus } from "../../assets/icons/Plus.svg";

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useEffectOnce, useReadLocalStorage } from "usehooks-ts";
import { DeviceType } from "../../../types/DeviceType";
import { GroupType } from "../../../types/GroupType";

const Index = () => {
  const groups = useReadLocalStorage<GroupType[]>("groups");
  
  const devices = useReadLocalStorage<DeviceType[]>("devices");
  const newDevices = useMemo(
    () =>
      devices && devices.filter((device) => !device.roomUuid && !device.name),
    [devices]
  );

  const count = 18;

  useEffectOnce(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="relative">
      <Connection />
      <h1 className="pageTitle">Tableau de bord</h1>
      {newDevices?.length !== 0 && (
        <section className="section">
          <h2 className="sectionTitle">Nouvelles connexions</h2>
          <InfoMessage
            type="success"
            title="Nouveaux appareils en attente"
            message="Une ou plusieurs boites se sont connectées à votre serveur et sont en attente d'être configurées"
          />
          <div className="list">
            {newDevices?.map((box) => {
              return (
                <BoxCard
                  key={box.macAddress}
                  type="configuration"
                  uuid={box.uuid}
                  macAddress={box.macAddress}
                />
              );
            })}
          </div>
        </section>
      )}

      <section className="section">
        <h2 className="sectionTitle">Informations</h2>
        <section className={styles.messages}>
          <InfoMessage
            type="error"
            title="Erreur"
            message="Hey hey hey ! Je suis une gentille petite erreur ;)"
          />
          <InfoMessage
            type="success"
            title="You made it !"
            message="Vous êtes le/la meilleur(e) !"
          />
          <InfoMessage
            type="warning"
            title="Attention : Niveau de beauté élevé"
            message="Vous êtes très beau/belle aujourd'hui !"
          />
          <InfoMessage
            type="info"
            title="Info du jour :"
            message={`Vous avez ${count} relevés aujourd'hui !`}
          />
        </section>
        <section className={styles.summary}>
          <article className="list">
            <DataCard type="plain" title="Relevés aujourd'hui" value={count} />
            <DataCard type="alerts" title="Alertes" value="0" />
          </article>
        </section>
      </section>

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
              linkText="Gérer les groupe"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
