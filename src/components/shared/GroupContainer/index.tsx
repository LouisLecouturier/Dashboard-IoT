import RoomCard from "../Cards/RoomCard";
import styles from "./GroupContainer.module.scss";

import { ReactComponent as Plus } from "../../../assets/icons/Plus.svg";
import { ReactComponent as Delete } from "../../../assets/icons/Delete.svg";
import { ReactComponent as Edit } from "../../../assets/icons/Edit.svg";

import { useContext, FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import notificationContext from "../../../contexts/notificationContext";
import { useLocalStorage } from "usehooks-ts";
import { RoomType } from "../../../../types/RoomType";
import { GroupType } from "../../../../types/GroupType";
import { DeviceType } from "../../../../types/DeviceType";

type GroupContainerProps = {
  name: string;
  uuid: number;
};

const GroupContainer: FC<GroupContainerProps> = ({ name, uuid }) => {
  const [groups, setGroups] = useLocalStorage<GroupType[]>("groups", []);
  const [rooms, setRooms] = useLocalStorage<RoomType[]>("rooms", []);
  const groupRooms = useMemo(
    () =>
      rooms
        .filter((room) => room.groupUuid === uuid)
        .sort((a, b) => (a.uuid > b.uuid ? 1 : -1)),
    [rooms]
  );
  const roomsWithoutCurrent = rooms.filter((room) => room.groupUuid !== uuid);

  const navigate = useNavigate();

  const [devices, setDevices] = useLocalStorage<DeviceType[]>("devices", []);


  const { setNotification } = useContext(notificationContext);

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce groupe ? Cela entrainera la suppression des pièces et l'oubli des appareils qui leur sont assignés."
    );

    if (!shouldDelete) return;

    const devicesInGroup =
      devices &&
      devices.filter((device) => {
        return groupRooms.some((room) => room.uuid === device.roomUuid);
      });
    const devicesNotInGroup =
      devices &&
      devices.filter((device) => {
        return !groupRooms.some((room) => room.uuid === device.roomUuid);
      });

    let unpairedDevices: DeviceType[] = [];
    if (devicesInGroup) {
      unpairedDevices = devicesInGroup.map((device) => {
        device.roomUuid = undefined;
        return device;
      });
    }

    setDevices([...devicesNotInGroup, ...unpairedDevices]);
    setRooms(roomsWithoutCurrent);

    setGroups(groups.filter((b) => b.uuid !== uuid));
    setNotification({
      show: true,
      type: "success",
      text: "Groupe supprimé avec succès !",
    });
  };

  const handleEdit = () => {
    return navigate(`/groups/${uuid}/edit`);
  };

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link to={`/groups/${uuid}/edit`}>
          <h2 className={styles.name}>{name && name}</h2>
        </Link>
        <div className={styles.actions}>
          <Edit className={styles.edit} onClick={handleEdit} />
          <Delete className={styles.delete} onClick={handleDelete} />
        </div>
      </header>
      <div className="list">
        {groupRooms &&
            groupRooms.map((room) => {
            return <RoomCard key={room.uuid} uuid={room.uuid} />;
          })}

        <div className={styles.plusContainer}>
          <Link to={`/groups/${uuid}/rooms/create`}>
            <Plus className={styles.plus} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default GroupContainer;
