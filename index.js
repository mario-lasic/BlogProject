import express from "express";
import Post from "./post.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let id = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: posts,
  });
});

app.get("/p/:tagId", (req, res) => {
  res.render("post.ejs", {
    post: posts[req.params.tagId],
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/edit/:tagId", (req, res) => {
  res.render("edit.ejs", {
    post: posts[req.params.tagId],
  });
});

app.post("/edit", (req, res) => {
  var index = posts.findIndex(item => item.id.toString() === req.body.id);
  posts[index].text = req.body.text;
  posts[index].title = req.body.title;
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  var index = posts.findIndex(item => item.id.toString() === req.body.id);
  console.log(index);
  if (index > -1) {
    posts.splice(index, 1);
  }
  console.log(posts);
  res.redirect("/");
});

app.post("/create", (req, res) => {
  let newPost = new Post(req.body.title, req.body.text, id);
  posts.push(newPost);
  id++;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
