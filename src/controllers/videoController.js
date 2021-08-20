const videos = [
    {
        title: "First video",
        id: 1
    },
    {
        title: "Second video",
        id: 2
    }
];
export const trending = (req,res) => {
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

export const postUpload = (req,res) => {
    const { title } = req.body;
    const video = {
        title,
        id: videos.length+1
    }
    videos.push(video);
    return res.redirect("/");
}
