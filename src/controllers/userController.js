import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req,res) => {
    return res.render("join", {pageTitle:"Join"});
}
export const postJoin = async(req,res) => {
    const {email, password, password2, name, username } = req.body;
    if (password !== password2) {
        return res.status(400).render("join", {
          pageTitle:"Join",
          errorMessage: "Password confirmation does not match.",
        });
      }
      const exists = await User.exists({ $or: [{ name }, { email }] });
      if (exists) {
        return res.status(400).render("join", {
          pageTitle:"Join",
          errorMessage: "This username/email is already taken.",
        });
      }
    await User.create({
        email,
        password,
        name,
        username,
    })
    return res.redirect("login");
}
export const getLogin = (req,res) => {
    return res.render("login", {pageTitle:"Login"});
}
export const postLogin = async(req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  const exists = await User.exists({email});
  const ok = await bcrypt.compare(password, user.password);
  if (!exists)
    return res.status(400).render("login", {pageTitle: "Login", errorMessage: "email incorrect!"});
  if (!ok)
  return res.status(400).render("login", {pageTitle: "Login", errorMessage: "password incorrect!"});

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
}

export const logOutUser = (req,res) => {
  req.session.destroy();
  return res.redirect("/");
}

export const getEdit = (req,res) => {
    return res.render("edit-profile", {pageTitle: "edit-profile"});
}

export const postEdit = async(req,res) => {
  const { _id } = req.session.user;
  const { username, email } = req.body;
  const exists = await User.exists({ username }, { email });
  if (exists) {
    return res.render("edit-profile", {pageTitle: "edit-profile", errorMessage: "email and username is exist!"});
  }
  const updatedUser = await User.findByIdAndUpdate(_id, {
    username,
    email,
    },
    {new: true}
  );
  req.session.user = updatedUser;
  console.log(updatedUser);
  return res.redirect("/");
}

export const removeUser = (req,res) => {
    return res.send("remove user");
}

export const startGithubLogin = (req,res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup:false,
    scope:"read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
}

export const finishGithubLogin = async(req,res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl="https://api.github.com"
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(email => email.primary === true && email.verified === true);
    if (!emailObj) {
      return res.redirect("/login");
    }
    const existingUser = await User.findOne({ email: emailObj.email });
    console.log(existingUser);
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser;
      return res.redirect("/");
    } else {
      const user = await User.create({
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
}

export const startGoogleLogin = (req,res) => {
  res.redirect("/");
}