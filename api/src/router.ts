import express from "express";
import authRoutes from "./features/auth/auth-routes";
import wikiRoutes from "./features/wiki/wiki-routes";

// Add routes to main router
const router = express.Router();

export default (): express.Router => {
    authRoutes(router);
    wikiRoutes(router);
    return router;
};
