import React from "react";

const IntroVideo = () => {

    return (
        <>
            <div id="introvideoside">
                <h1>Instruksjonsvideo</h1>
                <iframe id="selve_videoen" src="https://www.youtube.com/embed/o2OSD1R5wjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                <h1>Funker ikke videoen?</h1>
                <hr className="strek"></hr>
                <p className="intr_p">Om videoen ikke funker kan du få instrukser her:</p>
                <p className="intr_p">Siden du allerede leser dette så kan vi hoppe over steg 1 og steg 2 (det er hvordan man åpner nettsiden).</p>

                <ul id="intr_liste">
                    <li><h3>Steg 1: Registrer bruker</h3></li>
                    <p>Start med å registrere en bruker. Skriv inn et brukernavn og passord som det står øverst på siden: Ikke oppgi noe personlig informasjon i brukernavnet og bruk et unikt passord. Det trenger ikke å være et avansert passord, men et passord som du ikke bruker på andre platformer. Skriv riktig passord på begge passordfeltene. Du vil få beskjed om passordene ikke matcher.</p>
                    <br></br>
                    <li><h3>Steg 2: Logg på brukeren</h3></li>
                    <p>For å kunne logge på brukeren så må du bytte til en annen side (hvilken har ikke noe å si). Etter du har byttet til en annen side kan du trykke på "spill" siden for å logge på. Skriv inn riktig brukernavn og passord og trykk "logg inn"</p>
                    <br></br>
                    <li><h3>Steg 3: Lagre bruker ID</h3></li>
                    <p>Gå til FAQ siden, under "hvordan sletter jeg brukeren min" så kan du se Bruker IDen din. Noter denne ned et sted i tilfelle du skulle glemme passordet ditt eller hvis det skulle oppstå et problem med brukeren din.</p>
                    <br></br>
                    <li><h3>Steg 4: Spill SpeedType!</h3></li>
                    <p>Når du har notert ned Bruker IDen din så kan du trykke tilbake til "Spill" og spille spillet. Spillet fungerer slik:</p>
                    <ul>
                        <li><p>Når du trykker "start" vil du få et helt tilfeldig avsnitt om noe helt tilfeldig. Innholdet til avsnittet er helt irrelevant til spillet.</p>  </li>
                        <li><p>Du skal skrive ordene du ser fra avsnittet helt ordrett. Du skal skrive så mange ord du kan (i kronologisk rekkefølge) på 30 sekunder (det store røde tallet ovenfor er timeren). Du trykker på mellomrom for å skrive neste ord.</p></li>
                        <li><p>Det vil være en indikator som markerer om du skrev riktig eller feil bokstav i ordet.</p></li>
                        <li><p>Når timeren er ferdig så vil du få poeng etter hvor mange ord (Words Per Minute), dette er hvor mange ord du skrev riktig * 2. Den blir ganget med 2 ettersom du fikk 30 sek på å skrive ord så for å kunne målet poengsummen i WPM så ganger vi poengsummen med 2.</p>
                        </li>
                        <li><p>Du får også vite hvor nøyaktig det du skrev var. Altså hvor mange or du skrev riktig delt på hvor mange du skrev feil. Disse vil bli sent til vår database slik at det vil bli synlig i vår scoreboard med liste over highscores. Igjen så har vi problem med å oppdatere denne lista med en gang så det kan være at du må bytte side eller i verste fall refreshe siden.</p></li>
                    </ul>
                </ul>
                <h1>Nå kan du spille SpeedType!</h1>
            </div>

        </>
    )
}

export default IntroVideo