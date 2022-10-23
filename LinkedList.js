function ListNode (id, router, prev, next) {
    this.id = id;
    this.router = router;
    this.prev = prev;
    this.next = next;
}

function LinkedList(capacity) {
    this.head = new ListNode(null, null);
    this.tail = new ListNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.LinkedListMap = {};
    this.capacity = capacity;
    this.size = 0;
}

LinkedList.prototype.push = function (route, id) {
    let node = this.LinkedListMap[id];
    if (!node ||  node.next === this.tail){
        // 正常的push
        if (this.size === this.capacity) {
            this._remove(this.head.next);
        }
    } else {
        // 处理当前currentRoute不是最后一个情况下的push，将当前节点后面的路由删除掉
        node.next = this.tail;
        this.tail.prev = node;
    }
    return this._add(route);
}

LinkedList.prototype._remove = function (route) {
    route.prev.next = route.next;
    route.next.prev = route.prev;
    delete this.LinkedListMap[route.id];
    return route;
}

LinkedList.prototype._add = function (route) {
    var tail = this.tail;
    var prev = tail.prev;
    var node = new ListNode(route.id, route, prev, tail);
    this.LinkedListMap[route.id] = node;
    prev.next = node;
    tail.prev = node;
    return node;
}

LinkedList.prototype.remove = function(id) {
    let route = this.LinkedListMap[id];
    this._remove(route);
}

LinkedList.prototype.forward = function (id) {
    let route = this.LinkedListMap[id];
    if (route.next && route.next !== this.tail) {
        return route.next;
    }
}

LinkedList.prototype.back = function (id) {
    let route = this.LinkedListMap[id];
    if (route.prev && route.prev !== this.head) {
        return route.prev.router;
    }
}
  
module.exports = LinkedList;