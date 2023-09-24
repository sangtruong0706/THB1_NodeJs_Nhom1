import asyncHandler from "express-async-handler";

const aboutPage = asyncHandler(async (req, res) => {
  return res.render("main", { data: { title: "This is about page", page: "about" } });
});

module.exports = {
  aboutPage,
};
