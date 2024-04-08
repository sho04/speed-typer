"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// @ts-ignore
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
// Create Express server
const app = (0, express_1.default)(); // New express instance
const port = 3000; // Port number
// Express configuration
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, helmet_1.default)()); // Enable Helmet
app.use((0, morgan_1.default)('dev')); // Enable Morgan
app.use(express_1.default.json()); // Enable JSON parsing
app.use("/", (0, router_1.default)()); // Enable auth router
// Start Express server
app.listen(port, () => {
    // Callback function when server is successfully started
    console.log(`Server started at http://localhost:${port}`);
});
// Export Express app
exports.default = app;
