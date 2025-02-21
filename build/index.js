"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const integration_1 = __importDefault(require("./routes/integration"));
const tick_1 = __importDefault(require("./routes/tick"));
const middleware_1 = __importDefault(require("./utils/middleware"));
require("dotenv/config");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/", integration_1.default);
exports.app.use("/", tick_1.default);
exports.app.use(middleware_1.default.unknownEndpoint);
const PORT = process.env.PORT || 3000;
exports.server = exports.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
