const { body } = require("express-validator");
const User = require("../../models").user;
const Order = require("../../models").Order
const validator = {
    loginValidator() {
        return [
            body("email").notEmpty().withMessage(" ایمیل الزامی است."),
            body("password").notEmpty().withMessage("رمز عبور الزامی است.")
        ]
    },
    
    singupValidator() {
        return [
            body("email").notEmpty().isEmail().withMessage(" ایمیل الزامی است.").custom( async (value) =>{
                const user  = await User.findAll({where : {email : value}});
                if (user.length) {
					throw new Error("email  تکراری است.");
				}
            }),
            body("first_name").notEmpty().withMessage("نام الزامی است"),
            body("last_name").notEmpty().withMessage("نام الزامی است"),
            body("address").optional(),
            body("password").notEmpty().withMessage("رمز عبور الزامی است.")
        ]
    },

    createOrderValidation(){
        return [
            body("product_name").notEmpty().withMessage("نام کالا الزامی است"),
            body("quantity").notEmpty().withMessage("تعداد کالا الزامی است"),
            body("price_per_unit").notEmpty().withMessage("قیمت کالا الزامی است"),
        ]
    }

}


module.exports = validator;
