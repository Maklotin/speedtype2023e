import React, { createContext, useState, useEffect } from "react";
import './frontend/App.css';
import RegEllerLagBruker from "./frontend/RegEllerLagBruker";
import SpeedTypeSpill from "./frontend/SpeedTypeSpill";
import AdminSide from "./frontend/Adminside";
import FaqSide from "./frontend/FAQ";
import LoverOgReglerSide from "./frontend/LoverOgRegler"

export const MainContext = createContext();

const Main = () => {
    const [aktivSideMain, setAktivSideMain] = useState("SpeedType");
    const [brukerLoggetInn, setBrukerLoggetInn] = useState(false);
    const [brukeren, setBrukeren] = useState("")
    const [loggTekstBoolean, setLoggTekstBoolean] = useState(false);
    const [loggTekst, setLoggTekst] = useState("none")
    const [adminKnapp, setAdminKnapp] = useState("none")
    const [adminKnappBoolean, setAdminKnappBoolean] = useState(false)

    useEffect(() => {
        if (loggTekstBoolean) {
            setLoggTekst("inline");
        } else {
            setLoggTekst("none");
        }
    }, [loggTekstBoolean]);

    useEffect(() => {
        if (adminKnappBoolean) {
            setAdminKnapp("inline");
        } else {
            setAdminKnapp("none");
        }
    }, [adminKnappBoolean]);

    const loggUt = () => {
        setBrukerLoggetInn(false);
        setAktivSideMain("SpeedType");
        setLoggTekstBoolean(false);
    };

    const SpeedType = () => {
        return brukerLoggetInn ? <SpeedTypeSpill /> : <RegEllerLagBruker />;
    };

    const IntrVideo = () => {
        return <></>;
    };

    const FAQ = () => {
        return <FaqSide />;
    };

    const LoverOgRegler = () => {
        return <LoverOgReglerSide />;
    };

    const Admin = () => {
        return <AdminSide />
    }

    const AktivSideMainFunc = () => {
        switch (aktivSideMain) {
            case "IntrVideo":
                return <IntrVideo />;
            case "FAQ":
                return <FAQ />;
            case "LoverOgRegler":
                return <LoverOgRegler />;
            case "AdminSide":
                return <Admin />
            default:
                return <SpeedType />;
        }
    };

    return (
        <>
            <MainContext.Provider
                value={{ brukerLoggetInn, setBrukerLoggetInn, loggTekstBoolean, setLoggTekstBoolean, adminKnappBoolean, setAdminKnappBoolean, brukeren, setBrukeren }}
            >
                <div id="top">
                    <button onClick={() => setAktivSideMain("SpeedType")} className="knapper">
                        <p>Spill</p>
                    </button>
                    <button onClick={() => setAktivSideMain("IntrVideo")} className="knapper">
                        <p>Instruksjonsvideo</p>
                    </button>
                    <button onClick={() => setAktivSideMain("FAQ")} className="knapper">
                        <p>FAQ</p>
                    </button>
                    <button onClick={() => setAktivSideMain("LoverOgRegler")} className="knapper">
                        <p>Lover og regler</p>
                    </button>
                    <button onClick={() => setAktivSideMain("AdminSide")} style={{ display: adminKnapp, backgroundColor: "blue" }} className="knapper">
                        <p>Admin side</p>
                        </button>
                    <button onClick={() => loggUt()} style={{ display: loggTekst, backgroundColor: "red" }} className="knapper">
                        <p>Logg ut</p>
                    </button>
                </div>
                <hr className="strek"></hr>
                <AktivSideMainFunc />
            </MainContext.Provider>
        </>
    );
};

export default Main;
