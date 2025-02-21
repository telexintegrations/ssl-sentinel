"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknownEndpoint = (_req, res) => {
    res.status(404).json({ error: "unknown endpoint" });
};
exports.default = {
    unknownEndpoint,
};
