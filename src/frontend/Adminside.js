import React, { useState, useEffect } from "react";
import { db } from '../backend/firebase-config'
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const Adminside = () => {
    const [nyttPassord, setNyttPassord] = useState("")

    //importerer brukerne fra databasen

    const usersCollectionRef = collection(db, "brukere")
    useEffect(() => {
        /*https://www.youtube.com/watch?v=jCY6DH8F4oc&t=853s*/

        const getBrukere = async () => {
            const data = await getDocs(usersCollectionRef);
            setBruker(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getBrukere();
    }, []);

    //slett bruker
    const slettBruker = async (id) => {
        const brukerDoc = doc(db, "brukere", id);
        await deleteDoc(brukerDoc);
        //oppdaterer liste over brukere etter en bruker er slettet.
        const updatedBrukere = bruker.filter((bruker) => bruker.id !== id);
        setBruker(updatedBrukere);
    }

    //oppdater passord

    const oppdaterPassord = async (id, passord) => {
        let nyttPassordVindu = prompt("Skriv inn det nye passordet", "NyttPassord123")
        if (nyttPassordVindu != null) {
            const brukerDoc = doc(db, "brukere", id)
            const nyttFelt = { passord: nyttPassordVindu }
            await updateDoc(brukerDoc, nyttFelt)
            setNyttPassord("")
            //Oppdaterer liste over brukere etter et passord har blitt oppdatert
            const updatedBrukere = bruker.map((bruker) => {
                if (bruker.id === id) {
                    return { ...bruker, passord: nyttPassordVindu };
                }
                return bruker;
            });
            setBruker(updatedBrukere);


        }
    }

    const [bruker, setBruker] = useState([])
    return (
        <>
            <div id="adminside">
                <h1>Her er en oversikt over alle brukerne registrert i databasen</h1>
                <p>For å logge ut av Admin bruker så bare logger du på en annen bruker på "Spill" siden.</p>
                <tbody id="highscores">
                    {bruker.map((bruker) => {
                        return <tr>
                            <td>
                                {" "}
                                <p className="admintekst">brukernavn: {bruker.brukernavn}</p>
                                <p className="admintekst">passord: {bruker.passord}</p>
                                <div id="modifiser_brukere">
                                    <button onClick={() => { oppdaterPassord(bruker.id, bruker.passord) }} className="knapper"><p>Bytt passord</p></button>
                                    <button onClick={() => { slettBruker(bruker.id) }} className="slett_bruker"><p>Slett bruker</p></button>
                                </div>
                                <hr></hr>

                            </td>
                        </tr>
                    })}
                </tbody>
            </div>

        </>
    )
}

export default Adminside;