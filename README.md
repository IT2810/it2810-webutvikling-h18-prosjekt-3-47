# Prosjekt 3 - Gruppe 47

## Dokumentasjonsbeskrivelse
* Prosjektet dokumenteres med en README.md i git repositoriet.
* Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).
* Koden skal være lettlest og godt strukturert slik at den er lett å sette seg inn i. Bruk av kommentarer skal være tilpasset at eksterne skal inspisere koden.
* Gruppas valg av teknologi som utforskes (jmfr krav til innhold) skal dokumenteres i tutorials form slik at andre lett kan lære av eksempelet dere lager (dvs. gi en liten introduksjon til hva og hvordan).



## Samarbeid i gruppa.
Vi har valgt som sist å dele opp arbeidet(se bruk av git) i flere deler slik at hver person kunne jobbe selvstendig eller sammen. Vi prøver å passe på at det er lav terskel for å spørre om hjelp, slik at ingen blir sittende fastlåst uten å komme seg videre, uten at andre oppdager det. Pull request reviews er en fin mulighet til å gi konstruktiv kritikk på hverandres arbeid og få bedre kode, samtidig som vi kan hjelpe hverandre å bli bedre til å kode. Vi har i noen tilfeller brukt peer programming(spesielt i geolocation komponenten og testing) der ting var vanskelig å få til alene.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Skrive litt mer utfyllende



## Innhold og funksjonalitet.
Vi har valgt å dele opp (motivasjons)appen i flere deler med en todolist, kalender og kontaktliste, samt en GPS-/Kart-modul hvor man skal bli motivert til å fysisk besøke forskjellige punkter for å få poeng som skal fungere som motivasjonsmiddel. Disse forskjellige komponentene/delene er i stor grad uavhengige av hverandre. Vi valgte å gjøre dette for å komme fortere i gang med selve utviklingen. I nettsideprosjektet opplevde vi at veldig mye arbeid var veldig avhengig av annet arbeid, så det ble til tider litt vanskelig for tre personer å jobbe parallelt. I dette prosjektet opplevde vi at alle kunne begynne med sine issues fra dag én. Det hjalp også å bruke expo sin tab-template, da den allerede hadde oppsettet med overskrift og tabs på slutten av siden. Denne templaten håndterer også navigasjonen mellom screenene, så vi kunne gå rett på å utvikle innholdet, og slippe å bruke mye tid på formaliteter som ville hindret vår mulighet til å jobbe parallelt i starten.

## Valg av teknologi.
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Skrive om teksten, gjøre den mer utfyllende og korrekt

I dette prosjektet har vi tatt i bruk React Native, Expo, Node + npm, Jest og Asyncstorage.

### React Native 
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan
React native er et rammeverk som gjør det mulig å lage native apper for Android og iOS. Dette gjøres ved å skrive vanlig JavaScript og React. Dette gjør at React native kan lage de samme UI byggeklossene som vanlig C++ og Java kan.
Hvordan bruke React Native(se Expo)
Kilde: https://facebook.github.io/react-native/
### Expo
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan
Expo er det som heter shared native runtime, det gjør at man ikke trenger å kjøre native kode, men heller kan fokusere på å skrive og kjøre en react app i JavaScript. Du trenger ikke å bry deg om iOS eller Android sine instillinger, eller å bruke Xcode. Expo gir en god jobbflyt gjennom Expo cli(command line interface) og Expo utviklerverktøy for å gjøre det lettere å utvikle og gi ut appen.
Hvordan bruke Expo:
Kilde: https://docs.expo.io/versions/latest/introduction/already-used-react-native.html
### Node + npm
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan
Node er en JavaScript runtime som er designet for skalerbare nettverk applikasjoner. Den er asynkron og kan da håndtere flere requests samtidig. NPM står for Node Packet Manager og kan brukes til å installere pakker/moduler som inneholder de filene man trenger for å bygge nesten alt man vil(kanskje alt i verden). 
Hvordan bruke Node:
- Først, gå til https://nodejs.org/en/ og last ned Node.js for ditt operativsystem.
- Deretter kan du trykke på installeringsfila, gå gjennom installeringsprosessen og trykk installer.
- Når du er ferdig, er det bare å kose seg med Node.
Hvordan bruke npm:
- Forutsatt at du har lastet ned og installert Node.js, kan du nå bruke npm
- For å laste ned de pakkene du ønsker, kan du gå til kommandolinja/Git Bash/intern kommandolinje.
- Deretter gå til prosjektmappa di eller installer den globalt med -g
- Den viktigste kommandoen å huske er npm install -g "pakkenDuTrenger"
- Er du på Mac og ikke admin må du skrive sudo før npm.
### Jest
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO:  gi en liten introduksjon til hva og hvordan
Jest er et testrammeverk laget for Unit testing i JavaScript, parallallisering av tester gjør at dette kjører fort og inkluderer en enkel og forståelig syntax som skal gjøre det lettere å skrive tester. Det følger også med snapshot-testing, som gjør det mulig å merke forskjeller i UI-komponentene.
Hvordan bruke Jest:
- For å installere Jest bruker man Node og kommandoen npm install --save-dev jest
- Deretter kan du starte å skrive tester
### Asyncstorage



## Bruk av git.

### Issues og Pull request:
I dette prosjektet har vi fra starten delt opp oppgaven og satt issues til hver del. Vi ar innført strengere branch-regler. Disse innebærer at man ikke kan pushe direkte til `master` eller `develop`, man må bruke pull requests. Det kreves minst én godkjenning fra andre for at pull requesten skal kunne merges. 

### Delegering av issues:
De fleste issues har blitt tildelt én person, men noen har blitt tildelt flere. I hovedsak har man det hele ansvaret for sine issues, men det er lav terskel for å spørre om hjelp. Enkelte biter av koden har i praksis blitt parprogrammert, da vi har har sittet på grupperom flere ganger i uka, og spurt andre gruppemedlemmer om å sitte ved siden av og hjelpe til hvis det er noe man sliter med.



## Testing.
### Jest
Jest skal være lagt til i package.json fila.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO

### Snapshot testing
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO

## Kodestruktur og kommentering
Vi har valgt å kalle variabler og funksjoner ut ifra hva de gjør, og legge til kommentarer som sier noe om hva funksjonen gjør, hvilken type input og output er, samt hva de gjør i funksjonen.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Forklare dette mye bedre, kanskje snakke om prosjekt-konstanter osv

## Kilder:
- Todolist: https://codeburst.io/todo-app-with-react-native-f889e97e398e ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: denne må forklares mye bedre
