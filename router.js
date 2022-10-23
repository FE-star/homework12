function Router(routes, defaultRoute) {
  this.init(routes, defaultRoute)
}

const getComponentById = (id) => {
  const component = document.getElementById(id)
  return component
}

const createMapComponentToRoute = (routes) => {
  return routes.map(route => {
    return {
      ...route,
      component: getComponentById(route.id)
    }
  })
}

const renderComponent = (path, componentMapToRoutes) => {
  componentMapToRoutes.forEach(route => {
    if (path && route.id) {
      if (path == route.id) {
        route.component.style.display = 'block'
      } else {
        route.component.style.display = 'none'
      }
    } else {
      route.component && (route.component.style.display = 'none')
    }
  })
}


function renderer(ctx) {
  const { type, currentTarget } = ctx
  const router = currentTarget.router
  const { componentMapToRoutes, routeStack } = router
  let currentRoute = window.location.hash
  currentRoute = currentRoute.charAt('#') ? currentRoute.slice(1) : currentRoute
  const initRouteStack = () => {
    if (routeStack.length) {
      const [last] = routeStack.slice(-1)
      ;(last !== currentRoute) && routeStack.push(currentRoute)
    } else {
      routeStack.push(currentRoute)
    }
  }
  if (type === 'load') {
    initRouteStack()
  } 
  renderComponent(currentRoute, componentMapToRoutes)
}

const createCurrentRoute = (routes, defaultRoute) => {
  return routes.find(route => route.id === defaultRoute)
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  this.currentRoute = createCurrentRoute(routes, defaultRoute)
  this.componentMapToRoutes = createMapComponentToRoute(routes)
  this.routes = routes
  //TODO: 条件清除
  this.routeStack = [defaultRoute]
  //TODO: 边界处理
  this.currentIndex = this.routeStack.length - 1
  this.initEvents()
}

Router.prototype.initEvents = () => {
  window.addEventListener('hashchange', renderer)
  window.addEventListener('load', renderer)
}

//切换路由
Router.prototype.push = function(route, callback) {
  location.hash = route
  this.routeStack.push(route)
  this.currentIndex = this.routeStack.length - 1
  this.currentRoute = this.routes.find(v => v.id === route)
  return callback && callback()
}

Router.prototype.replace = function(route) {
  location.replace(`#${route}`)
  this.currentRoute = this.routes.find(v => v.id === route)
}

//前进
Router.prototype.forward = function () {
  history.forward();
}

//后退
Router.prototype.back = function () {
  this.currentIndex -= 1
  const [backRoute] = this.routeStack.slice(this.currentIndex)
  this.currentRoute = this.routes.find(v => v.id === backRoute)
  location.hash = backRoute
}

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function(route) {
  renderComponent(route, this.componentMapToRoutes)
}

module.exports = Router