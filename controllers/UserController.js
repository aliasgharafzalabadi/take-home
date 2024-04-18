const User = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {

    generateAccessToken(username, id) {
        return jwt.sign({ username, user_id: id }, process.env.TOKEN_SECRET, { expiresIn: "172800s" });
    }

    async updateUser(req, res) {
        try {
            let data = {
                user_id: req.params.id,
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email
              };
            await User.update(data , {
                where : {id : data.user_id}
            })
        }
        catch (e) {
            return res.status(500).send({message : e.message});
        }

        return res.status(200).json({message : "به روز رسانی شد"});
    }

    async deleteUser(req, res) {
        try {
            await User.destroy({
                where: {
                    id: req.params.id,
                }
            })
        } catch (e) {
            res.status(500).send({ message: e.message })
        }

        res.status(200).json({ message: "پاک شد" });
    }

    async findUsers(req, res) {
        const users = await User.findAll({
            include: [
                {
                    association: 'order'
                }
            ],
            attributes: {
                exclude: ["password"]
            }
        });

        return res.json(users)
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
        return res.json(Object.assign({}, user, { token: generateAccessToken(req.body.username, user.id) }));

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

            const data = await User.create(userData);
            return res.status(201).json({ message: "با موفقیت وارد شدید", user: data, token: generateAccessToken(req.body.username, data.id), });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }

        

    }
}

module.exports = UserController;