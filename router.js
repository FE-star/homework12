function Router(routes, defaultRoute) {
  //TODO
  this.init(routes, defaultRoute);
}

//初始化，可多次初始化
Router.prototype.init = function (routes, defaultRoute) {
  //TODO
  this.routes = routes;
  this.routeMap = {};
  routes.forEach((currenValue) => {
    this.routeMap[currenValue.id] = currenValue;
  });
  this.stack = [];
  this.stackIndex = -1;
  this.push(defaultRoute);
};

//切换路由
Router.prototype.push = function (route, callback) {
  this.changePage(route);
  history.pushState(this.currentRoute, this.currentRoute.title);
  let res;
  if (callback) {
    try {
      res = callback(this.currentRoute, this);
    } catch (error) {
      res = undefined;
    }
  }
  return res;
};

Router.prototype.replace = function (route) {
  this.changePage(route);
  history.replaceState(this.currentRoute, this.currentRoute.title);
}
//前进
Router.prototype.forward = function () {
  history.forward();
  this.stackIndex++;
  this.currentRoute = this.stack[this.stackIndex];
};

//后退
Router.prototype.back = function () {
  history.back();
  this.stackIndex--;
  this.currentRoute = this.stack[this.stackIndex];
};

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function (route) {
  // TODO
  const currentRoute = this.routeMap[route];
  this.currentRoute = currentRoute;
  this.stack.push(currentRoute);
  this.stackIndex++;
};


module.exports = Router;