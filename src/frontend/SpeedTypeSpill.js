import logo from '../bilder/logo1-1.png';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../backend/firebase-config';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import './App.css';
import tekstUtdragData from './planb.json';

import { MainContext } from '../Main';


const sekunder = 30


const SpeedTypeSpill = () => {
    const [tekstTall, setTekstTall] = useState(1)
    const [arrayTall, setArrayTall] = useState(0)

    const { brukeren, setBrukeren } = useContext(MainContext)
    console.log(brukeren)

    var valgtTekst = tekstUtdragData[arrayTall]['Tekst ' + tekstTall]
    if (valgtTekst === "Tekst 0") {
        valgtTekst = tekstUtdragData[arrayTall]['Tekst ' + tekstTall]
    }



    const [nedtelling, setNedtelling] = useState(sekunder)
    const [currentInput, setCurrentInput] = useState([])
    //CurrentWordIndex er for å matche hva brukeren har skrevet inn matcher med ordet som de skal skrive, mens CurrentCharIndex og CurrentChar er for å vise visuelt hva brukeren skrev feil om de skrev noe feil
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(-1)
    const [currentChar, setCurrentChar] = useState("")
    const [spillStatus, setSpillStatus] = useState("ikkestartet")


    const [korrekt, setKorrekt] = useState(0)
    const [ukorrekt, setUkorrekt] = useState(0)
    const textInput = useRef(null)


    useEffect(() => {
        const oppdaterBrukerAsync = async () => {
            try {
                const docRef = doc(db, 'brukere', brukeren);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const highscore = docSnap.data().highscore;
                    console.log('Retrieved value:', highscore);

                    if (highscore < scoreST) {
                        const brukerRef = doc(db, 'brukere', brukeren);
                        await updateDoc(brukerRef, {
                            highscore: scoreST,
                            accuracy: accuracyST
                        });
                    } else {
                        console.log('Document not found');
                    }
                }
            } catch (error) {
                console.log('Error retrieving value:', error);
            }
        };

        if ((nedtelling === 0 || spillStatus === 'ferdig') && brukeren) {
            oppdaterBrukerAsync();
        }
    }, [nedtelling, spillStatus, brukeren]);


    //https://www.youtube.com/watch?v=t4W7PN4js-8
    async function startSpill() {
        var tall = Math.floor(Math.random() * 17)
        setTekstTall(tall)
        setArrayTall(tall - 1)
        if (spillStatus === "ferdig") {
            setCurrentInput([])
            setKorrekt(0)
            setUkorrekt(0)
            // DISSE VAR IKKE MED I TUTORIALEN JEG ORGINALT FULGTE
            // Disse resetter spillet og starter det FULLSTENDIG på nytt. Uten disse vil programme bruke checkMatch() på et tilfeldig ord i en ny tilfeldig tekst
            setCurrentWordIndex(0)
            setCurrentCharIndex(-1)
            setCurrentChar("")
            

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

    /*
        KeyCode 32 = Mellomrom
        KeyCode 8 = Backspace
        KeyCode 16 = shift
    */
    function handleKeyDown({ keyCode, key }) {
        /*Hvis mellomrom eller bindestrek er trykket, så matcher den ordet skrevet med ordet i JSON
        filen for å sjekke om de skrev riktig. */
        if (keyCode === 32) {
            checkMatch()
            setCurrentInput("")
            setCurrentWordIndex(currentWordIndex + 1)
            setCurrentCharIndex(-1)

            //Om de trykker på backspace så vil ikke spillet registrere det som en bokstav de skrev inn
        } else if (keyCode === 8) {
            setCurrentCharIndex(currentCharIndex - 1)
            //Denne gjør slik at ingenting skjer om man trykker shift, og bestemmer hva som skjer når man trykker på alle andre bokstaver
        } else if (keyCode !== 16) {
            setCurrentCharIndex(currentCharIndex + 1)
            setCurrentChar(key)
        }
    }

    var accuracyST = Math.round((korrekt / (korrekt + ukorrekt)) * 100) + "%"
    var scoreST = korrekt * 2

    function checkMatch() {
        const wordToCompare = valgtTekst[currentWordIndex]
        const doesItMatch = wordToCompare === currentInput.trim()
        if (doesItMatch) {
            setKorrekt(korrekt + 1)
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
    //53:23
    function getCharClass(wordIdx, charIdx, char) {
        if (wordIdx === currentWordIndex && charIdx === currentCharIndex && currentChar && spillStatus !== 'ferdig') {
            if (char === currentChar) {
                return 'bakgrunn-korrekt'
            } else {
                return 'bakgrunn-ukorrekt'
            }
        } else {
            return ''
        }
    }

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
                                            <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
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
                            <h3>{korrekt * 2}</h3>
                        </div>
                        <div id="accuracy">
                            <p>Nøyaktighet</p>
                            <h3>{accuracyST}</h3>
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
                        {/*Sorterer alle brukere med høyest highscore på topp, også lavest på bunnen */}
                        {bruker.sort((a, b) => b.highscore - a.highscore).map((bruker) => (
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
