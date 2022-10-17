const Router = require("../router");

describe("初始化路由", () => {
  it("default route", () => {
    //路由表
    var routes = [
      {
        id: "",
      },
      {
        id: "index",
        title: "首页",
      },
      {
        id: "next",
        title: "下一页",
      },
    ];

    //路由器
    var router = new Router(routes, "next");
    expect(router.currentRoute).toMatchObject({ id: "next", title: "下一页" });
  });

  it("route push", () => {
    //路由表
    var routes = [
      {
        id: "",
      },
      {
        id: "index",
        title: "首页",
      },
      {
        id: "next",
        title: "下一页",
      },
    ];

    //路由器
    var router = new Router(routes, "index");
    const res = router.push("next", () => {
      return "push next";
    });
    expect(res).toBe("push next");
    expect(router.currentRoute).toMatchObject({
      id: "next",
      title: "下一页",
    });
  });

  it("route back", async () => {
    //路由表
    var routes = [
      {
        id: "",
      },
      {
        id: "index",
        title: "首页",
      },
      {
        id: "next",
        title: "下一页",
      },
      {
        id: "about",
        title: "关于",
      },
    ];

    //路由器
    var router = new Router(routes, "index");
    router.push("next");

    router.back();
    expect(router.currentRoute).toMatchObject({
      id: "index",
      title: "首页",
    });

    router.forward();
    expect(router.currentRoute).toMatchObject({
      id: "next",
      title: "下一页",
    });

    router.back();
    expect(router.currentRoute).toMatchObject({
      id: "index",
      title: "首页",
    });

    router.back();
    expect(router.currentRoute).toMatchObject({
      id: "",
    });

    router.forward();
    expect(router.currentRoute).toMatchObject({
      id: "index",
      title: "首页",
    });
    router.forward();
    expect(router.currentRoute).toMatchObject({
      id: "next",
      title: "下一页",
    });

    router.back();
    router.push("about");
    router.back();
    router.forward();
    expect(router.currentRoute).toMatchObject({
      id: "about",
      title: "关于",
    });
    router.forward();
    expect(router.currentRoute).toMatchObject({
      id: "about",
      title: "关于",
    });
  });

  it("route replace", () => {
    //路由表
    var routes = [
      {
        id: "",
      },
      {
        id: "index",
        title: "首页",
      },
      {
        id: "next",
        title: "下一页",
      },
    ];

    //路由器
    var router = new Router(routes, "index");
    router.push("next");
    router.replace("index");
    expect(router.currentRoute).toMatchObject({
      id: "index",
      title: "首页",
    });
  });
});
