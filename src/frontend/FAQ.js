import React, { useContext, useState } from "react";
import './App.css'

import { MainContext } from "../Main";



const FaqSide = () => {
    

    const { brukeren } = useContext(MainContext)
    var brukerID = brukeren

    if (brukeren === "") {
        brukerID = "du er ikke logget inn"
    }
    return (
        <>
            <div id="FAQside">
                <h1>Frequently Asked Question</h1>
                <ul id="spoersmaal">
                    <li>
                        <h3>Hvorfor er tekstene og knappene så store?</h3>
                        <p>Dette skjer om skaleringen på skjermen din er over 100%. For å fikse dette må du gå på innstilliger -> system -> skjerm -> Bla ned til "Skala og oppsett" -> "Endre størrelse på tekst, apper eller andre elementer -> trykk på drop down menyen og velg 100%</p>
                    </li>
                    <li>
                        <h3>Hvordan kan jeg slette brukeren min?</h3>
                        <p>Du kan sende mail til: mikkel.huth.a@gmail.com og skriv brukernavn og brukerIDen din. Ved å skrive bruker IDen din vil det være lettere for oss å finne brukeren din i vår database.</p>
                        <p>Din brukerID er: <code id="bruker_id">{brukerID}</code></p>
                    </li>
                    <br></br>
                    <li>
                        <h3>Hvordan kan jeg endre passordet på brukeren min?</h3>
                        <p>Du kan sende mail igjen til mikkel.huth.a@gmail.com og skriv hva det gamle passordet ditt var, og hva du ønsker at det nye passordet ditt skal være</p>
                    </li>
                    <br></br>
                    <li>
                        <h3>Hva slags informasjon blir lagret om meg?</h3>
                        <p>Den eneste informasjonen fra brukeren vi lagrer i vår database er brukernavn, passord, skrive nøyaktighet og highscore. Hver bruker lagret i databasen vår får også en egen ID, som da også blir lagret. Vi bruker denne databaen BARE til:</p>
                        <li className="list">bruker innlogging</li>
                        <li className="list">bruker registrering</li>
                        <li className="list">highscore tabell</li>
                    </li>
                    <br></br>
                    <li>
                        <h3>Hvor kommer ordene/tekstutdragene fra?</h3>
                        <p>Orginalt skulle det være en såkalt "webscraper" som blir som en robott som går inn på en nettside og sender tilbake informasjonen på den nettsiden. Denne webscraperen skulle orginalt finne en tilfeldig wikipedia artikkel og finne et tilfeldig avsnitt og lime det inn. Det rakk jeg ikke så tekstutdragene er fra avsnitt jeg har manuelt kopiert og limt inn inni en JSON fil som er litt som en tekstfil med mapper for å skille ut de forskjellige tekstene jeg har limt inn</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FaqSide;