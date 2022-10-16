function Router(routes, defaultRoute) {
  //TODO
  this.routes = [];
  this.routeStack = [];
  this.currentRoute = null;
  this.oldRoute = null;
  this.init(routes, defaultRoute);
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  //TODO
  // this.currentRoute
  // this.oldRoute
  this.routes = routes;
  this.currentRoute = routes?.find(route => route.id === defaultRoute);
  this.oldRoute = this.currentRoute;
}

//切换路由
Router.prototype.push = function(route, callback) {
  //TODO
  this.oldRoute = this.currentRoute;
  const findRoute = this.routes.find(r => r.id === route);
  if (findRoute) {
    this.currentRoute = findRoute;
  } else {
    this.routes.push(route);
    this.currentRoute = this.routes[this.routes.length];
  }
  if (typeof callback === 'function') return callback();
}

//前进
Router.prototype.forward = function () {
  history.forward();
}

//后退
Router.prototype.back = function () {
  history.back();
  const currentIndex = this.routes.findIndex(r => r.id === this.currentRoute.id);
  if (currentIndex > 0) {
    this.oldRoute = this.currentRoute;
    this.currentRoute = this.routes[currentIndex - 1];
  }
}

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function(route) {
  //TODO
}

Router.prototype.replace = function(route) {
  if (route && route !== this.currentRoute.id) {
    const findRoute = this.routes.find(r => r.id === route);
    if (findRoute) {
      this.oldRoute = this.currentRoute;
      this.currentRoute = {...findRoute};
    }
  }
}

module.exports = Router