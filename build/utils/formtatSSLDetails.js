"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSSLDetails = void 0;
const formatSSLDetails = (site, issuer, validityStart, validityEnd, serialNumber) => {
    return `SSL Certificate Information for ${site}:
 -----------------------------
 Issuer: ${issuer}
 Validity: ${validityStart}  -  ${validityEnd}
 Serial Number: ${serialNumber}
 `;
};
exports.formatSSLDetails = formatSSLDetails;
