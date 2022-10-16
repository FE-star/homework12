// 完成case同时利用了双栈来模拟浏览器的前进后退页面栈结构存储，

function Router(routes, defaultRoute) {
    //TODO
    this.routes = routes;
    this.stackOne = [];
    this.stackTow = [];
    this.routes.forEach((route) => {
        if (route.id === defaultRoute) {
            this.currentRoute = route;
            this.stackOne.push(defaultRoute);
        }
    })
}

//初始化，可多次初始化
Router.prototype.init = function (routes, defaultRoute) {
    //TODO
    this.stackOne = [];
    this.stackTow = [];
    this.routes = routes;
    this.oldRoute = this.currentRoute;
    this.currentRoute = defaultRoute;
}

//切换路由
Router.prototype.push = function (route, callback) {
    //TODO
    let res = undefined;
    this.routes.forEach(item => {
        if (item.id === route) {
            this.currentRoute = item;
            this.stackOne.push(route);
            if (typeof callback === 'function') {
                item.handler = callback;
            }
            if (typeof item.handler === 'function') {
                res = item.handler();
            }
        }
    })
    return res;
}

//前进
Router.prototype.forward = function () {
    if (this.stackTow.length) {
        let route = this.stackTow.pop();
        this.push(route);
    }
    history.forward();
}

//后退
Router.prototype.back = function () {
    let route = this.stackOne.pop();
    if (route) {
        this.stackTow.push(route);
    }
    if (this.stackOne.length) {
        this.routes.forEach((item) => {
            if (item.id === this.stackOne[this.stackOne.length - 1]) {
                this.currentRoute = item;
            }
        })
    }

    history.back();
}


Router.prototype.replace = function (route) {
    //TODO
    this.stackOne[this.stackOne.length - 1] = route;
    this.routes.forEach((item) => {
        if (item.id === route) {
            this.currentRoute = item;
        }
    })
}

module.exports = Router