const { Blog } = require("../models/blog");

const blogGetIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("blogs/index", { title: "All-blogs", blogs: result })
    )
    .catch((err) => console.log(err));
};

const blogCreate = (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => res.redirect("/blogs"))
    .catch((err) => console.log(err));
};

const blogCreateGet = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blogGetDetails = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { title: "Blog details", blog: result });
    })
    .catch((err) => res.status(404).render("404"));
};

const blogDelete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
};

module.exports = {
  blogGetIndex,
  blogCreate,
  blogCreateGet,
  blogGetDetails,
  blogDelete,
};
