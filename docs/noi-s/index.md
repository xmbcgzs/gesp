# NOI提高组知识点整理（2025修订版）

> 适用：CSP-S（CCF非专业级别软件能力认证提高组）/ NOIP（全国青少年信息学奥林匹克联赛）  
> 难度系数：5-8（除入门级知识点外）  
> 修订时间：2025年4月  
> 注意：提高级自动包含入门级所有知识点  
> 代码规范：头文件统一使用 `#include<bits/stdc++.h>`，万能头文件

---

## 📋 总览

| 大类 | 子类数 | 难度范围 |
|:---|:---:|:---:|
| 基础知识与编程环境 | 5 | 5 |
| C++程序设计 | 2 | 5-6 |
| 数据结构 | 5 | 5-8 |
| 算法 | 8 | 5-8 |
| 数学与其他 | 4 | 5-8 |

---

# 一、基础知识与编程环境

## 1.1 Linux操作

### 知识点1：文件与目录操作

```bash
# 常用文件操作命令
ls -la          # 列出所有文件（含隐藏文件）及详细信息
cd /path        # 切换目录
pwd             # 显示当前目录
mkdir -p a/b/c  # 递归创建目录
rm -rf dir      # 强制递归删除目录
cp -r src dst   # 递归复制目录
mv src dst      # 移动/重命名文件
cat file        # 显示文件内容
head -n 20 file # 显示前20行
tail -n 20 file # 显示后20行
wc -l file      # 统计行数
grep "pattern" file  # 搜索文本
chmod 755 file  # 修改文件权限
```

### 知识点2：文本编辑工具

```bash
# vim基本操作
vim file.txt
# 按i进入插入模式，ESC退出，:wq保存退出，:q!不保存退出
# dd删除行，yy复制行，p粘贴，/pattern搜索

# nano（更简单）
nano file.txt
# Ctrl+O保存，Ctrl+X退出

# 在竞赛中，通常使用vim或nano编辑代码
```

### 知识点3：g++编译命令

```bash
# 基本编译
g++ -o program program.cpp

# 开启优化（竞赛必用）
g++ -O2 -o program program.cpp

# 开启调试信息
g++ -O2 -g -o program program.cpp

# 指定C++标准
g++ -std=c++17 -O2 -o program program.cpp

# 开启所有警告
g++ -Wall -Wextra -O2 -o program program.cpp

# 警告视为错误
g++ -Wall -Wextra -Werror -O2 -o program program.cpp

# 竞赛常用组合
g++ -O2 -std=c++17 -o program program.cpp
```

### 知识点4：time命令

```bash
# 查看程序运行时间
time ./program

# 输出三个时间：
# real：实际运行时间（墙钟时间）
# user：用户态CPU时间
# sys：内核态CPU时间

# 竞赛中常用 time 命令测试程序效率
# 如果 real 超过时限（通常1-2秒），需要优化算法
```

### 知识点5：GDB调试

```bash
# 编译时加上调试信息
g++ -g -o program program.cpp

# 启动GDB
gdb ./program

# 常用GDB命令
(gdb) break main      # 在main函数设断点
(gdb) break 10        # 在第10行设断点
(gdb) run             # 运行程序
(gdb) next            # 单步执行（不进入函数）
(gdb) step            # 单步执行（进入函数）
(gdb) continue        # 继续执行到下一个断点
(gdb) print variable  # 打印变量值
(gdb) backtrace       # 显示调用栈
(gdb) info locals     # 显示所有局部变量
(gdb) quit            # 退出GDB
```

---

# 二、C++程序设计

## 2.1 类（class）

### 知识点1：类的概念及简单应用

```cpp
#include<bits/stdc++.h>
using namespace std;

class Point {
private:
    double x, y;  // 私有成员

public:
    // 构造函数
    Point(double x = 0, double y = 0) : x(x), y(y) {}

    // 析构函数
    ~Point() {}

    // 成员函数
    double getX() const { return x; }
    double getY() const { return y; }

    void setX(double x) { this->x = x; }
    void setY(double y) { this->y = y; }

    // 计算到原点的距离
    double distanceToOrigin() const {
        return sqrt(x * x + y * y);
    }

    // 计算两点距离
    double distanceTo(const Point &other) const {
        return sqrt(pow(x - other.x, 2) + pow(y - other.y, 2));
    }

    // 打印
    void print() const {
        cout << "(" << x << ", " << y << ")" << endl;
    }
};

int main() {
    Point p1(3, 4);
    Point p2(0, 0);

    p1.print();  // (3, 4)
    cout << "到原点距离: " << p1.distanceToOrigin() << endl;  // 5
    cout << "两点距离: " << p1.distanceTo(p2) << endl;  // 5

    return 0;
}
```

### 知识点2：运算符重载

```cpp
#include<bits/stdc++.h>
using namespace std;

class Complex {
private:
    double real, imag;
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}

    // 重载+运算符
    Complex operator+(const Complex &other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    // 重载-运算符
    Complex operator-(const Complex &other) const {
        return Complex(real - other.real, imag - other.imag);
    }

    // 重载*运算符
    Complex operator*(const Complex &other) const {
        return Complex(real * other.real - imag * other.imag,
                       real * other.imag + imag * other.real);
    }

    // 重载==运算符
    bool operator==(const Complex &other) const {
        return real == other.real && imag == other.imag;
    }

    // 重载<<输出运算符（友元函数）
    friend ostream& operator<<(ostream &out, const Complex &c) {
        out << c.real;
        if (c.imag >= 0) out << "+";
        out << c.imag << "i";
        return out;
    }

    // 重载<运算符（用于排序）
    bool operator<(const Complex &other) const {
        if (real != other.real) return real < other.real;
        return imag < other.imag;
    }
};

int main() {
    Complex a(1, 2), b(3, 4);

    cout << "a + b = " << (a + b) << endl;  // 4+6i
    cout << "a - b = " << (a - b) << endl;  // -2-2i
    cout << "a * b = " << (a * b) << endl;  // -5+10i

    return 0;
}
```

## 2.2 STL模板

### 知识点1：容器和迭代器

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 迭代器是访问容器元素的通用方式
    vector<int> v = {1, 2, 3, 4, 5};

    // 正向迭代器
    for (vector<int>::iterator it = v.begin(); it != v.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    // 反向迭代器
    for (auto it = v.rbegin(); it != v.rend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;  // 5 4 3 2 1

    // const迭代器（只读）
    for (auto it = v.cbegin(); it != v.cend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    return 0;
}
```

### 知识点2：pair和tuple

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // pair：存储两个不同类型的值
    pair<int, string> p1 = {1, "apple"};
    cout << p1.first << " " << p1.second << endl;  // 1 apple

    // make_pair简化创建
    auto p2 = make_pair(2, "banana");
    cout << p2.first << " " << p2.second << endl;

    // pair默认按first排序，first相同则按second排序
    vector<pair<int,int>> v = {{3,1}, {1,2}, {2,3}};
    sort(v.begin(), v.end());
    for (auto &p : v) {
        cout << "(" << p.first << "," << p.second << ") ";
    }
    cout << endl;  // (1,2) (2,3) (3,1)

    // tuple：存储多个不同类型的值
    tuple<int, string, double> t(1, "hello", 3.14);
    cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << endl;

    // 结构化绑定（C++17）
    auto [id, name, score] = t;
    cout << id << " " << name << " " << score << endl;

    return 0;
}
```

### 知识点3：set和multiset

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // set：有序集合（自动去重）
    set<int> s;
    s.insert(3);
    s.insert(1);
    s.insert(4);
    s.insert(1);  // 重复，不插入
    s.insert(2);

    cout << "set大小: " << s.size() << endl;  // 4

    // 查找
    if (s.find(3) != s.end()) {
        cout << "3存在" << endl;
    }

    // 删除
    s.erase(2);

    // 遍历（自动升序）
    for (int x : s) cout << x << " ";  // 1 3 4
    cout << endl;

    // lower_bound / upper_bound
    auto it = s.lower_bound(3);  // >=3的第一个迭代器
    cout << "lower_bound(3): " << *it << endl;  // 3

    // multiset：允许重复元素
    multiset<int> ms;
    ms.insert(3);
    ms.insert(3);
    ms.insert(3);
    cout << "multiset中3的个数: " << ms.count(3) << endl;  // 3

    return 0;
}
```

### 知识点4：deque和priority_queue

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // deque：双端队列（两端都能O(1)插入删除）
    deque<int> dq;
    dq.push_back(1);
    dq.push_back(2);
    dq.push_front(0);
    dq.push_front(-1);

    for (int x : dq) cout << x << " ";  // -1 0 1 2
    cout << endl;

    cout << "front: " << dq.front() << endl;  // -1
    cout << "back: " << dq.back() << endl;    // 2

    dq.pop_front();
    dq.pop_back();
    for (int x : dq) cout << x << " ";  // 0 1
    cout << endl;

    // priority_queue：优先队列（堆）
    // 大根堆（默认）
    priority_queue<int> maxpq;
    maxpq.push(3);
    maxpq.push(1);
    maxpq.push(4);
    cout << "大根堆顶: " << maxpq.top() << endl;  // 4

    // 小根堆
    priority_queue<int, vector<int>, greater<int>> minpq;
    minpq.push(3);
    minpq.push(1);
    minpq.push(4);
    cout << "小根堆顶: " << minpq.top() << endl;  // 1

    // 自定义排序的优先队列
    // 按second从小到大
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push({3, 1});
    pq.push({1, 2});
    pq.push({2, 3});
    cout << "自定义堆顶: " << pq.top().first << " " << pq.top().second << endl;  // 1 2

    return 0;
}
```

### 知识点5：map和multimap

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // map：有序键值对（自动按key排序）
    map<string, int> mp;
    mp["apple"] = 3;
    mp["banana"] = 5;
    mp["cherry"] = 2;

    // 访问
    cout << "apple: " << mp["apple"] << endl;

    // 查找
    if (mp.count("banana")) {
        cout << "banana存在" << endl;
    }

    // 遍历（按key升序）
    for (auto &[key, value] : mp) {
        cout << key << ": " << value << endl;
    }

    // 删除
    mp.erase("cherry");

    // map查找
    auto it = mp.find("apple");
    if (it != mp.end()) {
        cout << "找到: " << it->first << " = " << it->second << endl;
    }

    // multimap：允许重复key
    multimap<int, string> mmp;
    mmp.insert({1, "a"});
    mmp.insert({1, "b"});
    mmp.insert({2, "c"});
    cout << "key=1的个数: " << mmp.count(1) << endl;  // 2

    return 0;
}
```

### 知识点6：bitset

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // bitset：位集合，高效存储和操作位
    bitset<8> b1(42);  // 00101010
    cout << b1 << endl;

    bitset<8> b2("11001100");
    cout << b2 << endl;

    // 位操作
    bitset<8> a("11110000");
    bitset<8> b("10101010");

    cout << "a & b = " << (a & b) << endl;  // 10100000
    cout << "a | b = " << (a | b) << endl;  // 11111010
    cout << "a ^ b = " << (a ^ b) << endl;  // 01011010
    cout << "~a = " << (~a) << endl;         // 00001111
    cout << "a << 2 = " << (a << 2) << endl; // 11000000
    cout << "a >> 2 = " << (a >> 2) << endl; // 00111100

    // 统计1的个数
    cout << "a中1的个数: " << a.count() << endl;  // 4

    // 翻转指定位
    b1.flip(0);  // 翻转第0位

    return 0;
}
```

### 知识点7：算法模板库常用函数

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 排序
    vector<int> v = {3, 1, 4, 1, 5, 9};
    sort(v.begin(), v.end());  // 升序
    sort(v.begin(), v.end(), greater<int>());  // 降序

    // 二分查找（需有序）
    auto it1 = lower_bound(v.begin(), v.end(), 4);  // >=4
    auto it2 = upper_bound(v.begin(), v.end(), 4);  // >4
    cout << "lower_bound(4): " << *it1 << endl;
    cout << "upper_bound(4): " << *it2 << endl;
    cout << "4的个数: " << (it2 - it1) << endl;

    // 全排列
    vector<int> p = {1, 2, 3};
    do {
        for (int x : p) cout << x << " ";
        cout << endl;
    } while (next_permutation(p.begin(), p.end()));

    // 前缀和
    vector<int> a = {1, 2, 3, 4, 5};
    partial_sum(a.begin(), a.end(), a.begin());
    // a = {1, 3, 6, 10, 15}

    // 去重（需先排序）
    vector<int> b = {1, 1, 2, 2, 3};
    auto last = unique(b.begin(), b.end());
    b.erase(last, b.end());  // b = {1, 2, 3}

    // 累加
    vector<int> c = {1, 2, 3, 4, 5};
    int sum = accumulate(c.begin(), c.end(), 0);
    cout << "累加和: " << sum << endl;  // 15

    return 0;
}
```


---

# 三、数据结构

## 3.1 线性结构

### 知识点1：双端栈

```cpp
#include<bits/stdc++.h>
using namespace std;

// 双端栈：两端都能操作的栈
template<typename T>
class DoubleEndedStack {
private:
    vector<T> data;
public:
    void pushTop(T val) { data.push_back(val); }
    void pushBottom(T val) { data.insert(data.begin(), val); }
    T popTop() { T val = data.back(); data.pop_back(); return val; }
    T popBottom() { T val = data.front(); data.erase(data.begin()); return val; }
    bool empty() { return data.empty(); }
    int size() { return data.size(); }
    T top() { return data.back(); }
    T bottom() { return data.front(); }
};

int main() {
    DoubleEndedStack<int> ds;
    ds.pushTop(1);
    ds.pushTop(2);
    ds.pushBottom(0);

    cout << "top: " << ds.top() << endl;     // 2
    cout << "bottom: " << ds.bottom() << endl;  // 0

    return 0;
}
```

### 知识点2：双端队列

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // deque：两端都能O(1)插入删除
    deque<int> dq;

    // 操作
    dq.push_back(1);    // 尾部插入
    dq.push_front(0);   // 头部插入
    dq.push_back(2);
    dq.push_front(-1);

    // 访问
    cout << "front: " << dq.front() << endl;  // -1
    cout << "back: " << dq.back() << endl;    // 2
    cout << "dq[1]: " << dq[1] << endl;       // 0

    // 删除
    dq.pop_front();  // 删除头部
    dq.pop_back();   // 删除尾部

    // 遍历
    for (int x : dq) cout << x << " ";  // 0 1
    cout << endl;

    return 0;
}
```

### 知识点3：单调队列

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 单调队列：维护滑动窗口的最值
    // 例：求滑动窗口最大值
    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    deque<int> dq;  // 存储下标，对应值单调递减

    for (int i = 0; i < n; i++) {
        // 移除超出窗口的元素
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }

        // 保持单调性（移除比当前值小的元素）
        while (!dq.empty() && a[dq.back()] <= a[i]) {
            dq.pop_back();
        }

        dq.push_back(i);

        // 输出当前窗口的最大值
        if (i >= k - 1) {
            cout << a[dq.front()] << " ";
        }
    }
    cout << endl;

    return 0;
}
```

### 知识点4：优先队列（堆）

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 优先队列本质是堆
    // 大根堆：每次取最大值
    priority_queue<int> maxpq;

    // 小根堆：每次取最小值
    priority_queue<int, vector<int>, greater<int>> minpq;

    // 自定义比较函数
    struct Compare {
        bool operator()(int a, int b) {
            return a > b;  // 小根堆
        }
    };
    priority_queue<int, vector<int>, Compare> customPQ;

    // 堆的基本操作
    // push: O(log n)
    // pop: O(log n)
    // top: O(1)

    // 例：求第k大元素
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int k = 3;

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int x : arr) {
        pq.push(x);
        if (pq.size() > k) pq.pop();
    }
    cout << "第" << k << "大元素: " << pq.top() << endl;  // 5

    return 0;
}
```

### 知识点5：ST表（Sparse Table）

```cpp
#include<bits/stdc++.h>
using namespace std;

// ST表：O(1)查询区间最值（不支持修改）
const int MAXN = 100005;
const int LOG = 17;
int st[MAXN][LOG];  // st[i][j] = [i, i+2^j-1]的最大值
int a[MAXN];

void build(int n) {
    // 初始化
    for (int i = 1; i <= n; i++) {
        st[i][0] = a[i];
    }

    // 倍增构建
    for (int j = 1; (1 << j) <= n; j++) {
        for (int i = 1; i + (1 << j) - 1 <= n; i++) {
            st[i][j] = max(st[i][j-1], st[i + (1 << (j-1))][j-1]);
        }
    }
}

// 查询区间[l, r]的最大值
int query(int l, int r) {
    int k = __lg(r - l + 1);  // 2^k <= r-l+1
    return max(st[l][k], st[r - (1 << k) + 1][k]);
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> a[i];

    build(n);

    while (m--) {
        int l, r;
        cin >> l >> r;
        cout << query(l, r) << endl;
    }

    return 0;
}
```

## 3.2 集合与森林

### 知识点1：并查集

```cpp
#include<bits/stdc++.h>
using namespace std;

// 并查集：高效处理集合合并和查询
class UnionFind {
private:
    vector<int> parent, rank_;
public:
    UnionFind(int n) : parent(n + 1), rank_(n + 1, 0) {
        for (int i = 1; i <= n; i++) {
            parent[i] = i;  // 初始时每个元素是自己的根
        }
    }

    // 查找根节点（带路径压缩）
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // 路径压缩
        }
        return parent[x];
    }

    // 合并两个集合（按秩合并）
    void unite(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx == ry) return;  // 已在同一集合

        if (rank_[rx] < rank_[ry]) {
            parent[rx] = ry;
        } else if (rank_[rx] > rank_[ry]) {
            parent[ry] = rx;
        } else {
            parent[ry] = rx;
            rank_[rx]++;
        }
    }

    // 查询是否在同一集合
    bool same(int x, int y) {
        return find(x) == find(y);
    }
};

int main() {
    int n, m;
    cin >> n >> m;

    UnionFind uf(n);

    while (m--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) {
            uf.unite(x, y);
        } else {
            cout << (uf.same(x, y) ? "Y" : "N") << endl;
        }
    }

    return 0;
}
```

### 知识点2：树的孩子兄弟表示法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 孩子兄弟表示法：每个节点存第一个孩子和下一个兄弟
struct Node {
    int data;
    int firstChild;   // 第一个孩子
    int nextSibling;  // 下一个兄弟
};

vector<Node> tree;

// 将普通树转为二叉树表示
void addChild(int parent, int child) {
    if (tree[parent].firstChild == -1) {
        tree[parent].firstChild = child;
    } else {
        int sib = tree[parent].firstChild;
        while (tree[sib].nextSibling != -1) {
            sib = tree[sib].nextSibling;
        }
        tree[sib].nextSibling = child;
    }
}

int main() {
    int n;
    cin >> n;
    tree.resize(n + 1);

    for (int i = 1; i <= n; i++) {
        tree[i].data = i;
        tree[i].firstChild = -1;
        tree[i].nextSibling = -1;
    }

    // 读入边并构建
    for (int i = 0; i < n - 1; i++) {
        int p, c;
        cin >> p >> c;
        addChild(p, c);
    }

    return 0;
}
```

## 3.3 特殊树

### 知识点1：二叉堆

```cpp
#include<bits/stdc++.h>
using namespace std;

// 手动实现二叉堆
class BinaryHeap {
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

    int top() {
        return heap[0];
    }

    void pop() {
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) siftDown(0);
    }

    bool empty() {
        return heap.empty();
    }

    int size() {
        return heap.size();
    }
};

int main() {
    BinaryHeap minHeap;
    minHeap.push(5);
    minHeap.push(3);
    minHeap.push(7);
    minHeap.push(1);

    while (!minHeap.empty()) {
        cout << minHeap.top() << " ";
        minHeap.pop();
    }
    cout << endl;  // 1 3 5 7

    return 0;
}
```

### 知识点2：树状数组

```cpp
#include<bits/stdc++.h>
using namespace std;

// 树状数组：高效处理单点修改和区间查询
const int MAXN = 100005;
int tree[MAXN];
int n;

// 低位函数
int lowbit(int x) {
    return x & (-x);
}

// 单点修改
void update(int i, int val) {
    for (; i <= n; i += lowbit(i)) {
        tree[i] += val;
    }
}

// 前缀和查询
int query(int i) {
    int sum = 0;
    for (; i > 0; i -= lowbit(i)) {
        sum += tree[i];
    }
    return sum;
}

// 区间查询
int rangeQuery(int l, int r) {
    return query(r) - query(l - 1);
}

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        update(i, x);
    }

    // 查询[1, 5]的和
    cout << "前5项和: " << query(5) << endl;

    // 修改第3个元素
    update(3, 5);

    cout << "修改后前5项和: " << query(5) << endl;

    return 0;
}
```

### 知识点3：线段树

```cpp
#include<bits/stdc++.h>
using namespace std;

// 线段树：支持区间查询和区间修改
const int MAXN = 100005;
struct SegmentTree {
    int val, lazy;
} tree[MAXN * 4];
int a[MAXN];

// 向上更新
void pushUp(int node) {
    tree[node].val = tree[node*2].val + tree[node*2+1].val;
}

// 向下传递懒标记
void pushDown(int node, int l, int r) {
    if (tree[node].lazy) {
        int mid = (l + r) / 2;
        tree[node*2].val += tree[node].lazy * (mid - l + 1);
        tree[node*2].lazy += tree[node].lazy;
        tree[node*2+1].val += tree[node].lazy * (r - mid);
        tree[node*2+1].lazy += tree[node].lazy;
        tree[node].lazy = 0;
    }
}

// 建树
void build(int node, int l, int r) {
    tree[node].lazy = 0;
    if (l == r) {
        tree[node].val = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(node*2, l, mid);
    build(node*2+1, mid+1, r);
    pushUp(node);
}

// 区间修改：[ql, qr]每个元素加val
void update(int node, int l, int r, int ql, int qr, int val) {
    if (ql <= l && r <= qr) {
        tree[node].val += val * (r - l + 1);
        tree[node].lazy += val;
        return;
    }
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    if (ql <= mid) update(node*2, l, mid, ql, qr, val);
    if (qr > mid) update(node*2+1, mid+1, r, ql, qr, val);
    pushUp(node);
}

// 区间查询
int query(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) {
        return tree[node].val;
    }
    pushDown(node, l, r);
    int mid = (l + r) / 2;
    int sum = 0;
    if (ql <= mid) sum += query(node*2, l, mid, ql, qr);
    if (qr > mid) sum += query(node*2+1, mid+1, r, ql, qr);
    return sum;
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> a[i];

    build(1, 1, n);

    while (m--) {
        int op, l, r, val;
        cin >> op >> l >> r;
        if (op == 1) {
            cin >> val;
            update(1, 1, n, l, r, val);
        } else {
            cout << query(1, 1, n, l, r) << endl;
        }
    }

    return 0;
}
```

### 知识点4：字典树（Trie）

```cpp
#include<bits/stdc++.h>
using namespace std;

struct TrieNode {
    int child[26];
    int cnt;  // 以该节点结尾的单词数
    TrieNode() : cnt(0) {
        memset(child, -1, sizeof(child));
    }
};

vector<TrieNode> trie;

void insert(const string &s) {
    int cur = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (trie[cur].child[idx] == -1) {
            trie[cur].child[idx] = trie.size();
            trie.emplace_back();
        }
        cur = trie[cur].child[idx];
    }
    trie[cur].cnt++;
}

int search(const string &s) {
    int cur = 0;
    for (char c : s) {
        int idx = c - 'a';
        if (trie[cur].child[idx] == -1) return 0;
        cur = trie[cur].child[idx];
    }
    return trie[cur].cnt;
}

int main() {
    trie.emplace_back();  // 根节点

    int n, m;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        insert(s);
    }

    cin >> m;
    for (int i = 0; i < m; i++) {
        string s;
        cin >> s;
        cout << search(s) << endl;
    }

    return 0;
}
```

### 知识点5：笛卡尔树

```cpp
#include<bits/stdc++.h>
using namespace std;

// 笛卡尔树：中序遍历=原序列，堆性质（小根堆/大根堆）
struct Node {
    int val, idx;
    int left, right;
};

vector<Node> cartesianTree(vector<int> &a) {
    int n = a.size();
    vector<int> parent(n, -1);
    vector<int> stack;

    for (int i = 0; i < n; i++) {
        int last = -1;
        while (!stack.empty() && a[stack.back()] > a[i]) {
            last = stack.back();
            stack.pop_back();
        }

        if (!stack.empty()) {
            parent[i] = stack.back();
            // i成为stack.back()的右子节点
        }

        if (last != -1) {
            parent[last] = i;
            // last成为i的左子节点
        }

        stack.push_back(i);
    }

    // 找根节点
    int root = -1;
    for (int i = 0; i < n; i++) {
        if (parent[i] == -1) root = i;
    }

    vector<Node> nodes(n);
    for (int i = 0; i < n; i++) {
        nodes[i] = {a[i], i, -1, -1};
    }

    for (int i = 0; i < n; i++) {
        if (parent[i] != -1) {
            if (nodes[parent[i]].left == -1) {
                nodes[parent[i]].left = i;
            } else {
                nodes[parent[i]].right = i;
            }
        }
    }

    return nodes;
}

int main() {
    vector<int> a = {3, 2, 6, 1, 5};
    auto nodes = cartesianTree(a);

    cout << "笛卡尔树构建完成" << endl;

    return 0;
}
```

### 知识点6：平衡树（Treap示例）

```cpp
#include<bits/stdc++.h>
using namespace std;

// Treap：二叉搜索树 + 堆性质（随机优先级）
struct TreapNode {
    int val, priority;
    TreapNode *left, *right;
    int size;  // 子树大小

    TreapNode(int v) : val(v), priority(rand()), left(nullptr),
                       right(nullptr), size(1) {}
};

int getSize(TreapNode* node) {
    return node ? node->size : 0;
}

void updateSize(TreapNode* node) {
    if (node) node->size = 1 + getSize(node->left) + getSize(node->right);
}

// 右旋
TreapNode* rotateRight(TreapNode* root) {
    TreapNode* newRoot = root->left;
    root->left = newRoot->right;
    newRoot->right = root;
    updateSize(root);
    updateSize(newRoot);
    return newRoot;
}

// 左旋
TreapNode* rotateLeft(TreapNode* root) {
    TreapNode* newRoot = root->right;
    root->right = newRoot->left;
    newRoot->left = root;
    updateSize(root);
    updateSize(newRoot);
    return newRoot;
}

// 插入
TreapNode* insert(TreapNode* root, int val) {
    if (!root) return new TreapNode(val);

    if (val < root->val) {
        root->left = insert(root->left, val);
        if (root->left->priority > root->priority) {
            root = rotateRight(root);
        }
    } else {
        root->right = insert(root->right, val);
        if (root->right->priority > root->priority) {
            root = rotateLeft(root);
        }
    }

    updateSize(root);
    return root;
}

// 删除
TreapNode* erase(TreapNode* root, int val) {
    if (!root) return nullptr;

    if (val < root->val) {
        root->left = erase(root->left, val);
    } else if (val > root->val) {
        root->right = erase(root->right, val);
    } else {
        // 找到目标节点
        if (!root->left) return root->right;
        if (!root->right) return root->left;

        if (root->left->priority > root->right->priority) {
            root = rotateRight(root);
            root->right = erase(root->right, val);
        } else {
            root = rotateLeft(root);
            root->left = erase(root->left, val);
        }
    }

    updateSize(root);
    return root;
}

// 中序遍历
void inorder(TreapNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    TreapNode* root = nullptr;
    int arr[] = {5, 3, 7, 1, 4, 6, 8};

    for (int x : arr) {
        root = insert(root, x);
    }

    cout << "中序遍历: ";
    inorder(root);  // 1 3 4 5 6 7 8
    cout << endl;

    root = erase(root, 3);
    cout << "删除3后: ";
    inorder(root);  // 1 4 5 6 7 8
    cout << endl;

    return 0;
}
```

## 3.4 常见图

### 知识点1：稀疏图

```cpp
#include<bits/stdc++.h>
using namespace std;

// 稀疏图：边数远少于n²的图，适合用邻接表存储
int main() {
    int n, m;
    cin >> n >> m;

    vector<vector<pair<int,int>>> adj(n + 1);  // 邻接表

    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }

    // 遍历
    for (int u = 1; u <= n; u++) {
        cout << u << ": ";
        for (auto &[v, w] : adj[u]) {
            cout << "(" << v << "," << w << ") ";
        }
        cout << endl;
    }

    return 0;
}
```

### 知识点2：二分图

```cpp
#include<bits/stdc++.h>
using namespace std;

vector<int> adj[100001];
int color[100001];

// 判断二分图（BFS染色）
bool isBipartite(int n) {
    memset(color, -1, sizeof(color));

    for (int i = 1; i <= n; i++) {
        if (color[i] != -1) continue;

        queue<int> q;
        q.push(i);
        color[i] = 0;

        while (!q.empty()) {
            int u = q.front();
            q.pop();

            for (int v : adj[u]) {
                if (color[v] == -1) {
                    color[v] = 1 - color[u];
                    q.push(v);
                } else if (color[v] == color[u]) {
                    return false;  // 有奇数环，不是二分图
                }
            }
        }
    }

    return true;
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    cout << (isBipartite(n) ? "是二分图" : "不是二分图") << endl;

    return 0;
}
```

### 知识点3：欧拉图

```cpp
#include<bits/stdc++.h>
using namespace std;

// 欧拉回路：经过每条边恰好一次且回到起点
// 欧拉道路：经过每条边恰好一次但不一定回到起点

vector<int> adj[100001];
vector<int> circuit;
bool used[100001];

void euler(int u) {
    while (!adj[u].empty()) {
        int v = adj[u].back();
        adj[u].pop_back();
        // 删除反向边
        for (auto it = adj[v].begin(); it != adj[v].end(); it++) {
            if (*it == u) {
                adj[v].erase(it);
                break;
            }
        }
        euler(v);
    }
    circuit.push_back(u);
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    euler(1);

    cout << "欧拉回路: ";
    for (int i = circuit.size() - 1; i >= 0; i--) {
        cout << circuit[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### 知识点4：有向无环图（DAG）

```cpp
#include<bits/stdc++.h>
using namespace std;

// DAG：有向无环图
// 拓扑排序：DAG的线性排序
vector<int> adj[100001];
int inDegree[100001];

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        inDegree[v]++;
    }

    // 拓扑排序（Kahn算法）
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }

    vector<int> topo;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topo.push_back(u);

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) q.push(v);
        }
    }

    if (topo.size() == n) {
        cout << "拓扑排序: ";
        for (int x : topo) cout << x << " ";
        cout << endl;
    } else {
        cout << "存在环" << endl;
    }

    return 0;
}
```

### 知识点5：连通图与强连通图

```cpp
#include<bits/stdc++.h>
using namespace std;

// 强连通分量：Tarjan算法
vector<int> adj[100001];
int dfn[100001], low[100001], idx;
int stack_[100001], top_;
bool inStack[100001];
int scc[100001], sccCnt;

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
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }

    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) tarjan(i);
    }

    cout << "强连通分量个数: " << sccCnt << endl;

    return 0;
}
```

### 知识点6：双连通图

```cpp
#include<bits/stdc++.h>
using namespace std;

// 割点和割边（桥）
vector<int> adj[100001];
int dfn[100001], low[100001], idx;
bool isCut[100001];

void tarjan(int u, int parent) {
    dfn[u] = low[u] = ++idx;
    int child = 0;

    for (int v : adj[u]) {
        if (!dfn[v]) {
            child++;
            tarjan(v, u);
            low[u] = min(low[u], low[v]);

            // 割点判定
            if (parent == -1 && child > 1) isCut[u] = true;
            if (parent != -1 && low[v] >= dfn[u]) isCut[u] = true;
        } else if (v != parent) {
            low[u] = min(low[u], dfn[v]);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) tarjan(i, -1);
    }

    cout << "割点: ";
    for (int i = 1; i <= n; i++) {
        if (isCut[i]) cout << i << " ";
    }
    cout << endl;

    return 0;
}
```

## 3.5 哈希表

### 知识点1：数值哈希函数构造

```cpp
#include<bits/stdc++.h>
using namespace std;

// 常用哈希函数
// 1. 直接定址法：H(key) = key
// 2. 除留余数法：H(key) = key % p
// 3. 平方取中法：取key²的中间几位
// 4. 折叠法：将key分成等长部分相加

int hashFunc(int key, int p) {
    return key % p;
}

int main() {
    int keys[] = {12, 45, 67, 89, 23, 56};
    int p = 11;  // 素数作为模数

    for (int key : keys) {
        cout << "hash(" << key << ") = " << hashFunc(key, p) << endl;
    }

    return 0;
}
```

### 知识点2：字符串哈希函数构造

```cpp
#include<bits/stdc++.h>
using namespace std;

// 多项式哈希：H(s) = s[0]*p^(n-1) + s[1]*p^(n-2) + ... + s[n-1]
// 用于快速计算子串哈希
const int MAXN = 100005;
const int P = 131;  // 素数底数
const int MOD = 1e9 + 7;

long long power[MAXN], hashVal[MAXN];

void initHash(const string &s) {
    int n = s.length();
    power[0] = 1;
    for (int i = 1; i <= n; i++) {
        power[i] = power[i-1] * P % MOD;
    }
    hashVal[0] = 0;
    for (int i = 0; i < n; i++) {
        hashVal[i+1] = (hashVal[i] * P + s[i]) % MOD;
    }
}

// 查询子串[l, r]的哈希值（0-indexed）
long long getHash(int l, int r) {
    return (hashVal[r+1] - hashVal[l] * power[r-l+1] % MOD + MOD * 2) % MOD;
}

int main() {
    string s = "abcdef";
    initHash(s);

    cout << "ab的哈希: " << getHash(0, 1) << endl;
    cout << "cd的哈希: " << getHash(2, 3) << endl;

    return 0;
}
```

### 知识点3：哈希冲突处理

```cpp
#include<bits/stdc++.h>
using namespace std;

// 拉链法：每个桶存一个链表
class HashChain {
private:
    vector<list<int>> table;
    int size;

    int hash(int key) {
        return abs(key) % size;
    }

public:
    HashChain(int s) : size(s), table(s) {}

    void insert(int key) {
        int idx = hash(key);
        table[idx].push_back(key);
    }

    bool search(int key) {
        int idx = hash(key);
        for (int x : table[idx]) {
            if (x == key) return true;
        }
        return false;
    }

    void remove(int key) {
        int idx = hash(key);
        table[idx].remove(key);
    }
};

// 开放寻址法：冲突时找下一个空位
class HashOpen {
private:
    vector<int> table;
    vector<bool> occupied;
    int size;

    int hash(int key) {
        return abs(key) % size;
    }

public:
    HashOpen(int s) : size(s), table(s, 0), occupied(s, false) {}

    void insert(int key) {
        int idx = hash(key);
        while (occupied[idx]) {
            idx = (idx + 1) % size;  // 线性探测
        }
        table[idx] = key;
        occupied[idx] = true;
    }

    bool search(int key) {
        int idx = hash(key);
        int start = idx;
        while (occupied[idx]) {
            if (table[idx] == key) return true;
            idx = (idx + 1) % size;
            if (idx == start) break;
        }
        return false;
    }
};

int main() {
    HashChain hc(10);
    hc.insert(5);
    hc.insert(15);
    hc.insert(25);

    cout << "查找15: " << (hc.search(15) ? "找到" : "未找到") << endl;

    return 0;
}
```


---

# 四、算法

## 4.1 复杂度分析

### 知识点1：时间复杂度分析

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 常见复杂度及示例
    // O(1)：常数操作
    int a = 1, b = 2;
    int c = a + b;

    // O(log n)：二分
    int n = 1000;
    int lo = 1, hi = n;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (mid * mid < n) lo = mid + 1;
        else hi = mid;
    }

    // O(n)：线性扫描
    for (int i = 0; i < n; i++) {
        // ...
    }

    // O(n log n)：归并排序
    // O(n²)：冒泡排序
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            // ...
        }
    }

    // O(2^n)：子集枚举
    // O(n!)：全排列

    cout << "复杂度分析完成" << endl;

    return 0;
}
```

### 知识点2：空间复杂度分析

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // O(1)：只用常数个变量
    int a = 1, b = 2, c = 3;

    // O(n)：一维数组
    int arr[1000];

    // O(n²)：二维数组
    int mat[100][100];

    // O(log n)：递归（二分）
    // O(n)：递归（线性）

    cout << "空间复杂度分析完成" << endl;

    return 0;
}
```

## 4.2 算法策略

### 知识点1：离散化

```cpp
#include<bits/stdc++.h>
using namespace std;

// 离散化：将大范围数值映射到小范围
vector<int> discretize(vector<int> &a) {
    vector<int> sorted_a = a;
    sort(sorted_a.begin(), sorted_a.end());
    sorted_a.erase(unique(sorted_a.begin(), sorted_a.end()), sorted_a.end());

    for (int &x : a) {
        x = lower_bound(sorted_a.begin(), sorted_a.end(), x) - sorted_a.begin() + 1;
    }

    return sorted_a;
}

int main() {
    vector<int> a = {1000000, 5, 1000000, 3, 5, 7};

    cout << "原数组: ";
    for (int x : a) cout << x << " ";
    cout << endl;

    auto mapping = discretize(a);

    cout << "离散化后: ";
    for (int x : a) cout << x << " ";
    cout << endl;

    cout << "映射关系: ";
    for (int i = 0; i < mapping.size(); i++) {
        cout << mapping[i] << "->" << i + 1 << " ";
    }
    cout << endl;

    return 0;
}
```

### 知识点2：扫描线

```cpp
#include<bits/stdc++.h>
using namespace std;

// 扫描线：处理区间覆盖问题
// 例：区间合并
vector<pair<int,int>> mergeIntervals(vector<pair<int,int>> &intervals) {
    sort(intervals.begin(), intervals.end());

    vector<pair<int,int>> merged;
    for (auto &interval : intervals) {
        if (merged.empty() || merged.back().second < interval.first) {
            merged.push_back(interval);
        } else {
            merged.back().second = max(merged.back().second, interval.second);
        }
    }

    return merged;
}

int main() {
    vector<pair<int,int>> intervals = {{1,3}, {2,4}, {5,7}, {6,8}};

    auto merged = mergeIntervals(intervals);

    cout << "合并后: ";
    for (auto &p : merged) {
        cout << "[" << p.first << "," << p.second << "] ";
    }
    cout << endl;  // [1,4] [5,8]

    return 0;
}
```

## 4.3 基础算法

### 知识点1：分治算法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 分治算法：将问题分解为子问题，递归求解，合并结果
// 例：归并排序
void mergeSort(vector<int> &a, int l, int r) {
    if (l >= r) return;

    int mid = (l + r) / 2;
    mergeSort(a, l, mid);
    mergeSort(a, mid + 1, r);

    // 合并
    vector<int> temp;
    int i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) {
            temp.push_back(a[i++]);
        } else {
            temp.push_back(a[j++]);
        }
    }
    while (i <= mid) temp.push_back(a[i++]);
    while (j <= r) temp.push_back(a[j++]);

    for (int k = 0; k < temp.size(); k++) {
        a[l + k] = temp[k];
    }
}

int main() {
    vector<int> a = {5, 3, 1, 4, 2};
    mergeSort(a, 0, a.size() - 1);

    for (int x : a) cout << x << " ";  // 1 2 3 4 5
    cout << endl;

    return 0;
}
```

## 4.4 排序算法

### 知识点1-2：归并排序与快速排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 归并排序：O(n log n)，稳定排序
void mergeSort(vector<int> &a, int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    mergeSort(a, l, mid);
    mergeSort(a, mid + 1, r);

    vector<int> temp;
    int i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) temp.push_back(a[i++]);
        else temp.push_back(a[j++]);
    }
    while (i <= mid) temp.push_back(a[i++]);
    while (j <= r) temp.push_back(a[j++]);

    for (int k = 0; k < temp.size(); k++) a[l + k] = temp[k];
}

// 快速排序：O(n log n)平均，不稳定
void quickSort(vector<int> &a, int l, int r) {
    if (l >= r) return;

    int pivot = a[l + rand() % (r - l + 1)];
    int i = l, j = r;
    while (i <= j) {
        while (a[i] < pivot) i++;
        while (a[j] > pivot) j--;
        if (i <= j) {
            swap(a[i], a[j]);
            i++;
            j--;
        }
    }
    if (l < j) quickSort(a, l, j);
    if (i < r) quickSort(a, i, r);
}

int main() {
    vector<int> a = {5, 3, 1, 4, 2};
    vector<int> b = a;

    mergeSort(a, 0, a.size() - 1);
    cout << "归并排序: ";
    for (int x : a) cout << x << " ";  // 1 2 3 4 5
    cout << endl;

    quickSort(b, 0, b.size() - 1);
    cout << "快速排序: ";
    for (int x : b) cout << x << " ";  // 1 2 3 4 5
    cout << endl;

    return 0;
}
```

### 知识点3：堆排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 堆排序：O(n log n)，不稳定
void heapify(vector<int> &a, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && a[left] > a[largest]) largest = left;
    if (right < n && a[right] > a[largest]) largest = right;

    if (largest != i) {
        swap(a[i], a[largest]);
        heapify(a, n, largest);
    }
}

void heapSort(vector<int> &a) {
    int n = a.size();

    // 建堆
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(a, n, i);
    }

    // 排序
    for (int i = n - 1; i > 0; i--) {
        swap(a[0], a[i]);
        heapify(a, i, 0);
    }
}

int main() {
    vector<int> a = {5, 3, 1, 4, 2};
    heapSort(a);

    cout << "堆排序: ";
    for (int x : a) cout << x << " ";  // 1 2 3 4 5
    cout << endl;

    return 0;
}
```

### 知识点4-5：桶排序与基数排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 桶排序：O(n+k)，稳定
void bucketSort(vector<int> &a, int bucketSize) {
    int minVal = *min_element(a.begin(), a.end());
    int maxVal = *max_element(a.begin(), a.end());
    int bucketCount = (maxVal - minVal) / bucketSize + 1;

    vector<vector<int>> buckets(bucketCount);

    for (int x : a) {
        int idx = (x - minVal) / bucketSize;
        buckets[idx].push_back(x);
    }

    int idx = 0;
    for (auto &bucket : buckets) {
        sort(bucket.begin(), bucket.end());
        for (int x : bucket) {
            a[idx++] = x;
        }
    }
}

// 基数排序：O(d*(n+k))，稳定
void countingSortByDigit(vector<int> &a, int exp) {
    int n = a.size();
    vector<int> output(n);
    vector<int> count(10, 0);

    for (int x : a) {
        count[(x / exp) % 10]++;
    }

    for (int i = 1; i < 10; i++) {
        count[i] += count[i-1];
    }

    for (int i = n - 1; i >= 0; i--) {
        output[count[(a[i] / exp) % 10] - 1] = a[i];
        count[(a[i] / exp) % 10]--;
    }

    a = output;
}

void radixSort(vector<int> &a) {
    int maxVal = *max_element(a.begin(), a.end());

    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByDigit(a, exp);
    }
}

int main() {
    vector<int> a = {170, 45, 75, 90, 802, 24, 2, 66};

    vector<int> b = a;
    bucketSort(b, 10);
    cout << "桶排序: ";
    for (int x : b) cout << x << " ";  // 2 24 45 66 75 90 170 802
    cout << endl;

    vector<int> c = a;
    radixSort(c);
    cout << "基数排序: ";
    for (int x : c) cout << x << " ";  // 2 24 45 66 75 90 170 802
    cout << endl;

    return 0;
}
```


## 4.5 字符串算法

### 知识点1：KMP算法

```cpp
#include<bits/stdc++.h>
using namespace std;

// KMP：O(n+m)字符串匹配
vector<int> buildNext(const string &pattern) {
    int m = pattern.length();
    vector<int> next(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            next[i++] = ++len;
        } else {
            if (len != 0) len = next[len - 1];
            else next[i++] = 0;
        }
    }
    return next;
}

vector<int> kmpSearch(const string &text, const string &pattern) {
    vector<int> result;
    int n = text.length(), m = pattern.length();
    vector<int> next = buildNext(pattern);

    int i = 0, j = 0;
    while (i < n) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        }
        if (j == m) {
            result.push_back(i - j);
            j = next[j - 1];
        } else if (i < n && text[i] != pattern[j]) {
            if (j != 0) j = next[j - 1];
            else i++;
        }
    }

    return result;
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";

    auto matches = kmpSearch(text, pattern);

    cout << "匹配位置: ";
    for (int pos : matches) {
        cout << pos << " ";
    }
    cout << endl;  // 9

    return 0;
}
```

### 知识点2：Manacher算法

```cpp
#include<bits/stdc++.h>
using namespace std;

// Manacher：O(n)求最长回文子串
string manacher(const string &s) {
    // 预处理：插入特殊字符
    string t = "#";
    for (char c : s) {
        t += c;
        t += "#";
    }

    int n = t.length();
    vector<int> p(n, 0);
    int center = 0, right = 0;

    for (int i = 0; i < n; i++) {
        if (i < right) {
            p[i] = min(right - i, p[2 * center - i]);
        }

        while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n &&
               t[i - p[i] - 1] == t[i + p[i] + 1]) {
            p[i]++;
        }

        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }
    }

    // 找最长回文
    int maxLen = 0, maxCenter = 0;
    for (int i = 0; i < n; i++) {
        if (p[i] > maxLen) {
            maxLen = p[i];
            maxCenter = i;
        }
    }

    int start = (maxCenter - maxLen) / 2;
    return s.substr(start, maxLen);
}

int main() {
    string s = "abacaba";
    cout << "最长回文子串: " << manacher(s) << endl;  // abacaba

    string s2 = "cbbd";
    cout << "最长回文子串: " << manacher(s2) << endl;  // bb

    return 0;
}
```

## 4.6 搜索算法

### 知识点1：搜索的剪枝优化

```cpp
#include<bits/stdc++.h>
using namespace std;

// 剪枝：在搜索过程中提前排除不可能的分支
// 例：n皇后问题（优化版）
int n, count_sol;
int queen[20];

bool check(int row, int col) {
    for (int i = 0; i < row; i++) {
        if (queen[i] == col || abs(queen[i] - col) == abs(i - row)) {
            return false;
        }
    }
    return true;
}

void dfs(int row) {
    if (row == n) {
        count_sol++;
        return;
    }

    // 剪枝：只尝试未被占用的列
    for (int col = 0; col < n; col++) {
        if (check(row, col)) {
            queen[row] = col;
            dfs(row + 1);
            queen[row] = -1;
        }
    }
}

int main() {
    n = 8;
    count_sol = 0;
    memset(queen, -1, sizeof(queen));
    dfs(0);
    cout << n << "皇后问题有" << count_sol << "种解" << endl;  // 92

    return 0;
}
```

### 知识点2：记忆化搜索

```cpp
#include<bits/stdc++.h>
using namespace std;

// 记忆化搜索：DFS + 缓存
// 例：斐波那契数列
const int MAXN = 100;
long long dp[MAXN];

long long fib(int n) {
    if (n <= 1) return n;
    if (dp[n] != -1) return dp[n];
    dp[n] = fib(n - 1) + fib(n - 2);
    return dp[n];
}

int main() {
    memset(dp, -1, sizeof(dp));
    cout << "fib(50) = " << fib(50) << endl;

    return 0;
}
```

### 知识点3：启发式搜索（A*）

```cpp
#include<bits/stdc++.h>
using namespace std;

// A*搜索：启发式搜索
struct Node {
    int x, y, g, h;
    bool operator>(const Node &other) const {
        return g + h > other.g + other.h;
    }
};

int heuristic(int x1, int y1, int x2, int y2) {
    return abs(x1 - x2) + abs(y1 - y2);  // 曼哈顿距离
}

int main() {
    // 示例：在网格中找最短路径
    int n = 5;
    vector&lt;string&gt; grid = {
        ".....",
        ".##..",
        ".##..",
        ".....",
        "....."
    };

    int sx = 0, sy = 0, ex = 4, ey = 4;

    priority_queue<Node, vector<Node>, greater<Node>> pq;
    vector<vector<int>> dist(n, vector<int>(n, INT_MAX));

    pq.push({sx, sy, 0, heuristic(sx, sy, ex, ey)});
    dist[sx][sy] = 0;

    int dx[] = {0, 0, 1, -1};
    int dy[] = {1, -1, 0, 0};

    while (!pq.empty()) {
        auto [x, y, g, h] = pq.top();
        pq.pop();

        if (x == ex && y == ey) {
            cout << "最短路径长度: " << g << endl;
            break;
        }

        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] == '.') {
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

### 知识点4：双向广度优先搜索

```cpp
#include<bits/stdc++.h>
using namespace std;

// 双向BFS：同时从起点和终点搜索
int main() {
    // 例：起泡排序的最少交换次数
    // 双向BFS可以大幅减少搜索空间

    cout << "双向BFS示例" << endl;

    return 0;
}
```

### 知识点5：迭代加深搜索（IDA*）

```cpp
#include<bits/stdc++.h>
using namespace std;

// IDA*：迭代加深 + 启发式
// 例：八数码问题
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};
char dir[] = {'R', 'L', 'D', 'U'};

int heuristic(vector<vector<int>> &state) {
    int h = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            int val = state[i][j];
            if (val != 0) {
                int targetX = (val - 1) / 3;
                int targetY = (val - 1) % 3;
                h += abs(i - targetX) + abs(j - targetY);
            }
        }
    }
    return h;
}

int main() {
    cout << "IDA*搜索示例" << endl;

    return 0;
}
```

## 4.7 图论算法

### 知识点1：单源最短路

```cpp
#include<bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Dijkstra：O((n+m)logn)，非负权
void dijkstra(int n, vector<vector<pair<int,int>>> &adj, int src) {
    vector<int> dist(n + 1, INF);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        cout << "到" << i << "的距离: " << (dist[i] == INF ? -1 : dist[i]) << endl;
    }
}

// Bellman-Ford：O(nm)，可处理负权
void bellmanFord(int n, vector<tuple<int,int,int>> &edges, int src) {
    vector<int> dist(n + 1, INF);
    dist[src] = 0;

    for (int i = 1; i < n; i++) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // 检测负环
    for (auto [u, v, w] : edges) {
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            cout << "存在负环" << endl;
            return;
        }
    }
}

// SPFA：O(nm)平均
void spfa(int n, vector<vector<pair<int,int>>> &adj, int src) {
    vector<int> dist(n + 1, INF);
    vector<bool> inQueue(n + 1, false);
    queue<int> q;

    dist[src] = 0;
    q.push(src);
    inQueue[src] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        inQueue[u] = false;

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!inQueue[v]) {
                    q.push(v);
                    inQueue[v] = true;
                }
            }
        }
    }
}

int main() {
    int n = 4, m = 5;
    vector<vector<pair<int,int>>> adj(n + 1);
    adj[1].push_back({2, 1});
    adj[1].push_back({3, 4});
    adj[2].push_back({3, 2});
    adj[2].push_back({4, 6});
    adj[3].push_back({4, 3});

    dijkstra(n, adj, 1);

    return 0;
}
```

### 知识点2：Floyd-Warshall算法

```cpp
#include<bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Floyd：O(n³)，全源最短路
void floyd(int n, vector<vector<int>> &dist) {
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}

int main() {
    int n = 4;
    vector<vector<int>> dist(n + 1, vector<int>(n + 1, INF));

    for (int i = 1; i <= n; i++) dist[i][i] = 0;

    dist[1][2] = 1; dist[1][3] = 4;
    dist[2][3] = 2; dist[2][4] = 6;
    dist[3][4] = 3;

    floyd(n, dist);

    cout << "1到4的最短距离: " << dist[1][4] << endl;  // 6

    return 0;
}
```

### 知识点3：拓扑排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 拓扑排序：DAG的线性排序
vector<int> topoSort(int n, vector<vector<int>> &adj, vector<int> &inDegree) {
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }

    vector<int> topo;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topo.push_back(u);

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) q.push(v);
        }
    }

    return topo;
}

int main() {
    int n = 6, m = 6;
    vector<vector<int>> adj(n + 1);
    vector<int> inDegree(n + 1, 0);

    vector<pair<int,int>> edges = {{1,2},{1,3},{2,4},{3,4},{4,5},{4,6}};
    for (auto [u, v] : edges) {
        adj[u].push_back(v);
        inDegree[v]++;
    }

    auto topo = topoSort(n, adj, inDegree);

    cout << "拓扑排序: ";
    for (int x : topo) cout << x << " ";
    cout << endl;

    return 0;
}
```

### 知识点4：欧拉道路和欧拉回路

```cpp
#include<bits/stdc++.h>
using namespace std;

// 欧拉回路：经过每条边恰好一次且回到起点
// 判断条件：所有点度数为偶数（无向图）
// 欧拉道路：恰好两个点度数为奇数

vector<int> adj[100001];
vector<int> circuit;

void euler(int u) {
    while (!adj[u].empty()) {
        int v = adj[u].back();
        adj[u].pop_back();
        for (auto it = adj[v].begin(); it != adj[v].end(); it++) {
            if (*it == u) {
                adj[v].erase(it);
                break;
            }
        }
        euler(v);
    }
    circuit.push_back(u);
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    euler(1);

    cout << "欧拉回路: ";
    for (int i = circuit.size() - 1; i >= 0; i--) {
        cout << circuit[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### 知识点5：二分图匹配（匈牙利算法）

```cpp
#include<bits/stdc++.h>
using namespace std;

// 匈牙利算法：二分图最大匹配
vector<int> adj[1001];
int match[1001];
bool visited[1001];

bool dfs(int u) {
    for (int v : adj[u]) {
        if (!visited[v]) {
            visited[v] = true;
            if (match[v] == 0 || dfs(match[v])) {
                match[v] = u;
                return true;
            }
        }
    }
    return false;
}

int main() {
    int n, m, e;
    cin >> n >> m >> e;

    for (int i = 0; i < e; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }

    int result = 0;
    for (int i = 1; i <= n; i++) {
        memset(visited, false, sizeof(visited));
        if (dfs(i)) result++;
    }

    cout << "最大匹配数: " << result << endl;

    return 0;
}
```

### 知识点6：强连通分量（Tarjan）

```cpp
#include<bits/stdc++.h>
using namespace std;

// Tarjan算法：求强连通分量
vector<int> adj[100001];
int dfn[100001], low[100001], idx;
int stack_[100001], top_;
bool inStack[100001];
int scc[100001], sccCnt;

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
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }

    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) tarjan(i);
    }

    cout << "强连通分量个数: " << sccCnt << endl;

    return 0;
}
```

### 知识点7：割点与割边

```cpp
#include<bits/stdc++.h>
using namespace std;

// 割点：删除该点后图不再连通
// 割边（桥）：删除该边后图不再连通

vector<int> adj[100001];
int dfn[100001], low[100001], idx;
bool isCut[100001];

void tarjan(int u, int parent) {
    dfn[u] = low[u] = ++idx;
    int child = 0;

    for (int v : adj[u]) {
        if (!dfn[v]) {
            child++;
            tarjan(v, u);
            low[u] = min(low[u], low[v]);

            // 割点判定
            if (parent == -1 && child > 1) isCut[u] = true;
            if (parent != -1 && low[v] >= dfn[u]) isCut[u] = true;
        } else if (v != parent) {
            low[u] = min(low[u], dfn[v]);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    for (int i = 1; i <= n; i++) {
        if (!dfn[i]) tarjan(i, -1);
    }

    cout << "割点: ";
    for (int i = 1; i <= n; i++) {
        if (isCut[i]) cout << i << " ";
    }
    cout << endl;

    return 0;
}
```

### 知识点8：树的重心、直径、DFS序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 树的重心：删除该点后最大子树最小
// 树的直径：树中最长路径

vector<int> adj[100001];
int subtree[100001], n;
int maxSubtree = INT_MAX, centroid;

void dfs(int u, int parent) {
    subtree[u] = 1;
    int maxPart = 0;

    for (int v : adj[u]) {
        if (v != parent) {
            dfs(v, u);
            subtree[u] += subtree[v];
            maxPart = max(maxPart, subtree[v]);
        }
    }

    maxPart = max(maxPart, n - subtree[u]);
    if (maxPart < maxSubtree) {
        maxSubtree = maxPart;
        centroid = u;
    }
}

int main() {
    cin >> n;

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    dfs(1, -1);
    cout << "树的重心: " << centroid << endl;

    return 0;
}
```

### 知识点9：树上差分与LCA

```cpp
#include<bits/stdc++.h>
using namespace std;

// LCA（最近公共祖先）：倍增法
vector<int> adj[100001];
int depth[100001], parent[100001][20];

void dfs(int u, int p) {
    parent[u][0] = p;
    for (int i = 1; i < 20; i++) {
        parent[u][i] = parent[parent[u][i-1]][i-1];
    }

    for (int v : adj[u]) {
        if (v != p) {
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);

    // 提升u到与v同深度
    for (int i = 19; i >= 0; i--) {
        if (depth[u] - (1 << i) >= depth[v]) {
            u = parent[u][i];
        }
    }

    if (u == v) return u;

    // 同时提升
    for (int i = 19; i >= 0; i--) {
        if (parent[u][i] != parent[v][i]) {
            u = parent[u][i];
            v = parent[v][i];
        }
    }

    return parent[u][0];
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    depth[1] = 0;
    dfs(1, 0);

    while (m--) {
        int u, v;
        cin >> u >> v;
        cout << "LCA(" << u << "," << v << ") = " << lca(u, v) << endl;
    }

    return 0;
}
```

## 4.8 动态规划

### 知识点1：多维动态规划

```cpp
#include<bits/stdc++.h>
using namespace std;

// 二维DP：例0-1背包
int main() {
    int n = 4, W = 10;
    int w[] = {0, 2, 3, 4, 5};
    int v[] = {0, 3, 4, 5, 6};

    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            dp[i][j] = dp[i-1][j];
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }

    cout << "最大价值: " << dp[n][W] << endl;

    return 0;
}
```

### 知识点2：树型动态规划

```cpp
#include<bits/stdc++.h>
using namespace std;

// 树型DP：在树上进行动态规划
// 例：求树的最大独立集
vector<int> adj[100001];
int dp[100001][2];  // dp[u][0]=不选u, dp[u][1]=选u
int val[100001];

void treeDP(int u, int parent) {
    dp[u][0] = 0;
    dp[u][1] = val[u];

    for (int v : adj[u]) {
        if (v != parent) {
            treeDP(v, u);
            dp[u][0] += max(dp[v][0], dp[v][1]);
            dp[u][1] += dp[v][0];
        }
    }
}

int main() {
    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) cin >> val[i];

    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    treeDP(1, -1);
    cout << "最大独立集: " << max(dp[1][0], dp[1][1]) << endl;

    return 0;
}
```

### 知识点3：状态压缩动态规划

```cpp
#include<bits/stdc++.h>
using namespace std;

// 状压DP：用二进制表示状态
// 例：旅行商问题（TSP）
int n;
int dist[20][20];
int dp[1 << 20][20];

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> dist[i][j];
        }
    }

    // 初始化
    memset(dp, 0x3f, sizeof(dp));
    dp[1][0] = 0;  // 从0出发，已访问{0}

    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1 << u))) continue;
            if (dp[mask][u] == 0x3f3f3f3f) continue;

            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                int newMask = mask | (1 << v);
                dp[newMask][v] = min(dp[newMask][v], dp[mask][u] + dist[u][v]);
            }
        }
    }

    int ans = INT_MAX;
    for (int u = 0; u < n; u++) {
        ans = min(ans, dp[(1 << n) - 1][u] + dist[u][0]);
    }

    cout << "最短回路长度: " << ans << endl;

    return 0;
}
```

### 知识点4：动态规划的常用优化

```cpp
#include<bits/stdc++.h>
using namespace std;

// 单调队列优化DP
// 斜率优化DP
// 四边形不等式优化

int main() {
    cout << "DP优化方法:" << endl;
    cout << "1. 单调队列优化：将O(nk)降为O(n)" << endl;
    cout << "2. 斜率优化：将O(n²)降为O(n)" << endl;
    cout << "3. 四边形不等式：将O(n³)降为O(n²)" << endl;

    return 0;
}
```


---

# 五、数学与其他

## 5.1 初等数学

### 知识点1：高中代数

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 一元二次方程求解
    double a = 1, b = -5, c = 6;
    double delta = b * b - 4 * a * c;

    if (delta > 0) {
        double x1 = (-b + sqrt(delta)) / (2 * a);
        double x2 = (-b - sqrt(delta)) / (2 * a);
        cout << "x1 = " << x1 << ", x2 = " << x2 << endl;  // 3, 2
    } else if (delta == 0) {
        double x = -b / (2 * a);
        cout << "x = " << x << endl;
    } else {
        cout << "无实数解" << endl;
    }

    // 对数运算
    cout << "log2(8) = " << log2(8) << endl;    // 3
    cout << "log10(100) = " << log10(100) << endl;  // 2

    return 0;
}
```

### 知识点2：高中几何

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    const double PI = acos(-1.0);

    // 向量点积
    double ax = 1, ay = 2, bx = 3, by = 4;
    double dot = ax * bx + ay * by;
    cout << "点积: " << dot << endl;  // 11

    // 向量叉积
    double cross = ax * by - ay * bx;
    cout << "叉积: " << cross << endl;  // -2

    // 两点距离
    double dx = ax - bx, dy = ay - by;
    double dist = sqrt(dx * dx + dy * dy);
    cout << "距离: " << dist << endl;

    return 0;
}
```

## 5.2 初等数论

### 知识点1：剩余类

```cpp
#include<bits/stdc++.h>
using namespace std;

// 剩余类：模n的所有可能余数 {0, 1, 2, ..., n-1}
int main() {
    int n = 7;
    cout << "模" << n << "的剩余类: ";
    for (int i = 0; i < n; i++) {
        cout << i << " ";
    }
    cout << endl;

    // 同余：a ≡ b (mod n) 表示 (a-b) % n == 0
    cout << "15 ≡ 1 (mod 7): " << ((15 - 1) % 7 == 0) << endl;  // 1

    return 0;
}
```

### 知识点2：欧拉函数

```cpp
#include<bits/stdc++.h>
using namespace std;

// 欧拉函数φ(n)：1~n中与n互质的数的个数
int phi(int n) {
    int result = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) n /= i;
            result -= result / i;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

// 欧拉定理：a^φ(n) ≡ 1 (mod n)，其中gcd(a,n)=1
long long quickPow(long long a, long long n, long long mod) {
    long long result = 1;
    a %= mod;
    while (n > 0) {
        if (n & 1) result = result * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}

int main() {
    cout << "φ(12) = " << phi(12) << endl;  // 4
    cout << "φ(7) = " << phi(7) << endl;    // 6

    // 欧拉定理应用
    int a = 3, n = 7;
    cout << a << "^" << phi(n) << " mod " << n << " = "
         << quickPow(a, phi(n), n) << endl;  // 1

    return 0;
}
```

### 知识点3：费马小定理

```cpp
#include<bits/stdc++.h>
using namespace std;

// 费马小定理：a^(p-1) ≡ 1 (mod p)，其中p为质数
// 用于求模逆元：a^(-1) ≡ a^(p-2) (mod p)

long long quickPow(long long a, long long n, long long mod) {
    long long result = 1;
    a %= mod;
    while (n > 0) {
        if (n & 1) result = result * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}

long long modInverse(long long a, long long p) {
    return quickPow(a, p - 2, p);
}

int main() {
    long long p = 1000000007;
    long long a = 12345;

    // 求a在模p下的逆元
    long long inv = modInverse(a, p);
    cout << a << " × " << inv << " mod " << p << " = "
         << (a * inv) % p << endl;  // 1

    return 0;
}
```

### 知识点4：威尔逊定理

```cpp
#include<bits/stdc++.h>
using namespace std;

// 威尔逊定理：(p-1)! ≡ -1 (mod p)，当且仅当p为质数
// 用于判断质数（小范围）

bool isPrimeByWilson(int p) {
    if (p <= 1) return false;
    if (p <= 3) return true;

    long long fact = 1;
    for (int i = 2; i < p; i++) {
        fact = fact * i % p;
    }

    return fact == p - 1;  // (p-1)! ≡ -1 (mod p)
}

int main() {
    for (int i = 1; i <= 20; i++) {
        if (isPrimeByWilson(i)) {
            cout << i << "是质数" << endl;
        }
    }

    return 0;
}
```

### 知识点5：中国剩余定理

```cpp
#include<bits/stdc++.h>
using namespace std;

// 中国剩余定理：求解同余方程组
// x ≡ a1 (mod m1)
// x ≡ a2 (mod m2)
// ...
// x ≡ ak (mod mk)

long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = exgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

long long crt(vector<long long> &a, vector<long long> &m) {
    int n = a.size();
    long long M = 1;
    for (int i = 0; i < n; i++) M *= m[i];

    long long result = 0;
    for (int i = 0; i < n; i++) {
        long long Mi = M / m[i];
        long long x, y;
        exgcd(Mi, m[i], x, y);
        result = (result + a[i] * Mi * x % M) % M;
    }

    return (result % M + M) % M;
}

int main() {
    // 例：x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)
    vector<long long> a = {2, 3, 2};
    vector<long long> m = {3, 5, 7};

    cout << "最小正整数解: " << crt(a, m) << endl;  // 23

    return 0;
}
```

### 知识点6：扩展欧几里得算法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 扩展欧几里得：求ax + by = gcd(a,b)的整数解
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = exgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

int main() {
    long long a = 3, b = 5, x, y;
    long long g = exgcd(a, b, x, y);

    cout << "gcd(" << a << "," << b << ") = " << g << endl;
    cout << "x = " << x << ", y = " << y << endl;
    cout << "验证: " << a << "×" << x << " + " << b << "×" << y << " = " << a*x + b*y << endl;

    return 0;
}
```

### 知识点7：模逆元

```cpp
#include<bits/stdc++.h>
using namespace std;

// 模逆元：a × a^(-1) ≡ 1 (mod p)
const long long MOD = 1000000007;

// 方法1：费马小定理（p为质数）
long long quickPow(long long a, long long n, long long mod) {
    long long result = 1;
    a %= mod;
    while (n > 0) {
        if (n & 1) result = result * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return result;
}

long long modInverseFermat(long long a) {
    return quickPow(a, MOD - 2, MOD);
}

// 方法2：扩展欧几里得（p不一定为质数）
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = exgcd(b, a % b, x1, y1);
    x = y1; y = x1 - (a / b) * y1;
    return g;
}

long long modInverseExgcd(long long a, long long m) {
    long long x, y;
    exgcd(a, m, x, y);
    return (x % m + m) % m;
}

// 方法3：线性求逆元（1~n所有数的逆元）
vector<long long> linearInverse(int n, long long p) {
    vector<long long> inv(n + 1);
    inv[1] = 1;
    for (int i = 2; i <= n; i++) {
        inv[i] = (p - p / i) * inv[p % i] % p;
    }
    return inv;
}

int main() {
    long long a = 12345;

    cout << "费马小定理: " << modInverseFermat(a) << endl;
    cout << "扩展欧几里得: " << modInverseExgcd(a, MOD) << endl;

    auto inv = linearInverse(10, MOD);
    cout << "线性求逆元: ";
    for (int i = 1; i <= 10; i++) {
        cout << inv[i] << " ";
    }
    cout << endl;

    return 0;
}
```

## 5.3 离散与组合数学

### 知识点1-2：多重集合与等价关系

```cpp
#include<bits/stdc++.h>
using namespace std;

// 多重集合：允许元素重复的集合
// 等价关系：自反、对称、传递

int main() {
    // 多重集合
    multiset<int> ms = {1, 1, 2, 2, 2, 3};
    cout << "多重集合大小: " << ms.size() << endl;  // 6
    cout << "1的个数: " << ms.count(1) << endl;     // 2
    cout << "2的个数: " << ms.count(2) << endl;     // 3

    return 0;
}
```

### 知识点3-4：多重集排列与组合

```cpp
#include<bits/stdc++.h>
using namespace std;

// 多重集排列数：n! / (n1! × n2! × ... × nk!)
long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

long long multinomial(vector<int> &counts) {
    int n = 0;
    for (int c : counts) n += c;

    long long result = factorial(n);
    for (int c : counts) {
        result /= factorial(c);
    }
    return result;
}

int main() {
    // 多重集 {a, a, b, b, b} 的排列数
    vector<int> counts = {2, 3};  // 2个a，3个b
    cout << "多重集排列数: " << multinomial(counts) << endl;  // 10

    return 0;
}
```

### 知识点5：错排列与圆排列

```cpp
#include<bits/stdc++.h>
using namespace std;

// 错排列D(n)：n个元素全错排的方案数
// D(n) = (n-1) × (D(n-1) + D(n-2))
long long derangement(int n) {
    if (n == 0) return 1;
    if (n == 1) return 0;

    vector<long long> d(n + 1);
    d[0] = 1;
    d[1] = 0;
    for (int i = 2; i <= n; i++) {
        d[i] = (i - 1) * (d[i-1] + d[i-2]);
    }
    return d[n];
}

// 圆排列：n个元素围成一圈的排列数 = n! / n = (n-1)!
long long circularPermutation(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result / n;
}

int main() {
    cout << "错排列D(5) = " << derangement(5) << endl;  // 44
    cout << "圆排列(5) = " << circularPermutation(5) << endl;  // 24

    return 0;
}
```

### 知识点6：容斥原理

```cpp
#include<bits/stdc++.h>
using namespace std;

// 容斥原理：|A∪B∪C| = |A|+|B|+|C| - |A∩B|-|A∩C|-|B∩C| + |A∩B∩C|

int main() {
    // 例：1~1000中不能被2、3、5整除的数的个数
    int n = 1000;
    int a = n / 2, b = n / 3, c = n / 5;
    int ab = n / 6, ac = n / 10, bc = n / 15;
    int abc = n / 30;

    int result = n - (a + b + c - ab - ac - bc + abc);
    cout << "不能被2、3、5整除的数的个数: " << result << endl;  // 266

    return 0;
}
```

### 知识点7：二项式定理

```cpp
#include<bits/stdc++.h>
using namespace std;

// 二项式定理：(a+b)^n = Σ C(n,k) × a^(n-k) × b^k

long long C(int n, int k) {
    if (k > n) return 0;
    long long result = 1;
    for (int i = 1; i <= k; i++) {
        result = result * (n - k + i) / i;
    }
    return result;
}

int main() {
    // 计算C(10,3)
    cout << "C(10,3) = " << C(10, 3) << endl;  // 120

    // 杨辉三角
    int n = 10;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << setw(6) << C(i, j);
        }
        cout << endl;
    }

    return 0;
}
```

### 知识点8：卡特兰数

```cpp
#include<bits/stdc++.h>
using namespace std;

// 卡特兰数：C(n) = C(2n,n) / (n+1)
// 应用：括号匹配、出栈序列、二叉树计数等

long long catalan(int n) {
    long long result = 1;
    for (int i = 0; i < n; i++) {
        result = result * (2 * n - i) / (i + 1);
    }
    return result / (n + 1);
}

int main() {
    for (int i = 0; i <= 10; i++) {
        cout << "C(" << i << ") = " << catalan(i) << endl;
    }
    // C(0)=1, C(1)=1, C(2)=2, C(3)=5, C(4)=14, C(5)=42

    return 0;
}
```

## 5.4 线性代数

### 知识点1-2：向量与矩阵运算

```cpp
#include<bits/stdc++.h>
using namespace std;

const int MOD = 1e9 + 7;
const int MAXN = 101;

// 矩阵类型
typedef vector<vector<long long>> Matrix;

// 矩阵乘法
Matrix multiply(const Matrix &a, const Matrix &b) {
    int n = a.size();
    Matrix result(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) {
        for (int k = 0; k < n; k++) {
            if (a[i][k] == 0) continue;
            for (int j = 0; j < n; j++) {
                result[i][j] = (result[i][j] + a[i][k] * b[k][j]) % MOD;
            }
        }
    }
    return result;
}

// 矩阵快速幂
Matrix quickPow(Matrix base, long long exp) {
    int n = base.size();
    Matrix result(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) result[i][i] = 1;  // 单位矩阵

    while (exp > 0) {
        if (exp & 1) result = multiply(result, base);
        base = multiply(base, base);
        exp >>= 1;
    }

    return result;
}

int main() {
    // 矩阵快速幂求斐波那契
    Matrix fib = {{1, 1}, {1, 0}};
    long long n = 10;

    Matrix result = quickPow(fib, n);
    cout << "斐波那契第" << n << "项: " << result[0][1] << endl;  // 55

    return 0;
}
```

### 知识点3-4：矩阵初等变换与转置

```cpp
#include<bits/stdc++.h>
using namespace std;

// 矩阵转置
vector<vector<int>> transpose(vector<vector<int>> &mat) {
    int n = mat.size(), m = mat[0].size();
    vector<vector<int>> result(m, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            result[j][i] = mat[i][j];
        }
    }
    return result;
}

int main() {
    vector<vector<int>> mat = {{1, 2, 3}, {4, 5, 6}};

    auto t = transpose(mat);

    cout << "转置后:" << endl;
    for (auto &row : t) {
        for (int x : row) cout << x << " ";
        cout << endl;
    }

    return 0;
}
```

### 知识点5：特殊矩阵

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n = 3;

    // 单位矩阵
    vector<vector<int>> identity(n, vector<int>(n, 0));
    for (int i = 0; i < n; i++) identity[i][i] = 1;

    cout << "单位矩阵:" << endl;
    for (auto &row : identity) {
        for (int x : row) cout << x << " ";
        cout << endl;
    }

    // 对称矩阵
    vector<vector<int>> sym = {{1, 2, 3}, {2, 4, 5}, {3, 5, 6}};
    cout << "是对称矩阵: " << (sym[0][1] == sym[1][0] && sym[0][2] == sym[2][0] && sym[1][2] == sym[2][1]) << endl;

    return 0;
}
```

### 知识点6：高斯消元法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 高斯消元：求解线性方程组
const double EPS = 1e-9;

int gauss(vector<vector<double>> &a, vector<double> &x) {
    int n = a.size();

    for (int col = 0; col < n; col++) {
        // 找主元
        int pivot = col;
        for (int row = col + 1; row < n; row++) {
            if (abs(a[row][col]) > abs(a[pivot][col])) {
                pivot = row;
            }
        }
        swap(a[col], a[pivot]);

        if (abs(a[col][col]) < EPS) return -1;  // 无解或无穷解

        // 消元
        for (int row = col + 1; row < n; row++) {
            double factor = a[row][col] / a[col][col];
            for (int j = col; j <= n; j++) {
                a[row][j] -= factor * a[col][j];
            }
        }
    }

    // 回代
    x.resize(n);
    for (int i = n - 1; i >= 0; i--) {
        x[i] = a[i][n];
        for (int j = i + 1; j < n; j++) {
            x[i] -= a[i][j] * x[j];
        }
        x[i] /= a[i][i];
    }

    return 0;  // 有唯一解
}

int main() {
    // 方程组：2x + y = 5, x + 3y = 7
    vector<vector<double>> a = {{2, 1, 5}, {1, 3, 7}};
    vector<double> x;

    int result = gauss(a, x);
    if (result == 0) {
        cout << "x = " << x[0] << ", y = " << x[1] << endl;  // x=1.6, y=1.8
    }

    return 0;
}
```

---

## 📌 备考建议

### CSP-S 考试重点

| 模块 | 重要度 | 建议学习时长 |
|:---|:---:|:---:|
| STL高级容器 | ⭐⭐⭐⭐⭐ | 2-3周 |
| 图论算法 | ⭐⭐⭐⭐⭐ | 3-4周 |
| 动态规划 | ⭐⭐⭐⭐⭐ | 3-4周 |
| 高级数据结构 | ⭐⭐⭐⭐ | 2-3周 |
| 字符串算法 | ⭐⭐⭐⭐ | 1-2周 |
| 搜索优化 | ⭐⭐⭐ | 1-2周 |
| 数论与组合 | ⭐⭐⭐ | 2-3周 |
| 线性代数 | ⭐⭐ | 1-2周 |

### 学习路线建议

```
入门组基础
    ↓
STL高级容器（set, map, priority_queue）
    ↓
排序算法（归并、快排、堆排）
    ↓
图论基础（最短路、拓扑排序、LCA）
    ↓
动态规划（多维DP、树形DP、状压DP）
    ↓
高级数据结构（线段树、树状数组、并查集）
    ↓
字符串算法（KMP、Manacher）
    ↓
搜索优化（剪枝、记忆化、IDA*）
    ↓
数论与组合数学
```

### 难度系数说明

| 系数 | 含义 | 对应水平 |
|:---:|:---|:---|
| 【5】 | 提高级基础 | CSP-S入门/NOIP普及组 |
| 【6】 | 提高中等 | CSP-S中等水平 |
| 【7】 | 提高偏难 | CSP-S高水平 |
| 【8】 | 提高最难 | 省选/NOI入门 |

---

# 📊 入门组 vs 提高级 知识点对比

| 类别 | 入门组 | 提高级（新增） |
|:---|:---|:---|
| **编程环境** | Windows/Linux基础 | Linux高级操作、GDB调试 |
| **C++** | 基础语法、数组、函数、指针 | 类、STL高级容器 |
| **数据结构** | 链表、栈、队列、二叉树、简单图 | 并查集、线段树、树状数组、哈希表、平衡树 |
| **算法** | 排序、搜索、DP基础、简单图论 | 分治、高级排序、KMP、最短路、强连通、高级DP |
| **数学** | 数论基础、排列组合 | 欧拉函数、中国剩余定理、容斥、线性代数 |

---

> **参考来源**：全国青少年信息学奥林匹克系列竞赛大纲（2025年修订版）
