import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req,res) => {
    return res.render("join", {pageTitle:"Join"});
}
export const postJoin = async(req,res) => {
    const {email, password, password2, name } = req.body;
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
        name
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
  return res.redirect("/");
}

export const editUser = (req,res) => {
    return res.send("edit user");
}
export const removeUser = (req,res) => {
    return res.send("remove user");
}