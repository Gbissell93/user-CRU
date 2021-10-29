const {
  validateCreateData,
} = require("./lib/AuthCreateMiddleware/validateCreateData");
const {
  loginValidator,
} = require("./lib/authLoginMiddleware/validateLoginData");
const { isUndefined } = require("../shared/checkIfUndefined");
const { checkIsEmpty } = require("../shared/checkisEmpty");
const { jwtMiddleware } = require("../shared/jwt");
const { validateUpdate } = require("./lib/authUpdateMiddleware/validateUpdate");

module.exports = {
  checkIsEmpty,
  isUndefined,
  validateCreateData,
  jwtMiddleware,
  validateUpdate,
  loginValidator,
};
