import React, { useEffect, useState } from "react";
import './App.css';
import logo from './bilder/logo1-1.png'
import { db } from './backend/firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import lagBruker from "./lagBruker.js";


function Main() {
    const [aktivSideMain, setAktivSideMain] = useState("SpeedType")
    const [bruker, setBruker] = useState([])
    
    const usersCollectionRef = collection(db, "brukere")


    const [brukerLoggetInn, setBrukerLoggetInn] = useState(false)

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
            <lagBruker />
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