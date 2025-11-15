const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  Home.find().then((registerdHomes) => {
    res.render("store/index", {
      registerdHomes: registerdHomes,
      pageTitle: "airbnb Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.find().then((registerdHomes) => {
    res.render("store/home-list", {
      registerdHomes: registerdHomes,
      pageTitle: "Homes List",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.getBookings = (req, res, next) => {
  Home.find().then((registerdHomes) => {
    res.render("store/booking", {
      registerdHomes: registerdHomes,
      pageTitle: "my Bookings",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getFavourite = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");

  res.render("store/favourite", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourite",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  return res.redirect("/favourite");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;

  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }
  res.redirect("/favourite");
};

exports.getHomeDetails = (req, res, next) => {
  const homeID = req.params.homeId;
  Home.findById(homeID).then((home) => {
    if (!home) {
      console.log("Homes Not Found");
      res.redirect("/home");
    } else {
      res.render("store/home-Details", {
        home: home,
        pageTitle: "Home Details",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
