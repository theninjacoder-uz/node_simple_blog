const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const { Blog } = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//Connect to database
const dbURI =
  "mongodb+srv://theninjacoder:A5610818@cluster0.daquq.mongodb.net/ninja";
mongoose
  .connect(dbURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
//Register view engine
app.set("view engine", "ejs");

//Static files & middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Basic routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "My new blog",
    snippet: "This is the first one",
    body: "There will be more interesting blogs in the future. In shaa Alloh!",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//Get all blogs

//Get a single blog
app.get("/single-blog", (req, res) => {
  Blog.findById("60d881a985d4f91d00280e04")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 page" });
});
