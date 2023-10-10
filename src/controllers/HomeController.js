import asyncHandler from "express-async-handler";

const homePage = asyncHandler(async (req, res) => {
  // console.log(req.user);
  if (req.user) {
    return res.render("main", {
      data: { title: "This is home page",user: req.user },
    });
  } else {
    return res.redirect("/login");
  }
});

module.exports = {
  homePage,
};
