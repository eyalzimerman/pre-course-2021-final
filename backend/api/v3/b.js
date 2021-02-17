const { json } = require("express");
const express = require("express");
const fs = require("fs");
const router = express.Router();

router.use(express.json());

router.get("/", (request, response) => {
  let allUsers = fs.readdirSync('./backend/bins');
  let allBins = [];

  for (let i = 0; i < allUsers.length; i++) {
    let body = fs.readFileSync(`./backend/bins/${allUsers[i]}`, {encoding:'utf8', flag:'r'});
    body = JSON.parse(body);
    allBins.push(body);
  }
  response.json(allBins);
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  let body = fs.readFileSync(`./backend/bins/${id}.json`, {encoding:'utf8', flag:'r'});
  body = JSON.parse(body);
  response.json(body);
});

router.post("/", (request, response) => {
  const { body } = request;
  console.log(body);
  const id = Date.now();
  try {
    fs.writeFileSync(
      `./backend/bins/${id}.json`,
      JSON.stringify(body, null, 4)
      );
      response.status(201).send(`task added, name: ${id}`);
  } catch (e) {
    response.status(500).json({ message: "Error!", error: e });
  }
});

router.put("/:created", (request, response) => {
  const { created } = request.params;
  const { body } = request;
  try {
    fs.writeFileSync(
      `./backend/bins/${created}.json`,
      JSON.stringify(body, null, 4)
    );
    response.json(body);
  } catch (e) {
    response.status(500).json({ message: "Error!", error: e });
  }
});

module.exports = router;