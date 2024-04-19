const jwt = require("jsonwebtoken");
function authenticate(req, res, next) {
    if (["/login"].includes(req.path)) return next();
    if (["/singup"].includes(req.path)) return next();


    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({message: "ابتدا باید وارد شوید."});

    jwt.verify(token,process.env.TOKEN_SECRET , (err, user)=>{
        
        if(err) return res.status(401).json({message : "ورور نا معتیر لطفا ابتدا وارد شوید"})

        req.user = user;
        
        next();
    })

}

module.exports = authenticate;
