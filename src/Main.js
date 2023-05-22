import React, { useEffect, useState, useCallback } from "react";
import './App.css';
import logo from './bilder/logo1-1.png'
import { db } from './backend/firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'


function Main() {
    const [aktivSideMain, setAktivSideMain] = useState("SpeedType")
    const [bruker, setBruker] = useState([])
    const usersCollectionRef = collection(db, "brukere")

    const [passordFelt1, setPassordFelt1] = useState("")
    const [passordFelt2, setPassordFelt2] = useState("")
    const [brukerLoggetInn, setBrukerLoggetInn] = useState(false)
    const [nyBrukernavn, setNyBrukernavn] = useState("")
    const [nyPassord, setNyPassord] = useState("")
    const [highscore, setHighscore] = useState(0)
    const [poeng, setPoeng] = useState(0);
    const [error, setError] = useState("")

    const lagBruker = async () => {
        if (passordFelt1 === passordFelt2) {
            setNyPassord(passordFelt1)
            await addDoc(usersCollectionRef, { brukernavn: nyBrukernavn, passord: nyPassord })
        } else {
            setError("Passordet matcher ikke!")
        }
    }

    const handleNyBrukernavnChange = useCallback(
        (event) => {
          setNyBrukernavn(event.target.value);
        },
        []
      );
    
      const handlePassordFelt1Change = useCallback(
        (event) => {
          setPassordFelt1(event.target.value);
        },
        []
      );
    
      const handlePassordFelt2Change = useCallback(
        (event) => {
          setPassordFelt2(event.target.value);
        },
        []
      );

    if (poeng < highscore) {
        setHighscore(poeng)
    } else { 
        
    }

    useEffect(() => {
        /*https://www.youtube.com/watch?v=jCY6DH8F4oc&t=853s*/

        const getBrukere = async () => {
            const data = await getDocs(usersCollectionRef)
            setBruker(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getBrukere()
    }, []);

    var avnsitt = "ingen tekst funnet"

    const LoggetInn = () => {
        return (
            <>
                <div id="f_spillet">
                    <img src={logo} alt="SpeedType logo" id="logo_speedtype"></img>
                    <hr id="kort_strek"></hr>
                    <div id="start_spill">
                        <button class="knapper"><h3>Start</h3></button>
                    </div>
                    <p>{avnsitt}</p>
                    <input className="ST_input" placeholder="skriv inn teksten her"></input>
                </div>
                <div id="highscores">
                    {bruker.map((bruker) => { return <div>
                         {" "}
                         <p>brukernavn: {bruker.brukernavn}</p>
                         </div> })}
                </div>
            </>
        )
    }

    const IkkeLoggetInn = () => {
        return (
            <>
                <div id="ikkeloggetinn">
                    <div id="logginn">
                        <h1>Logg Inn</h1>
                        <input className="ST_input" type="text" placeholder="brukernavn..."></input>
                        <input className="ST_input" type="password" placeholder="passord..."></input>
                        <button className="knapper"><p>Logg Inn</p></button>
                    </div>
                    <div id="lagnybruker">
                        <h1>Registrer Bruker</h1>
                        <input value={nyBrukernavn} onChange={handleNyBrukernavnChange} className="ST_input" type="text" placeholder="brukernavn"></input>
                        <input value={passordFelt1} onChange={handlePassordFelt1Change} className="ST_input" type="password" placeholder="passord"></input>
                        <input value={passordFelt2} onChange={handlePassordFelt2Change} className="ST_input" type="password" placeholder="bekreft passord"></input>
                        <p id="error">{error}</p>
                        <button onClick={lagBruker} className="knapper"><p>Registrer Bruker</p></button>
                    </div>
                </div> 
            </>
        )
    }

    const SpeedType = () => {
        if (brukerLoggetInn === true) {
            return <LoggetInn />
        } else {
            return <IkkeLoggetInn />
        }
    }


    const IntrVideo = () => {
        return (
            <>

            </>
        )

    }

    const FAQ = () => {
        return (
            <>

            </>
        )

    }

    const LoverOgRegler = () => {
        return (
            <>

            </>
        )

    }

    const AktivSideMainFunc = () => {
        switch (aktivSideMain) {
            case "IntrVideo":
                return <IntrVideo />;
            case "FAQ":
                return <FAQ />;
            case "LoverOgRegler":
                return <LoverOgRegler />;
            default:
                return <SpeedType />;
        }
    }

    return (
        <>
            {/* Navigasjonsbar */}
            
            <div id="top">

                <button onClick={() => setAktivSideMain("SpeedType")} className="knapper"><p>Spill</p></button>
                <button onClick={() => setAktivSideMain("IntrVideo")} className="knapper"><p>Instruksjonsvideo</p></button>
                <button onClick={() => setAktivSideMain("FAQ")} className="knapper"><p>FAQ</p></button>
                <button onClick={() => setAktivSideMain("LoverOgRegler")} className="knapper"><p>Lover og regler</p></button>
            </div>
            <hr className="strek"></hr>

            <AktivSideMainFunc />
        </>
    )

}


export default Main;