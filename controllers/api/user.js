module.exports.get_user = async (req, res) => {
    return res.render("user_profile", {
        title: "Encuesta | User Profile",
    });
};
