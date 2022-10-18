// import { Router } from '../router'
const Router = require('../router.js')
describe('初始化路由', () => {
  it('default route', () => {
    //路由表
    var routes = [{
      id: ''
    }, {
      id: 'index',
      title: '首页'
    }, {
      id: 'next',
      title: '下一页'
    }]

    //路由器
    var router = new Router(routes, 'next');
    expect(router.currentRoute).toMatchObject({ id: 'next', title: '下一页' })
  });

  it('route push', () => {
    //路由表
    var routes = [{
      id: ''
    }, {
      id: 'index',
      title: '首页'
    }, {
      id: 'next',
      title: '下一页'
    }]

    //路由器
    var router = new Router(routes, 'index');
    const res = router.push('next', () => { return 'push next'; });
    expect(res).toBe('push next');
    expect(router.currentRoute).toMatchObject({
      id: 'next',
      title: '下一页'
    });
  });

  it('route back', () => {
    //路由表
    var routes = [{
      id: ''
    }, {
      id: 'index',
      title: '首页'
    }, {
      id: 'next',
      title: '下一页'
    }]

    //路由器
    var router = new Router(routes, 'index');
    router.push('next');
    router.back();
    expect(router.currentRoute).toMatchObject({
      id: 'index',
      title: '首页'
    });
  });

  it('route replace', () => {
    //路由表
    var routes = [{
      id: ''
    }, {
      id: 'index',
      title: '首页'
    }, {
      id: 'next',
      title: '下一页'
    }]

    //路由器
    var router = new Router(routes, 'index');
    router.push('next');
    router.replace('index');
    expect(router.currentRoute).toMatchObject({
      id: 'index',
      title: '首页'
    });
  });
});