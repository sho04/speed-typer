"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWiki = void 0;
const getWiki = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
        console.log("Get Wiki hit " + url);
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch wiki data");
        }
        console.log(response);
        return res.status(200).json(yield response.json());
    }
    catch (error) {
        console.log("ERROR" + error);
    }
});
exports.getWiki = getWiki;
