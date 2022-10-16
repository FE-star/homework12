function Router(routes, defaultRoute) {
  this.init(routes, defaultRoute)
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  this.routes = routes
  this.currentRoute = ''
  window.addEventListener('hashchange', refresh, false)
  this.push(defaultRoute)
}

//切换路由
Router.prototype.push = function(route, callback) {
  // console.log('push', route, this.routes, this.currentRoute)
  if (this.routes) {
    let r = this.routes.find(r => r.id === route)
    if (r) {
      if (this.currentRoute !== route) {
        this.currentRoute = route
        window.location.hash = this.currentRoute
        this.changePage(route)
      }
      if (r.handler) {
        r.handler()
      }
    } else {
      console.log('404')
    }
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

//切换页面：route为字符串，为空则隐藏所有页面？
Router.prototype.changePage = function(route) {
  console.log(route, this.routes)
  for (let r of this.routes) {
    if (!r.id) {
      continue
    }
    if (!route) {
      document.getElementById(r.id).style.display = 'none'
      continue
    }
    if (r.id === route) {
      document.getElementById(route).style.display = 'block'
    } else {
      document.getElementById(r.id).style.display = 'none'
    }
  }
}

function refresh(e) {
  let route = window.location.hash
  if (route && route[0] === '#') {
    route = route.slice(1)
  }
  // console.log(route, e.target.router)
  let router = e.target.router
  if (router.currentRoute !== route) {
    router.push(route)
  }
}

module.exports = Router