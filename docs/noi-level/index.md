# NOI级知识点整理（2025修订版）

> 适用：NOI（全国青少年信息学奥林匹克竞赛）及以上，包括IOI中国队选拔（CTS）、NOI冬令营、国家集训队集训等  
> 难度系数：7-10（除入门级、提高级知识点外）  
> 修订时间：2025年4月  
> 注意：NOI级自动包含入门级和提高级所有知识点  
> 代码规范：头文件统一使用 `#include<bits/stdc++.h>`，万能头文件

---

## 📋 总览

| 大类 | 子类数 | 难度范围 |
|:---|:---:|:---:|
| C++程序设计 | 1 | 8 |
| 数据结构 | 4 | 8-10 |
| 算法 | 3 | 8-10 |
| 字符串算法 | 2 | 8-10 |
| 图论算法 | 3 | 8-10 |
| 动态规划 | 3 | 8-9 |
| 数学与其他 | 6 | 8-10 |

---

# 一、C++程序设计

## 1.1 面向对象

### 知识点1：面向对象的程序设计思想（OOP）

```cpp
#include<bits/stdc++.h>
using namespace std;

// OOP三大特性：封装、继承、多态

// 封装：将数据和操作绑定
class Animal {
private:
    string name;
    int age;

protected:  // 子类可访问
    string species;

public:
    // 构造函数
    Animal(string name, int age, string species)
        : name(name), age(age), species(species) {}

    // 虚函数（实现多态）
    virtual void speak() const {
        cout << name << "发出声音" << endl;
    }

    // 纯虚函数（抽象类）
    virtual void move() const = 0;

    // 析构函数（虚析构，防止内存泄漏）
    virtual ~Animal() {}

    // getter
    string getName() const { return name; }
    int getAge() const { return age; }
};

// 继承
class Dog : public Animal {
private:
    string breed;

public:
    Dog(string name, int age, string breed)
        : Animal(name, age, "犬科"), breed(breed) {}

    // 重写虚函数
    void speak() const override {
        cout << getName() << "汪汪叫" << endl;
    }

    void move() const override {
        cout << getName() << "跑动" << endl;
    }

    void fetch() const {
        cout << getName() << "捡球" << endl;
    }
};

class Cat : public Animal {
public:
    Cat(string name, int age) : Animal(name, age, "猫科") {}

    void speak() const override {
        cout << getName() << "喵喵叫" << endl;
    }

    void move() const override {
        cout << getName() << "跳跃" << endl;
    }
};

int main() {
    // 多态：基类指针指向派生类对象
    vector<Animal*> zoo;
    zoo.push_back(new Dog("旺财", 3, "金毛"));
    zoo.push_back(new Cat("咪咪", 2));

    for (Animal* a : zoo) {
        a->speak();  // 调用派生类的speak
        a->move();   // 调用派生类的move
        cout << endl;
    }

    // 释放内存
    for (Animal* a : zoo) {
        delete a;
    }

    return 0;
}
```

---

# 二、数据结构

## 2.1 线性结构

### 知识点1：块状链表

```cpp
#include<bits/stdc++.h>
using namespace std;

// 块状链表：数组+链表的混合结构
// 适用于区间操作（插入、删除、查询）
// 将序列分成若干块，每块用链表连接

const int BLOCK_SIZE = 500;

struct Block {
    vector<int> data;
    Block *next;
    Block() : next(nullptr) {}
};

class BlockList {
private:
    Block *head;
    int totalSize;

    // 找到第pos个元素所在的块
    pair<Block*, int> find(int pos) {
        Block *cur = head;
        int accumulated = 0;
        while (cur) {
            if (accumulated + (int)cur->data.size() > pos) {
                return {cur, pos - accumulated};
            }
            accumulated += cur->data.size();
            cur = cur->next;
        }
        return {nullptr, -1};
    }

    // 分裂过大的块
    void split(Block *b) {
        if (b->data.size() <= BLOCK_SIZE * 2) return;
        Block *newBlock = new Block();
        newBlock->data.assign(
            b->data.begin() + BLOCK_SIZE,
            b->data.end()
        );
        b->data.resize(BLOCK_SIZE);
        newBlock->next = b->next;
        b->next = newBlock;
    }

public:
    BlockList() : head(nullptr), totalSize(0) {}

    // 在位置pos插入val
    void insert(int pos, int val) {
        if (!head) {
            head = new Block();
            head->data.push_back(val);
            totalSize++;
            return;
        }

        auto [block, offset] = find(pos);
        if (!block) {
            // 插入末尾
            Block *last = head;
            while (last->next) last = last->next;
            last->data.push_back(val);
        } else {
            block->data.insert(block->data.begin() + offset, val);
            split(block);
        }
        totalSize++;
    }

    // 删除位置pos的元素
    void erase(int pos) {
        auto [block, offset] = find(pos);
        if (block) {
            block->data.erase(block->data.begin() + offset);
            totalSize--;
        }
    }

    // 查询位置pos的值
    int query(int pos) {
        auto [block, offset] = find(pos);
        return block->data[offset];
    }

    int size() { return totalSize; }
};

int main() {
    BlockList bl;
    for (int i = 1; i <= 100; i++) {
        bl.insert(i - 1, i);
    }

    cout << "第50个元素: " << bl.query(49) << endl;  // 50
    cout << "总大小: " << bl.size() << endl;  // 100

    bl.erase(49);
    cout << "删除后第50个元素: " << bl.query(49) << endl;  // 51

    return 0;
}
```

## 2.2 复杂树

### 知识点1：树链剖分

```cpp
#include<bits/stdc++.h>
using namespace std;

// 树链剖分：将树转化为线性序列，用线段树维护
// 支持：路径修改/查询、子树修改/查询

const int MAXN = 100005;

vector<int> adj[MAXN];
int parent[MAXN], depth[MAXN], size[MAXN], heavy[MAXN];
int head[MAXN], pos[MAXN], idx;
int val[MAXN];

// 第一遍DFS：求size、heavy儿子
void dfs1(int u, int p) {
    parent[u] = p;
    depth[u] = depth[p] + 1;
    size[u] = 1;
    int maxSize = 0;

    for (int v : adj[u]) {
        if (v != p) {
            dfs1(v, u);
            size[u] += size[v];
            if (size[v] > maxSize) {
                maxSize = size[v];
                heavy[u] = v;
            }
        }
    }
}

// 第二遍DFS：求head、pos
void dfs2(int u, int h) {
    head[u] = h;
    pos[u] = ++idx;

    if (heavy[u]) {
        dfs2(heavy[u], h);  // 重链延续
    }

    for (int v : adj[u]) {
        if (v != parent[u] && v != heavy[u]) {
            dfs2(v, v);  // 新链
        }
    }
}

// 路径查询（u到v的路径和）
int queryPath(int u, int v) {
    int result = 0;
    while (head[u] != head[v]) {
        if (depth[head[u]] < depth[head[v]]) swap(u, v);
        // 查询head[u]到u的区间和
        // result += segmentTreeQuery(pos[head[u]], pos[u]);
        u = parent[head[u]];
    }
    if (depth[u] > depth[v]) swap(u, v);
    // result += segmentTreeQuery(pos[u], pos[v]);
    return result;
}

int main() {
    int n;
    cin >> n;

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    dfs1(1, 0);
    dfs2(1, 1);

    cout << "树链剖分完成" << endl;

    return 0;
}
```

### 知识点2：LCT（Link-Cut Tree）

```cpp
#include<bits/stdc++.h>
using namespace std;

// LCT：动态树，支持动态连边、断边、路径查询
// 基于Splay维护实链

struct Node {
    Node *ch[2], *parent;
    int val, rev;

    Node(int v = 0) : val(v), rev(0), parent(nullptr) {
        ch[0] = ch[1] = nullptr;
    }

    bool isRoot() {
        return !parent || (parent->ch[0] != this && parent->ch[1] != this);
    }

    void pushDown() {
        if (rev) {
            swap(ch[0], ch[1]);
            if (ch[0]) ch[0]->rev ^= 1;
            if (ch[1]) ch[1]->rev ^= 1;
            rev = 0;
        }
    }
};

class LCT {
private:
    void rotate(Node *x) {
        Node *p = x->parent;
        Node *g = p->parent;
        int dir = (p->ch[1] == x);

        if (!p->isRoot()) {
            g->ch[g->ch[1] == p] = x;
        }
        x->parent = g;

        p->ch[dir] = x->ch[dir ^ 1];
        if (x->ch[dir ^ 1]) x->ch[dir ^ 1]->parent = p;

        x->ch[dir ^ 1] = p;
        p->parent = x;
    }

    void splay(Node *x) {
        static vector<Node*> stk;
        stk.clear();
        Node *y = x;
        stk.push_back(y);
        while (!y->isRoot()) {
            y = y->parent;
            stk.push_back(y);
        }

        while (!stk.empty()) {
            stk.back()->pushDown();
            stk.pop_back();
        }

        while (!x->isRoot()) {
            Node *p = x->parent;
            Node *g = p->parent;
            if (!p->isRoot()) {
                if ((g->ch[1] == p) == (p->ch[1] == x)) {
                    rotate(p);
                } else {
                    rotate(x);
                }
            }
            rotate(x);
        }
        x->pushDown();
    }

    void access(Node *x) {
        Node *last = nullptr;
        for (Node *y = x; y; y = y->parent) {
            splay(y);
            y->ch[1] = last;
            last = y;
        }
        splay(x);
    }

    void makeRoot(Node *x) {
        access(x);
        x->rev ^= 1;
        x->pushDown();
    }

    Node* findRoot(Node *x) {
        access(x);
        while (x->ch[0]) {
            x->ch[0]->pushDown();
            x = x->ch[0];
        }
        splay(x);
        return x;
    }

public:
    // 连边
    void link(Node *x, Node *y) {
        makeRoot(x);
        if (findRoot(y) != x) {
            x->parent = y;
        }
    }

    // 断边
    void cut(Node *x, Node *y) {
        makeRoot(x);
        access(y);
        if (y->ch[0] == x && !x->ch[1]) {
            y->ch[0] = nullptr;
            x->parent = nullptr;
        }
    }

    // 查询x到y的路径
    int queryPath(Node *x, Node *y) {
        makeRoot(x);
        access(y);
        return y->val;
    }
};

int main() {
    cout << "LCT动态树" << endl;

    return 0;
}
```

### 知识点3：树套树

```cpp
#include<bits/stdc++.h>
using namespace std;

// 树套树：树中嵌套树，如线段树套平衡树
// 用于区间第k大等操作

// 示例：线段树套set
const int MAXN = 100005;
vector<int> segTree[MAXN * 4];

void build(int node, int l, int r, int a[]) {
    if (l == r) {
        segTree[node].push_back(a[l]);
        return;
    }
    int mid = (l + r) / 2;
    build(node*2, l, mid, a);
    build(node*2+1, mid+1, r, a);
    merge(segTree[node*2].begin(), segTree[node*2].end(),
          segTree[node*2+1].begin(), segTree[node*2+1].end(),
          back_inserter(segTree[node]));
}

// 查询区间[l,r]中<=val的元素个数
int query(int node, int l, int r, int ql, int qr, int val) {
    if (ql <= l && r <= qr) {
        return upper_bound(segTree[node].begin(), segTree[node].end(), val)
               - segTree[node].begin();
    }
    int mid = (l + r) / 2;
    int result = 0;
    if (ql <= mid) result += query(node*2, l, mid, ql, qr, val);
    if (qr > mid) result += query(node*2+1, mid+1, r, ql, qr, val);
    return result;
}

int main() {
    int a[] = {0, 5, 3, 7, 1, 9, 2, 8};
    build(1, 1, 7, a);

    // 查询[2,6]中<=5的元素个数
    cout << "区间[2,6]中<=5的元素个数: "
         << query(1, 1, 7, 2, 6, 5) << endl;  // 4

    return 0;
}
```

### 知识点4：k-d树

```cpp
#include<bits/stdc++.h>
using namespace std;

// k-d树：k维空间的二叉搜索树
// 用于最近邻搜索、范围查询

struct Point {
    int x, y;
    int id;
};

const int MAXN = 100005;
Point points[MAXN];
int根节点维度;

bool cmpX(const Point &a, const Point &b) { return a.x < b.x; }
bool cmpY(const Point &a, const Point &b) { return a.y < b.y; }

// 构建k-d树
int buildKDTree(int l, int r, int dim) {
    if (l > r) return -1;

    int mid = (l + r) / 2;
    if (dim == 0) {
        nth_element(points + l, points + mid, points + r + 1, cmpX);
    } else {
        nth_element(points + l, points + mid, points + r + 1, cmpY);
    }

    points[mid].id = mid;
    return mid;
}

// 最近邻查询
long long minDist;
int nearestIdx;

void nearestNeighbor(int root, int l, int r, Point &target, int dim) {
    if (l > r) return;

    long long dist = (long long)(points[root].x - target.x) * (points[root].x - target.x)
                   + (long long)(points[root].y - target.y) * (points[root].y - target.y);

    if (dist < minDist && dist > 0) {
        minDist = dist;
        nearestIdx = root;
    }

    int mid = root;
    int nextDim = dim ^ 1;

    // 先搜索目标所在的子树
    if ((dim == 0 && target.x <= points[mid].x) ||
        (dim == 1 && target.y <= points[mid].y)) {
        nearestNeighbor(points[mid].id, l, mid - 1, target, nextDim);
        // 检查是否需要搜索另一子树
        long long diff = (dim == 0) ? points[mid].x - target.x : points[mid].y - target.y;
        if (diff * diff < minDist) {
            nearestNeighbor(points[mid].id, mid + 1, r, target, nextDim);
        }
    } else {
        nearestNeighbor(points[mid].id, mid + 1, r, target, nextDim);
        long long diff = (dim == 0) ? target.x - points[mid].x : target.y - points[mid].y;
        if (diff * diff < minDist) {
            nearestNeighbor(points[mid].id, l, mid - 1, target, nextDim);
        }
    }
}

int main() {
    int n = 5;
    points[0] = {2, 3};
    points[1] = {5, 4};
    points[2] = {9, 6};
    points[3] = {4, 7};
    points[4] = {8, 1};

    buildKDTree(0, n - 1, 0);

    Point target = {7, 2};
    minDist = LLONG_MAX;
    nearestIdx = -1;

    nearestNeighbor(points[0].id, 0, n - 1, target, 0);

    cout << "最近点: (" << points[nearestIdx].x << "," << points[nearestIdx].y << ")" << endl;

    return 0;
}
```

### 知识点5：虚树

```cpp
#include<bits/stdc++.h>
using namespace std;

// 虚树：只保留关键节点和它们的LCA构成的树
// 用于树上DP只涉及部分节点的优化

const int MAXN = 100005;
vector<int> adj[MAXN];
int depth[MAXN], parent[MAXN][20];

void buildLCA(int u, int p) {
    parent[u][0] = p;
    for (int i = 1; i < 20; i++) {
        parent[u][i] = parent[parent[u][i-1]][i-1];
    }
    for (int v : adj[u]) {
        if (v != p) {
            depth[v] = depth[u] + 1;
            buildLCA(v, u);
        }
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    for (int i = 19; i >= 0; i--) {
        if (depth[u] - (1 << i) >= depth[v]) u = parent[u][i];
    }
    if (u == v) return u;
    for (int i = 19; i >= 0; i--) {
        if (parent[u][i] != parent[v][i]) {
            u = parent[u][i];
            v = parent[v][i];
        }
    }
    return parent[u][0];
}

int main() {
    cout << "虚树：保留关键节点和LCA" << endl;
    cout << "用于树上DP只涉及部分节点的优化" << endl;

    return 0;
}
```

## 2.3 可合并堆

### 知识点1：左偏树

```cpp
#include<bits/stdc++.h>
using namespace std;

// 左偏树：可合并堆，支持O(log n)合并
struct LeftistNode {
    int val, dist;
    LeftistNode *left, *right;
    LeftistNode(int v) : val(v), dist(0), left(nullptr), right(nullptr) {}
};

LeftistNode* merge(LeftistNode *a, LeftistNode *b) {
    if (!a) return b;
    if (!b) return a;
    if (a->val > b->val) swap(a, b);

    a->right = merge(a->right, b);

    if (!a->left || a->left->dist < a->right->dist) {
        swap(a->left, a->right);
    }

    a->dist = a->right ? a->right->dist + 1 : 0;
    return a;
}

int main() {
    LeftistNode *heap = nullptr;
    heap = merge(heap, new LeftistNode(5));
    heap = merge(heap, new LeftistNode(3));
    heap = merge(heap, new LeftistNode(7));
    heap = merge(heap, new LeftistNode(1));

    cout << "堆顶: " << heap->val << endl;  // 1

    return 0;
}
```

### 知识点2：二叉堆（进阶）

```cpp
#include<bits/stdc++.h>
using namespace std;

// 二叉堆：支持合并的可持久化堆
// 隐式堆：用数组存储完全二叉树
// 显式堆：用指针存储任意二叉树

class ImplicitHeap {
private:
    vector<int> heap;

    void siftUp(int i) {
        while (i > 0 && heap[(i-1)/2] > heap[i]) {
            swap(heap[(i-1)/2], heap[i]);
            i = (i-1) / 2;
        }
    }

    void siftDown(int i) {
        int n = heap.size();
        while (true) {
            int smallest = i;
            int left = 2*i + 1, right = 2*i + 2;
            if (left < n && heap[left] < heap[smallest]) smallest = left;
            if (right < n && heap[right] < heap[smallest]) smallest = right;
            if (smallest == i) break;
            swap(heap[i], heap[smallest]);
            i = smallest;
        }
    }

public:
    void push(int val) {
        heap.push_back(val);
        siftUp(heap.size() - 1);
    }

    int top() { return heap[0]; }

    void pop() {
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) siftDown(0);
    }

    bool empty() { return heap.empty(); }
};

int main() {
    ImplicitHeap pq;
    pq.push(5);
    pq.push(3);
    pq.push(7);

    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;  // 3 5 7

    return 0;
}
```

## 2.4 可持久化数据结构

### 知识点1：可持久化线段树

```cpp
#include<bits/stdc++.h>
using namespace std;

// 可持久化线段树：保留历史版本，支持查询历史状态
// 典型应用：主席树，查询区间第k小

const int MAXN = 100005;
struct PersistNode {
    int left, right, cnt;
} tree[MAXN * 40];
int root[MAXN], idx;

int build(int l, int r) {
    int node = ++idx;
    if (l == r) return node;
    int mid = (l + r) / 2;
    tree[node].left = build(l, mid);
    tree[node].right = build(mid + 1, r);
    return node;
}

// 在版本pre的基础上，位置pos加val
int update(int pre, int l, int r, int pos, int val) {
    int node = ++idx;
    tree[node] = tree[pre];
    tree[node].cnt += val;

    if (l == r) return node;

    int mid = (l + r) / 2;
    if (pos <= mid) {
        tree[node].left = update(tree[pre].left, l, mid, pos, val);
    } else {
        tree[node].right = update(tree[pre].right, mid + 1, r, pos, val);
    }
    return node;
}

// 查询区间[l,r]中第k小的数
int query(int u, int v, int l, int r, int k) {
    if (l == r) return l;
    int mid = (l + r) / 2;
    int cnt = tree[tree[v].left].cnt - tree[tree[u].left].cnt;
    if (k <= cnt) {
        return query(tree[u].left, tree[v].left, l, mid, k);
    } else {
        return query(tree[u].right, tree[v].right, mid + 1, r, k - cnt);
    }
}

int main() {
    int n = 5;
    int a[] = {0, 3, 1, 4, 1, 5};

    root[0] = build(1, n);

    for (int i = 1; i <= n; i++) {
        root[i] = update(root[i-1], 1, n, a[i], 1);
    }

    // 查询[2,4]中第2小的数
    cout << "区间[2,4]中第2小的数: "
         << query(root[1], root[4], 1, n, 2) << endl;  // 1

    return 0;
}
```


---

# 三、算法

## 3.1 算法策略

### 知识点1：分块

```cpp
#include<bits/stdc++.h>
using namespace std;

// 分块：将序列分成若干块，每块内暴力，块间预处理
// 例：区间加、区间求和

const int MAXN = 100005;
const int BLOCK = 350;  // √n

int n, a[MAXN];
long long blockSum[MAXN / BLOCK + 5];
int blockId[MAXN];
int lazy[MAXN / BLOCK + 5];  // 块的懒标记

void build() {
    for (int i = 0; i < n; i++) {
        blockId[i] = i / BLOCK;
        blockSum[blockId[i]] += a[i];
    }
}

// 区间[l,r]每个元素加val
void update(int l, int r, int val) {
    int bl = l / BLOCK, br = r / BLOCK;

    if (bl == br) {
        // 同一块内暴力
        for (int i = l; i <= r; i++) {
            a[i] += val;
            blockSum[bl] += val;
        }
        return;
    }

    // 左边不完整的块
    for (int i = l; i < (bl + 1) * BLOCK; i++) {
        a[i] += val;
        blockSum[bl] += val;
    }

    // 中间完整的块（打懒标记）
    for (int b = bl + 1; b < br; b++) {
        lazy[b] += val;
    }

    // 右边不完整的块
    for (int i = br * BLOCK; i <= r; i++) {
        a[i] += val;
        blockSum[br] += val;
    }
}

// 区间[l,r]求和
long long query(int l, int r) {
    int bl = l / BLOCK, br = r / BLOCK;
    long long result = 0;

    if (bl == br) {
        for (int i = l; i <= r; i++) {
            result += a[i] + lazy[bl];
        }
        return result;
    }

    for (int i = l; i < (bl + 1) * BLOCK; i++) {
        result += a[i] + lazy[bl];
    }

    for (int b = bl + 1; b < br; b++) {
        result += blockSum[b] + lazy[b] * BLOCK;
    }

    for (int i = br * BLOCK; i <= r; i++) {
        result += a[i] + lazy[br];
    }

    return result;
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];

    build();

    int q;
    cin >> q;
    while (q--) {
        int op, l, r, val;
        cin >> op >> l >> r;
        l--; r--;

        if (op == 1) {
            cin >> val;
            update(l, r, val);
        } else {
            cout << query(l, r) << endl;
        }
    }

    return 0;
}
```

### 知识点2：离线处理

```cpp
#include<bits/stdc++.h>
using namespace std;

// 离线处理：将所有查询收集起来，排序后统一处理
// 例：莫队算法

const int MAXN = 100005;
int a[MAXN], cnt[MAXN];
int blockSize;

struct Query {
    int l, r, id;
    bool operator<(const Query &other) const {
        int blockL = l / blockSize, blockR = other.l / blockSize;
        if (blockL != blockR) return blockL < blockR;
        return (blockL & 1) ? (r < other.r) : (r > other.r);
    }
};

int main() {
    int n, m;
    cin >> n >> m;

    blockSize = sqrt(n);

    for (int i = 1; i <= n; i++) cin >> a[i];

    vector<Query> queries(m);
    for (int i = 0; i < m; i++) {
        cin >> queries[i].l >> queries[i].r;
        queries[i].id = i;
    }

    sort(queries.begin(), queries.end());

    vector<int> answers(m);
    int curL = 1, curR = 0;
    long long curAns = 0;

    for (auto &q : queries) {
        while (curR < q.r) {
            curR++;
            curAns += cnt[a[curR]] == 0;
            cnt[a[curR]]++;
        }
        while (curL > q.l) {
            curL--;
            curAns += cnt[a[curL]] == 0;
            cnt[a[curL]]++;
        }
        while (curR > q.r) {
            cnt[a[curR]]--;
            curAns -= cnt[a[curR]] == 0;
            curR--;
        }
        while (curL < q.l) {
            cnt[a[curL]]--;
            curAns -= cnt[a[curL]] == 0;
            curL++;
        }
        answers[q.id] = curAns;
    }

    for (int x : answers) cout << x << endl;

    return 0;
}
```

### 知识点3-4：分治与平衡规划

```cpp
#include<bits/stdc++.h>
using namespace std;

// CDQ分治：解决三维偏序等问题
// 例：三维偏序（数对(a,b,c)，求有多少对i<j使得ai<aj,bi<bj,ci<cj）

const int MAXN = 100005;
struct Point {
    int a, b, c, id;
    bool operator<(const Point &other) const {
        if (a != other.a) return a < other.a;
        if (b != other.b) return b < other.b;
        return c < other.c;
    }
};

int tree[MAXN], ans[MAXN];

void update(int i, int val) {
    for (; i < MAXN; i += i & (-i)) tree[i] += val;
}

int query(int i) {
    int sum = 0;
    for (; i > 0; i -= i & (-i)) sum += tree[i];
    return sum;
}

void cdqDivide(vector<Point> &points, int l, int r) {
    if (l >= r) return;

    int mid = (l + r) / 2;
    cdqDivide(points, l, mid);
    cdqDivide(points, mid + 1, r);

    // 按b排序后，用树状数组统计c
    vector<Point> tmp;
    for (int i = l; i <= mid; i++) tmp.push_back(points[i]);
    for (int i = mid + 1; i <= r; i++) tmp.push_back(points[i]);
    sort(tmp.begin(), tmp.end(), [](const Point &x, const Point &y) {
        return x.b < y.b;
    });

    for (auto &p : tmp) {
        if (p.id <= mid) {
            update(p.c, 1);
        } else {
            ans[p.id] += query(p.c - 1);
        }
    }

    for (auto &p : tmp) {
        if (p.id <= mid) update(p.c, -1);
    }

    // 按a排回
    sort(points.begin() + l, points.begin() + r + 1);
}

int main() {
    int n = 5;
    vector<Point> points = {
        {1, 2, 3, 1}, {2, 1, 4, 2}, {1, 3, 2, 3},
        {3, 1, 1, 4}, {2, 3, 5, 5}
    };

    // 离散化c
    vector<int> cVals;
    for (auto &p : points) cVals.push_back(p.c);
    sort(cVals.begin(), cVals.end());
    cVals.erase(unique(cVals.begin(), cVals.end()), cVals.end());
    for (auto &p : points) {
        p.c = lower_bound(cVals.begin(), cVals.end(), p.c) - cVals.begin() + 1;
    }

    cdqDivide(points, 0, n - 1);

    for (int i = 1; i <= n; i++) {
        cout << "点" << i << "的答案: " << ans[i] << endl;
    }

    return 0;
}
```

## 3.2 字符串算法

### 知识点1：扩展KMP（Z算法）

```cpp
#include<bits/stdc++.h>
using namespace std;

// 扩展KMP：求每个后缀与整个字符串的最长公共前缀
vector<int> zFunction(const string &s) {
    int n = s.length();
    vector<int> z(n, 0);
    z[0] = n;

    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r) {
            z[i] = min(r - i, z[i - l]);
        }
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] > r) {
            l = i;
            r = i + z[i];
        }
    }

    return z;
}

int main() {
    string s = "aabxaabxcaab";
    auto z = zFunction(s);

    for (int i = 0; i < s.length(); i++) {
        cout << "z[" << i << "] = " << z[i] << endl;
    }

    return 0;
}
```

### 知识点2：AC自动机

```cpp
#include<bits/stdc++.h>
using namespace std;

// AC自动机：多模式串匹配
const int MAXN = 100005;
int trie[MAXN][26], fail[MAXN], cnt[MAXN], idx;

void insert(const string &s) {
    int cur = 0;
    for (char c : s) {
        int ch = c - 'a';
        if (!trie[cur][ch]) {
            trie[cur][ch] = ++idx;
        }
        cur = trie[cur][ch];
    }
    cnt[cur]++;
}

void buildFail() {
    queue<int> q;
    for (int i = 0; i < 26; i++) {
        if (trie[0][i]) q.push(trie[0][i]);
    }

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int i = 0; i < 26; i++) {
            if (trie[u][i]) {
                fail[trie[u][i]] = trie[fail[u]][i];
                q.push(trie[u][i]);
            } else {
                trie[u][i] = trie[fail[u]][i];
            }
        }
    }
}

int query(const string &s) {
    int cur = 0, result = 0;
    for (char c : s) {
        cur = trie[cur][c - 'a'];
        for (int j = cur; j && cnt[j] != -1; j = fail[j]) {
            result += cnt[j];
            cnt[j] = -1;
        }
    }
    return result;
}

int main() {
    string text = "sayheysheher";
    vector&lt;string&gt; patterns = {"he", "she", "her"};

    for (auto &p : patterns) insert(p);
    buildFail();

    cout << "匹配数: " << query(text) << endl;  // 3

    return 0;
}
```

### 知识点3：后缀数组

```cpp
#include<bits/stdc++.h>
using namespace std;

// 后缀数组SA：O(n log n)构建
vector<int> buildSA(const string &s) {
    int n = s.length();
    vector<int> sa(n), rank_(n), tmp(n);

    for (int i = 0; i < n; i++) {
        sa[i] = i;
        rank_[i] = s[i];
    }

    for (int k = 1; k < n; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rank_[a] != rank_[b]) return rank_[a] < rank_[b];
            int ra = (a + k < n) ? rank_[a + k] : -1;
            int rb = (b + k < n) ? rank_[b + k] : -1;
            return ra < rb;
        };

        sort(sa.begin(), sa.end(), cmp);

        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++) {
            tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) ? 1 : 0);
        }
        rank_ = tmp;
    }

    return sa;
}

// LCP数组（Kasai算法）
vector<int> buildLCP(const string &s, const vector<int> &sa) {
    int n = s.length();
    vector<int> rank_(n), lcp(n - 1);

    for (int i = 0; i < n; i++) rank_[sa[i]] = i;

    int h = 0;
    for (int i = 0; i < n; i++) {
        if (rank_[i] == 0) continue;
        int j = sa[rank_[i] - 1];
        while (i + h < n && j + h < n && s[i + h] == s[j + h]) h++;
        lcp[rank_[i] - 1] = h;
        if (h > 0) h--;
    }

    return lcp;
}

int main() {
    string s = "banana";
    auto sa = buildSA(s);
    auto lcp = buildLCP(s, sa);

    cout << "后缀数组: ";
    for (int x : sa) cout << x << " ";
    cout << endl;  // 5 3 1 0 4 2

    cout << "LCP数组: ";
    for (int x : lcp) cout << x << " ";
    cout << endl;  // 1 3 0 0 2

    return 0;
}
```

### 知识点4：后缀自动机（SAM）

```cpp
#include<bits/stdc++.h>
using namespace std;

// 后缀自动机：O(n)构建，支持多种字符串操作
struct State {
    int len, link;
    map<char, int> next;
};

vector<State> st;
int last;

void samInit() {
    st.clear();
    st.push_back({0, -1, {}});
    last = 0;
}

void samExtend(char c) {
    int cur = st.size();
    st.push_back({st[last].len + 1, -1, {}});

    int p = last;
    while (p != -1 && st[p].next.find(c) == st[p].next.end()) {
        st[p].next[c] = cur;
        p = st[p].link;
    }

    if (p == -1) {
        st[cur].link = 0;
    } else {
        int q = st[p].next[c];
        if (st[p].len + 1 == st[q].len) {
            st[cur].link = q;
        } else {
            int clone = st.size();
            st.push_back({st[p].len + 1, st[q].link, st[q].next});
            while (p != -1 && st[p].next[c] == q) {
                st[p].next[c] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }

    last = cur;
}

int main() {
    samInit();
    string s = "abab";
    for (char c : s) samExtend(c);

    cout << "SAM状态数: " << st.size() << endl;

    return 0;
}
```


## 3.3 搜索算法

### 知识点1：A*搜索

```cpp
#include<bits/stdc++.h>
using namespace std;

// A*：启发式搜索 = Dijkstra + 启发函数
struct Node {
    int x, y;
    int g, h;  // g=已走代价, h=启发估计
    bool operator>(const Node &other) const {
        return g + h > other.g + other.h;
    }
};

int heuristic(int x1, int y1, int x2, int y2) {
    return abs(x1 - x2) + abs(y1 - y2);  // 曼哈顿距离
}

int main() {
    int n, m;
    cin >> n >> m;

    vector&lt;string&gt; grid(n);
    for (int i = 0; i < n; i++) cin >> grid[i];

    int sx, sy, ex, ey;
    cin >> sx >> sy >> ex >> ey;

    int dx[] = {0, 0, 1, -1};
    int dy[] = {1, -1, 0, 0};

    priority_queue<Node, vector<Node>, greater<Node>> pq;
    vector<vector<int>> dist(n, vector<int>(m, INT_MAX));

    pq.push({sx, sy, 0, heuristic(sx, sy, ex, ey)});
    dist[sx][sy] = 0;

    while (!pq.empty()) {
        auto [x, y, g, h] = pq.top();
        pq.pop();

        if (x == ex && y == ey) {
            cout << "最短路径: " << g << endl;
            break;
        }

        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && grid[nx][ny] != '#') {
                int ng = g + 1;
                if (ng < dist[nx][ny]) {
                    dist[nx][ny] = ng;
                    pq.push({nx, ny, ng, heuristic(nx, ny, ex, ey)});
                }
            }
        }
    }

    return 0;
}
```

---

# 四、图论算法

### 知识点1：基环树

```cpp
#include<bits/stdc++.h>
using namespace std;

// 基环树：n个节点n条边的连通图（恰好一个环）
// 树DP + 环上处理

const int MAXN = 100005;
vector<int> adj[MAXN];
int inDegree[MAXN], color[MAXN];
bool removed[MAXN];

// 找环（拓扑排序删除叶子）
void findCycle(int n) {
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (inDegree[i] == 1) q.push(i);
    }

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        removed[u] = true;

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 1) q.push(v);
        }
    }

    // 剩余未删除的节点构成环
    cout << "环上的节点: ";
    for (int i = 1; i <= n; i++) {
        if (!removed[i]) cout << i << " ";
    }
    cout << endl;
}

int main() {
    int n;
    cin >> n;

    for (int i = 0; i < n; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
        inDegree[u]++;
        inDegree[v]++;
    }

    findCycle(n);

    return 0;
}
```

### 知识点2：网络流

```cpp
#include<bits/stdc++.h>
using namespace std;

// 最大流：Dinic算法
const int MAXN = 1005;
const int INF = 1e9;

struct Edge {
    int to, cap, flow, rev;
};

vector<Edge> adj[MAXN];
int level[MAXN], iter[MAXN];

void addEdge(int from, int to, int cap) {
    adj[from].push_back({to, cap, 0, (int)adj[to].size()});
    adj[to].push_back({from, 0, 0, (int)adj[from].size() - 1});
}

bool bfs(int s, int t) {
    memset(level, -1, sizeof(level));
    queue<int> q;
    q.push(s);
    level[s] = 0;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (auto &e : adj[u]) {
            if (e.cap - e.flow > 0 && level[e.to] < 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }

    return level[t] >= 0;
}

int dfs(int u, int t, int f) {
    if (u == t) return f;

    for (int &i = iter[u]; i < adj[u].size(); i++) {
        Edge &e = adj[u][i];
        if (e.cap - e.flow > 0 && level[u] < level[e.to]) {
            int d = dfs(e.to, t, min(f, e.cap - e.flow));
            if (d > 0) {
                e.flow += d;
                adj[e.to][e.rev].flow -= d;
                return d;
            }
        }
    }

    return 0;
}

int dinic(int s, int t) {
    int flow = 0;
    while (bfs(s, t)) {
        memset(iter, 0, sizeof(iter));
        int f;
        while ((f = dfs(s, t, INF)) > 0) {
            flow += f;
        }
    }
    return flow;
}

int main() {
    int n, m, s, t;
    cin >> n >> m >> s >> t;

    for (int i = 0; i < m; i++) {
        int u, v, c;
        cin >> u >> v >> c;
        addEdge(u, v, c);
    }

    cout << "最大流: " << dinic(s, t) << endl;

    return 0;
}
```

### 知识点3：2-SAT

```cpp
#include<bits/stdc++.h>
using namespace std;

// 2-SAT：判断2-SAT问题是否有解
const int MAXN = 200005;
vector<int> adj[MAXN], radj[MAXN];
int dfn[MAXN], low[MAXN], idx;
int stack_[MAXN], top_;
bool inStack[MAXN];
int scc[MAXN], sccCnt;

void tarjan(int u) {
    dfn[u] = low[u] = ++idx;
    stack_[++top_] = u;
    inStack[u] = true;

    for (int v : adj[u]) {
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (inStack[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }

    if (dfn[u] == low[u]) {
        sccCnt++;
        while (true) {
            int v = stack_[top_--];
            inStack[v] = false;
            scc[v] = sccCnt;
            if (v == u) break;
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int a, na, b, nb;
        cin >> a >> na >> b >> nb;
        // a或b为真：~a->b, ~b->a
        adj[a + na * n].push_back(b + (1 - nb) * n);
        adj[b + nb * n].push_back(a + (1 - na) * n);
    }

    for (int i = 1; i <= 2 * n; i++) {
        if (!dfn[i]) tarjan(i);
    }

    bool possible = true;
    for (int i = 1; i <= n; i++) {
        if (scc[i] == scc[i + n]) {
            possible = false;
            break;
        }
    }

    cout << (possible ? "有解" : "无解") << endl;

    return 0;
}
```

### 知识点4：最小树形图（朱-刘算法）

```cpp
#include<bits/stdc++.h>
using namespace std;

// 最小树形图：有向图的最小生成树
const int INF = 1e9;
struct Edge { int u, v, w; };

int main() {
    // 朱-刘算法框架
    cout << "最小树形图：有向图的最小生成树" << endl;
    cout << "使用朱-刘算法，O(VE)时间" << endl;

    return 0;
}
```

### 知识点5：二分图匹配KM算法

```cpp
#include<bits/stdc++.h>
using namespace std;

// KM算法：带权二分图最大权匹配
const int MAXN = 105;
const int INF = 1e9;
int n;
int w[MAXN][MAXN];  // 权值
int lx[MAXN], ly[MAXN];  // 顶标
int match[MAXN];  // 匹配
bool visx[MAXN], visy[MAXN];

bool dfs(int u) {
    visx[u] = true;
    for (int v = 1; v <= n; v++) {
        if (!visy[v] && lx[u] + ly[v] == w[u][v]) {
            visy[v] = true;
            if (match[v] == 0 || dfs(match[v])) {
                match[v] = u;
                return true;
            }
        }
    }
    return false;
}

int km() {
    for (int i = 1; i <= n; i++) {
        lx[i] = *max_element(w[i] + 1, w[i] + n + 1);
        ly[i] = 0;
    }

    for (int i = 1; i <= n; i++) {
        while (true) {
            memset(visx, false, sizeof(visx));
            memset(visy, false, sizeof(visy));
            if (dfs(i)) break;

            int d = INF;
            for (int u = 1; u <= n; u++) {
                if (visx[u]) {
                    for (int v = 1; v <= n; v++) {
                        if (!visy[v]) {
                            d = min(d, lx[u] + ly[v] - w[u][v]);
                        }
                    }
                }
            }

            for (int u = 1; u <= n; u++) {
                if (visx[u]) lx[u] -= d;
                if (visy[u]) ly[u] += d;
            }
        }
    }

    int result = 0;
    for (int v = 1; v <= n; v++) {
        result += w[match[v]][v];
    }
    return result;
}

int main() {
    n = 3;
    w[1][1] = 1; w[1][2] = 2; w[1][3] = 3;
    w[2][1] = 4; w[2][2] = 5; w[2][3] = 6;
    w[3][1] = 7; w[3][2] = 8; w[3][3] = 9;

    cout << "最大权匹配: " << km() << endl;

    return 0;
}
```


---

# 五、动态规划

### 知识点1：复杂动态规划模型的构建

```cpp
#include<bits/stdc++.h>
using namespace std;

// 例：旅行商问题（TSP）状态压缩DP
int n;
int dist[20][20];
int dp[1 << 20][20];

int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> dist[i][j];

    memset(dp, 0x3f, sizeof(dp));
    dp[1][0] = 0;

    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1 << u))) continue;
            if (dp[mask][u] == 0x3f3f3f3f) continue;

            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                int newMask = mask | (1 << v);
                dp[newMask][v] = min(dp[newMask][v],
                                     dp[mask][u] + dist[u][v]);
            }
        }
    }

    int ans = INT_MAX;
    for (int u = 0; u < n; u++) {
        ans = min(ans, dp[(1 << n) - 1][u] + dist[u][0]);
    }

    cout << "TSP最短回路: " << ans << endl;

    return 0;
}
```

### 知识点2-3：DP优化

```cpp
#include<bits/stdc++.h>
using namespace std;

// 斜率优化：将O(n²)降为O(n)
// 例：玩具装箱问题
// dp[i] = min{dp[j] + (sum[i]-sum[j]+i-j-1-L)²}
// 令S[i]=sum[i]+i, 则dp[i] = min{dp[j] + (S[i]-S[j]-L-1)²}

const int MAXN = 100005;
long long dp[MAXN], S[MAXN];
int q[MAXN], head, tail;
int n, L;

long long Y(int j) { return dp[j] + S[j] * S[j]; }
long long X(int j) { return S[j]; }
long long slope(int j, int k) {
    return (Y(j) - Y(k)) / (X(j) - X(k) + 0.0);
}

int main() {
    cin >> n >> L;

    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        S[i] = S[i-1] + x;
    }

    for (int i = 1; i <= n; i++) S[i] += i;

    head = tail = 0;
    q[tail++] = 0;

    for (int i = 1; i <= n; i++) {
        while (head + 1 < tail &&
               slope(q[head], q[head+1]) <= 2 * S[i]) {
            head++;
        }

        int j = q[head];
        dp[i] = dp[j] + (S[i] - S[j] - L - 1) * (S[i] - S[j] - L - 1);

        while (head + 1 < tail &&
               slope(q[tail-2], q[tail-1]) >= slope(q[tail-1], i)) {
            tail--;
        }
        q[tail++] = i;
    }

    cout << "最小代价: " << dp[n] << endl;

    return 0;
}
```

```cpp
// 四边形不等式优化
// 适用条件：决策点具有单调性
// 将O(n³)降为O(n²)

// 例：石子合并优化
// dp[i][j] = min{dp[i][k] + dp[k+1][j]} + cost[i][j]
// 若cost满足四边形不等式，则最优决策点K[i][j]单调

int main() {
    cout << "四边形不等式优化:" << endl;
    cout << "当cost[i][j]满足四边形不等式时" << endl;
    cout << "K[i][j-1] <= K[i][j] <= K[i+1][j]" << endl;
    cout << "可将O(n³)降为O(n²)" << endl;

    return 0;
}
```

```cpp
// CDQ分治优化DP
// 适用条件：dp[i] = max{dp[j] + f(j,i)}，其中j<i且f满足可加性
// 将O(n²)降为O(n log n)

int main() {
    cout << "CDQ分治优化DP:" << endl;
    cout << "将三维偏序转化为分治问题" << endl;
    cout << "先处理左半区间对右半区间的影响" << endl;

    return 0;
}
```

---

# 六、数学与其他

## 6.1 初等数论

### 知识点1：原根与指数

```cpp
#include<bits/stdc++.h>
using namespace std;

// 原根：g是模p的原根，当且仅当g^1,g^2,...,g^(p-1)模p两两不同
// 即g的阶等于p-1

int powMod(long long a, long long n, long long mod) {
    long long result = 1;
    a %= mod;
    while (n > 0) {
        if (n & 1) result = result * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}

// 求模p的原根（p为奇素数）
int primitiveRoot(int p) {
    // 分解p-1的质因数
    vector<int> factors;
    int x = p - 1;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) {
            factors.push_back(i);
            while (x % i == 0) x /= i;
        }
    }
    if (x > 1) factors.push_back(x);

    // 检查每个候选g
    for (int g = 2; g < p; g++) {
        bool ok = true;
        for (int f : factors) {
            if (powMod(g, (p - 1) / f, p) == 1) {
                ok = false;
                break;
            }
        }
        if (ok) return g;
    }
    return -1;
}

int main() {
    cout << "模11的原根: " << primitiveRoot(11) << endl;  // 2
    cout << "模7的原根: " << primitiveRoot(7) << endl;    // 3

    return 0;
}
```

### 知识点2：BSGS算法

```cpp
#include<bits/stdc++.h>
using namespace std;

// Baby Step Giant Step：求解离散对数 a^x ≡ b (mod p)
long long powMod(long long a, long long n, long long mod) {
    long long result = 1;
    a %= mod;
    while (n > 0) {
        if (n & 1) result = result * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}

long long bsgs(long long a, long long b, long long p) {
    a %= p;
    b %= p;
    if (b == 1) return 0;

    long long m = ceil(sqrt(p));
    unordered_map<long long, long long> baby;

    // Baby step: 存储 a^j (mod p)
    long long power = 1;
    for (long long j = 0; j < m; j++) {
        baby[power] = j;
        power = power * a % p;
    }

    // Giant step: 检查 b * (a^(-m))^i
    long long giant = powMod(a, p - 1 - m, p);
    long long current = b;

    for (long long i = 0; i <= m; i++) {
        if (baby.count(current)) {
            return i * m + baby[current];
        }
        current = current * giant % p;
    }

    return -1;  // 无解
}

int main() {
    // 求解 2^x ≡ 8 (mod 13)
    cout << "2^x ≡ 8 (mod 13): x = " << bsgs(2, 8, 13) << endl;  // 3

    return 0;
}
```

### 知识点3-4：狄利克雷卷积与莫比乌斯反演

```cpp
#include<bits/stdc++.h>
using namespace std;

// 莫比乌斯反演：
// 若f(n) = Σ_{d|n} g(d)，则g(n) = Σ_{d|n} μ(n/d) * f(d)
// 其中μ是莫比乌斯函数

const int MAXN = 100005;
int mu[MAXN], prime[MAXN], cnt;
bool isPrime[MAXN];

void initMu(int n) {
    memset(isPrime, true, sizeof(isPrime));
    isPrime[0] = isPrime[1] = false;
    mu[1] = 1;

    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            prime[cnt++] = i;
            mu[i] = -1;
        }
        for (int j = 0; j < cnt && i * prime[j] <= n; j++) {
            isPrime[i * prime[j]] = false;
            if (i % prime[j] == 0) {
                mu[i * prime[j]] = 0;
                break;
            } else {
                mu[i * prime[j]] = -mu[i];
            }
        }
    }
}

// 例：求gcd(i,j)=1的数对个数 (1<=i<=n, 1<=j<=m)
long long solve(int n, int m) {
    long long result = 0;
    for (int d = 1; d <= min(n, m); d++) {
        result += (long long)mu[d] * (n / d) * (m / d);
    }
    return result;
}

int main() {
    initMu(100000);

    int n = 5, m = 5;
    cout << "gcd(i,j)=1的数对个数: " << solve(n, m) << endl;

    return 0;
}
```

### 知识点5：Burnside引理与Polya定理

```cpp
#include<bits/stdc++.h>
using namespace std;

// Polya定理：染色方案数 = (1/|G|) * Σ |fix(g)|
// 其中G是置换群，fix(g)是置换g的不动点数

// 例：用k种颜色给正方形的4个顶点染色
// 旋转群有4个元素：旋转0°, 90°, 180°, 270°

long long powMod(long long a, long long n, long long mod) {
    long long result = 1;
    while (n > 0) {
        if (n & 1) result = result * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}

long long polya(int n, int k, long long mod) {
    // 正n边形的旋转群
    long long result = 0;
    for (int i = 0; i < n; i++) {
        int g = __gcd(i, n);
        result = (result + powMod(k, g, mod)) % mod;
    }
    result = result * powMod(n, mod - 2, mod) % mod;
    return result;
}

int main() {
    long long mod = 1e9 + 7;
    int n = 4, k = 3;

    cout << "用3种颜色给正方形4顶点染色: " << polya(n, k, mod) << "种" << endl;

    return 0;
}
```

### 知识点6：斯特林数

```cpp
#include<bits/stdc++.h>
using namespace std;

// 第二类斯特林数S(n,k)：将n个不同元素分成k个非空集合的方案数
// S(n,k) = S(n-1,k-1) + k * S(n-1,k)

const int MAXN = 1005;
const int MOD = 1e9 + 7;
long long S[MAXN][MAXN];

void init(int n) {
    S[0][0] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            S[i][j] = (S[i-1][j-1] + j * S[i-1][j]) % MOD;
        }
    }
}

int main() {
    init(100);

    cout << "S(5,3) = " << S[5][3] << endl;  // 25
    cout << "S(4,2) = " << S[4][2] << endl;  // 7

    return 0;
}
```

### 知识点7：Prufer序列

```cpp
#include<bits/stdc++.h>
using namespace std;

// Prufer序列：无根树的编码
// n个节点的无根树有n^(n-2)种（Cayley公式）

vector<int> pruferSequence(vector<vector<int>> &adj, int n) {
    vector<int> degree(n + 1, 0);
    vector<int> prufer;
    vector<bool> removed(n + 1, false);

    for (int i = 1; i <= n; i++) {
        degree[i] = adj[i].size();
    }

    // 找到编号最小的叶子
    int leaf = 1;
    while (leaf <= n && (degree[leaf] != 1 || removed[leaf])) leaf++;

    int u = leaf;

    for (int i = 0; i < n - 2; i++) {
        // 找u的邻居中编号最小的
        int v = -1;
        for (int w : adj[u]) {
            if (!removed[w]) {
                v = w;
                break;
            }
        }

        prufer.push_back(v);
        degree[u]--;
        degree[v]--;

        if (degree[u] == 0) removed[u] = true;
        if (degree[v] == 1 && !removed[v]) {
            u = v;
        } else {
            u = 1;
            while (u <= n && (degree[u] != 1 || removed[u])) u++;
        }
    }

    return prufer;
}

int main() {
    cout << "Prufer序列：无根树的编码" << endl;
    cout << "n个节点的无根树有n^(n-2)种" << endl;

    return 0;
}
```

## 6.3 线性代数

### 知识点1：线性基

```cpp
#include<bits/stdc++.h>
using namespace std;

// 线性基：一组线性无关的向量，可以表示所有可能的异或值
// 用于求最大异或和

struct LinearBasis {
    long long base[62];  // 二进制位

    void init() {
        memset(base, 0, sizeof(base));
    }

    void insert(long long x) {
        for (int i = 61; i >= 0; i--) {
            if (!(x >> i)) continue;
            if (!base[i]) {
                base[i] = x;
                return;
            }
            x ^= base[i];
        }
    }

    long long queryMax() {
        long long result = 0;
        for (int i = 61; i >= 0; i--) {
            result = max(result, result ^ base[i]);
        }
        return result;
    }
};

int main() {
    LinearBasis lb;
    lb.init();

    lb.insert(5);
    lb.insert(3);
    lb.insert(7);

    cout << "最大异或和: " << lb.queryMax() << endl;

    return 0;
}
```

## 6.4 高等数学

### 知识点1-2：多项式微分与积分

```cpp
#include<bits/stdc++.h>
using namespace std;

// 多项式求导
vector<double> derivative(vector<double> &poly) {
    int n = poly.size();
    vector<double> result(max(1, n - 1), 0);
    for (int i = 1; i < n; i++) {
        result[i - 1] = i * poly[i];
    }
    return result;
}

// 多项式积分
vector<double> integral(vector<double> &poly) {
    int n = poly.size();
    vector<double> result(n + 1, 0);
    for (int i = 0; i < n; i++) {
        result[i + 1] = poly[i] / (i + 1);
    }
    return result;
}

int main() {
    // f(x) = 3x² + 2x + 1
    vector<double> poly = {1, 2, 3};

    auto deriv = derivative(poly);
    cout << "f'(x) = ";
    for (int i = deriv.size() - 1; i >= 0; i--) {
        if (deriv[i] != 0) {
            if (i > 0) cout << deriv[i] << "x^" << i << " + ";
            else cout << deriv[i];
        }
    }
    cout << endl;  // 6x + 2

    return 0;
}
```

### 知识点3-4：FFT快速傅里叶变换

```cpp
#include<bits/stdc++.h>
using namespace std;

// FFT：O(n log n)多项式乘法
typedef complex<double> cd;

void fft(vector<cd> &a, bool invert) {
    int n = a.size();
    if (n == 1) return;

    vector<cd> a0(n / 2), a1(n / 2);
    for (int i = 0; i < n / 2; i++) {
        a0[i] = a[2 * i];
        a1[i] = a[2 * i + 1];
    }

    fft(a0, invert);
    fft(a1, invert);

    double angle = 2 * acos(-1) / n * (invert ? -1 : 1);
    cd w(1), wn(cos(angle), sin(angle));

    for (int i = 0; i < n / 2; i++) {
        a[i] = a0[i] + w * a1[i];
        a[i + n / 2] = a0[i] - w * a1[i];
        if (invert) {
            a[i] /= 2;
            a[i + n / 2] /= 2;
        }
        w *= wn;
    }
}

vector<int> multiply(vector<int> &a, vector<int> &b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < a.size() + b.size()) n <<= 1;
    fa.resize(n);
    fb.resize(n);

    fft(fa, false);
    fft(fb, false);
    for (int i = 0; i < n; i++) fa[i] *= fb[i];
    fft(fa, true);

    vector<int> result(n);
    for (int i = 0; i < n; i++) {
        result[i] = round(fa[i].real());
    }
    return result;
}

int main() {
    vector<int> a = {1, 2, 3};  // 1 + 2x + 3x²
    vector<int> b = {4, 5};     // 4 + 5x

    auto c = multiply(a, b);

    cout << "多项式乘积: ";
    for (int i = 0; i < a.size() + b.size() - 1; i++) {
        cout << c[i] << " ";
    }
    cout << endl;  // 4 13 22 15

    return 0;
}
```

## 6.5 概率论

### 知识点1-2：概率与期望

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 条件概率：P(A|B) = P(A∩B) / P(B)

    // 贝叶斯公式：P(A|B) = P(B|A) * P(A) / P(B)

    // 期望：E(X) = Σ x * P(X=x)

    // 方差：Var(X) = E(X²) - (E(X))²

    // 线性性质：E(aX+b) = aE(X)+b, Var(aX+b) = a²Var(X)

    cout << "概率论基础" << endl;

    return 0;
}
```

## 6.6 博弈论

### 知识点1：Nim博弈

```cpp
#include<bits/stdc++.h>
using namespace std;

// Nim博弈：多堆石子，每次从一堆取至少1个
// 先手必胜当且仅当所有堆的异或和≠0

int main() {
    int n;
    cin >> n;

    int xorSum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        xorSum ^= x;
    }

    cout << (xorSum != 0 ? "先手必胜" : "先手必败") << endl;

    // 求具体策略
    if (xorSum != 0) {
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;  // 重新读入
            if ((x ^ xorSum) < x) {
                cout << "从第" << i + 1 << "堆取" << x - (x ^ xorSum) << "个" << endl;
                break;
            }
        }
    }

    return 0;
}
```

### 知识点2：SG函数

```cpp
#include<bits/stdc++.h>
using namespace std;

// SG函数（Sprague-Grundy）：处理组合博弈
// SG(x) = mex{SG(y) | y是x的后继}
// 多个博弈的SG值异或和决定胜负

const int MAXN = 1005;
int sg[MAXN];
bool vis[MAXN];

int getSG(int x) {
    if (sg[x] != -1) return sg[x];

    memset(vis, false, sizeof(vis));
    // 枚举所有后继
    // 例：从x可以走到x-1, x-2, ..., 1
    for (int i = 1; i < x; i++) {
        vis[getSG(i)] = true;
    }

    int &ret = sg[x];
    ret = 0;
    while (vis[ret]) ret++;
    return ret;
}

int main() {
    memset(sg, -1, sizeof(sg));
    sg[0] = 0;

    for (int i = 1; i <= 10; i++) {
        cout << "SG(" << i << ") = " << getSG(i) << endl;
    }

    return 0;
}
```

## 6.8 计算几何

### 知识点1-3：凸包

```cpp
#include<bits/stdc++.h>
using namespace std;

// 二维凸包：Graham扫描法
struct Point {
    double x, y;
    bool operator<(const Point &other) const {
        return x < other.x || (x == other.x && y < other.y);
    }
};

double cross(Point O, Point A, Point B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

vector<Point> convexHull(vector<Point> &points) {
    int n = points.size();
    if (n < 3) return points;

    sort(points.begin(), points.end());

    vector<Point> hull;
    for (int i = 0; i < n; i++) {
        while (hull.size() >= 2 &&
               cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) <= 0) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }

    int lowerSize = hull.size();
    for (int i = n - 2; i >= 0; i--) {
        while (hull.size() > lowerSize &&
               cross(hull[hull.size()-2], hull[hull.size()-1], points[i]) <= 0) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }

    hull.pop_back();
    return hull;
}

int main() {
    vector<Point> points = {{0,0},{1,0},{2,1},{1,2},{0,1}};
    auto hull = convexHull(points);

    cout << "凸包: ";
    for (auto &p : hull) {
        cout << "(" << p.x << "," << p.y << ") ";
    }
    cout << endl;

    return 0;
}
```

### 知识点4：半平面交

```cpp
#include<bits/stdc++.h>
using namespace std;

// 半平面交：所有半平面的交集
struct Line {
    Point p, v;  // 点和方向向量
    double angle;
    bool operator<(const Line &other) const {
        return angle < other.angle;
    }
};

Point intersection(Line a, Line b) {
    double t = cross(b.p - a.p, b.v) / cross(a.v, b.v);
    return a.p + a.v * t;
}

int main() {
    cout << "半平面交：O(n log n)" << endl;
    cout << "将所有半平面按极角排序，用双端队列维护" << endl;

    return 0;
}
```

## 6.9 信息论

### 知识点1：熵与互信息

```cpp
#include<bits/stdc++.h>
using namespace std;

// 熵：H(X) = -Σ P(x) * log2(P(x))
// 互信息：I(X;Y) = H(X) + H(Y) - H(X,Y)

double entropy(vector<double> &prob) {
    double H = 0;
    for (double p : prob) {
        if (p > 0) H -= p * log2(p);
    }
    return H;
}

int main() {
    vector<double> p = {0.5, 0.25, 0.25};
    cout << "熵: " << entropy(p) << endl;  // 1.5

    return 0;
}
```

## 6.10 博弈论与最优化

### 知识点1：单纯形法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 单纯形法：求解线性规划问题
// max c^T x, s.t. Ax <= b, x >= 0

int main() {
    cout << "单纯形法：线性规划的标准算法" << endl;
    cout << "时间复杂度：最坏指数级，实际多项式" << endl;

    return 0;
}
```

---

## 📌 备考建议

### NOI 考试重点

| 模块 | 重要度 | 建议学习时长 |
|:---|:---:|:---:|
| 高级数据结构 | ⭐⭐⭐⭐⭐ | 4-6周 |
| 图论算法 | ⭐⭐⭐⭐⭐ | 4-6周 |
| 动态规划 | ⭐⭐⭐⭐⭐ | 4-6周 |
| 字符串算法 | ⭐⭐⭐⭐ | 2-3周 |
| 数学 | ⭐⭐⭐⭐ | 3-4周 |
| 计算几何 | ⭐⭐⭐ | 2-3周 |
| 博弈论 | ⭐⭐⭐ | 1-2周 |
| 信息论 | ⭐⭐ | 1周 |

## 难度系数说明

| 系数 | 含义 | 对应水平 |
|:---:|:---|:---|
| 【7】 | NOI级基础 | CSP-S高水平/省选入门 |
| 【8】 | NOI级中等 | 省选中等水平 |
| 【9】 | NOI级较难 | 省选高水平/NOI入门 |
| 【10】 | NOI级最难 | NOI高水平/IOI级别 |

---

# 📊 三级知识点对比

| 类别 | 入门组(1-5) | 提高级(5-8) | NOI级(7-10) |
|:---|:---|:---|:---|
| **编程** | 基础语法 | 类、STL | OOP思想 |
| **数据结构** | 链表、栈、队列、二叉树 | 并查集、线段树、平衡树 | 树链剖分、LCT、可持久化 |
| **算法** | 排序、搜索、DP基础 | KMP、最短路、强连通 | 网络流、2-SAT、DP优化 |
| **图论** | DFS、BFS、最小生成树 | 拓扑排序、LCA、二分图 | 网络流、匹配、支配集 |
| **数学** | 数论基础、排列组合 | 欧拉函数、容斥原理 | FFT、博弈论、信息论 |
| **字符串** | 字符串处理 | KMP、Manacher | 后缀数组、AC自动机、SAM |

---

> **参考来源**：全国青少年信息学奥林匹克系列竞赛大纲（2025年修订版）
