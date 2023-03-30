import { useContext } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate, useParams } from "react-router-dom";
import notificationContext from "../../../contexts/notificationContext";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { GroupType } from "../../../../types/GroupType";

const EditGroup = () => {
  const { uuid } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [groups, setGroups] = useLocalStorage<GroupType[]>("groups", []);

  const currentGroup: GroupType | undefined = groups.find(
    (group) => group.uuid.toString() === uuid
  );
  const groupsWithoutCurrent: GroupType[] = groups.filter(
    (group) => group.uuid.toString() !== uuid
  );

  const { setNotification } = useContext(notificationContext);

  if (!currentGroup) {
    setNotification({
      show: true,
      type: "error",
      text: "Ce groupe n'existe pas",
    });

    redirect("/groups");
    return <></>;
  }

  useEffectOnce(() => {
    window.scrollTo(0, 0);
  });

  const onSubmit = (formData: any) => {
    if (!formData.name) {
      setNotification({
        show: true,
        type: "error",
        text: "Veuillez renseigner un nom pour votre groupe",
      });
      return;
    }

    const updatedGroup = {
      uuid: currentGroup.uuid,
      name: formData.name,
    };

    setGroups([...groupsWithoutCurrent, updatedGroup]);
    setNotification({
      show: true,
      type: "success",
      text: "Groupe modifié avec succès !",
    });
    navigate("/rooms");
  };

  return (
    <main className="reveal">
      <h1 className="pageTitle">Groupe - {currentGroup.name}</h1>
      <section className="section">
        <h2 className="sectionTitle">Informations</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="label">Modifier le nom de votre groupe</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Nom du groupe"
              defaultValue={currentGroup.name}
              className="input"
            />
          </div>
          <button type="submit" className="bigButton">
            Modifier le groupe
          </button>
        </form>
      </section>
    </main>
  );
};

export default EditGroup;
