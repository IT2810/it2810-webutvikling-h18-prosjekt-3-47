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
- Deretter kan du starte å skrive tester, dette er beskrevet nærmere under Enhetstesting.

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
#### Enheststesting.

Jest skal være lagt til i package.json fila.

![#f03c15](https://placehold.it/15/f03c15/000000?text=+) TODO skriv om todoList og kalender-testing

##### Calendar
Det er skrevet flere tester for Calendar og medhørende komponenter (`CalendarEntryInput` og `DayView`). Her er det noen tester som tester statiske funksjoner direkte, men de fleste funksjonene i `Calendar` og `CalendarEntryInput` avhenger av state eller AsyncStorage. Har skrevet en del tester som bruker state, og dette er selvfølgelig ikke en optimal løsning. Hvis jeg skulle skrevet disse komponentene på nytt, hadde jeg lagt mye mer logikk ut i statiske funksjoner og heller hatt enklere funksjoner som går på state. Hadde også veldig mye problemer med å mocke AsyncStorage, fikk dette aldri ordentlig til, og det er dermed en del jeg ikke fikk testet. Hvis jeg hadde fått til å mocke AsyncStorage, hadde jeg kjørt mer inngående tester på mer full lifecycle. 

I `CalendarEntryInput` møtte jeg på et vanskelig problem med referanser. Jeg har en referanse til et textInput som jeg bruker til å cleare feltet. Denne referansen blir ikke satt når man kjører tester. Jeg leste en del om å mocke referanser, men fikk ikke dette til. Jeg bestemte meg for å ikke bruke mer tid på å få til dette lille problemet, og heller fokusere på viktigere saker. Derfor wrappet jeg `this.textInput.clear();` i en try-catch-blokk for å unngå å få breaking errors i testene, og heller bare kjøre `console.warn` på erroren. Dette er absolutt ikke en optimal løsning, ved å endre på kildekoden for å få testen til å fungere, men jeg så på dette som det klokeste valget, for å komme i havn med annen testing. Hadde allerede møtt på nok rare problemer når det kommer til testoppsettet, så hadde ikke overskudd til å prioritere dette.


##### ContactsScreen

På grunn av problemer med AsyncStorage og referanser, som er beskrevet i avsnittet om Calendar-testing, fikk vi ikke gjort skikkelig enhets-testing. 

Vi har lagt ved unit-tester for subkomponentene til ContactsScreen. Disse sjekker for eksempel at state er som forventet ved rendring, og endrer seg som forventet når en metode blir kallet. Dette ble forenklet ved å mocke popup-dialog i testene. For å godta at den da ikke kan bli kallet la vi inn en try-catch rundt popupDialog.show i openContact-metoden i ContactList. Siden dette ikke er en optimal løsning har vi valgt at det skal utløse en warning. 

Vi har ikke lagt ved unit-tester for metodene i ContactsScreen. Dette kommer av at vi ikke har klart å finne en hensiktsmessig måte å mocke AsyncStorage. Det ble da utfordrende å skrive unit-tester for metodene, siden disse bruker AsyncStorage enten direkte eller indirekte. Om vi hadde fått til mocking ville vi ha gjort et kall med receiveNewContact(contact, callback) med full kontaktinformasjon i contact og null i callback, og sjekket om kontaktinformasjonen ble skrevet til state via storeData(path, data) og loadContacts som begge ville benyttet den mockede versjonen av AsyncStorage. 

Det fantes heller ingen enkel måte å unit-teste selve AsyncStorage. Våre akseptansetester tyder på at AsyncStorage fungerer som den skal. Når appen består disse testene vil det si at den nye kontaktinformasjonen blir hentet av AsyncStorage både når den skrives til listen første gang, og når den skrives til listen ved åpning av appen.

#### Snapshot testing
Snapshot-testing er et nyttig verktøy for å forsikre seg om at brukergrensesnittet ikke endrer seg uventet. En typisk test case for en mobil-app rendrer brukergrensesnitt-komponenten, tar en skjermdump og sammenligner med et bilde som er lagret sammen med testen. Testen mislykkes om de to bildene ikke matcher. Enten er endringen uventet, eller så må skjermdumpen oppdateres med den nye versjonen av komponenten.

Snapshot testing er lagt ved for alle hovedkomponenter og deres subkomponenter, med unntak av Geolocation. Både rendering og shallow rendering er brukt.

#### Kilde: https://jestjs.io/docs/en/snapshot-testing

## Akseptansetesting
Som beskrevet tidligere er akseptansetester brukt som komplement og som erstatning der unit-testing ikke er tilfredstillende. Under følger beskrivelser av disse.

### Calendar
Vi kjørte akseptansetesting av Calendar ved å åpne CalendarScreen (velge _Calendar_ på bunn-menyen) og deretter følge følgende steg:

1. Trykk på "Åpne datovelgeren", velg 1. januar 1900, men ikke send inn, trykk 'Avbryt' i stedet. Verifisér at kalenderen fortsatt viser dagens måned og at dagens dato er markert med blå fylt sirkel. Verifiser at riktig dag og dato står under lenkene.
1. Trykk på "Åpne datovelgeren", velg 1. januar 1900 og send inn. Verifisér at kalenderen nå viser januar 1900, og at 1. januar er markert med blå fylt sirkel.
1. Trykk på "I dag" og verifiser at kalenderen nå går til dagens måned og at dagens dato er markert med blå fylt sirkel.
1. Trykk kort på en annen dag i måneden. Verifiser at denne blir markert med blå fylt sirkel, og at dagens dato er markert med blå tekst på tallet. Langtrykk på siste dag i måneden, verifisér at det kommer opp en "popup". 
    1. Verifisér at datoen du langtrykket på står som "Valgt dato"
    1. Fyll inn `        ds        ` i tekstfeltet.
    1. Trykk "Send inn" og verifiser at du får feilmelding om at inputen er for kort.
    1. Fyll inn `Møte med Neil Armstrong` i tekstfeltet og trykk "Send inn". Verifiser at popupen lukker seg.
    1. Verifisér at det er en farget "dott" på datoen du valgte, og verifisér at du kan se den nye hendelsen din på bunnen av skjermen.
    1. Klikk på "Åpne datovelgeren" og verifiser at det kun er en placeholder (Møte med Erna Solberg) i tekstfeltet.
1. Trykk på på pilene for å gå frem to måneder, og så tilbake fire måneder. Verifisér at dotten som markerer hendelsen din laster når du passerer den "på vei tilbake".
1. Klikk på "I dag"
1. Trykk på "Legg til en ny kalenderhendelse". Trykk på "Åpne datovelgeren" inni popupen og velg 24. desember 2020. Verifisér at det står "Valgt dato: 24. Desember 2020".
1. Skriv inn "Julegrøt med Jens Stoltenberg" i feltet, men klikk så på "Lukk popup".
1. Klikk på "Åpne datovelgeren". Verifisér at det ikke står "Valgt dato: 24. Desember 2020" (med mindre du tester dette på julaften 2020). Verifisér at det fortsatt står "Julegrøt med Jens Stoltenberg" i tekstfeltet, og "Valgt dato: 24. Desember 2020".
1. Klikk "Send inn".
1. Klikk "Legg til ny hendelse". Verifisér at tekstfeltet er tomt.
1. Klikk på "Send inn". Verifisér at du får advarsel "Dette feltet er påkrevd"

Denne akseptansetesten ble gjennomført på flere Android-enheter, men vi fikk ikke tak i iOS-enhet for å gjennomføre denne testen i sin helhet på iOS.

### Todolist
Vi kjørte akseptansetesting av Todolist ved å åpne TodolistScreen (velge _Todolist_ på bunn-menyen) og deretter følge følgende steg:
1. Trykk på tekstenboksen nederst til venstre
2. Skriv inn en oppgave du ønsker å gjøre og trykk send
3. Deretter kan du velge å slette oppgaven ved å trykke på tilhørende X
4. Eller så kan du gå ut av appen, gå inn igjen og se at oppgaven ligger der(og slette den med X hvis du ønsker det). 

Denne akseptansetesten ble gjennomført på flere Android-enheter, men vi fikk ikke tak i iOS-enhet for å gjennomføre denne testen i sin helhet på iOS.

### Contacts
Vi kjørte akseptansetesting av Contacts ved å åpne ContactsScreen (velge _Contacts_ på bunn-menyen) og deretter følge følgende steg i de to testene:

#### Test av oppretting av kontakt:
1. Åpne "Create New Contact" med knappen nederst.
2. Trykk "Save"-knappen og få feilmeldding om fylling av felt.
3. Fyll inn et navne-feltet.
4. Trykk "Save"-knappen og få feilmeldding om fylling av felt.
5. Fyll inn et telefonnummer-feltet.
6. Trykk "Save"-knappen og få feilmeldding om fylling av felt.
7. Fyll inn bare space i adresse-feltet.
8. Trykk "Save"-knappen og få feilmeldding om lengde på input.
9. Fyll inn en adresse.
10. Trykk "Save"-knappen og se at den nye kontakten finnes i kontakt-listen.

##### Test av lagring under lukking av appen
1. Åpne "Create New Contact" med knappen nederst.
2. Fyll inn et navne-feltet.
3. Fyll inn et telefonnummer-feltet.
4. Fyll inn en adresse.
5. Trykk "Save"-knappen og se at den nye kontakten finnes i kontakt-listen.
6. Lukk appen.
7. Åpne appen og se at den nye kontakten fortsatt finnees i kontakt-listen.

Disse akseptansetestene ble gjennomført på flere Android-enheter, men vi fikk ikke tak i iOS-enhet for å gjennomføre denne testene i sin helhet på iOS.

### Geolocation
Vi kjørte akseptansetesting av Geolocation ved å åpne GeolocationScreen (velge _Geolocation_ på bunn-menyen) og deretter følge følgende steg:
1. Trykk på at du samtykker til at Expo kan hente inn din posisjon.
2. Finn deg selv på skjermen med blå posisjons-ikon.
3. Gå til punktet som er nærmest deg.
4. Se at markøren endres til et checkmark-ikon.
5. Se at melding og poeng oppdateres.

Denne akseptansetesten ble gjennomført på flere Android-enheter, men vi fikk ikke tak i iOS-enhet for å gjennomføre denne testen i sin helhet på iOS.

I bildene under viser vi hvordan geolocation ser ut ettersom man besøker de forskjellige markørene.
Bildene 1-4 illustrerer hvordan det ser ut når vi beveger oss rundt på Gløshaugen, mens 5-6 illustrerer effekten av å skru opp konstanten (DISTANCE_THRESHOLD_FACTOR) som påvirker distansen som posisjonen vår gir.

Litt |  Bilder
------------- | -------------
![image](https://user-images.githubusercontent.com/12127271/47214180-78835800-d39d-11e8-99e1-38970396cfe9.png)  | ![image](https://user-images.githubusercontent.com/12127271/47214214-90f37280-d39d-11e8-96e7-328a04fe095b.png)
![image](https://user-images.githubusercontent.com/12127271/47214166-66a1b500-d39d-11e8-8af8-c51fdc1e1a18.png)  | ![image](https://user-images.githubusercontent.com/12127271/47214275-af596e00-d39d-11e8-8010-bbfc7aa52781.png)
![image](https://user-images.githubusercontent.com/12127271/47214708-1deafb80-d39f-11e8-9503-8b03b65cea0e.png) | ![image](https://user-images.githubusercontent.com/12127271/47214716-20e5ec00-d39f-11e8-8512-a3a8b7b2658e.png)

## Kodestruktur og kommentering
Vi har valgt å kalle variabler og funksjoner ut ifra hva de gjør, og legge til kommentarer som sier noe om hva funksjonen gjør, hvilken type input og output er, samt hva de gjør i funksjonen.

Vi har valgt å lage en mappe med prosjekt-konstanter som inneholder farger, dager, layout og datoformat. Disse brukes i de forskjellige komponentene.
