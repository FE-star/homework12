function Router(routes, defaultRoute) {
  //TODO
  // 存储对象
  this.routes = routes;
  // // 当前hash
  this.currentRoute = null;
  this.stack = [];


  this.init(routes, defaultRoute);
  this.refresh = this.refresh.bind(this)
  window.addEventListener('load', this.refresh, false)
  window.addEventListener('popstate', this.refresh, false)
}

Router.prototype.refresh = function() {
  const hash = this.getHash();
  for(let i = 0; i < this.routes.length; i++){
    // debugger;
    if(this.routes[i].id === hash) {
      this.routes[i].handler && this.routes[i].handler();
      this.oldRoute = this.currentRoute;
      this.currentRoute = this.routes[i]
    }
  }
  this.changePage(hash)
}

Router.prototype.getHash = function() {
  const hash = window.location.hash.slice(1) || '';
  return hash
}

//初始化，可多次初始化
Router.prototype.init = function(routes, defaultRoute) {
  //TODO
  this.routes = routes;
  const curRoute = this.getHash() || defaultRoute;
  for(let i = 0; i < routes.length; i++) {
    if(routes[i].id === curRoute) {
      this.push(curRoute, routes[i].handler);
      this.oldRoute = this.currentRoute;
      this.currentRoute = routes[i]
    }
  }
  this.changePage(curRoute)
}

//切换路由
Router.prototype.push = function(route, callback) {
  //TODO
  history.pushState({}, '', '#'+route)
  return callback && callback()
}

//切换路由
Router.prototype.replace = function(route, callback) {
  //TODO
  history.replaceState({}, '', '#'+route)
  return callback && callback()
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
Router.prototype.changePage = function(route) {
  //TODO
  for(let i = 0; i < this.routes.length; i++) {
    const dom = document.getElementById(this.routes[i].id)
    if(!dom) {
      continue
    }
    if(this.routes[i].id === route) {
      dom.style.display = 'block'
    }else {
      dom.style.display = 'none'
    }
  }
}

module.exports = Router