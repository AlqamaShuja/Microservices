const express  = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require('axios');

const app = express();

// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const posts = {
    "24092f6c": {
        "id": "24092f6c",
        "title": "test post 1"
    },
    "a6400669": {
        "id": "a6400669",
        "title": "test post 2"
    },
    "bf7cb92b": {
        "id": "bf7cb92b",
        "title": "test post 3"
    }
};

app.get("/posts", (req, res) => {
    res.send(posts);
});
app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id, title
    }

    await axios.post("http://localhost:4005/events", {
        type: "PostCreated",
        data: {
            id, title
        }
    });

    res.status(201).send(posts[id])
});

app.post("/events", (req, res) => {
    console.log("Received Events ", req.body.type);
    res.send({});
});




const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log("change in index.js");
    console.log("Posts: Server running on http://localhost:"+port);
})