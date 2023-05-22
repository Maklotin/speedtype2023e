import planB from "./plan_b.json";
import logo from './bilder/logo.png';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useNavigate, useAsyncError } from "react-router-dom";




const Main = () => {
  const [aktivSide, setAktivSide] = useState('LoggInn');

  const [form, setForm] = useState({
    brukernavn: "",
    passord: "",
  })
  const [highscore, setHighscore] = useState("");

  const navigate = useNavigate(); 
  async function onSubmit(e) {
    e.preventDefault();

    // Denne lager en ny bruker i databasen etter en POST request er laget
    const nyBruker = { ...form }

    //sender formen til denne linken slik at Node kan fetche form informasjonen og sende til mongodb databasen
    await fetch("http://127.0.0.1:5005/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nyBruker),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

      setForm({ brukernavn: "", passord: ""});
      navigate("/");

  }

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });

  }

  const LoggInn = () => {
    return (
      <>
        <h1>Logg inn</h1>
        <input type="text" placeholder="brukernavn" className="input_text" />
        <div className="passord">
          <input type="password" placeholder="passord" className="input_text" />
          <FontAwesomeIcon className="eye_icon" icon={faEyeSlash} id="eye_icon1" />
        </div>
        <p id="passordTekst">tom</p>
        <div className="knapper">
          <button className="knapper_login">
            <p>Logg Inn</p>
          </button>
          <button
            onClick={() => setAktivSide('RegistrerBruker')}
            className="knapper_login"
          >
            <p>Registrer deg</p>
          </button>
        </div>
      </>
    );
  };

  //REGISTRER BRUKER

  var passordTekstT = ""
  var psrdInput = ""
  var bekreftPsrdInput = ""

  function sjekkPassord() {
    if (psrdInput.value === bekreftPsrdInput.value) {
      updateForm({ passord: psrdInput})
    } else {
      passordTekstT = "Passordet matcher ikke!"
    }
  }

  const RegistrerBruker = () => {
    return (
      <>
      <h1>Registrer Bruker</h1>
        <form onSubmit={onSubmit}>
          {/* BRUKERNAVN */}
          <input type="text" onChange={(e) => updateForm({ brukernavn: e.target.value })} value={form.brukernavn} placeholder="brukernavn" className="input_text" />¨
          {/* PASSORD */}
          <div className="passord">
            <input type="password" placeholder="passord" className="input_text" id={psrdInput} />
            <FontAwesomeIcon className="eye_icon" icon={faEye} id="eye_icon1" />
          </div>
          <input type="password" placeholder="bekreft passord" className="input_text" id={bekreftPsrdInput} />
          <p id="passordTekst">{passordTekstT}</p>
          <div className="knapper">
            <button className="knapper_login" onClick={() => setAktivSide('LoggInn')}>
              <p>Tilbake Til Logg Inn</p>
            </button>
            <button
              className="knapper_login" type="submit">
              <p>Registrer brukeren</p>
            </button>
          </div>
        </form>
      </>
    );
  };


  return (
    <div className="App">
      <header className="App-header">
        <div id="topp">
          <img id="logoen" width={300} src={logo}></img>
        </div>
        {aktivSide === 'LoggInn' ? <LoggInn /> : <RegistrerBruker />}
      </header>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  )
}


export default App;
