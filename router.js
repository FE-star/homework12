function Router(routes, defaultRoute) {
  this.routes = routes
  this.init(routes, defaultRoute)
  this.history = []
  this.index = -1
  if (this.currentRoute) {
    this.history.push(this.currentRoute.id)
    this.index++
  }
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  this.currentRoute = routes.reduce((acc, curr) => {
    if (!acc && curr.id === defaultRoute) {
      return curr
    }
    return acc
  }, null) || ''
  this.oldRoute = ''
}

//切换路由
Router.prototype.push = function(route, callback) {
  tempOldCurr = this.currentRoute || ''
  this.changeRoute(route)
  if (this.currentRoute !== tempOldCurr) {
    this.history.push(this.currentRoute.id)
    this.index++
    if ((this.history.length > this.index - 1) && (this.index - 1 > -1)) {
      this.oldRoute = this.history[this.index - 1]
    }
  }
  return callback && callback()
}

//前进
Router.prototype.forward = function () {
  // history.forward();
  this.index++
  if ((this.history.length > this.index) && (this.index > -1)) {
    this.changeRoute(this.history[this.index])
  }
}

//后退
Router.prototype.back = function () {
  // history.back();
  this.index--
  if ((this.history.length > this.index) && (this.index > -1)) {
    this.changeRoute(this.history[this.index])
  }
}

Router.prototype.replace = function(route) {
  this.changeRoute(route)
  this.history[this.index] = this.currentRoute
}

Router.prototype.changeRoute = function(route) {
  this.currentRoute = this.routes.reduce((acc, curr) => {
    if (!acc && curr.id === route) {
      return curr
    }
    return acc
  }, null) || this.currentRoute
}

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function(route) {
  // TODO
}

module.exports = Router