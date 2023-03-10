const axios = require("axios");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/events", (req, res) => {
    const event = req.body;
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);

    res.send({ status: 'Ok' });
});


app.listen(4005, ()=>{
    console.log("EventBus: Server is running on port 4005");
})