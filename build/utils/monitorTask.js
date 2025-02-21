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
exports.monitorTask = void 0;
const checkSSL_1 = require("./checkSSL");
const monitorTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.settings || !Array.isArray(payload.settings)) {
        console.error("Error: payload.settings is missing or not an array", payload);
        return;
    }
    const sites = payload.settings
        .filter((setting) => { var _a; return (_a = setting.label) === null || _a === void 0 ? void 0 : _a.startsWith("site"); })
        .map((setting) => setting.default);
    const results = yield Promise.all(sites.map((site) => (0, checkSSL_1.checkSSL)(site)));
    const hasError = results.some((re) => re === null || re === void 0 ? void 0 : re.startsWith("Error"));
    const message = results.join("\n\n");
    const data = {
        message: message,
        username: "SSL-Sentinel",
        event_name: "SSL check",
        status: hasError ? "error" : "success",
    };
    yield fetch(payload.return_url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
});
exports.monitorTask = monitorTask;
