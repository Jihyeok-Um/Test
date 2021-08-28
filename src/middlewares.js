import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.user = req.session.user;
    next();
}

export const imageFiles = multer({ dest: "uploads/images/", limits: {
    fileSize: 100000000,
} });

export const videoFiles = multer({ dest: "uploads/videos/", limits: {
    fileSize: 100000000,
} });