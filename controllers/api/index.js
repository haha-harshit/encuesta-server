module.exports.home = async (req, res) => {
    return res.render("home", {
        title: "Encuesta",
        // layout: "../../views/layout",
    });
};
