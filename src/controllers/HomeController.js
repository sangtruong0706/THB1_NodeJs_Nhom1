import asyncHandler from "express-async-handler";

const homePage = asyncHandler(async (req, res) => {
  return res.render("main", { data: { title: "This is home page" } });
});

module.exports = {
  homePage,
};
