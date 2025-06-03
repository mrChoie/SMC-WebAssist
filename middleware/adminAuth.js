import dotenv from 'dotenv';
dotenv.config();

const admin = async (req, res, next) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const token = cookies;
    const lvl = cookies.lvl;
    try {
        if (lvl < 4 || lvl > 8) return res.status(401).redirect('/smc-webassist/signin')
            next()
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }}

export default admin