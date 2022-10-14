var Router = /** @class */ (function () {
    function Router(routes, defaultRoute) {
        this.routes = [];
        this.routeStack = [];
        this.stackIndex = -1;
        this.init(routes, defaultRoute);
    }
    Object.defineProperty(Router.prototype, "currentRoute", {
        get: function () {
            if (this.routeStack.length > 0) {
                return this.routeStack[this.stackIndex];
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Router.prototype, "oldRoute", {
        get: function () {
            if (this.stackIndex > 1) {
                return this.routeStack[this.stackIndex - 1];
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Router.prototype.init = function (routes, defaultRoute) {
        var _a, _b;
        this.routes = routes;
        var routeId = defaultRoute || ((_b = (_a = this.routes) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id) || '';
        if (this.routeStack.length <= 0) {
            this.push(routeId);
        }
        else {
            this.stackIndex = this.routeStack.length - 1;
            this.changePage(routeId);
        }
    };
    Router.prototype.push = function (routeId, callback) {
        var routeRes = this.getRoute(routeId);
        if (routeRes) {
            location.hash = routeRes.id;
            this.routeStack.push(routeRes);
            this.stackIndex++;
            if (callback) {
                routeRes.handler = callback;
                return callback();
            }
        }
    };
    Router.prototype.forward = function () {
        if (this.stackIndex + 1 < this.routeStack.length) {
            this.stackIndex++;
            this.changePage(this.routeStack[this.stackIndex].id);
        }
    };
    Router.prototype.back = function () {
        if (this.stackIndex - 1 >= 0) {
            this.stackIndex--;
            this.changePage(this.routeStack[this.stackIndex].id);
        }
    };
    Router.prototype.replace = function (routeId) {
        var routeRes = this.routes.find(function (item) { return item.id === routeId; });
        if (!routeRes) {
            return;
        }
        this.routeStack[this.stackIndex] = routeRes;
        this.changePage(routeRes.id);
    };
    Router.prototype.changePage = function (routeId) {
        location.hash = this.routeStack[this.stackIndex].id;
    };
    Router.prototype.getRoute = function (id) {
        return this.routes.find(function (item) { return item.id === id; });
    };
    return Router;
}());
module.exports = Router;
