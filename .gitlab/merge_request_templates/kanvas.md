Closes
---
## Mitä / What?
Käyttäjän rekisteröinti UIn kautta.

## Miten / How?
Käyttäjä antaa tarvittavat tiedot käyttöliittymän kautta. Käyttöliittymä lähettää POST requestin backendille. Backend käsittelee datan ja ilmoittaa virheestä. Jos ei virheitä, lisätään tietokantaan uusi käyttäjä ja palautetaan POST requestin mukana "Kaikki OK!"

## Miten toimii? / How Does it Work?
Käyttäjä kirjautuu UI:n käyttöliittymän kautta ja antaa nimen, salasanan ja sähköpostiosoitteen. Jos kaikki menee oikein, UI:lle ilmestyy teksti "Teidät on nyt rekisteröity" tai "Valitsemanne sähköposti on jo käytössä. Yritä toista osoitetta".

## Käsintestaus / Manual Testing
