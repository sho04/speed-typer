"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth-controller");
exports.default = (router) => {
    router.post('/auth/login', auth_controller_1.login);
    router.post('/auth/register', auth_controller_1.register);
};
