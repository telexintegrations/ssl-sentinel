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
const express_1 = require("express");
const monitorTask_1 = require("../utils/monitorTask");
const router = (0, express_1.Router)();
router.post("/tick", (req, res) => {
    const body = req.body;
    if (!body) {
        res.status(400).json({ error: "missing content" });
        return;
    }
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, monitorTask_1.monitorTask)(body);
    }), 0);
    res.status(202).json({ status: "SSL-Sentinel started" });
});
exports.default = router;
