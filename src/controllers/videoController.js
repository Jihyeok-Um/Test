const videos = [1,2,3,4,5];
export const trending = (req,res) => res.render("home", {pageTitle:"home", videos});

export const watch = (req,res) => {
    return res.send("Watch");
}

export const editVideo = (req,res) => {
    return res.send("edit video");
}

export const removeVideo = (req,res) => {
    return res.send("remove video");
}

export const upload = (req,res) => {
    return res.send("upload");
}