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
    try {
        const { id } = request.params;
        let body = fs.readFileSync(`./backend/bins/${id}.json`, {encoding:'utf8', flag:'r'});
        body = JSON.parse(body);
        response.json(body);
    } catch (e) {
        response.status(404).json({ message: "!!!Error!!! ID Not Found"});
    }
});

router.post("/", (request, response) => {
    const { body } = request;
    const id = Date.now();
    try {
        fs.writeFileSync(
        `./backend/bins/${id}.json`,
        JSON.stringify(body, null, 4)
        );
        response.status(201).send(`task added, name: ${id}`);
    } catch (e) {
        response.status(404).json({ message: "!!!Error!!! BIN Not Found"});
    }
});

router.put("/:id", (request, response) => {
    let allUsers = fs.readdirSync('./backend/bins');
    const { id } = request.params;
    const { body } = request;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i] === `${id}.json`) {
                    fs.writeFileSync(`./backend/bins/${id}.json`, JSON.stringify(body, null, 4));
                    response.json(body);
            }
        }
        response.status(404).json({ message: "!!!Error!!! ID Not Found"});
});

router.delete('/:id',(request, response)=>{
    let allUsers = fs.readdirSync('./backend/bins');
    const { id } = request.params;
    for(let i = 0; i< allUsers.length; i++){
        if (allUsers[i] === `${id}.json`) {
            fs.unlinkSync(`./backend/bins/${id}.json`);
            response.send('removed');
        }
    }
    response.status(404).json({ message: "!!!Error!!! ID Not Found"});
});

module.exports = router;