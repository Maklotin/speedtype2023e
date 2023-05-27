import logo from '../bilder/logo1-1.png';
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../backend/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import tekstUtdragData from './planb.json';



const sekunder = 30


const SpeedTypeSpill = () => {
    const [valgtTekstUtdrag, setValgtTekstUtdrag] = useState('');
    const [spTkstFlt, setSpTkstFlt] = useState('');
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);

    //https://www.youtube.com/watch?v=t4W7PN4js-8
    var alleTekstUtdrag = []

    for (let i = 0; i <= 10; i++) {
        alleTekstUtdrag.push(tekstUtdragData[i])
        console.log(alleTekstUtdrag)
    }

    useEffect(() => {
        const getBrukere = async () => {
            const data = await getDocs(collection(db, 'brukere'));
            setBruker(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getBrukere();
    }, []);

    const [bruker, setBruker] = useState([]);

    return (
        <>
            <div id="f_spillet">
                <img src={logo} alt="SpeedType logo" id="logo_speedtype"></img>
                <hr id="kort_strek"></hr>
                <div id="start_spill">
                    <button className="knapper">
                        <h3>Start</h3>
                    </button>
                </div>
                <div className="innhold">
                    {tekstUtdragData.map}
                    {/*tekstUtdrag.map((word, i) => {
                        <span>
                            {word}
                        </span>
                    })*/}
                </div>
                <input
                    className="ST_input"
                    placeholder="skriv inn teksten her"
                ></input>
                <p>Poeng: {score}</p>
            </div>
            <div id="highscores">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <h1>Brukernavn</h1>
                            </th>
                            <th>
                                <h1>Highscore</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bruker.map((bruker) => (
                            <tr key={bruker.id}>
                                <td>
                                    <p>{bruker.brukernavn}</p>
                                </td>
                                <td>
                                    <p>{bruker.highscore}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SpeedTypeSpill;
