import styles from "./BoxCard.module.scss";
import { ReactComponent as Box } from "../../../../assets/icons/Box.svg";
import { Link } from "react-router-dom";
import { FC } from "react";


type BoxCardProps = {
    type: "selection" | "configuration" | "assign" | "link";
    uuid: number;
    selectedBox?: number | null
    setSelectedBox?: (uuid: number) => void;
    link?: string;
    name?: string;
    macAddress?: string;
}


const BoxCard: FC<BoxCardProps> = ({
  type,
  uuid,
  selectedBox,
  setSelectedBox,
  link,
  name,
  macAddress,
}) => {
  return (
    <article
      className={`${styles.container} ${selectedBox === uuid ? styles.containerSelected : ""}`}
      onClick={() => type === "selection" && setSelectedBox && setSelectedBox(uuid)}
    >
      <Box className={styles.icon} />
      {type === "configuration" && (
        <>
          <span className={styles.text}>{name ?? macAddress}</span>
          <Link to={`/devices/${uuid && uuid}/configure`} className="button">
            Configurer
          </Link>
        </>
      )}
      {type === "assign" && (
        <>
          <span className={styles.text}>{name ?? macAddress}</span>
          <Link to={`/devices/${uuid}/configure`} className="button">
            Configurer
          </Link>
        </>
      )}

      {type === "selection" && (
        <>
          <span className={styles.text}>{name ?? macAddress}</span>
          <div className={`button ${selectedBox === uuid && styles.selected}`}>
            {selectedBox === uuid ? "Sélectionnée" : "Sélectionner"}
          </div>
        </>
      )}
      {type === "link" && (
        <>
          <span className={styles.text}>{name ?? macAddress}</span>
          <Link to={link ?? "/"} className="button">
            Voir
          </Link>
        </>
      )}
    </article>
  );
};

export default BoxCard;
