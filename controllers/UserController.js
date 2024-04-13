const User = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {

    generateAccessToken(username, id) {
        return jwt.sign({ username, user_id: id }, process.env.TOKEN_SECRET, { expiresIn: "172800s" });
    }

    async login(req, res) {
        let user = await User.findOne({
            attributes: ["id", "firstName", "lastName", "email", "password", "address"],
            raw: true,
            where: { username: req.body.username }
        });

        if (!user)
            return res.status(401).json({ message: "کاربر یافت نشد" });

        let password = user.password;
        let passwordIsValid = bcrypt.compareSync(req.body.password, password);

        if (!passwordIsValid)
            return res.status(401).json({ message: "رمز عبور صحیح نیست." });

        delete user.password;
        res.json(Object.assign({}, user, { token: generateAccessToken(req.body.username, user.id) }));

    }

    async singUp(req, res) {
        try {
            let userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                address: req.body.address,
            }

            const data = await User.create(userData)
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }

        res.status(201).json({ message: "با موفقیت وارد شدید", user: data, token: generateAccessToken(req.body.username, user.id), });

    }
}

module.exports = UserController;