import { FC, useState } from "react";
import styles from "./deletePopup.module.scss";


type DeletePopupProps = {
  textToWrite: string;
  callback: () => void;
};

const DeletePopup: FC<DeletePopupProps> = ({ textToWrite, callback }) => {
  const [content, setContent] = useState("");

  return (
    <article className={`${styles.container} reveal`}>
      <h2 className="title">Supprimer le compte</h2>
      <p>Cette action supprimera votre compte de manière définitive.</p>

      <div className="form-group full-width">
        <label className="label">Recopiez le texte affiché ci-dessous :</label>
        <p className={styles.textToWrite}>{textToWrite}</p>
        <input
          onChange={(e) => setContent(e.target.value)}
          placeholder={textToWrite && textToWrite}
          className="secondary-input"
        />
      </div>
      <button
        className={`button ${
          content === textToWrite ? "outlined-error" : "disabled"
        }`}
        onClick={() => {
          content === textToWrite && callback();
        }}
      >
        Supprimer
      </button>
    </article>
  );
};

export default DeletePopup;
