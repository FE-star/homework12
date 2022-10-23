const LinkedList = require('./LinkedList');

function Router(routes, defaultRoute) {
  //TODO
  this._ROUTE_MAP = {};
  routes.forEach((item) => {
    var pageId = item.id;
    if (pageId) {
      this._ROUTE_MAP[pageId] = item;
    }
  });

  // 通过带索引的链表模拟history，不用关心数组的下标和来回切换上下的访问
  this.routerHistory = new LinkedList(5);
  if (defaultRoute) {
    this.push(defaultRoute);
  }
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  //TODO
}

//切换路由
Router.prototype.push = function(route, callback) {
  //TODO
  if (this._ROUTE_MAP[route]) {
    this.routerHistory.push(this._ROUTE_MAP[route], this.currentRoute && this.currentRoute.id, );
    this._enter(route)
    return callback && callback();
  }
}

Router.prototype._enter = function(route) {
  var router = this._ROUTE_MAP[route];
  this.currentRoute = router;
  if (router.handler) {
    router.handler();
  }
}

//前进
Router.prototype.forward = function () {
  var forward = this.routerHistory.forward(this.currentRoute.id);
  this.currentRoute = forward;
}

//后退
Router.prototype.back = function () {
  var back = this.routerHistory.back(this.currentRoute.id);
  this.currentRoute = back;
}

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function(route) {
  //TODO
}

Router.prototype.replace = function (id) {
  let route = this._ROUTE_MAP[id];
  this.routerHistory.remove(this.currentRoute.id);
  this.routerHistory.push(route);
  this.currentRoute = route;
}

module.exports = Router;