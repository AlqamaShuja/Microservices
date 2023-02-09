const express = require("express");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const posts = {
    "24092f6c": {
        "id": "24092f6c",
        "title": "test post 1",
        "comments": [],
    },
    "a6400669": {
        "id": "a6400669",
        "title": "test post 2",
        "comments": [],
    },
    "bf7cb92b": {
        "id": "bf7cb92b",
        "title": "test post 3",
        "comments": [],
    }
};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    console.log("*****************");
    console.log(type);
    console.log(data);
    console.log("*****************");

    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    
    if(type === 'CommentCreated'){
        const {id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if(type === 'CommentUpdated'){
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comm => comm.id === id);
        comment.status = status;
        comment.content = content;
    }

    res.send({});
});


app.listen(4002, () => {
    console.log("Query: Server is running on port " + 4002);
})