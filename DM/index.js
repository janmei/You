"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// import 'dotenv/config';
var instagram_private_api_1 = require("instagram-private-api");
var express = require("express");
var uri = "mongodb://127.0.0.1:27017/ig";
// Create a new express application instance
var app = express();
// define options for the direct message with 
// params for type of message, userId and message itself
function fakeSave(cookies) {
    return cookies;
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    var ig, inboxFeed, threads;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ig = new instagram_private_api_1.IgApiClient();
                ig.state.generateDevice("jan_meininghaus");
                // ig.state.proxyUrl = process.env.IG_PROXY;
                // This function executes after every request
                ig.request.end$.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                    var cookies;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ig.state.serializeCookieJar()];
                            case 1:
                                cookies = _a.sent();
                                fakeSave(JSON.stringify(cookies));
                                // In order to restore session cookies you need this
                                return [4 /*yield*/, ig.state.deserializeCookieJar(JSON.stringify(cookies))];
                            case 2:
                                // In order to restore session cookies you need this
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // This call will provoke request.$end stream
                return [4 /*yield*/, ig.account.login("jan_meininghaus", "*u0w6%2pU#%11MTtvnKVG4")];
            case 1:
                // This call will provoke request.$end stream
                _a.sent();
                inboxFeed = ig.feed.directInbox();
                return [4 /*yield*/, inboxFeed.items()];
            case 2:
                threads = _a.sent();
                // UNCOMMENT BELOW TO PUSH MESSAGE 
                app.post('/:userId', function (req, res) {
                    var options = {
                        form: {
                            text: "test"
                        },
                        item: "text",
                        userIds: req.params.userId,
                    };
                    var thread = ig.directThread.broadcast(options);
                    res.send(options);
                });
                app.get('/:userId', function (req, res) {
                    var _this = this;
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        var userId, feed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    userId = req.params.userId;
                                    return [4 /*yield*/, ig.feed.user(userId).items()];
                                case 1:
                                    feed = _a.sent();
                                    console.log(feed);
                                    res.send(feed);
                                    return [2 /*return*/];
                            }
                        });
                    }); })();
                });
                return [2 /*return*/];
        }
    });
}); })();
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map