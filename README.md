# Løsningsforslag · JSON-øvelse: Studerende i en JSON-fil

Løsningsforslag til [JSON-øvelse: Studerende i en JSON-fil](https://github.com/cederdorff/wu-e26a/blob/main/opgaver/express-ejs-json-students.md) fra WU-E26A (opgaveteksten ligger også som [`_exercises/express-ejs-json-students.md`](_exercises/express-ejs-json-students.md) i dette repo) — en lille, selvstændig server, der bruges som opvarmning før [Øvelse 5: Gem AMAbottens chathistorik i en JSON-fil](https://github.com/cederdorff/node-express-ejs-client-server-app/tree/solve-5-express-ejs-amabot-persistens).

Serveren gemmer ikke sine data i en variabel, men i `data/students.json`. Hver route læser filen, når den har brug for data, og skriver den igen ved ændringer — der er ingen `students`-variabel, der lever videre mellem requests.

```text
GET /                    -> loadStudents() -> fs.readFile() -> JSON.parse()                       -> EJS -> HTML

POST /students           -> loadStudents() -> students.push()          -> saveStudents()
POST /students/:id/edit  -> loadStudents() -> .find() + mutation       -> saveStudents()
POST /students/:id/delete -> loadStudents() -> .filter()               -> saveStudents()
```

Løsningen inkluderer alle ekstraopgaver fra opgaveteksten: slet (trin 8), redigér (trin 9), og den fælles `loadStudents()`/`saveStudents()`-refaktorering (trin 10).

## Kør projektet

```bash
npm install
npm run dev
```

Åbn <http://localhost:3000>.

## Tjekpunkt

- læser `data/students.json` og viser studerende med EJS
- opretter en ny studerende via en formular
- redigerer og sletter en studerende
- skriver den opdaterede liste tilbage til `data/students.json` ved enhver ændring
- beholder alle studerende efter en genstart af serveren
- har ingen `students`-variabel uden for `loadStudents()`, `saveStudents()` og routes

## Projektstruktur

```text
express-ejs-json-students/
├── _exercises/
│   └── express-ejs-json-students.md
├── data/
│   └── students.json
├── node_modules/
├── views/
│   ├── index.ejs
│   └── edit.ejs
├── package-lock.json
├── package.json
└── server.js
```
