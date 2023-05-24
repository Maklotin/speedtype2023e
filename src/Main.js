import React, { createContext, useState, useEffect } from "react";


import './frontend/App.css';


//De forskjellig sidene
import RegEllerLagBruker from "./frontend/RegEllerLagBruker";
import SpeedTypeSpill from "./frontend/SpeedTypeSpill";
import Adminside from "./frontend/Adminside";
import FaqSide from "./frontend/FAQ";

import { RegEllerLagBrukerContext }
//denne lar meg eksportere states
export const MainContext = createContext();
 
const Main = () => {
    const [aktivSideMain, setAktivSideMain] = useState("SpeedType")
    const [brukerLoggetInn, setBrukerLoggetInn] = useState(false)
    const [loggTekst, setLoggTekst] = useState("none")



    const loggUt = () => {
        setBrukerLoggetInn(false)
        setAktivSideMain("SpeedType")
        setLoggTekst("none")
    }

    const SpeedType = () => {
        if (brukerLoggetInn === true) {
            return <SpeedTypeSpill />
        } else {
            return <RegEllerLagBruker />
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
                <FaqSide />
            </>
        )

    }

    const LoverOgRegler = () => {
        return (
            <>
                <Adminside />
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
            <MainContext.Provider value={{ brukerLoggetInn, setBrukerLoggetInn }}>
            {/* Navigasjonsbar */}


            <div id="top">

                <button onClick={() => setAktivSideMain("SpeedType")} className="knapper"><p>Spill</p></button>
                <button onClick={() => setAktivSideMain("IntrVideo")} className="knapper"><p>Instruksjonsvideo</p></button>
                <button onClick={() => setAktivSideMain("FAQ")} className="knapper"><p>FAQ</p></button>
                <button onClick={() => setAktivSideMain("LoverOgRegler")} className="knapper"><p>Lover og regler</p></button>
                <button onClick={() => loggUt()} style={{ display: loggTekst }} className="knapper"><p>Logg ut</p></button>
            </div>
            <hr className="strek"></hr>

            <AktivSideMainFunc />
            </MainContext.Provider>
        </>
    )
}


export default Main;
