# GESP C++ 六级知识点整理（修正版）

> 严格依据 CCF GESP 官方大纲，共 **6大知识块、18个知识点**
>
> ⚠️ 修正说明：原文件中大量七级/八级内容（Dijkstra、Floyd、Kruskal、并查集、单调栈、LIS/LCS、前缀和、离散化等）被错误归入六级，已全部迁移到正确级别。

---

## 一、树（知识点1–4）

### 1. 树的基本概念

**概念**
- 树是 $n$ 个节点的有限集合（$n \geq 0$），有且仅有一个根节点
- 节点的度：子节点个数；叶子节点：度为0
- 层/深度：根为第1层，依次递增
- 二叉树：每个节点最多两个子节点（左、右）

**关键性质**
- 二叉树第 $i$ 层最多 $2^{i-1}$ 个节点
- 深度为 $k$ 的二叉树最多 $2^k - 1$ 个节点
- $n_0 = n_2 + 1$（叶子节点数 = 度为2的节点数 + 1）

---

### 2. 哈夫曼树

**概念**
- 带权路径长度（WPL）最小的二叉树
- 构建方法：每次选两个权值最小的节点合并，重复直到只剩一个节点

**代码模板**
```cpp
// 用小顶堆构建哈夫曼树，计算WPL
priority_queue<long long, vector<long long>, greater<long long>> pq;
while (pq.size() > 1) {
    long long a = pq.top(); pq.pop();
    long long b = pq.top(); pq.pop();
    ans += a + b;          // 累加合并代价 = WPL
    pq.push(a + b);
}
```

**易错点**
- WPL = 所有合并操作的代价之和（无需真正建树）
- 优先队列用 `greater<>` 实现小顶堆
- n=1 时 WPL = 该节点权值（边界处理）

---

### 3. 完全二叉树

**概念**
- 除最后一层外，每层节点数都达到最大
- 最后一层节点从左到右连续排列

**数组存储（从下标1开始）**
- 节点 $i$ 的左孩子：$2i$
- 节点 $i$ 的右孩子：$2i+1$
- 节点 $i$ 的父节点：$\lfloor i/2 \rfloor$

**代码模板**
```cpp
// 完全二叉树中序遍历
void inorder(int i, int n, int a[]) {
    if (i > n) return;
    inorder(2 * i, n, a);       // 左子树
    printf("%d ", a[i]);         // 根
    inorder(2 * i + 1, n, a);   // 右子树
}
```

**易错点**
- 大纲明确要求"完全二叉树"，不等同于"满二叉树"
- 数组存储下标从1开始更方便（$2i$ 和 $2i+1$）

---

### 4. 二叉排序树（BST）

**概念**
- 左子树所有节点值 < 根节点值 < 右子树所有节点值
- 中序遍历结果为递增有序序列
- 查找/插入/删除平均 O(log n)，最坏 O(n)（退化为链表）

**代码模板**
```cpp
struct Node {
    int val;
    Node *left, *right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

// 插入
Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

// 搜索（返回深度）
int search(Node* root, int val, int depth) {
    if (!root) return -1;
    if (root->val == val) return depth;
    if (val < root->val) return search(root->left, val, depth + 1);
    else return search(root->right, val, depth + 1);
}
```

**易错点**
- BST 中序遍历一定是递增序列
- 退化为链表时复杂度变为 O(n)
- 删除有两个孩子的节点时，用前驱或后继替代

---

## 二、基于树的编码（知识点5–6）

### 5. 格雷编码

**概念**
- 一个长度为 $2^n$ 的二进制编码序列
- 相邻两个编码**恰好有一位不同**
- 首尾编码也恰好有一位不同（循环性）

**生成方法**

| 方法 | 公式/规则 | 时间复杂度 |
|:---|:---|:---:|
| 递推法 | $G(n)$ = `0`+G(n-1) 拼接 `1`+reverse(G(n-1)) | O(2^n) |
| 异或法 | 第 $i$ 个编码 = $i \oplus \lfloor i/2 \rfloor$ | O(n·2^n) |

**代码模板**
```cpp
// 异或法（推荐）
for (int i = 0; i < (1 << n); i++) {
    int gray = i ^ (i >> 1);
    for (int j = n - 1; j >= 0; j--)
        printf("%d", (gray >> j) & 1);
    printf("\n");
}
```

**易错点**
- 异或公式中是 $i \oplus (i >> 1)$，不是 $i \oplus i$
- 输出要补齐前导零至 n 位
- 递推法中后半部分要先**反转**再加前缀

---

### 6. 哈夫曼编码

**概念**
- 基于哈夫曼树的**最优前缀编码**
- 频率高的字符编码短，频率低的编码长
- 任何一个字符的编码都不是另一个字符编码的前缀

**编码规则**
- 从根到叶子的路径即为编码
- 左分支记 `0`，右分支记 `1`
- 左右子树交换不影响 WPL

**代码模板**
```cpp
// 计算编码后总位数（WPL）
long long ans = 0;
priority_queue<long long, vector<long long>, greater<long long>> pq;
// 将所有频率入堆
while (pq.size() > 1) {
    long long a = pq.top(); pq.pop();
    long long b = pq.top(); pq.pop();
    ans += a + b;
    pq.push(a + b);
}
```

**易错点**
- 哈夫曼编码是变长编码，不是定长编码
- WPL = 编码后消息的总位数
- n=1 时只有一种字符，编码长度为1

---

## 三、搜索算法（知识点7–9）

### 7. 深度优先搜索（DFS）

**概念**
- 沿着一条路径尽可能深地搜索，再回溯
- 用**栈**或**递归**实现
- 适合求连通性、路径、排列组合等问题

**代码模板**
```cpp
// 递归DFS（网格搜索）
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};
bool vis[N][N];

void dfs(int x, int y) {
    vis[x][y] = true;
    for (int d = 0; d < 4; d++) {
        int nx = x + dx[d], ny = y + dy[d];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && !vis[nx][ny])
            dfs(nx, ny);
    }
}

// 非递归DFS（栈实现）
void dfs_iter(int start) {
    stack<int> st;
    st.push(start);
    while (!st.empty()) {
        int u = st.top(); st.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (int v : g[u])
            if (!vis[v]) st.push(v);
    }
}
```

**易错点**
- 网格DFS注意边界判断和访问标记
- 递归深度过大可能栈溢出（n>10^4时考虑非递归）
- DFS遍历序列**不唯一**

---

### 8. 宽度优先搜索（BFS）

**概念**
- 逐层搜索，先访问所有距起点距离为k的节点，再访问k+1
- 用**队列**实现
- 适合求最短路径（无权图）、层序遍历等问题

**代码模板**
```cpp
// BFS求最短路径（无权图）
queue<int> q;
int dist[N];
memset(dist, -1, sizeof dist);
dist[start] = 0;
q.push(start);
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : g[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}

// 二叉树层序遍历
queue<TreeNode*> q;
q.push(root);
while (!q.empty()) {
    int sz = q.size();
    for (int i = 0; i < sz; i++) {
        TreeNode* node = q.front(); q.pop();
        printf("%d ", node->val);
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    printf("\n");
}
```

**易错点**
- BFS 天然求**无权图最短路径**
- 层序遍历时必须用 `sz` 控制每层边界
- 不要忘记访问标记，否则会死循环

---

### 9. 二叉树的搜索算法

**概念**
- 在二叉搜索树（BST）中查找特定值
- 利用 BST 性质：左小右大，每次排除一半

**代码模板**
```cpp
// BST搜索（非递归）
Node* searchBST(Node* root, int val) {
    while (root && root->val != val)
        root = (val < root->val) ? root->left : root->right;
    return root;
}
```

**易错点**
- BST搜索与二分查找思想相同
- 未找到时返回 `nullptr`
- 平均 O(log n)，最坏 O(n)

---

## 四、简单动态规划（知识点10–11）

### 10. 一维动态规划

**概念**
- 将大问题分解为子问题，子问题有**重叠子问题**和**最优子结构**
- 按顺序计算子问题，避免重复计算
- 核心：定义状态 → 写出转移方程 → 确定初始值

**经典模型**

| 问题 | 状态定义 | 转移方程 |
|:---|:---|:---|
| 打家劫舍（不相邻最大和） | dp[i] = 前i个的最大和 | dp[i] = max(dp[i-1], dp[i-2]+a[i]) |
| 最长递增子序列(LIS) | dp[i] = 以a[i]结尾的LIS长度 | dp[i] = max(dp[j]+1), j<i, a[j]<a[i] |
| 跳跃游戏 | dp[i] = 能否到达位置i | dp[i] = dp[j] && j+a[j]>=i |

**代码模板**
```cpp
// 不相邻最大和（打家劫舍）
int dp[N];
dp[0] = a[0];
dp[1] = max(a[0], a[1]);
for (int i = 2; i < n; i++)
    dp[i] = max(dp[i-1], dp[i-2] + a[i]);
int ans = dp[n-1];

// 最长递增子序列 O(n²)
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++)
        if (a[j] < a[i])
            dp[i] = max(dp[i], dp[j] + 1);
}
```

**易错点**
- DP 数组初始化不要遗漏
- 递推顺序：确保用到的子问题已经计算过
- 注意边界条件（n=1, n=2 的情况）

---

### 11. 简单背包问题

**概念**

| 类型 | 限制 | 内层遍历方向 | 关键区别 |
|:---|:---|:---:|:---|
| **0/1背包** | 每件最多选一次 | **逆序** | 逆序保证不重复使用 |
| **完全背包** | 每件可选无限次 | **正序** | 正序允许重复使用 |

**代码模板**
```cpp
// 0/1背包（逆序！）
int dp[N] = {0};
for (int i = 0; i < n; i++)
    for (int j = W; j >= w[i]; j--)      // 逆序
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);

// 完全背包（正序！）
int dp[N] = {0};
for (int i = 0; i < n; i++)
    for (int j = w[i]; j <= W; j++)      // 正序
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
```

**易错点**
- **0/1背包逆序、完全背包正序**——这是最核心的区别
- 逆序确保每个物品只被考虑一次
- 正序允许同一物品被重复选择
- dp 数组初始化为 0（求最大值）或 INF（求最小值）

---

## 五、面向对象（知识点12–14）

### 12. 面向对象思想

**三大特性**
| 特性 | 含义 | 关键字/机制 |
|:---|:---|:---|
| **封装** | 数据和操作绑定，隐藏实现细节 | `private`, `public` |
| **继承** | 子类复用父类的属性和方法 | `class B : public A` |
| **多态** | 同一接口，不同实现 | `virtual` 虚函数 |

**与面向过程的区别**
- 面向过程：函数 + 全局变量，按步骤执行
- 面向对象：类 + 对象，以数据为中心

---

### 13. 类的创建和初始化

**代码模板**
```cpp
class Dog {
private:
    string name;
    int age;
public:
    // 构造函数
    Dog(string n, int a) : name(n), age(a) {}
    // 成员函数
    void speak() { cout << name << " barks" << endl; }
    // getter
    string getName() { return name; }
    // setter
    void birthday() { age++; }
};
```

**构造函数要点**
- 函数名与类名相同，无返回类型
- 可重载（多个构造函数）
- 若用户未定义，编译器自动生成默认构造函数
- **构造函数不能声明为 `virtual`**
- 析构函数**应该**声明为 `virtual`（多态场景下）

**易错点**
- `Dog b = a;` 调用的是**拷贝构造函数**，不是赋值
- 初始化列表 `: name(n), age(a)` 比函数体内赋值更高效
- `private` 成员在类外不可直接访问

---

### 14. 类的特性：继承、封装、多态

**继承**
```cpp
class Animal {
public:
    virtual void speak() { cout << "..." << endl; }
    virtual ~Animal() {}  // 虚析构！
};

class Dog : public Animal {
public:
    void speak() override { cout << "Woof!" << endl; }
};
```

**多态**
```cpp
Animal* p = new Dog();
p->speak();    // 输出 "Woof!"（运行时多态）
delete p;      // 虚析构确保正确释放
```

**关键规则**
- 虚函数实现运行时多态，非虚函数是编译时绑定
- 纯虚函数：`virtual void f() = 0;` → 抽象类
- 子类可以 `override` 父类虚函数
- 私有成员**不能**被子类直接访问
- 构造函数**不能**是虚函数；析构函数**推荐**是虚函数

---

## 六、栈和队列（知识点15–17）

### 15. 栈

**概念**
- 后进先出（LIFO）的线性表
- 只能访问栈顶（top）
- 常见操作：push（入栈）、pop（出栈）、top（取栈顶）

**代码模板**
```cpp
stack<int> st;
st.push(1); st.push(2);
st.top();          // 返回2（不弹出）
st.pop();          // 弹出2
st.empty();        // 判断是否为空
st.size();         // 元素个数
```

**应用场景**
- 括号匹配
- 出栈序列合法性判断
- 表达式求值
- DFS 的非递归实现
- 函数调用栈管理

**易错点**
- `stack` 没有 `front()` 方法
- `pop()` 只弹出不返回值，需先 `top()` 再 `pop()`
- 遍历栈时必须用临时变量保存后弹出

---

### 16. 队列

**概念**
- 先进先出（FIFO）的线性表
- 队尾入队（push/back），队头出队（pop/front）
- 常见操作：push、pop、front、back

**代码模板**
```cpp
queue<int> q;
q.push(1); q.push(2);
q.front();         // 返回1（不弹出）
q.pop();           // 弹出1
q.back();          // 返回2
q.empty(); q.size();
```

**应用场景**
- BFS 的核心数据结构
- 层序遍历
- 消息队列/任务调度
- 生产者-消费者模型

**易错点**
- `queue` 没有 `top()` 方法
- `front()` 返回队首值但不删除
- BFS 中必须在出队时标记已访问

---

### 17. 循环队列

**概念**
- 用数组实现的队列，通过模运算循环使用空间
- 解决普通队列出队后空间浪费的问题

**代码模板**
```cpp
const int MAX = 5;           // 容量5，实际存4个元素
int queue[MAX];
int front = 0, rear = 0;

// 入队
void enqueue(int x) {
    queue[rear] = x;
    rear = (rear + 1) % MAX;
}

// 出队
void dequeue() {
    front = (front + 1) % MAX;
}

// 判满：(rear + 1) % MAX == front
// 判空：front == rear
// 长度：(rear - front + MAX) % MAX
```

**易错点**
- 留一个空位区分满和空：最多存 MAX-1 个元素
- 判满条件：`(rear + 1) % MAX == front`
- 判空条件：`front == rear`
- 取模运算防止数组越界

---

## 附录A：六级知识点速查表

| 编号 | 知识块 | 知识点 | 关键词 |
|:---:|:---|:---|:---|
| 1 | 树 | 树的基本概念 | 节点、度、层、深度 |
| 2 | 树 | 哈夫曼树 | WPL、合并、小顶堆 |
| 3 | 树 | 完全二叉树 | 数组存储、2i、2i+1 |
| 4 | 树 | 二叉排序树 | BST、中序有序、O(logn) |
| 5 | 编码 | 格雷编码 | 相邻1位不同、异或公式 |
| 6 | 编码 | 哈夫曼编码 | 前缀码、变长、最优 |
| 7 | 搜索 | 深度优先搜索(DFS) | 栈/递归、连通性 |
| 8 | 搜索 | 宽度优先搜索(BFS) | 队列、层序、最短路径 |
| 9 | 搜索 | 二叉树的搜索 | BST查找、左小右大 |
| 10 | DP | 一维动态规划 | 状态、转移方程、最优子结构 |
| 11 | DP | 简单背包 | 0/1背包逆序、完全背包正序 |
| 12 | OOP | 面向对象思想 | 封装、继承、多态 |
| 13 | OOP | 类的创建和初始化 | 构造函数、初始化列表 |
| 14 | OOP | 继承、封装、多态 | virtual、override、虚析构 |
| 15 | 数据结构 | 栈 | LIFO、push/pop/top |
| 16 | 数据结构 | 队列 | FIFO、push/pop/front/back |
| 17 | 数据结构 | 循环队列 | 取模运算、判满判空 |

---

## 附录B：常见错级知识点迁移

> 以下知识点**不在六级大纲中**，原文件错误归入六级，应迁移到正确级别：

| 原编号 | 错误归入的知识点 | 正确级别 | 大纲依据 |
|:---:|:---|:---:|:---|
| 01-09 | STL容器（vector/deque/set/map等） | 未列入大纲 | 大纲未明确要求 |
| 10-13 | STL算法（sort/lower_bound等） | 未列入大纲 | 大纲未明确要求 |
| 14 | 复杂度分析 | **八级** | 八级"算法的时间和空间效率分析" |
| 15-16 | 前缀和/差分 | 未列入大纲 | 大纲未明确要求 |
| 17 | 二分答案 | **五级** | 五级"二分查找/二分答案" |
| 18 | 离散化 | 未列入大纲 | 大纲未明确要求 |
| 19 | LIS（最长上升子序列） | **七级** | 七级"复杂动态规划" |
| 20 | LCS（最长公共子序列） | **七级** | 七级"复杂动态规划" |
| 22 | 图存储（邻接表/矩阵） | **七级** | 七级"图的定义" |
| 23 | 拓扑排序 | 未列入大纲 | 大纲未明确要求 |
| 24 | Dijkstra | **八级** | 八级"单源最短路径" |
| 25 | Floyd | **八级** | 八级"Floyd算法" |
| 26 | SPFA | 未列入大纲 | 大纲未明确要求 |
| 27 | Kruskal | **八级** | 八级"最小生成树" |
| 28 | Prim | **八级** | 八级"最小生成树" |
| 29 | 并查集 | 未列入大纲 | 大纲未明确要求 |
| 30-31 | 单调栈/单调队列 | 未列入大纲 | 大纲未明确要求 |
| 32 | 数学基础（质数/GCD） | **五级** | 五级"初等数论" |
| 33 | 快速幂 | 未列入大纲 | 大纲未明确要求 |
| 34 | 欧拉筛 | **五级** | 五级"素数表的线性筛法" |
