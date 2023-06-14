import React from "react";
import './App.css'

const LoverOgRegler = () => {
    return (
        <>  
            <div id="innhold_lor">
            <h1>Lover og regler</h1>
            <table id="lover_og_regler">
                <tr>
                    <th><h3>Lovverk</h3></th>
                    <th><h3>Hva handler dette lovverket om?</h3></th>
                    <th><h3>Hvilke paragrafer er relevante for mitt system?</h3></th>
                    <th><h3>Hvordan kan systemet risikere å bryte loven?</h3></th>
                    <th><h3>Hvilke konsekvenser kan det ha om systemet bryter denne loven?</h3></th>
                    <th><h3>Hvordan kan jeg unngå å bryte denne loven</h3></th>
                </tr>
                <tr>
                    <th><h3>Arbeidsmiljøloven</h3></th>
                    <td>Arbeidsmiljøloven er en lov som regulerer miljøet og forhold på arbeidsplassen for å skape en trygg arbeidsplass for arbeidere. </td>
                    <td>Paragraf §2-3 Arbeidstakers medvirkningsplikt.

                        Paragraf §4-2 Krav til tilrettelegging, medvirkning og utvikling.

                        (e: det gis tilstrekkelig informasjon og opplæring slik at arbeidstaker er i stand til å utføre arbeidet […] </td>
                    <td>Ikke gi nødvendig opplæring til den som skal ta over prosjektet. Ikke la arbeidstakere ha noen medvirkning på arbeidsplassen. </td>
                    <td>«Arbeidsgiver, innehaver av virksomhet og den som i arbeidsgivers sted leder virksomheten kan ved forsettlig eller uaktsom overtredelse av bestemmelse eller pålegg gitt i eller i medhold av loven straffes med bøter eller fengsel i inntil ett år, eller begge deler». Arbeidstakeren kan også risikere å publisere brukerinfo med et uhell uten riktig opplæring. </td>
                    <td>Sørge for at jeg har godt opplæringsmateriell og lar arbeidstakere medvirke.</td>
                </tr>
                <tr>
                    <th><h3>Forskrift om universell utforming av IKT-løsninger</h3></th>
                    <td>Lovverket handler om å tilrettelegge og utforme (i dette tilfelle) nettsider til flest folk mulig . </td>
                    <td>§2. virkeområde
                        §3a-d – Definisjoner
                        §4. Krav til utforming av IKT-Løsninger </td>
                    <td>Ved å ikke tilrettelegge systemet til personer som kanskje er fargeblind, generelt blind, hørselsvansker eller lignende. </td>
                    <td>«Brudd på minstekravene innebærer at virksomheten ikke oppfyller kravene i regelverket. Brudd som står i tilsynsrapporten skal rettes av virksomheten i etterkant, og blir fulgt opp av tilsynet. Brudd på minstekravene kan følges opp med reaksjoner dersom det er nødvendig..» </td>
                    <td>Legge til ALTs på bilder, ha store konstraster i farger, bakgrunnsfarge og tekstfarge for å gjøre det lett for fargeblinde, gjøre nettsiden ryddig og lett å navigere seg rundt.   </td>
                </tr>
                <tr>
                    <th><h3>Personopplysningsloven</h3></th>
                    <td>Lovverket er der for å passe på at alt personvern som blir lagret ikke blir misbrukt, at brukeren har rettigheter til å se hva slags opplysninger av dem som har blitt lagret, kreve å rette opp i feilopplysninger om dem og rett til å få personopplysningene sine slettet om de skulle ønske.  </td>
                    <td>§ 4 Geografisk virkeområde.



                        EUROPAPARLAMENTS- OG RÅDSFORORDNING:

                        Kapittel 2:

                        Artikkel 5, Prinsipper for behandling av personopplysninger.



                        Kapittel 3:

                        Avsnitt 1 – 12: Åpenhet og vilkår

                        Avsnitt 2 – 13, 14 og 15: Informasjon og innsyn i personopplysninger.

                        Avsnitt 3 – 16 og 17: Retting og sletting. </td>
                    <td>Ved å ikke la brukere rette opp i potensiell feilinformasjon om dem som har blitt lagret i databasen. Ved å nekte brukere til å få informasjon om dem (i dette tilfelle brukernavn og passord) å bli slettet fra databasen. Ved å ikke opplyse hva slags brukerinfo som blir lagret.  </td>
                    <td>“Datatilsynet kan ilegge overtredelsesgebyr hvis de finner ut at noen bryter loven.”

                        Personopplysninger som bruker navn og passord kan bli lekket til offentligheten.  </td>
                    <td>Sikre databasen og sikre at bare folk jeg som har utviklet koden stoler på har tilgang til admin bruker og databasen. Sikrer at Firebase brukeren min har to-faktorautentisering og sikrer databasen min fra hackere. Krypterer all kode relatert til brukerinnlogging, adminbruker, admintilgang og lignende. Opplyse brukere om rettighetene de har. </td>
                </tr>
                <tr>
                    <th><h3>GPDR</h3></th>
                    <td>GDPR er et lovverk av EU som gjelder EU og EØS land. Den tillater nasjonale tilpasninger men ellers så må GDPR lovverket følges i alle EU/EØS land. GDPR er mest kjent for å eksistere for å opplyse brukeren om at de kan velge hva slags data en nettside kan og ikke kan lagre.</td>
                    <td>Samme som er nevnt om Personvernsopplysningsloven. </td>
                    <td>Samme som opp^</td>
                    <td>Samme som opp^</td>
                    <td>Samme som opp^</td>
                </tr>
                <tr>
                    <th><h3>Opphavsrett</h3></th>
                    <td>Opphavsrett og åndsverksloven er lover som gjelder alt åndsverk. Åndsverk kan være ting som musikk, sang, sangtekst, fotograf, maleri osv... </td>
                    <td>§43 Fri bruk av verk ved undervisningsvirksomhet</td>
                    <td>Ved å offentliggjøre SpeedType til allmennheten, tjene penger på SpeedType eller hevde at tekstutdrag er mitt eget verk </td>
                    <td>Konsekvenser ved å krenke noens opphavsrett kan føre til saksøking og krav på erstatningspenger. Hvor mye dette koster kommer veldig ann på hvor stor økonomisk skade krenkelsen av opphavsretten kan ha utført.</td>
                    <td>Ved å ikke offentliggjøre SpeedType til allmennheten eller hevde at alle utdrag er mitt åndsverk. Nettsiden min er beskyttet av §43 siden dette er et skoleprosjekt og ikke laget for allmennheten og dermed kan bruke åndsverk fritt så lenge det er brukt i god skikk</td>
                </tr>
            </table>
            </div>
        </>
    )

}

export default LoverOgRegler;