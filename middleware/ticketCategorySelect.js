const tktCategory = async (req, res, next) => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    console.log(category);
    next()
}

export default tktCategory