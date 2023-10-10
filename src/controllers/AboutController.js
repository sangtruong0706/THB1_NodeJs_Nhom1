import asyncHandler from "express-async-handler";

const aboutPage = asyncHandler(async (req, res) => {
  if (req.user) {
    return res.render("main", {
      data: { title: "This is home page",page: "about" ,user: req.user },
    });
  } else {
    return res.redirect("/login");
  }
});

module.exports = {
  aboutPage,
};
