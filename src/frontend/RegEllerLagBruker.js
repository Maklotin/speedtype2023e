import React, { useContext, useEffect, useState } from "react";
import './App.css';
import { db } from '../backend/firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'

import { MainContext } from "../Main";


const getBrukere = async () => {
    const usersCollectionRef = collection(db, "brukere");
    const data = await getDocs(usersCollectionRef);
    const brukere = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return brukere;
};

const RegEllerLagBruker = () => {

    //registrer bruker
    const [passordFelt1, setPassordFelt1] = useState("")
    const [passordFelt2, setPassordFelt2] = useState("")
    const [nyBrukernavn, setNyBrukernavn] = useState("")
    const [nyPassord, setNyPassord] = useState("")

    //logg inn (In = Input, reg = registrert, ikke registrer)!
    const [brukernavnIn, setBrukernavnIn] = useState("")
    const [passordIn, setPassordIn] = useState("")
    const [regBrukere, setRegBrukere] = useState("")

    //generelt for siden
    const [error, setError] = useState("")
    const [errorLog, setErrorLog] = useState("")
    const [errorFarge, setErrorFarge] = useState("")
    const usersCollectionRef = collection(db, "brukere")
    const [bruker, setBruker] = useState([])

    //registrer bruker funksjoner------------------------------------------------------------
    const lagBruker = async () => {
        const bruker = regBrukere.find(
            (bruker) => bruker.brukernavn === brukernavnIn
        );
        if (nyBrukernavn !== "" && nyPassord !== "" && !bruker) {
            await addDoc(usersCollectionRef, {
                brukernavn: nyBrukernavn,
                passord: nyPassord,
                highscore: 0,
                accuracy: "0%"
            });
            setError("Bruker registrert");
            setErrorFarge("green");
            setNyBrukernavn("");
            setPassordFelt1("");
            setPassordFelt2("");
        } else if (nyBrukernavn !== "" && nyPassord !== "" && bruker) {
            setError("Brukernavn er tatt av noen andre");
            setErrorFarge("red");
        } else {
            setError("Passordet matcher ikke!");
            setErrorFarge("red");
        }
    }

    //gjør slik at "nyPassord" sin verdi oppdateres FØR brukeren er registrert.
    useEffect(() => {
        if (passordFelt1 === passordFelt2) {
            setNyPassord(passordFelt1);
        } else {
            setNyPassord("");
        }
    }, [passordFelt1, passordFelt2]);


    const handleNyBrukernavnChange = (e) => {
        setNyBrukernavn(e.target.value);
    }

    const handlePassordFelt1Change = (e) => {
        setPassordFelt1(e.target.value);
    };

    const handlePassordFelt2Change = (e) => {
        setPassordFelt2(e.target.value);
        setNyPassord(passordFelt2);
    };


    /*https://www.youtube.com/watch?v=jCY6DH8F4oc&t=853s*/


    //logg inn funksjoner -----------------------------------------------------------------
    const { brukerLoggetInn, setBrukerLoggetInn, loggTekstBoolean, setLoggTekstBoolean, adminKnappBoolean, setAdminKnappBoolean, brukeren, setBrukeren } = useContext(MainContext);


    const handleBrukernavnInput = (e) => {
        setBrukernavnIn(e.target.value);
    }

    const handlePassordInput = (e) => {
        setPassordIn(e.target.value);
    };

 

    useEffect(() => {
        const fetchBrukere = async () => {
            const brukereMottatt = await getBrukere();
            setRegBrukere(brukereMottatt);
        };

        fetchBrukere();
    }, []);


    const handleStateOppdater = () => {
        setBrukerLoggetInn(prevState => !prevState);
        setLoggTekstBoolean(prevState => !prevState);
    }


    const handleLogin = () => {
        const bruker = regBrukere.find(
            (bruker) => bruker.brukernavn === brukernavnIn && bruker.passord === passordIn
        );

        if (brukernavnIn === "admin132" && passordIn === "ad132min") {
            setAdminKnappBoolean((prevState) => !prevState);
            console.log("ADMIN BRUKER LOGGET INN ");
            setError("ADMIN bruker logget inn!");
            setErrorFarge("blue");
        } else {
            if (bruker) {
                setAdminKnappBoolean(false);
                console.log("BRUKER LOGGET INN ");
                setError("");
                setBrukeren(bruker.id); 
                handleStateOppdater();
            } else {
                console.log("bruker ikke logget inn");
                setErrorLog("Brukernavn eller passord er feil");
                setErrorFarge("red");
            }
        }
    };



    return (
        <>
            <div id="ikkeloggetinnside">
                <p id="advarsel">Vennligst ikke oppgi personlig opplysninger og bruk helst et unikt passord, sjekk FAQ for mer informasjon</p>
                <div id="ikkeloggetinn">

                    <div id="logginn">
                        <h1>Logg Inn</h1>
                        <input onChange={handleBrukernavnInput} value={brukernavnIn} className="ST_input" type="text" placeholder="brukernavn..."></input>
                        <input onChange={handlePassordInput} value={passordIn} className="ST_input" type="password" placeholder="passord..."></input>
                        <p id="error" style={{ color: errorFarge }}>{errorLog}</p>
                        <button onClick={handleLogin} className="knapper"><p>Logg Inn</p></button>
                    </div>
                    <div id="lagnybruker">
                        <h1>Registrer Bruker</h1>
                        <input value={nyBrukernavn} onChange={handleNyBrukernavnChange} className="ST_input" type="text" placeholder="brukernavn"></input>
                        <input value={passordFelt1} onChange={handlePassordFelt1Change} className="ST_input" type="password" placeholder="passord"></input>
                        <input value={passordFelt2} onChange={handlePassordFelt2Change} className="ST_input" type="password" placeholder="bekreft passord"></input>
                        <p id="error" style={{ color: errorFarge }}>{error}</p>
                        <button type="button" onClick={lagBruker} className="knapper"><p>Registrer Bruker</p></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RegEllerLagBruker;
