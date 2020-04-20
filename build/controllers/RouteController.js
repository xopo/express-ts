"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
function requireAuth(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
        return;
    }
    res.status(403).send('Not permited');
}
var RouteController = /** @class */ (function () {
    function RouteController() {
    }
    RouteController.prototype.getRoot = function (req, res) {
        var _a;
        if ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
            res.send("\n            <div>\n                You are logged in\n                <a href=\"/logout\">Logout</a>\n            </div>\n            ");
        }
        else {
            res.status(404).send("\n                <div>\n                    You are not logged in\n                    <a href=\"/auth/login\">Login</div>\n                </div>\n            ");
        }
    };
    ;
    RouteController.prototype.getLogout = function (req, res) {
        req.session = { loggedIn: false };
        res.redirect('/');
    };
    ;
    RouteController.prototype.getProtected = function (req, res) {
        res.send('Welcome to protected route');
    };
    ;
    __decorate([
        decorators_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RouteController.prototype, "getRoot", null);
    __decorate([
        decorators_1.get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RouteController.prototype, "getLogout", null);
    __decorate([
        decorators_1.get('/protected'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RouteController.prototype, "getProtected", null);
    RouteController = __decorate([
        decorators_1.controller('')
    ], RouteController);
    return RouteController;
}());
