"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSSL = void 0;
const child_process_1 = require("child_process");
const checkSSL = (site) => {
    return new Promise((resolve) => {
        if (!site || typeof site !== "string") {
            resolve(`Error: Invalid or non-HTTPS URL (${site})`);
            return;
        }
        // Normalize URL
        let normalizedSite = site.trim();
        if (!normalizedSite.startsWith("https://")) {
            normalizedSite = `https://${normalizedSite}`;
        }
        const url = new URL(normalizedSite);
        // Run OpenSSL command to extract required SSL certificate details
        (0, child_process_1.exec)(`echo | openssl s_client -connect ${url.hostname}:443 -servername ${url.hostname} 2>/dev/null | openssl x509 -noout -issuer -startdate -enddate -serial -subject`, (error, stdout, stderr) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (error || stderr) {
                resolve(`Error: SSL check failed for "${site}"`);
                return;
            }
            // Extract only the "O" (Organization) from the Issuer field
            const issuerMatch = stdout.match(/O=([^,]+)/);
            const issuer = issuerMatch ? issuerMatch[1].trim() : "N/A";
            const startDate = ((_b = (_a = stdout.match(/notBefore=(.+)/)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim()) || "N/A";
            const endDate = ((_d = (_c = stdout.match(/notAfter=(.+)/)) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.trim()) || "N/A";
            const serialNumber = ((_f = (_e = stdout.match(/serial=(.+)/)) === null || _e === void 0 ? void 0 : _e[1]) === null || _f === void 0 ? void 0 : _f.trim()) || "N/A";
            const category = ((_h = (_g = stdout.match(/subject=.*CN=([^,]+)/)) === null || _g === void 0 ? void 0 : _g[1]) === null || _h === void 0 ? void 0 : _h.trim()) || "N/A";
            const ssn = serialNumber; // Assuming SSN is the serial number
            // Convert end date to a Date object and check validity
            const expiryDate = new Date(endDate);
            const currentDate = new Date();
            const validity = expiryDate > currentDate
                ? "✅ SSL Certificate is **VALID**"
                : "❌ SSL Certificate is **EXPIRED**";
            resolve(`✅ SSL Certificate Details for "${site}":\n--------------------------------------\n` +
                `📌 Issuer: ${issuer}\n` +
                `📅 Start Date: ${startDate}\n` +
                `📅 End Date: ${endDate}\n` +
                `🔢 Serial Number: ${serialNumber}\n` +
                `🏷️ Category: ${category}\n` +
                `🆔 SSN: ${ssn}\n` +
                `🔍 Validity: ${validity}\n`);
        });
    });
};
exports.checkSSL = checkSSL;
