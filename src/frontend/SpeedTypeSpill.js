import logo from '../bilder/logo1-1.png';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../backend/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import tekstUtdragData from './planb.json';

import Main, { MainContext } from '../Main';



const sekunder = 30


const SpeedTypeSpill = () => {
    const [tekstTall, setTekstTall] = useState(1)
    const [arrayTall, setArrayTall] = useState(0)
    
    const { brukeren, setBrukeren } = useContext(MainContext)
    console.log(brukeren)
    
    var valgtTekst = tekstUtdragData[arrayTall]['Tekst ' + tekstTall]
    if (valgtTekst === "Tekst 0") {
        var valgtTekst = tekstUtdragData[arrayTall]['Tekst ' + tekstTall]
    }
    
    

    const [nedtelling, setNedtelling] = useState(sekunder)
    const [currentInput, setCurrentInput] = useState([])
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [spillStatus, setSpillStatus] = useState("ikkestartet")

    const [korrekt, setKorret] = useState(0)
    const [ukorrekt, setUkorrekt] = useState(0)
    const [highscore, setHighscore] = useState(0);
    const textInput = useRef(null)


    //https://www.youtube.com/watch?v=t4W7PN4js-8


    function startSpill() {
        var tall = Math.floor(Math.random() * 17)
        setTekstTall(tall)
        setArrayTall(tall - 1)
        if (spillStatus === "ferdig") {
            setCurrentInput(0)
            setKorret(0)
            setUkorrekt(0)
        }
        if (spillStatus !== "startet") {

            setSpillStatus("startet")
            //gjør slik at nedtelleren reduserer "nedtelling" Staten med 1 hvert sekund(hvert 1000 millisekund)
            let interval = setInterval(() => {
                setNedtelling((prevNedtelling) => {
                    if (prevNedtelling === 0) {
                        clearInterval(interval)
                        setSpillStatus("ferdig")
                        setCurrentInput("")
                        return sekunder
                    } else {
                        return prevNedtelling - 1
                    }
                })
            }, 1000)


        }


    }


    function handleKeyDown({ keyCode }) {
        if (keyCode === 32) {
            checkMatch()
            setCurrentInput("")
            setCurrentWordIndex(currentWordIndex + 1)
        }
    }

    var accuracy = Math.round((korrekt / (korrekt + ukorrekt)) * 100) + "%"

    function checkMatch() {
        const wordToCompare = valgtTekst[currentWordIndex]
        const doesItMatch = wordToCompare === currentInput.trim()
        if (doesItMatch) {
            setKorret(korrekt + 1)
        } else {
            setUkorrekt(ukorrekt + 1)
        }
    }

    //denne gjør slik at nettleseren automatisk fokuserer på tekstinput elementet når man trykker på start knappen
    useEffect(() => {
        if (spillStatus === "startet") {
            textInput.current.focus()
        }
    }, [spillStatus])



    //Henter brukere til Highscore boardet
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
                <h2 id="timer">{nedtelling}</h2>
                <hr id="kort_strek"></hr>
                {spillStatus === "ikkestartet" && (
                    <div id="start_spill">
                        <button className="knapper" onClick={startSpill}>
                            <h3>Start</h3>
                        </button>
                    </div>
                ) || "ferdig" && (
                    <div id="start_spill">
                        <button className="knapper" onClick={startSpill}>
                            <h3>Start</h3>
                        </button>
                    </div>
                )

                }

                {spillStatus === "startet" && (
                    <>

                        <div className="innhold">
                            {/*først deler den alle tekstene og bruker "arrayTall" og "tekstTall" for å velge en tilfeldig tekst, så bruker jeg "word.split("").map((char...." for å dele opp alle ordene til bokstaver. */}
                            {valgtTekst.map((word, i) => (
                                <>
                                    <span className='tekst_ord' key={i}>
                                        {word.split("").map((char, idx) => (
                                            <span key={idx}>{char}</span>
                                        ))}
                                    </span>
                                    <span> </span>
                                </>

                            )
                            )}
                        </div>
                        <input
                            className="ST_input2"
                            placeholder="skriv inn teksten her"
                            onKeyDown={handleKeyDown}
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            ref={textInput}
                        ></input>


                    </>
                )}

                {spillStatus === "ferdig" && (
                    <div id="resultat">
                        <div id="wpm">
                            <p>WPM - Words Per Minute:</p>
                            <h3>{korrekt}</h3>
                        </div>
                        <div id="accuracy">
                            <p>Nøyaktighet</p>
                            <h3>{accuracy}</h3>
                        </div>
                    </div>
                )

                }

            </div>
            <div id="highscores">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <h1>Brukernavn</h1>
                            </th>
                            <th>
                                <h1>Nøyaktighet</h1>
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
                                    <p className="p_venstre">{bruker.brukernavn}</p>
                                </td>
                                <td>
                                    <p>{bruker.accuracy}</p>
                                </td>
                                <td>
                                    <p className='p_hoerye'>{bruker.highscore}</p>
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
