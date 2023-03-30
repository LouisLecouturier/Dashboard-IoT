import { NavLink } from "react-router-dom";


import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import { ReactComponent as DataReload } from "../../assets/icons/DataReload.svg";

import styles from "./Navbar.module.scss";
import { regenerateData } from "../../utils/regenerateData";
import { useContext } from "react";
import notificationContext from "../../contexts/notificationContext";
import { useReadLocalStorage } from "usehooks-ts";
import { UserDataType } from "../../../types/useData";

const Navbar = () => {
  const { setNotification } = useContext(notificationContext);


  const userData = useReadLocalStorage<UserDataType>("userData")

  const handleDataRegeneration = () => {
    if (regenerateData()) {
      setNotification({
        show: true,
        type: "success",
        text: "Données régénérées avec succès",
      });
      window.location.reload();
      return;
    }

    setNotification({
      show: true,
      type: "error",
      text: "Une erreur est survenue lors de la régénération des données",
    });

    return;
  };

  return (
    <aside className={styles.navbar}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.user}>
            <Avatar className={styles.userImg} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userData?.firstName ?? "Léa"}</span>
              <span className={styles.userName}>{userData?.lastName ?? "Crobate"}</span>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <nav className={styles.navigation}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.selected}`
              }
            >
              <span className={styles.text}>Tableau de bord</span>
            </NavLink>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.selected}`
              }
            >
              <span className={styles.text}>Vos pièces</span>
            </NavLink>
            <NavLink
              to="/devices"
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.selected}`
              }
            >
              <span className={styles.text}>Vos appareils</span>
            </NavLink>
            <NavLink
              to="/informations"
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.selected}`
              }
            >
              <span className={styles.text}>Informations</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.selected}`
              }
            >
              <span className={styles.text}>Paramètres</span>
            </NavLink>
          </nav>
        </div>
      </div>
      <div className={styles.misc}>
        <div
          className={`button ${styles.button}`}
          onClick={handleDataRegeneration}
        >
          <DataReload className={styles.icon}/>
          Régénérer les données
        </div>
        <div className={styles.credits}>
          <span>Réalisé par&nbsp;</span>
          <a
            href={"https://www.linkedin.com/in/louis-lecouturier/"}
            target={"_blank"}
          >
            Louis Lecouturier
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
