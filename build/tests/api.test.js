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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const supertest_1 = __importDefault(require("supertest"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const validHttpsUrl_1 = require("../utils/validHttpsUrl");
const checkSSL_1 = require("../utils/checkSSL");
const api = (0, supertest_1.default)(index_1.app);
(0, node_test_1.describe)("telex SSL-Sentinel test", () => {
    (0, node_test_1.describe)("integration.json endpoint", () => {
        (0, node_test_1.test)("response with a valid telex json spec", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api.get("/integration.json").expect(200);
            (0, node_assert_1.default)(response.body.data);
            (0, node_assert_1.default)(response.body.data.date);
            (0, node_assert_1.default)(response.body.data.descriptions);
            (0, node_assert_1.default)(response.body.data.settings);
            (0, node_assert_1.default)(response.body.data.tick_url);
        }));
    });
    (0, node_test_1.describe)("tick endpoint", () => {
        (0, node_test_1.test)("tick works well and send the correct response", () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                channel_id: "test_channel",
                return_url: "https://www.example.com/telex",
                settings: [
                    {
                        label: "site-1",
                        type: "text",
                        required: true,
                        default: "https://www.google.com",
                    },
                    {
                        label: "site-2",
                        type: "text",
                        required: true,
                        default: "https://www.apple.com",
                    },
                ],
            };
            const response = yield api
                .post("/tick")
                .send(payload)
                .expect(202)
                .expect("Content-Type", /application\/json/);
            node_assert_1.default.strictEqual(response.body.status, "SSL-Sentinel started");
        }));
    });
    (0, node_test_1.describe)("validHttpsUrl", () => {
        (0, node_test_1.test)("validHttpsUrl - returns a valid URL object for correct HTTPS URLs", () => {
            node_assert_1.default.ok((0, validHttpsUrl_1.validHttpsUrl)("https://www.google.com") instanceof URL);
            node_assert_1.default.ok((0, validHttpsUrl_1.validHttpsUrl)("https://example.com") instanceof URL);
        });
        (0, node_test_1.test)("validHttpsUrl - returns null for invalid URLs", () => {
            node_assert_1.default.strictEqual((0, validHttpsUrl_1.validHttpsUrl)("invalid-url"), null);
            node_assert_1.default.strictEqual((0, validHttpsUrl_1.validHttpsUrl)("www.google.com"), null);
            node_assert_1.default.strictEqual((0, validHttpsUrl_1.validHttpsUrl)("http://example.com"), null);
        });
        (0, node_test_1.test)("validHttpsUrl - returns null for empty string", () => {
            node_assert_1.default.strictEqual((0, validHttpsUrl_1.validHttpsUrl)(""), null);
        });
    });
    (0, node_test_1.describe)("checkSSL", () => {
        (0, node_test_1.test)("checkSSL - valid HTTPS site", () => __awaiter(void 0, void 0, void 0, function* () {
            const site = "https://www.google.com";
            const result = yield (0, checkSSL_1.checkSSL)(site);
            node_assert_1.default.match(result, /Issuer:/, "Should return valid SSL certificate details");
        }));
        (0, node_test_1.test)("checkSSL - invalid URL", () => __awaiter(void 0, void 0, void 0, function* () {
            const site = "invalid-url";
            const result = yield (0, checkSSL_1.checkSSL)(site);
            node_assert_1.default.strictEqual(result, `Error: Invalid or non-HTTPS URL (${site})`);
        }));
        (0, node_test_1.test)("checkSSL - HTTPS site without SSL (should fail)", () => __awaiter(void 0, void 0, void 0, function* () {
            const site = "https://expired.badssl.com";
            const result = yield (0, checkSSL_1.checkSSL)(site);
            (0, node_assert_1.default)(result.startsWith("Error:"));
        }));
    });
    (0, node_test_1.after)(() => {
        index_1.server.close();
    });
});
