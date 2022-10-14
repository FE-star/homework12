interface IRoute {
    id: string;
    title?: string;
    handler?: Function;
}

class Router {
    routes: IRoute[] = [];
    routeStack: IRoute[] = [];
    stackIndex: number = -1;
    get currentRoute(): IRoute | null {
        if (this.routeStack.length > 0) {
            return this.routeStack[this.stackIndex];
        }
        return null;
    };
    get oldRoute(): IRoute | null {
        if (this.stackIndex > 1) {
            return this.routeStack[this.stackIndex - 1];
        }
        return null;
    }


    constructor(routes: IRoute[], defaultRoute?: string) {
        this.init(routes, defaultRoute);
    }
    init(routes: IRoute[], defaultRoute?: string) {
        this.routes = routes;
        const routeId = defaultRoute || this.routes?.[0]?.id || '';
        if (this.routeStack.length <= 0) {
            this.push(routeId);
        } else {
            this.stackIndex = this.routeStack.length - 1;
            this.changePage(routeId);
        }
    }
    push(routeId: string, callback?: Function) {
        const routeRes = this.getRoute(routeId);
        if (routeRes) {
            location.hash = routeRes.id;
            this.routeStack.push(routeRes);
            this.stackIndex++;
            if (callback) {
                routeRes.handler = callback;
                return callback();
            }
        }
    }
    forward() {
        if (this.stackIndex + 1 < this.routeStack.length) {
            this.stackIndex++;
            this.changePage(this.routeStack[this.stackIndex].id);
        }
    }
    back() {
        if (this.stackIndex - 1 >= 0) {
            this.stackIndex--;
            this.changePage(this.routeStack[this.stackIndex].id);
        }
    }
    replace(routeId: string) {
        const routeRes = this.routes.find(item => item.id === routeId);
        if (!routeRes) {
            return;
        }
        this.routeStack[this.stackIndex] = routeRes;
        this.changePage(routeRes.id);
    }
    changePage(routeId: string) {
        location.hash = this.routeStack[this.stackIndex].id;
    }
    private getRoute(id: string) {
        return this.routes.find(item => item.id === id);
    }
}

module.exports = Router;