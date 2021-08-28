import Video from "../models/Video"

export const trending = async(req,res) => {
    const videos = await Video.find({});
    res.render("home", {pageTitle:"home",videos});
}

export const watch = async(req,res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    res.render("watch", {pageTitle:"watch", video});
}

export const getEdit = async(req,res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    return res.render("edit", {pageTitle:"edit", video});
}

export const postEdit = async(req,res) => {
    const { id } = req.params;
    const { title, description, hashtags} = req.body;
    await Video.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
}

export const deleteVideo = async(req,res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle:"upload"});
}

export const postUpload = async(req,res) => {
    const file = req.file;
    const { title , description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            fileUrl:file.path,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    }
    catch (error) {
        return res.status(400).render("upload", {pageTitle:"upload", errorMessage: error._message})
    }
}

export const search = async(req,res) => {
    let videos = []
    const { search } = req.query;
    if (search)
        videos = await Video.find({
            title: {
            $regex: new RegExp(search, "i"),
            },
        });
    return res.render("search",  {pageTitle:"search", videos});
}