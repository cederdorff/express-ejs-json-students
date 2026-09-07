import express from "express";
import fs from "node:fs/promises";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function loadStudents() {
  const data = await fs.readFile("./data/students.json", "utf8");
  return JSON.parse(data);
}

async function saveStudents(students) {
  const json = JSON.stringify(students, null, 2);
  await fs.writeFile("./data/students.json", json);
}

app.get("/", async (request, response) => {
  const students = await loadStudents();

  response.render("index", { students });
});

app.post("/students", async (request, response) => {
  const students = await loadStudents();

  const newStudent = {
    id: Date.now(),
    name: request.body.name,
    education: request.body.education
  };

  students.push(newStudent);

  await saveStudents(students);

  response.redirect("/");
});

app.post("/students/:id/delete", async (request, response) => {
  const students = await loadStudents();

  const remainingStudents = students.filter(
    (student) => student.id !== Number(request.params.id)
  );

  await saveStudents(remainingStudents);

  response.redirect("/");
});

app.get("/students/:id/edit", async (request, response) => {
  const students = await loadStudents();

  const student = students.find(
    (student) => student.id === Number(request.params.id)
  );

  response.render("edit", { student });
});

app.post("/students/:id/edit", async (request, response) => {
  const students = await loadStudents();

  const student = students.find(
    (student) => student.id === Number(request.params.id)
  );

  student.name = request.body.name;
  student.education = request.body.education;

  await saveStudents(students);

  response.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
