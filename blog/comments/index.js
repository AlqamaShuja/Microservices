const express  = require("express");
const { randomBytes } = require("crypto")
const cors = require("cors");
const axios = require("axios");

const app = express();

// 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsByPostId = {
    
};

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const id = randomBytes(4).toString("hex");
    const { comments } = req.body;
    commentsByPostId[postId] = commentsByPostId[postId] ? [...commentsByPostId[postId], { id, content: comments, status: 'pending' }] :  [{ id, content: comments, status: 'pending' }];

    await axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
            id, content: comments, postId, status: 'pending',
        }
    });

    res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
    console.log("Received Events ", req.body.type);
    const {type, data} = req.body;

    if(type === "CommentModerated"){
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(com => com.id === id);

        comment.status = status;

        await axios.post("http://localhost:4005", {
            type: "CommentUpdated",
            data: {
                id, status, postId, content
            }
        })
    }
    res.send({});
});



const port = process.env.PORT || 4001;
app.listen(port, ()=>{
    console.log("Comments: Server running on http://localhost:" + port);
})