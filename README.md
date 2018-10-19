# Prosjekt 3 - Gruppe 47

## Dokumentasjonsbeskrivelse
* Prosjektet dokumenteres med en README.md i git repositoriet.
* Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).
* Koden skal være lettlest og godt strukturert slik at den er lett å sette seg inn i. Bruk av kommentarer skal være tilpasset at eksterne skal inspisere koden.
* Gruppas valg av teknologi som utforskes (jmfr krav til innhold) skal dokumenteres i tutorials form slik at andre lett kan lære av eksempelet dere lager (dvs. gi en liten introduksjon til hva og hvordan).



## Samarbeid i gruppa.
Vi har valgt som sist å dele opp arbeidet(se bruk av git) i flere deler slik at hver person kunne jobbe selvstendig eller sammen. Vi prøver å passe på at det er lav terskel for å spørre om hjelp, slik at ingen blir sittende fastlåst uten å komme seg videre, der ingen andre oppdager det. Pull request reviews er en fin mulighet til å gi konstruktiv kritikk på hverandres arbeid og få bedre kode, samtidig som vi kan hjelpe hverandre å bli bedre til å programmere. Vi har i noen tilfeller brukt peer programming(spesielt i geolocation komponenten og testing) der ting var vanskelig å få til alene.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Skrive litt mer utfyllende



## Innhold og funksjonalitet.
Vi har valgt å dele opp (motivasjons)appen i flere deler med en todolist, kalender og kontaktliste, samt en GPS-/Kart-modul hvor man skal bli motivert til å fysisk besøke forskjellige punkter for å få poeng som skal fungere som motivasjonsmiddel. Disse forskjellige komponentene/delene er i stor grad uavhengige av hverandre. Vi valgte å gjøre dette for å komme fortere i gang med selve utviklingen. I nettsideprosjektet opplevde vi at veldig mye arbeid var veldig avhengig av annet arbeid, så det ble til tider litt vanskelig for tre personer å jobbe parallelt. I dette prosjektet opplevde vi at alle kunne begynne med sine issues fra dag én. Det hjalp også å bruke expo sin tab-template, da den allerede hadde oppsettet med overskrift og tabs på slutten av siden. Denne templaten håndterer også navigasjonen mellom screenene, så vi kunne gå rett på å utvikle innholdet, og slippe å bruke mye tid på formaliteter som ville hindret vår mulighet til å jobbe parallelt i starten.

## Valg av teknologi.
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Skrive om teksten, gjøre den mer utfyllende og korrekt

I dette prosjektet har vi tatt i bruk React Native, Expo, Node + npm, Jest og Asyncstorage.

### React Native 
React native er et rammeverk som gjør det mulig å lage native apper for Android og iOS. Dette gjøres ved å skrive vanlig JavaScript og React. Dette gjør at React native kan lage de samme UI byggeklossene som vanlig C++ og Java kan.
#### Hvordan bruke React Native(se også Expo siden de henger sammen):
- Først må du inkludere React i prosjektet med: __import React, { Component } from 'react';__
- Så under må man skrive: __import { Text, View } from 'react-native';__ for å kunne bruke taggene du trenger i render.
- Deretter kan man begynne å skrive komponenten
Kilde: https://facebook.github.io/react-native/

### Expo
Expo er det som heter shared native runtime, det gjør at man ikke trenger å kjøre native kode, men heller kan fokusere på å skrive og kjøre en react app i JavaScript. Du trenger ikke å bry deg om iOS eller Android sine instillinger, eller å bruke Xcode. Expo gir en god jobbflyt gjennom Expo cli(command line interface) og Expo utviklerverktøy som kan gi en tunnel over WiFi for å gjøre det lettere å utvikle og gi ut appen. Med tunnelen kan du også være på et annet nett så lenge du kjører prosjektet ditt, men kan gi litt problemer hvis du bruker 4G, det er også mulig å kjøre det på local network.
#### Hvordan bruke Expo:
- For å installere expo trenger man kommandoen: __npm install -g expo-cli__
- Deretter kan man lage et nytt prosjekt med kommandoen: __expo init my-new-project__, gå inn i mappa med kommandoen: __cd my-new-project__, og starte prosjektet med kommandoen: __expo start__
#### Kilde: https://docs.expo.io/versions/latest/introduction/already-used-react-native.html

### Node + npm
Node er en JavaScript runtime som er designet for skalerbare nettverk applikasjoner. Den er asynkron og kan da håndtere flere requests samtidig. NPM står for Node Packet Manager og kan brukes til å installere pakker/moduler som inneholder de filene man trenger for å bygge nesten alt man vil(kanskje alt i verden). 
#### Hvordan bruke Node:
- Først, gå til https://nodejs.org/en/ og last ned Node.js for ditt operativsystem.
- Deretter kan du trykke på installeringsfila, gå gjennom installeringsprosessen og trykk installer.
- Når du er ferdig, er det bare å kose seg med Node.
#### Hvordan bruke npm:
- Forutsatt at du har lastet ned og installert Node.js, kan du nå bruke npm
- For å laste ned de pakkene du ønsker, kan du gå til kommandolinja/Git Bash/intern kommandolinje for IDE.
- Deretter gå til prosjektmappa di eller installer den globalt med -g
- Den viktigste kommandoen å huske er __npm install -g "pakkenDuTrenger"__
- Er du på Mac og ikke admin må du skrive sudo før npm.
#### Kilder:
- https://www.w3schools.com/nodejs/nodejs_npm.asp

### Jest
Jest er et testrammeverk laget for Unit testing i JavaScript, parallallisering av tester gjør at dette kjører fort og inkluderer en enkel og forståelig syntax som skal gjøre det lettere å skrive tester. Det følger også med snapshot-testing, som gjør det mulig å merke forskjeller i UI-komponentene.
#### Hvordan bruke Jest:
- For å installere Jest bruker man Node og kommandoen __npm install --save-dev jest__
- Deretter kan du starte å skrive tester

### AsyncStorage
AsyncStorage er et simpelt, asynkront key-value lagringssystem som gjør det mulig å lagre informasjon lokalt på enheten. Dette gjør at appen kan huske hvilke endringer bruker har gjort, lagre de og vise dem fram når bruker kommer tilbake for å bruke appen videre. AsyncStorage skal være implementert ifølge kravet hos Kontakter, Kalender og Todolist.
#### Hvordan bruke AsyncStorage:
- først importert AsyncStorage ved hjelp av __import { AsyncStorage } from "react-native"__
- deretter har du mulighet til sette verdier ved hjelp av __await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');__
- og hente det ut ved hjelp av: __const value = await AsyncStorage.getItem('TASKS');__
- disse bør være innenfor try catch blokker for å sikre at vi ikke får unødvendige feil eller at vi ikke får vist feilmeldingen.
#### Kilde: https://facebook.github.io/react-native/docs/asyncstorage

## Bruk av git.

### Issues og Pull request:
I dette prosjektet har vi fra starten delt opp oppgaven og satt issues til hver del. Vi ar innført strengere branch-regler. Disse innebærer at man ikke kan pushe direkte til `master` eller `develop`, man må bruke pull requests. Det kreves minst én godkjenning fra andre for at pull requesten skal kunne merges. 

### Delegering av issues:
De fleste issues har blitt tildelt én person, men noen har blitt tildelt flere. I hovedsak har man det hele ansvaret for sine issues, men det er lav terskel for å spørre om hjelp. Enkelte biter av koden har i praksis blitt parprogrammert, da vi har har sittet på grupperom flere ganger i uka, og spurt andre gruppemedlemmer om å sitte ved siden av og hjelpe til hvis det er noe man sliter med.

## Komponenter
### Kontakter
Denne komponenten gir bruker mulighet til å registrere kontakter og få disse i ei liste som kan bla i. Vi har tatt i bruk AsyncStorage og det skal være laget snapshot-test av UI som rendres, samt noen funksjoner som er testet med unittesting i Jest. AsyncStorage har det vært lite hell med.
### Kalender
Denne komponenten viser en kalender for bruker og gir mulighet til å registrere forskjellige avtaler på hver dato, disse vises når man trykker på en gitt dato i kalenderen. Løsningen bruker AsyncStorage, det er laget snapshot-tester og noen funksjoner som er testet med unittesting i Jest.
### Todolist
Denne komponenten er laget for å gi bruker mulighet til å registrere oppgaver, samt fjerne det som man ikke ønsker å gjøre.
Vi har tatt utgangspunkt i en komponent som vi fant på nett, løsningen hadde noen få mangler der vi fikk warnings og noen problemer med CSS, dette fikset vi med å bruke toString() metoden for de nøklene som forventet det. Løsningen bruker AsyncStorage, men komponenten har vist seg vanskelig å teste på grunn av tekniske problemer med å mocke AsyncStorage. Grunnen til at vi valgte å gjøre det ulikt for denne komponeten, var fordi vi ønsket å ha noen som kunne starte og jobbe på komponenten med API(geolocation), dette viste seg for å være et fornuftig valg med tanke på at Geolocation komponenten tok lang tid å utvikle og krevde mye jobb.
#### Koden er hentet fra: https://codeburst.io/todo-app-with-react-native-f889e97e398e 
### Geolocation
Denne komponenten rendrer et kart ved hjelp av react-native-maps og tar inn posisjon ved hjelp av expo sitt bibliotek for geolokasjon. Vi har så lagt til funksjonalitet for å vise markører, hvis de besøkes endrer de tilstand med et checkmerke, samt poeng og beskjed til bruker som oppdaterer seg ut ifra hvor mange som besøkes. Denne løsningen har ikke brukt AsyncStorage eller testet med Jest på grunn tidsbegrensninger. Vi har dog gjort en akseptansetest som er beskrevet lenger ned.
## Testing.
### Jest
Jest skal være lagt til i package.json fila.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO

### Snapshot testing
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO

### Hva som er testet:
Med tanke på litt uklare krav, tidsbegrensninger og tekniske problemer med testingen har vi bare testet kalender, kontakter og todolist, og ikke geolocation. Alt fungerer som det skal i denne komponenten og vi har kjørt en akseptansetest for å se at alt fungerer.
Måten vi har gjort det på er som følger:
- Åpne appen med et punkt i nærheten.
- Gå til det punktet, se at markøren blir besøkt(checkmerke) og få oppdatert poeng.
- Deretter har vi økt threshold for distanse til 1 grad(dette tilsvarer 111 km i Trondheim) og sett at alle markørene blir besøkt og fått alle poengene som er mulig.
Grader til meter kalkulator: http://www.csgnetwork.com/degreelenllavcalc.html


## Kodestruktur og kommentering
Vi har valgt å kalle variabler og funksjoner ut ifra hva de gjør, og legge til kommentarer som sier noe om hva funksjonen gjør, hvilken type input og output er, samt hva de gjør i funksjonen.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO: Forklare dette mye bedre, kanskje snakke om prosjekt-konstanter osv

## Kilder:
- Todolist: https://codeburst.io/todo-app-with-react-native-f889e97e398e 

