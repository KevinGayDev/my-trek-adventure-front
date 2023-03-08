import { useState, useContext } from "react";
import { Link } from 'react-router-dom';

import Button from "../components/atoms/Button";
import Login from "../components/organisms/Login";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { UserConnect } from "../App";

import Logo_Google from "../pictures/logo_GooglePlay.png";
import Logo_Apple from "../pictures/logo_AppleStore.png";

function Home() {
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const {userLog} = useContext(UserConnect);

  return (
    <div>
      {userLog && (
        <>
          <Topbar />
        </>
      )}
      <p>Vous êtes client ? </p>
      <p>Une application est disponible pour vous sur le Google Play Store pour Android et sur l'Apple Store pour IOS.</p>
      <div>
        <img src = {Logo_Google} alt = "Logo Google Play Store"></img>
        <img src = {Logo_Apple} alt = "Logo Apple Store"></img>
      </div>
      {!userLog && (
        <>
        {!displayLoginForm && (
          <Button onClick={() => setDisplayLoginForm(true)}> Afficher le formulaire </Button>
        )}
        {displayLoginForm && (
          <Login />
        )}
        </>
      )}
      {userLog && (
        <div>
          <p>Bienvenue dans l'espace dédié au rôle {userLog.role}.</p> 
          <p>A partir d'ici, ou dans la barre de navigation, vous pouvez accéder à différentes fonctions.</p> 
          <ul>
            <li>Vous pouvez accéder <Link to="/parcours/">aux différents parcours</Link> pour en créer de nouveaux, les modifier pour rajouter des étapes ou changer des infomrations ,et égalmeent les modifier.</li>
            <li>Vous pouvez accéder <Link to="/treks/">aux différentes dates disponibles</Link> pour les parcours, en créer de nouvelles, les modifier ou les supprimer.</li>
            <li>Vous pouvez accéder à la <Link to="/guides/">liste des guides</Link> inscrits, où vous pourrez ajouter un nouveau guide, modifier des profils, ou supprimer des guides.</li>
            <li>Vous pouvez accéder à la <Link to="/clients/">liste des clients</Link> inscrits.</li>
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
