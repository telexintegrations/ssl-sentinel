"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validHttpsUrl = void 0;
const validHttpsUrl = (site) => {
    try {
        const url = new URL(site);
        return url.protocol === "https:" ? url : null;
    }
    catch (_a) {
        return null;
    }
};
exports.validHttpsUrl = validHttpsUrl;
