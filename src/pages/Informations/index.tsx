import styles from "./Informations.module.scss";
import { useEffectOnce } from "usehooks-ts";

const Informations = () => {
  useEffectOnce(() => {
    window.scrollTo(0, 0);
  });

  return (
    <main>
      <h1 className="pageTitle">Informations sur le projet</h1>
      <section className={`section ${styles.section}`}>
        <h2 className="sectionTitle">Le contexte de du projet</h2>
        <p>
          Ce Dashboard a été réalisé dans le cadre d’un projet en{" "}
          <strong>deuxième année d'ADIMAKER ISEN</strong>. L’objectif était de
          mettre un pied dans le monde des <strong>objets connectés</strong> et de l'<strong>IoT</strong>.
          Nous devions réaliser un objet permettant d’analyser la{" "}
          <strong>qualité d’une pièce</strong> à l’aide de différents{" "}
          <strong>capteurs</strong>.
        </p>
        <p>
          Pour pouvoir visualiser les données et gérer les différents objets,
          nous devions réaliser une page web synthétisant toutes les
          informations.
          <br />
          Je me suis occupé de toute cette partie pendant que les autres membres
          du groupe se sont concentrés sur la réalisation de l’objet en lui-même
          et la partie serveur (sur laquelle j'ai aussi un peu aidé).
        </p>
        <p>
          Le cahier des charges était très simple, nous n’avions pas besoin de{" "}
          <strong>styliser</strong> notre interface, ni d’
          <strong>animer</strong> et rendre le tout aussi{" "}
          <strong>interactif</strong>. Mais j’ai voulu aller beaucoup{" "}
          <i>(vraiment beaucoup)</i>&nbsp;&nbsp;
          <strong>plus loin que ce qui était demandé</strong> initialement 😁.
        </p>
      </section>
      <section className={`section ${styles.section}`}>
        <h2 className="sectionTitle">Réalisation</h2>
        <p>
          J’ai commencé par me faire une <strong>maquette sur Figma</strong>{" "}
          pour avoir une idée générale du style de design que je voulais créer.
          Une fois ma charte graphique définie, j’ai commencé à coder.
        </p>
        <p>
          Pour une telle application, <strong>ReactJS</strong> me paraissait
          être la meilleure solution. J’ai décomposé l’ensemble du projet en
          différents{" "}
          <strong>composants</strong>, et j'ai stylisé le tout avec les{" "}
          <strong>SCSS modules</strong>. L’application était liée à une{" "}
          <strong>API REST</strong>
          que nous avons créé avec <strong>
            Django-Rest-Framework
          </strong> et <strong>MariaDB</strong>.{" "}
        </p>
        <p>
          Une fois le projet terminé et présenté à notre jury, celui-ci à dormi
          un petit bout de temps sur mon <strong>GitHub</strong>... Mais étant
          fier de mon travail, je voulais le présenter dans mon{" "}
          <strong>portfolio</strong> 😉. Il m’a donc fallu{" "}
          <strong>réadapter tout mon projet</strong> pour qu’il fonctionne sans
          les boites connectés et sans son API.
          <br />
          J’ai alors décidé de migrer tout le projet sur <strong>
            ViteJS
          </strong>{" "}
          et <strong>TypeScript</strong> pour découvrir Vite et profiter des
          avantages de TypeScript. Toute la logique a donc été adaptée pour
          fonctionner <strong>en local</strong> en{" "}
          <strong>stockant de fausses données en localStorage</strong>.
        </p>
        <p>
          {" "}
          Et nous voilà donc <strong>aujourd’hui</strong>, un Dashboard
          totalement <strong>fonctionnel en local</strong> !
        </p>
      </section>
      <section className={`section ${styles.section}`}>
        <h2 className="sectionTitle">Axes d'amélioration</h2>
        <ul>
          <li>
            Rendre le projet <strong>Responsive</strong>
          </li>
          <li>
            <strong>Revoir l'architecture</strong> du projet React
          </li>
          <li>
            Ajouter des <strong>tests unitaires</strong>
          </li>
          <li>
            Créer un système d'<strong>authentification</strong>
          </li>
        </ul>
      </section>
      <section className={`section ${styles.section}`}>
        <h2 className="sectionTitle">Les technologies utilisées</h2>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>Dashboard</h3>
          <ul>
            <li>ReactJS</li>
            <li>ViteJS</li>
            <li>TypeScript</li>
            <li>SCSS modules</li>
            <li>pnpm</li>
          </ul>
        </div>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>Serveur</h3>
          <ul>
            <li>Python</li>
            <li>Django</li>
            <li>Django Rest Framework</li>
            <li>MariaDB</li>
          </ul>
        </div>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>L'objet connecté</h3>
          <ul>
            <li>Langage C</li>
            <li>ESP32</li>
            <li>Requêtes MQTT</li>
            <li>Captive Portal</li>
            <li>Différents capteurs</li>
          </ul>
        </div>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>Hosting</h3>
          <ul>
            <li>Raspberry Pi</li>
            <li>Linux Debian</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Informations;
