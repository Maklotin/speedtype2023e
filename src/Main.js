import React, { createContext, useState, useEffect } from "react";
import './frontend/App.css';
import RegEllerLagBruker from "./frontend/RegEllerLagBruker";
import SpeedTypeSpill from "./frontend/SpeedTypeSpill";
import AdminSide from "./frontend/Adminside";
import FaqSide from "./frontend/FAQ";
import LoverOgReglerSide from "./frontend/LoverOgRegler"
import IntroVideo from "./frontend/IntroVideo";

export const MainContext = createContext();

const Main = () => {
    const [aktivSideMain, setAktivSideMain] = useState("SpeedType");
    const [brukerLoggetInn, setBrukerLoggetInn] = useState(false);
    const [brukeren, setBrukeren] = useState("")
    const [loggTekstBoolean, setLoggTekstBoolean] = useState(false);
    const [loggTekst, setLoggTekst] = useState("none")
    const [adminKnapp, setAdminKnapp] = useState("none")
    const [adminKnappBoolean, setAdminKnappBoolean] = useState(false)
    const [STaktivKnapp, setSTaktivKnapp] = useState("knapper")
    const [IntrAktivKnapp, setIntrAktivKnapp] = useState("knapper")
    const [LoverOgReglerKnapp, setLoverOgReglerKnapp] = useState("knapper")
    const [FAQknapp, setFAQknapp] = useState("knapper")

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
        setSTaktivKnapp("aktivknapp")
        setIntrAktivKnapp("knapper")
        setLoverOgReglerKnapp("knapper")
        setFAQknapp("knapper")
        return brukerLoggetInn ? <SpeedTypeSpill /> : <RegEllerLagBruker />;

    };

    const IntrVideo = () => {
        setSTaktivKnapp("knapper")
        setIntrAktivKnapp("aktivknapp")
        setLoverOgReglerKnapp("knapper")
        setFAQknapp("knapper")
        return <IntroVideo/>;
    };

    const FAQ = () => {
        setSTaktivKnapp("knapper")
        setIntrAktivKnapp("knapper")
        setLoverOgReglerKnapp("knapper")
        setFAQknapp("aktivknapp")
        return <FaqSide />;
    };

    const LoverOgRegler = () => {
        setSTaktivKnapp("knapper")
        setIntrAktivKnapp("knapper")
        setLoverOgReglerKnapp("aktivknapp")
        setFAQknapp("knapper")
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
                    <button onClick={() => setAktivSideMain("SpeedType")} className={STaktivKnapp}>
                        <p>Spill</p>
                    </button>
                    <button onClick={() => setAktivSideMain("IntrVideo")} className={IntrAktivKnapp}>
                        <p>Instruksjonsvideo</p>
                    </button>
                    <button onClick={() => setAktivSideMain("FAQ")} className={FAQknapp}>
                        <p>FAQ</p>
                    </button>
                    <button onClick={() => setAktivSideMain("LoverOgRegler")} className={LoverOgReglerKnapp}>
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
