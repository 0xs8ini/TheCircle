function IsAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      next(); // logged in
    } else {
      res.redirect("/login"); // or send a 401
    }
  }

module.exports = { IsAuthenticated };
  