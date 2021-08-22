import Video from "../models/Video"

export const trending = async(req,res) => {
    const videos = await Video.find({});
    console.log(videos);
    res.render("home", {pageTitle:"home", videos});
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

export const removeVideo = (req,res) => {
    return res.send("remove video");
}

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle:"upload"});
}

export const postUpload = async(req,res) => {
    const { title , description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    }
    catch (error) {
        return res.render("upload", {pageTitle:"upload", errorMessage: error._message})
    }
}
