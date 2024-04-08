"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./features/auth/auth-routes"));
const wiki_routes_1 = __importDefault(require("./features/wiki/wiki-routes"));
// Add routes to main router
const router = express_1.default.Router();
exports.default = () => {
    (0, auth_routes_1.default)(router);
    (0, wiki_routes_1.default)(router);
    return router;
};
