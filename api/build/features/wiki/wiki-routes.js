"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wiki_controller_1 = require("./wiki-controller");
exports.default = (router) => {
    router.get('/wiki', wiki_controller_1.getWiki);
};
