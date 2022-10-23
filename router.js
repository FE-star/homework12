function Router(routes, defaultRoute) {
  this.init(routes, defaultRoute);
}

//初始化，可多次初始化
Router.prototype.init = function (routes, defaultRoute) {
  this.routes = routes;
  this.currentRoute = routes.find((r) => r.id === defaultRoute);
  this.oldRoute = routes.find(
    (r) => r.id === window.location.href.split("#")[1] || ""
  );

  const self = this;

  function onHashChange() {
    const newHash = location.hash ? location.hash.split("#")[1] : "";
    self.changePage(newHash);
  }

  // clear previous listener first
  removeEventListener("hashchange", this.listener);

  // register hash change listener event
  const listener = addEventListener("hashchange", onHashChange);
  this.listener = listener;

  // first render
  window.location.hash = this.currentRoute.id;
};

//切换路由
Router.prototype.push = function (route, callback) {
  this.oldRoute = this.currentRoute;
  this.currentRoute = this.routes.find((r) => r.id === route);

  window.location.hash = this.currentRoute.id;
  return callback?.();
};

Router.prototype.replace = function (route, callback) {
  this.currentRoute = this.routes.find((r) => r.id === route);

  window.location.hash = this.currentRoute.id;
  return callback?.();
};

//前进
Router.prototype.forward = function () {
  history.forward();
};

//后退
Router.prototype.back = function () {
  this.currentRoute = this.oldRoute;

  window.location.hash = this.currentRoute.id;
};

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.changePage = function (route) {
  // hide non current routes
  this.routes.forEach((r) => {
    if (r.id && r.id !== route) {
      document.querySelector(`#${r.id}`).style.display = "none";
    }
  });

  // show current route
  if (route) {
    document.querySelector(`#${route}`).style.display = "initial";
  }
};

module.exports = Router;
