# Prosjekt 3 - Gruppe 47

## Dokumentasjonsbeskrivelse
* Prosjektet dokumenteres med en README.md i git repositoriet.
* Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).
* Koden skal være lettlest og godt strukturert slik at den er lett å sette seg inn i. Bruk av kommentarer skal være tilpasset at eksterne skal inspisere koden.
* Gruppas valg av teknologi som utforskes (jmfr krav til innhold) skal dokumenteres i tutorials form slik at andre lett kan lære av eksempelet dere lager (dvs. gi en liten introduksjon til hva og hvordan).



## Samarbeid i gruppa.
Vi har valgt som sist å dele opp arbeidet(se bruk av git) i flere deler slik at hver person kunne jobbe selvstendig eller sammen. Vi prøver å passe på at det er lav terskel for å spørre om hjelp, slik at ingen blir sittende fastlåst uten å komme seg videre, uten at andre oppdager det.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Skrive litt mer utfyllende



## Innhold og funksjonalitet.
Vi har valgt å dele opp (motivasjons)appen i flere deler med en todolist, kalender og kontaktliste, samt en GPS-/Kart-modul hvor man skal bli motivert til å fysisk besøke forskjellige punkter for å få poeng og bli motivert. Disse forskjellige komponentene/delene er i stor grad uavhengige av hverandre. Vi valgte å gjøre dette for å komme fortere i gang med selve utviklingen. I nettsideprosjektet opplevde vi at veldig mye arbeid var veldig avhengig av annnet arbeid, så det ble til tider litt vanskelig for tre personer å jobbe parallelt. I dette prosjektet opplevde vi at alle kunne begynne med sine issues fra dag én. Det hjalp også å bruke expo sin tab-template, da den allerede hadde oppsettet med overskrift og tabs på slutten av siden. Denne templaten håndterer også navigasjonen mellom screenene, så vi kunne gå rett på å utvikle innholdet, og slippe å bruke mye tid på formaliteter som ville hindret vår mulighet til å jobbe parallelt i starten.



## Valg av teknologi.
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Skrive om teksten, gjøre den mer utfyllende og korrekt

Vi har tatt i bruk react native sammen med expo.cli for å bygge appen vår, deretter har vi tatt i bruk AsyncStorage for å lagre og sette tilstand ved åpning og avslutning av appen.


### React Native 
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan

### Expo
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan

### Node + npm
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan

### Jest
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan



## Bruk av git.

### Issues og Pull request:
I dette prosjektet har vi fra starten delt opp oppgaven og satt issues til hver del. Vi ar innført strengere branch-regler. Disse innebærer at man ikke kan pushe direkte til `master` eller `develop`, man må bruke pull requests. Det kreves minst én godkjenning fra andre for at pull requesten skal kunne merges. 

### Delegering av issues:
De fleste issues har blitt tildelt én person, men noen har blitt tildelt flere. I hovedsak har man det hele ansvaret for sine issues, men det er lav terskel for å spørre om hjelp. Enkelte biter av koden har i praksis blitt parprogrammert, da vi har har sittet på grupperom flere ganger i uka, og spurt andre gruppemedlemmer om å sitte ved siden av og hjelpe til hvis det er noe man sliter med.



## Testing.
### Jest
Jest skal være lagt til i package.json fila.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO

#### ContactsScreen
Vi har ikke lagt ved unit-tester for metodene i ContactsScreen. Dette kommer av at vi ikke har klart å finne en hensiktsmessig måte å mocke AsyncStorage. Det ble da utfordrende å skrive unit-tester for metodene, siden disse bruker AsyncStorage enten direkte eller indirekte. Om vi hadde fått til mocking ville vi ha gjort et kall med receiveNewContact(contact, callback) med full kontaktinformasjon i contact og null i callback, og sjekket om kontaktinformasjonen ble skrevet til state via storeData(path, data) og loadContacts som begge ville benyttet den mockede versjonen av AsyncStorage. 

Det fantes heller ingen enkel måte å unit-teste selve AsyncStorage. Våre akseptansetester tyder på at AsyncStorage fungerer som den skal.  
##### Test av oppretting av kontakt:
- åpne appen
- gå til tabben "Contacts"
- åpne "Create New Contact" med knappen nederst
- trykk "Save"-knappen og få feilmeldding om fylling av felt
- fyll inn et navne-feltet
- trykk "Save"-knappen og få feilmeldding om fylling av felt
- fyll inn et telefonnummer-feltet
- trykk "Save"-knappen og få feilmeldding om fylling av felt
- fyll inn bare space i adresse-feltet
- trykk "Save"-knappen og få feilmeldding om lengde på input
- fyll inn en adresse
- trykk "Save"-knappen og se at den nye kontakten finnes i kontakt-listen

##### Test av lagring under lukking av appen
- åpne appen
- gå til tabben "Contacts"
- åpne "Create New Contact" med knappen nederst
- fyll inn et navne-feltet
- fyll inn et telefonnummer-feltet
- fyll inn en adresse
- trykk "Save"-knappen og se at den nye kontakten finnes i kontakt-listen
- lukk appen
- åpne appen og se at den nye kontakten fortsatt finnees i kontakt-listen 

Når appen består disse testene vil det si at den nye kontaktinformasjonen blir hentet av AsyncStorage både når den skrives til listen første gang, og når den skrives til listen ved åpning av appen.

### Snapshot testing
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO


## Kodestruktur og kommentering
Vi har valgt å kalle variabler og funksjoner ut ifra hva de gjør, og legge til kommentarer som sier koden gjør.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Forklare dette mye bedre, kanskje snakke om prosjekt-konstanter osv

## Kilder:
- Todolist: https://codeburst.io/todo-app-with-react-native-f889e97e398e ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: denne må forklares mye bedre
