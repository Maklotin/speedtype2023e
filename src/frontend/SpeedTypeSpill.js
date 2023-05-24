import logo from '../bilder/logo1-1.png'
import React, { useState, useEffect } from 'react';
import { db } from '../backend/firebase-config'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import './App.css';

const SpeedTypeSpill = () => {

    useEffect(() => {
        /*https://www.youtube.com/watch?v=jCY6DH8F4oc&t=853s*/

        const getBrukere = async () => {
            const data = await getDocs(usersCollectionRef)
            setBruker(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getBrukere()
    }, []);

    var avnsitt = "ingen tekst funnet"

    const [bruker, setBruker] = useState([])

    const usersCollectionRef = collection(db, "brukere")
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
                <table>
                    <tr>
                        <th><h1>Brukernavn</h1></th>
                        <th><h1>Highscore</h1></th>
                    </tr>
                    {bruker.map((bruker) => {
                        return <div>
                            {" "}
                            <tr>
                                <td><p>{bruker.brukernavn}</p></td>
                                <td><p>{bruker.highscore}</p></td>
                            </tr>
                        </div>
                    })}
                </table>

            </div>
        </>
    )
}

export default SpeedTypeSpill;