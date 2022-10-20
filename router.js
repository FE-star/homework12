function Router(routes, defaultRoute) {
  //TODO
  this.init(routes, defaultRoute)
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  //TODO
  this.routes = routes
  this.routeMap = new Map(routes.map((route) => (
    [route.id, route]
  )))
  this.stack = []
  this.push(defaultRoute)
  this.oldRoute = null
}

//切换路由
Router.prototype.push = function(route, callback) {
  //TODO
  this.currentRoute = this.routeMap.get(route)

  if (this.currentRoute) {
    this.stack.push(this.currentRoute)
  }

  return callback && callback()
}

//前进
Router.prototype.forward = function () {
  history.forward();
}

//后退
Router.prototype.back = function () {
  this.stack.pop()
  this.currentRoute = this.stack[this.stack.length - 1]
  history.back();
}

//替换
Router.prototype.replace = function (route) {
  this.stack.pop()
  this.push(route)
  history.back();
}

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function(route) {
  //TODO
}

module.exports = Router