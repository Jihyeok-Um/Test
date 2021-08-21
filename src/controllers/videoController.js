import Video from "../models/Video"

export const trending = async(req,res) => {
    const videos = await Video.find({});
    res.render("home", {pageTitle:"home", videos});
}

export const watch = (req,res) => {
    const { id } = req.params;
    const video = videos[id-1];
    console.log(video);
    res.render("watch", {pageTitle:"watch", video});
}

export const getEdit = (req,res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit", {pageTitle:"edit", video});
}

export const postEdit = (req,res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1] = {
        title,
        id: id
    }
    return res.redirect("/");
}

export const removeVideo = (req,res) => {
    return res.send("remove video");
}

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle:"upload"});
}

export const postUpload = async(req,res) => {
    const { title , description, hashtags } = req.body;
    await Video.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        }
    })
    return res.redirect("/");
}
