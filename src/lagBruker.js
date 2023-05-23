import React, { useEffect, useState } from "react";
import './App.css';
import logo from './bilder/logo1-1.png'
import { db } from './backend/firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'

const IkkeLoggetInn = () => {
    const [passordFelt1, setPassordFelt1] = useState("")
    const [passordFelt2, setPassordFelt2] = useState("")
    const [nyBrukernavn, setNyBrukernavn] = useState("")
    const [nyPassord, setNyPassord] = useState("")
    const [highscore, setHighscore] = useState(0)
    const [poeng, setPoeng] = useState(0);
    const [error, setError] = useState("")
    const [errorFarge, setErrorFarge] = useState("")
    const usersCollectionRef = collection(db, "brukere")
    const [bruker, setBruker] = useState([])
    
    const lagBruker = async () => {
        if (passordFelt1 === passordFelt2 && nyBrukernavn !== "" && passordFelt1 !== "") {
            setNyPassord(passordFelt1)
            await addDoc(usersCollectionRef, {
                brukernavn: nyBrukernavn,
                passord: nyPassord
            })
            setError("Bruker registrert")
            setErrorFarge("green")

        } else {
            setError("Passordet matcher ikke!")
            setErrorFarge("red")
        }
    }

    const handleNyBrukernavnChange = (e) => {
        setNyBrukernavn(e.target.value);
    }

    const handlePassordFelt1Change = (e) => {
        setPassordFelt1(e.target.value);
    };

    const handlePassordFelt2Change = (e) => {
        setPassordFelt2(e.target.value);
    };

    if (poeng < highscore) {
        setHighscore(poeng)
    } else {

    }

    useEffect(() => {
        /*https://www.youtube.com/watch?v=jCY6DH8F4oc&t=853s*/

        const getBrukere = async () => {
            const data = await getDocs(usersCollectionRef)
            setBruker(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getBrukere()
    }, []);



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
                    <p id="error" style={{ color: errorFarge }}>{error}</p>
                    <button onClick={lagBruker} className="knapper"><p>Registrer Bruker</p></button>
                </div>
            </div>
        </>
    )
} 

export default IkkeLoggetInn();