function Router(routes, defaultRoute) {
  //TODO
  window.addEventListener('hashchange', this.changePage, false)
  this.routes = routes
  this.init(routes, defaultRoute)
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  //TODO
  this.currentRoute = routes.find(item => item.id === defaultRoute)
  this.oldRoute = this.currentRoute
}

//切换路由
Router.prototype.push = function(route, callback) {
  //TODO
  this.oldRoute = this.currentRoute
  
  this.currentRoute = this.routes.find(item => item.id === route)
  window.location.hash = this.currentRoute.id

  if (typeof callback === 'function') {
    return callback()
  }
}

//前进
Router.prototype.forward = function () {
  history.forward();
}

//后退
Router.prototype.back = function () {
  history.back();
}

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function() {
  //TODO
  const hash = window.location.hash
  let id = ''
  if (hash) {
    id = hash.slice(1)
  }
  if (id) {
    this.currentRoute = this.routes.find(item => item.id === id)
    console.log('this.currentRoute',this.currentRoute)
  }
}

Router.prototype.replace = function(route) {
  this.currentRoute = this.routes.find(item => item.id === route)
  if (this.currentRoute) {
    window.location.hash = this.currentRoute.id
  }
}

module.exports = Router