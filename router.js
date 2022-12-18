function Router(routes, defaultRoute) {
  //TODO
  this.init(routes, defaultRoute)
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  //TODO
  this.routeStack = []
  this.routes= routes
  this.default = defaultRoute
  const defaultRouteState = this.matchRoute(defaultRoute) 
  console.log('defaultRoute', defaultRoute, defaultRouteState)
  if (defaultRoute) {
      this.currentRoute = defaultRouteState 
      this.push(defaultRoute)
  }
  this.oldRoute = '#'

  window.addEventListener("popstate", (ev) => {
    let state = ev.state;
    console.log("popstate state=========================", state);
    // if ((state) && (state.callback))  { 
    //   state.callback(this, ev);
    // }
    this.currentRoute = state;
  })
  
  window.addEventListener("hashchange", (ev) => {
    console.log("hashchange event=", ev);
    this.changePage(location.hash.substring(1));
  })
}

Router.prototype.matchRoute = function(route) {
  route = this.routes?.find( elm => (elm.id == route) );
  console.log("routes: ", this.routes, "route:",  route);
  return route;  
}

//切换路由
Router.prototype.push = function(route, callback) {
  //TODO
  const routeState = this.matchRoute(route) 
  if (routeState) {
      this.routeStack.push(routeState)
      this.routeIndex = this.routeStack.length - 1
      console.log('routerState=', routeState, "#".concat(route));
      history.pushState(routeState, routeState.title, "#".concat(route));
      this.currentRoute = routeState;
      if (callback)
          return callback();
  }
  console.log('routeState=', routeState);
}

//替换路由
Router.prototype.replace = function(route, callback) {
  const routeState = this.matchRoute(route) 
  if (routeState) {
      history.replaceState(routeState, routeState.title, '#'.concat(route));
      this.currentRoute = routeState;
      if (callback)
          return callback();
  }
  console.log('routeState=', routeState);
}

//前进
Router.prototype.forward = function () {
  if ((this.routeIndex + 1 ) <= this.routeStack.length){
    this.routeIndex += 1
    this.currentRoute = this.routeStack[this.routeIndex]
    history.forward()
  }
}

//后退
Router.prototype.back = function () {
  if (this.routeIndex >= 1){
    this.routeIndex -= 1
    this.currentRoute = this.routeStack[this.routeIndex]
    history.back();
  }
}

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function(route) {
  const routeState = this.matchRoute(route); 
  if (routeState) {
      console.log('routerState=', routeState, "#".concat(route));
      history.pushState(routeState, routeState.title, "#".concat(route));
  }
}

module.exports = Router