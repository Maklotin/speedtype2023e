import React from "react";
import './App.css'

const FaqSide = () => {
    
    return (
        <>
            <div id="FAQside">
                <h1>Frequently Asked Question</h1>
                <ul id="spoersmaal">
                    <li>
                        <h3>Hvordan kan jeg slette brukeren min?</h3>
                        <p>Du kan sende mail til: mikkel.huth.a@gmail.com med brukernavn ettersom det ikke går ann at noen kan registrere bruker med samme navn.</p>
                    </li>
                    <li>
                        <h3>Hva slags informasjon blir lagret om meg?</h3>
                        <p>Den eneste informasjonen fra brukeren vi lagrer i vår database er brukernavn, passord og highscore. Hver bruker lagret i databasen vår får også en egen ID, som da også blir lagret.</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FaqSide;