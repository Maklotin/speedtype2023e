import { useEffect, useState } from "react";
import './App.css';
import logo from './bilder/logo1-1.png'
import { db } from './backend/firebase-config'
import { collecion } from 'firebase/firestore'


function Main() {
    const [aktivSideMain, setAktivSideMain] = useState("SpeedType")
    const [poeng, setPoeng] = useState('0');
    const [bruker, setBruker] = useState([])

    useEffect(() => {
        /*https://www.youtube.com/watch?v=jCY6DH8F4oc&t=853s*/
        const usersCollectionRef = collection(db, "brukere")
        const getBrukere = async => {

        }

        getBrukere()
    }, [])

    var avnsitt = "ingen tekst funnet"

    const SpeedType = () => {
        return (
            <>
                <div id="f_spillet">
                    <img src={logo} alt="SpeedType logo" id="logo_speedtype"></img>
                    <hr id="kort_strek"></hr>
                    <div id="start_spill">
                        <button class="knapper"><p>Start</p></button>
                    </div>
                    <p>{avnsitt}</p>
                    <input id="ST_input" placeholder="skriv inn teksten her"></input>
                </div>

            </>
        )
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
            <hr id="strek"></hr>

            <AktivSideMainFunc />
        </>
    )

}


export default Main;