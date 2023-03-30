import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notificationContext from "../../../contexts/notificationContext";
import { useLocalStorage } from "usehooks-ts";
import { GroupType } from "../../../../types/GroupType";

const CreateBuilding = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [groups, setGroups] = useLocalStorage<GroupType[]>("groups", [])


  const { setNotification } = useContext(notificationContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (formData : any) => {


    if (!formData.name) {
        setNotification({
            show: true,
            type: "error",
            text: "Veuillez renseigner un nom pour votre groupe",
        });
        return;
    }

    const newGroup = {
        uuid: groups.length +1 ,
        name: formData.name,
    }


    setGroups([...groups, newGroup])
    setNotification({
      show: true,
      type: "success",
      text: "Groupe créé avec succès !",
    });
    navigate("/rooms")

  };

  return (
    <main className="reveal">
      <h1 className="pageTitle">Créer un nouveau groupe</h1>
      <section className="section">
        <h2 className="sectionTitle">Informations</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="label">Donnez un nom à votre groupe</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Nom du groupe"
              className="input"
            />
          </div>
          <button type="submit" className="bigButton">
            Créer le groupe
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateBuilding;
