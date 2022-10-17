class Router {
  constructor(routes, defaultRoute) {
    this.init(routes, defaultRoute);
  }

  get currentRoute() {
    return this.states[this.states.length - 1];
  }
}

//初始化，可多次初始化
Router.prototype.init = function (routes, defaultRoute) {
  //TODO
  this.states = [];
  // 保存已访问过的URL栈
  // 解决history.back是异步方法带来的问题
  this.oldRoute = new Map();
  this.routes = routes;

  const routeIndex = routes.findIndex((r) => r.id === defaultRoute);

  for (let i = 0; i <= routeIndex; i++) {
    history.pushState(routes[i], null, `/#/${routes[i].id}`);
    this.states.push(routes[i]);
  }

  this.routes = routes;
};

//切换路由
Router.prototype.push = function (route, callback) {
  //TODO
  const router = this.routes.find((r) => r.id === route);

  this.currentRoute = router;

  history.pushState(router, null, `/#/${router.id}`);
  this.states.push(router);

  // 快照
  this.oldRoute = [...this.states];

  if (callback && typeof callback === "function") return callback();
};

//前进
Router.prototype.forward = function () {
  history.forward();

  const forwardIndex = this.oldRoute.findIndex(
    (r) => r.id === this.currentRoute.id
  );

  if (forwardIndex > -1 && forwardIndex < this.oldRoute.length - 1) {
    this.states.push(this.oldRoute[forwardIndex + 1]);
  }
};

//后退
Router.prototype.back = async function () {
  history.back();
  this.states.pop();
};

//切换页面：route为字符串，为空则隐藏所有路由
Router.prototype.replace = function (route) {
  //TODO
  if (!route) this.states = [];
  else {
    const router = this.routes.find((r) => r.id === route);

    history.replaceState(router, null, `/#/${router.id}`);
    this.states = [router];
  }
};

module.exports = Router;
// export default Router;
