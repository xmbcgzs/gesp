# GESP C++ 八级（L8）知识点整理（修正版）

> 基于 GESP Level 8 官方大纲整理
> 本文件严格匹配八级考纲，包含 8 大知识模块

---

## 一、计数原理（加法原理与乘法原理）

### 1. 加法原理

**概念**
- 如果完成一件事有 $n$ 类方法，第 $i$ 类方法有 $a_i$ 种，且各类方法互不兼容（任选一类即可完成），则完成这件事共有 $a_1 + a_2 + \cdots + a_n$ 种方法
- **关键词**："分类"、"或"、"任选其一"

**典型例题**
- 从甲地到乙地，有 3 条公路和 2 条铁路，问共有多少种不同的走法？
- 答案：$3 + 2 = 5$ 种

**编程实现**
```cpp
// 加法原理：累加各类方案数
int ways = 0;
ways += countMethodA;  // 第1类方法数
ways += countMethodB;  // 第2类方法数
ways += countMethodC;  // 第3类方法数
// ways 即为总方案数
```

---

### 2. 乘法原理

**概念**
- 如果完成一件事需要 $n$ 个步骤，第 $i$ 步有 $a_i$ 种方法，且各步骤必须依次完成，则完成这件事共有 $a_1 \times a_2 \times \cdots \times a_n$ 种方法
- **关键词**："分步"、"和"、"都要完成"

**典型例题**
- 从甲地到乙地需先坐火车再坐汽车，火车有 4 班，汽车有 3 班，共有多少种走法？
- 答案：$4 \times 3 = 12$ 种

**编程实现**
```cpp
// 乘法原理：累乘各步方案数
long long ways = 1;
ways *= countStep1;  // 第1步方案数
ways *= countStep2;  // 第2步方案数
ways *= countStep3;  // 第3步方案数
// ways 即为总方案数
```

---

### 3. 加法原理与乘法原理的综合应用

**要点**
- 先分类（加法原理），再分步（乘法原理）
- 注意区分"分类"与"分步"

**示例**
- 从 A 到 B 有 2 条路，从 B 到 C 有 3 条路，从 A 到 D 有 4 条路
- A→C 共有 $2 \times 3 = 6$ 种走法（分步）
- A→C 或 A→D 共有 $6 + 4 = 10$ 种走法（分类）

---

## 二、排列与组合

### 1. 排列的基本概念

**概念**
- 从 $n$ 个不同元素中取出 $m$ 个元素，按照一定顺序排成一列，称为一个**排列**
- 排列数公式：$A_n^m = \frac{n!}{(n-m)!}$
- 当 $m = n$ 时，$A_n^n = n!$（全排列）

**编程实现**
```cpp
// 计算排列数 A(n, m) = n! / (n-m)!
long long permutation(int n, int m) {
    long long result = 1;
    for (int i = 0; i < m; i++) {
        result *= (n - i);
    }
    return result;
}

// 全排列（输出所有排列）
#include <algorithm>
#include <vector>
void printPermutations(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    do {
        for (int x : nums) cout << x << " ";
        cout << endl;
    } while (next_permutation(nums.begin(), nums.end()));
}
```

---

### 2. 组合的基本概念

**概念**
- 从 $n$ 个不同元素中取出 $m$ 个元素，不考虑顺序，称为一个**组合**
- 组合数公式：$C_n^m = \frac{n!}{m!(n-m)!}$
- 组合数性质：$C_n^m = C_n^{n-m}$

**编程实现**
```cpp
// 方法1：递推公式（杨辉三角）
int C[101][101];
void initCombination(int n) {
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            C[i][j] = C[i-1][j-1] + C[i-1][j];
        }
    }
}

// 方法2：直接计算
long long combination(int n, int m) {
    if (m > n - m) m = n - m;
    long long result = 1;
    for (int i = 0; i < m; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    return result;
}
```

---

### 3. 排列与组合的编程应用

**常见问题**
- **重复元素排列**：$\frac{n!}{p_1! \cdot p_2! \cdots p_k!}$（$p_i$ 为重复次数）
- **圆排列**：$\frac{A_n^n}{n} = (n-1)!$
- **隔板法**：$n$ 个相同元素分给 $k$ 人，每人至少1个，方案数为 $C_{n-1}^{k-1}$

```cpp
// 重复元素排列
long long permWithRepeat(int n, vector<int>& counts) {
    long long result = factorial(n);
    for (int c : counts) {
        result /= factorial(c);
    }
    return result;
}
```

---

## 三、杨辉三角（帕斯卡三角形）

### 1. 杨辉三角的概念

**概念**
- 杨辉三角（帕斯卡三角形）是一个数字三角形
- 每行两端都是 1，其余每个数等于它上方两数之和
- 第 $n$ 行第 $k$ 个数恰好等于 $C_n^k$（组合数）

**性质**
- 第 $n$ 行有 $n$ 个数（从第0行开始）
- 第 $n$ 行所有数之和为 $2^n$
- 杨辉三角关于中轴线对称
- 第 $n$ 行第 $k$ 个数 = $C_n^k$

```
         1
        1 1
       1 2 1
      1 3 3 1
     1 4 6 4 1
    1 5 10 10 5 1
   1 6 15 20 15 6 1
```

---

### 2. 杨辉三角的编程实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 方法1：二维数组
void printYangHui1(int n) {
    int a[101][101] = {0};
    for (int i = 0; i < n; i++) {
        a[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            a[i][j] = a[i-1][j-1] + a[i-1][j];
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
}

// 方法2：滚动数组（节省空间）
void printYangHui2(int n) {
    vector<int> row(n, 0);
    for (int i = 0; i < n; i++) {
        // 从后往前更新，避免覆盖
        for (int j = i; j >= 0; j--) {
            if (j == 0 || j == i)
                row[j] = 1;
            else
                row[j] = row[j] + row[j-1];
        }
        for (int j = 0; j <= i; j++) {
            cout << row[j] << " ";
        }
        cout << endl;
    }
}

// 方法3：利用组合数公式
long long comb(int n, int m) {
    long long res = 1;
    for (int i = 0; i < m; i++) {
        res = res * (n - i) / (i + 1);
    }
    return res;
}

void printYangHui3(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << comb(i, j) << " ";
        }
        cout << endl;
    }
}
```

---

### 3. 杨辉三角的应用

**应用1：计算组合数**
- 利用杨辉三角预处理 $C_n^m$，时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$

**应用2：二项式定理**
- $(a+b)^n = \sum_{k=0}^{n} C_n^k \cdot a^{n-k} \cdot b^k$

**应用3：路径计数**
- 在杨辉三角的数字三角形中找路径：从顶点出发，每次向左下或右下走一步，到某个位置的路径数就是该位置的值

---

## 四、倍增法

### 1. 倍增的概念

**概念**
- 倍增法是一种利用二进制拆分来加速查找或遍历的算法思想
- 核心思想：每次将步长翻倍（1, 2, 4, 8, ...），直到超出目标
- 可以将 $O(n)$ 的线性操作优化到 $O(\log n)$

**基本模型**
```
步长: 1 → 2 → 4 → 8 → ... → 2^k
通过 O(log n) 次操作即可跳过 n 的距离
```

---

### 2. 倍增法的典型应用

**应用1：LCA（最近公共祖先）**

```cpp
// 倍增法求LCA
const int MAXN = 100005;
const int LOG = 20;
int depth[MAXN], fa[MAXN][LOG];

void dfs(int u, int p) {
    fa[u][0] = p;
    for (int j = 1; j < LOG; j++) {
        fa[u][j] = fa[fa[u][j-1]][j-1];
    }
    for (int v : g[u]) {
        if (v == p) continue;
        depth[v] = depth[u] + 1;
        dfs(v, u);
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    // 先让 u 和 v 在同一深度
    for (int j = LOG - 1; j >= 0; j--) {
        if (depth[fa[u][j]] >= depth[v]) {
            u = fa[u][j];
        }
    }
    if (u == v) return u;
    // 再一起向上跳
    for (int j = LOG - 1; j >= 0; j--) {
        if (fa[u][j] != fa[v][j]) {
            u = fa[u][j];
            v = fa[v][j];
        }
    }
    return fa[u][0];
}
```

**应用2：倍增跳跃**
- 从位置 $x$ 出发，每次跳 $2^k$ 步，共 $O(\log n)$ 步即可到达任意位置

**应用3：ST表（区间最值查询）**

```cpp
// ST表预处理
int st[MAXN][LOG], a[MAXN];

void buildST(int n) {
    for (int i = 0; i < n; i++) st[i][0] = a[i];
    for (int j = 1; (1 << j) <= n; j++) {
        for (int i = 0; i + (1 << j) - 1 < n; i++) {
            st[i][j] = max(st[i][j-1], st[i + (1 << (j-1))][j-1]);
        }
    }
}

// 查询区间 [l, r] 最大值
int queryMax(int l, int r) {
    int k = log2(r - l + 1);
    return max(st[l][k], st[r - (1 << k) + 1][k]);
}
```

---

### 3. 倍增法的时间复杂度

**分析**
- 预处理：$O(n \log n)$
- 查询：$O(\log n)$
- 总时间复杂度：$O(n \log n + q \log n)$（$q$ 次查询）

**为什么倍增有效**
- 任何正整数都可以表示为二进制形式
- 通过从大到小尝试 $2^k$ 的步长，可以在 $O(\log n)$ 步内完成任何跳跃

---

## 五、代数与平面几何

### 1. 一元一次方程

**概念**
- 一般形式：$ax + b = 0$（$a \neq 0$）
- 解：$x = -\frac{b}{a}$

**编程实现**
```cpp
double solveLinear(double a, double b) {
    if (a == 0) {
        // 特殊情况：b == 0 时无穷解，b != 0 时无解
        return NAN;
    }
    return -b / a;
}
```

**典型例题**
- 解方程 $3x + 6 = 0$：$x = -2$

---

### 2. 二元一次方程（方程组）

**概念**
- 形式：$\begin{cases} a_1 x + b_1 y = c_1 \\ a_2 x + b_2 y = c_2 \end{cases}$
- 解法：消元法、代入法

**编程实现（克莱姆法则）**
```cpp
#include <iostream>
using namespace std;

struct Result {
    bool hasSolution;
    double x, y;
};

Result solveLinearSystem(double a1, double b1, double c1,
                         double a2, double b2, double c2) {
    double det = a1 * b2 - a2 * b1;
    Result res;
    if (det == 0) {
        res.hasSolution = false;  // 无解或无穷多解
    } else {
        res.hasSolution = true;
        res.x = (c1 * b2 - c2 * b1) / det;
        res.y = (a1 * c2 - a2 * c1) / det;
    }
    return res;
}

int main() {
    // 2x + 3y = 8, x + y = 3
    Result r = solveLinearSystem(2, 3, 8, 1, 1, 3);
    if (r.hasSolution)
        cout << "x=" << r.x << " y=" << r.y << endl;
    // 输出: x=1 y=2
    return 0;
}
```

---

### 3. 三角形面积

**概念**
- **底×高公式**：$S = \frac{1}{2} \times \text{底} \times \text{高}$
- **海伦公式**：已知三边 $a, b, c$，半周长 $p = \frac{a+b+c}{2}$，$S = \sqrt{p(p-a)(p-b)(p-c)}$
- **坐标公式**：三个顶点 $(x_1,y_1)$, $(x_2,y_2)$, $(x_3,y_3)$，$S = \frac{1}{2}|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)|$

**编程实现**
```cpp
#include <cmath>
#include <iostream>
using namespace std;

// 方法1：底×高
double areaBaseHeight(double base, double height) {
    return 0.5 * base * height;
}

// 方法2：海伦公式
double areaHeron(double a, double b, double c) {
    double p = (a + b + c) / 2.0;
    return sqrt(p * (p - a) * (p - b) * (p - c));
}

// 方法3：坐标公式（向量叉积）
double areaCoords(double x1, double y1, double x2, double y2,
                  double x3, double y3) {
    return 0.5 * fabs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2));
}

int main() {
    cout << areaHeron(3, 4, 5) << endl;     // 6
    cout << areaCoords(0,0, 4,0, 0,3) << endl; // 6
    return 0;
}
```

---

### 4. 圆形面积

**概念**
- 面积公式：$S = \pi r^2$
- 周长公式：$C = 2\pi r$

**编程实现**
```cpp
const double PI = 3.14159265358979323846;

double areaCircle(double r) {
    return PI * r * r;
}

double circumference(double r) {
    return 2 * PI * r;
}
```

---

### 5. 长方形面积

**概念**
- 面积公式：$S = \text{长} \times \text{宽}$
- 周长公式：$C = 2 \times (\text{长} + \text{宽})$

**编程实现**
```cpp
double areaRectangle(double length, double width) {
    return length * width;
}

double perimeterRectangle(double length, double width) {
    return 2 * (length + width);
}
```

---

## 六、图论算法及综合应用

### 1. 图的基本概念

**概念**
- **图** $G = (V, E)$：顶点集 $V$，边集 $E$
- **有向图**：边有方向；**无向图**：边无方向
- **带权图**：边有权重；**无权图**：边无权重
- **连通图**：任意两点间有路径
- **树**：$n$ 个顶点、$n-1$ 条边的连通无环图

**存储方式**
```cpp
// 1. 邻接矩阵
int adj[MAXN][MAXN];

// 2. 邻接表
vector<int> g[MAXN];

// 3. 边列表（用于 Kruskal）
struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};
```

---

### 2. 最小生成树 — Kruskal 算法

**概念**
- 找到连接所有顶点的边集，使得总权重最小
- Kruskal 算法：按边权排序，依次加入不构成环的边
- 使用**并查集**判环

**时间复杂度**：$O(E \log E)$

**编程实现**
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 10005;
int parent[MAXN], rank_[MAXN];

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

bool unite(int x, int y) {
    x = find(x); y = find(y);
    if (x == y) return false;
    if (rank_[x] < rank_[y]) swap(x, y);
    parent[y] = x;
    if (rank_[x] == rank_[y]) rank_[x]++;
    return true;
}

struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};

int kruskal(Edge edges[], int n, int m) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        rank_[i] = 0;
    }
    sort(edges, edges + m);
    int totalWeight = 0;
    int count = 0;  // 已选边数
    for (int i = 0; i < m && count < n - 1; i++) {
        if (unite(edges[i].u, edges[i].v)) {
            totalWeight += edges[i].w;
            count++;
        }
    }
    if (count != n - 1) return -1;  // 不连通
    return totalWeight;
}
```

---

### 3. 最小生成树 — Prim 算法

**概念**
- 从某顶点出发，每次选连接已选集合和未选集合的最小权边
- 类似 Dijkstra，但维护的是到已选集合的最小距离

**时间复杂度**：$O(V^2)$ 或 $O(E \log V)$（优先队列优化）

**编程实现**
```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

const int MAXN = 10005;
const int INF = 0x3f3f3f3f;
vector<pair<int,int>> g[MAXN];  // g[u] = {(v, w)}
int dist[MAXN];
bool vis[MAXN];

int prim(int n) {
    // 从顶点1开始
    for (int i = 1; i <= n; i++) dist[i] = INF;
    dist[1] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 1});
    int totalWeight = 0;
    int count = 0;
    while (!pq.empty() && count < n) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        totalWeight += d;
        count++;
        for (auto [v, w] : g[u]) {
            if (!vis[v] && w < dist[v]) {
                dist[v] = w;
                pq.push({w, v});
            }
        }
    }
    if (count != n) return -1;  // 不连通
    return totalWeight;
}
```

---

### 4. 最短路径 — Dijkstra 算法

**概念**
- 求从源点到所有其他顶点的最短路径（**非负权边**）
- 贪心策略：每次选距离最小的未访问顶点

**时间复杂度**：$O(V^2)$ 或 $O(E \log V)$（优先队列优化）

**编程实现**
```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

const int MAXN = 10005;
const int INF = 0x3f3f3f3f;
vector<pair<int,int>> g[MAXN];  // g[u] = {(v, w)}
int dist[MAXN];
bool vis[MAXN];

void dijkstra(int src, int n) {
    for (int i = 1; i <= n; i++) dist[i] = INF;
    dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}

int main() {
    int n, m, src;
    cin >> n >> m >> src;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
        g[v].push_back({u, w});  // 无向图
    }
    dijkstra(src, n);
    for (int i = 1; i <= n; i++) {
        cout << dist[i] << " ";
    }
    return 0;
}
```

---

### 5. 最短路径 — Floyd 算法

**概念**
- 求所有顶点对之间的最短路径（全源最短路）
- 支持负权边，但**不支持负环**
- 时间复杂度：$O(V^3)$

**编程实现**
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 505;
const int INF = 0x3f3f3f3f;
int dist[MAXN][MAXN];

void floyd(int n) {
    // 初始化：dist[i][i] = 0，有边则为边权，无边为 INF
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
    int n, m;
    cin >> n >> m;
    // 初始化
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            dist[i][j] = (i == j) ? 0 : INF;
        }
    }
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v], w);
        dist[v][u] = min(dist[v][u], w);
    }
    floyd(n);
    // 输出所有最短路径
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (dist[i][j] == INF) cout << "INF ";
            else cout << dist[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

---

## 七、算法的时间和空间效率分析

### 1. 时间复杂度分析

**常见时间复杂度排序**
$$O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)$$

**常见算法的时间复杂度**

| 算法 | 时间复杂度 | 说明 |
|:---|:---|:---|
| 顺序查找 | $O(n)$ | 线性扫描 |
| 二分查找 | $O(\log n)$ | 每次排除一半 |
| 冒泡排序 | $O(n^2)$ | 两层循环 |
| 快速排序 | $O(n \log n)$ | 平均情况 |
| 归并排序 | $O(n \log n)$ | 稳定排序 |
| Dijkstra（堆优化） | $O(E \log V)$ | 单源最短路 |
| Floyd | $O(V^3)$ | 全源最短路 |
| Kruskal | $O(E \log E)$ | 最小生成树 |

---

### 2. 空间复杂度分析

**概念**
- 空间复杂度表示算法执行过程中需要的额外存储空间
- 常见空间复杂度：$O(1)$、$O(n)$、$O(n^2)$、$O(\log n)$

**典型分析**
- **递归**：空间复杂度 = 递归深度 × 每层空间
- **邻接矩阵存图**：$O(V^2)$
- **邻接表存图**：$O(V + E)$
- **滚动数组**：将二维数组优化为一维，空间从 $O(n^2)$ 降到 $O(n)$

---

### 3. 复杂度分析方法

**方法1：数循环次数**
```cpp
// O(n)
for (int i = 0; i < n; i++) {
    sum += a[i];
}

// O(n^2)
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        c[i][j] = a[i][j] + b[i][j];

// O(log n)
while (n > 1) {
    n = n / 2;
}
```

**方法2：递推关系**
- $T(n) = T(n-1) + O(1)$ → $O(n)$
- $T(n) = T(n/2) + O(1)$ → $O(\log n)$
- $T(n) = 2T(n/2) + O(n)$ → $O(n \log n)$（归并排序）

**方法3：均摊分析**
- 某些操作虽然单次代价高，但均摊到多次操作后代价低
- 例：动态数组扩容，均摊 $O(1)$

---

## 八、算法优化

### 1. 算法优化的基本思路

**思路1：降低时间复杂度**
- $O(n^2) \to O(n \log n)$：排序 + 二分
- $O(n^3) \to O(n^2)$：动态规划或数学优化

**思路2：减少冗余计算**
- 记忆化搜索 / 动态规划
- 预处理（前缀和、ST表等）

**思路3：剪枝**
- 在搜索过程中提前排除不可能的分支

---

### 2. 常见优化技巧

**技巧1：前缀和**
```cpp
// 预处理前缀和
int prefix[MAXN];
for (int i = 1; i <= n; i++) {
    prefix[i] = prefix[i-1] + a[i];
}
// 查询区间和 [l, r]
int sum = prefix[r] - prefix[l-1];
```

**技巧2：双指针/滑动窗口**
```cpp
// 在有序数组中找两数之和
int twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return left;
        else if (sum < target) left++;
        else right--;
    }
    return -1;
}
```

**技巧3：贪心优化**
- 每一步都选当前最优，保证全局最优

**技巧4：空间优化**
```cpp
// 动态规划空间优化：二维 → 一维
// 原始
int dp[MAXN][MAXN];
// 优化后（滚动数组）
int dp[MAXN];
for (int i = 1; i <= n; i++)
    for (int j = m; j >= 1; j--)  // 注意逆序
        dp[j] = max(dp[j], dp[j-1] + v[i]);
```

---

### 3. 优化案例分析

**案例1：两数之和**
- 暴力：$O(n^2)$ — 两层循环枚举
- 排序 + 双指针：$O(n \log n)$
- 哈希表：$O(n)$

**案例2：最大子数组和**
- 暴力：$O(n^3)$ — 枚举起点、终点，求和
- 前缀和优化：$O(n^2)$
- 分治 / 动态规划：$O(n)$

**案例3：最短路径**
- Floyd：$O(V^3)$ — 适合顶点数较少
- Dijkstra（堆优化）：$O(E \log V)$ — 适合稀疏图
- 根据图的特点选择合适算法

---

## 附录：GESP L8 知识模块速查表

| 模块 | 内容 | 关键词 |
|:---|:---|:---|
| 一 | 计数原理 | 加法原理、乘法原理、分类分步 |
| 二 | 排列与组合 | 排列数、组合数、全排列、编程实现 |
| 三 | 杨辉三角 | 帕斯卡三角形、组合数、二项式定理 |
| 四 | 倍增法 | 二进制拆分、LCA、ST表、$O(\log n)$ |
| 五 | 代数与平面几何 | 一元一次方程、二元一次方程、三角形/圆/长方形面积 |
| 六 | 图论算法 | Kruskal、Prim、Dijkstra、Floyd、最小生成树、最短路径 |
| 七 | 时间和空间效率分析 | 时间复杂度、空间复杂度、复杂度分析方法 |
| 八 | 算法优化 | 前缀和、双指针、贪心、空间优化 |

---

> 📝 说明：本文件为修正版，严格依据 GESP Level 8 官方大纲编写。
> 原文件错误地包含了 AC自动机、网络流Dinic、凸包、FFT/NTT、SAM、线段树、杜教筛等
> 超纲内容，这些均不在 GESP 八级考纲范围内。本修正版已将其全部移除。
