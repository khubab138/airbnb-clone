exports.PageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "pageNotFound",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
};
