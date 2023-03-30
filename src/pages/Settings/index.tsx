import styles from "./Settings.module.scss";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import DeletePopup from "../../components/shared/Feedback/deletePopup";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { UserDataType } from "../../../types/useData";
import notificationContext from "../../contexts/notificationContext";
import { regenerateData } from "../../utils/regenerateData";

const Settings = () => {
  const { register, handleSubmit } = useForm();
  const { setNotification } = useContext(notificationContext);

  const [userData, setUserData] = useLocalStorage<UserDataType>("userData", {});

  const [isShown, setIsShown] = useState(false);
  const onSubmit = (formData: UserDataType) => {
    if ([formData.email, formData.firstName, formData.lastName].includes("")) {
      setNotification({
        show: true,
        type: "error",
        text: "Veuillez remplir tous les champs",
      });
      return;
    }

    setUserData(formData);
    setNotification({
      show: true,
      type: "success",
      text: "Vos informations ont bien été modifiées",
    });
  };

  useEffectOnce(() => {
    window.scrollTo(0, 0);
  });

  const handleDelete = () => {
    setNotification({
      show: true,
      type: "success",
      text: "Votre compte a bien été supprimé",
    });

    regenerateData();
  };


  const handleLogout = () => {
    setNotification({
      show: true,
      type: "success",
      text: "Vous avez bien été déconnecté",
    });

    regenerateData();
  }

  return (
    <main>
      <h1 className="pageTitle">Paramètres</h1>
      <section className="section">
        <h2 className="sectionTitle">Votre compte</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`column ${styles.column}`}
        >
          <div className={`form-group ${styles.formGroup}`}>
            <label className="label">Nom et prénom</label>
            <div className={`row ${styles.row}`}>
              <input
                defaultValue={userData.lastName ?? ""}
                {...register("lastName")}
                className="input"
                placeholder="Nom"
              />
              <input
                defaultValue={userData.firstName ?? ""}
                {...register("firstName")}
                className="input"
                placeholder="Prénom"
              />
            </div>
          </div>
          <div className={`form-group ${styles.formGroup}`}>
            <label className="label">Adresse email</label>
            <input
              defaultValue={userData.email ?? ""}
              {...register("email")}
              className="input full-width"
              type="mail"
              placeholder="Email"
            />
          </div>
          <div className={`form-group ${styles.formGroup}`}>
            <label className="label">Modifier le mot de passe</label>
            <input
              type={"password"}
              className="input full-width"
              placeholder="Mot de passe actuel"
            />
            <input
              type={"password"}
              className="input full-width"
              placeholder="Nouveau mot de passe"
            />
            <input
              type={"password"}
              className="input full-width"
              placeholder="Confirmer nouveau mot de passe"
            />
          </div>
          <button type="submit" className="button">
            Modifier
          </button>
        </form>
      </section>
      <section className="section">
        <h2 className="sectionTitle">Action sur votre compte</h2>
        <p className={"no-margin"}>Dans cette version de test, cela régénérera uniquement les données</p>
        <div className={`row ${styles.row}`}>
          <div className="button" onClick={handleLogout}>Se déconnecter</div>
          <button
            className="button outlined-error"
            onClick={() => setIsShown(true)}
          >
            Supprimer le compte
          </button>
        </div>
      </section>

      {isShown && (
        <DeletePopup
          textToWrite="Supprimer le compte définitivement"
          callback={handleDelete}
        />
      )}
    </main>
  );
};

export default Settings;
