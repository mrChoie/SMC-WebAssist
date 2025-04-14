import express from 'express';
const publicRoute = express.Router();

function getTime(){
    var d = new Date();
    var time = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + "-[TIME]" + ("0" + d.getHours()).slice(-2) + "_" + ("0" + d.getMinutes()).slice(-2);
    return time
}

publicRoute.get("/home", (req, res) => {
    console.log("[Router-Logger]:",getTime(),">> homepage page loaded to client")
    res.render('home.ejs')
})
publicRoute.get("/about", async (req, res) => {
    console.log("[Router-Logger]:",getTime(),">> about page loaded to client")
    res.render('about.ejs')
})
publicRoute.get("/signup", async (req, res) => {
    console.log("[Router-Logger]:",getTime(),">> sign-up page loaded to client")
    res.render('signup.ejs')
})
publicRoute.get("/signin", async (req, res) => {
    console.log("[Router-Logger]:",getTime(),">> sign-in page loaded to client")
    res.render('signin.ejs', {
        returnStatement : ""
    })
})
// router.get("/feedback", async (req, res) => {
//     res.render('feedback.ejs')
// })
// router.get("/category", async (req, res) => {
//     res.render('categories.ejs')
// })
// router.get("/account", async (req, res) => {
//     res.render('account.ejs')
// })  
// router.get("/account/settings", async (req, res) => {
//     res.render('settings.ejs')
// })
// router.get("/dashboard", async (req, res) => {
//     res.render('dashboard.ejs') 
// })
// router.get("/ticket-form", async (req, res) => {
//     res.render('ticketForm.ejs')
// })
// router.get("/signup", async (req, res) => {
//     res.render('signup.ejs')
// })
// router.post('/auth/register', async (req, res) => {
//     console.log("Registering user");
//     const { userName, userStudId, userPass } = req.body;
//     console.log({
//         userName,
//         userStudId,
//         userPass
//     });
// });

export default publicRoute;