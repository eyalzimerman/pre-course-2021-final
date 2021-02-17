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

// router.get("/:name", (request, response) => {
//   const { name } = request.params;
//   response.send(`Hello ${name}!`);
// });

// router.post("/", (request, response) => {
//   const { body } = request;
//   try {
//     fs.writeFileSync(
//       `./greets/greet-${Date.now()}.json`,
//       JSON.stringify(body, null, 4)
//     );
//     response.status(201).send("greet added");
//   } catch (e) {
//     response.status(500).json({ message: "Error!", error: e });
//   }
// });

// router.put("/:created", (request, response) => {
//   const { created } = request.params;
//   const { body } = request;
//   try {
//     fs.writeFileSync(
//       `./greets/greet-${created}.json`,
//       JSON.stringify(body, null, 4)
//     );
//     response.json(body);
//   } catch (e) {
//     response.status(500).json({ message: "Error!", error: e });
//   }
// });

module.exports = router;