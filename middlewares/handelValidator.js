const { validationResult } = require("express-validator")
function handelValidator(req, res, next) {
    const result = validationResult(req);

    if (result.isEmpty) next();

    res.status(422).send({ errors: result.array });
}
module.exports = handelValidator;
