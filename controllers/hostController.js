const Home = require("../models/home");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "add home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home Not Found for Editing");
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      pageTitle: "edit home",
      editing,
      home: home,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registerdHomes) => {
    res.render("host/host-home-list", {
      registerdHomes: registerdHomes,
      pageTitle: "Host Home List",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { name, address, price, rating, description } = req.body;
  if (!req.file) {
    return res.status(422).send("Np Image Is Upaoded");
  }
  const profile = req.file.path;
  const home = new Home({ name, address, price, rating, profile, description });
  home.save().then(() => {
    console.log("Home Saved success");
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, name, address, price, rating, description } = req.body;
  Home.findById(id)
    .then((home) => {
      home.name = name;
      home.price = price;
      home.address = address;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.profile, (err) => {
          if (err) {
            console.log("Error while deleting file", err);
          }
        });
        home.profile = req.file.path;
      }

      home.save().then((result) => {
        console.log("Editing Home", result);
      });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error Occured during Edit Home", err);
    });
};

exports.getHome = (req, res, next) => {
  Home.find((registerdHomes) =>
    res.render("store/home-list", {
      registerdHomes: registerdHomes,
      pageTitle: "airbnb Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })
  );
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error While Deleting", err);
    });
};
