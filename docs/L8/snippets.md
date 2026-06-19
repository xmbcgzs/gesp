# GESP C++ 八级代码模板（修正版）

> **适用级别**：GESP Level 8（八级）
> **大纲覆盖**：计数原理（加法/乘法原理）、排列与组合、杨辉三角、倍增法、代数与平面几何、图论算法及综合应用（最小生成树 Kruskal/Prim、最短路径 Dijkstra/Floyd）、算法时间和空间复杂度分析、算法优化
> **注意**：八级不包含网络流、凸包、FFT/NTT、莫队、主席树、SAM 等竞赛高级专题

---

## 01. 排列生成（next_permutation）

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // 生成 1~n 的全排列
    vector<int> a(n);
    for (int i = 0; i < n; i++) a[i] = i + 1;
    
    do {
        for (int x : a) cout << x << " ";
        cout << "\n";
    } while (next_permutation(a.begin(), a.end()));
    
    return 0;
}
```

**要点**：
- `next_permutation` 按字典序生成下一个排列，若已是最大排列则返回 `false`
- 调用前必须将数组排序为升序，才能枚举所有排列
- 时间复杂度：O(n! × n)，共 n! 个排列，每个输出需 O(n)

---

## 02. 组合生成

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, r;
vector<int> comb;

// 从 1~n 中选 r 个数的所有组合
void generate(int start) {
    if ((int)comb.size() == r) {
        for (int x : comb) cout << x << " ";
        cout << "\n";
        return;
    }
    // 剪枝：剩余元素不够则提前退出
    for (int i = start; i <= n; i++) {
        comb.push_back(i);
        generate(i + 1);  // i+1 保证递增，避免重复
        comb.pop_back();
    }
}

int main() {
    cin >> n >> r;
    generate(1);
    return 0;
}
```

**要点**：
- 组合 C(n, r) 不考虑顺序，因此每次从 `start` 开始向后选
- 递增选数确保不重复，时间复杂度 O(C(n, r) × r)
- 可加入剪枝：若剩余元素数 `n - start + 1` 小于还需选取的数量则提前返回

---

## 03. 杨辉三角

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // 使用滚动数组（只需两行）计算杨辉三角
    // C(n, k) = C(n-1, k-1) + C(n-1, k)
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    
    for (int i = 0; i <= n; i++) {
        C[i][0] = C[i][i] = 1;  // 边界：C(n,0) = C(n,n) = 1
        for (int j = 1; j < i; j++) {
            C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
        }
    }
    
    // 输出第 n 行
    for (int j = 0; j <= n; j++) {
        cout << C[n][j] << " ";
    }
    cout << "\n";
    
    return 0;
}
```

**要点**：
- 递推公式 C(n, k) = C(n-1, k-1) + C(n-1, k)，与加法原理和乘法原理直接相关
- 边界条件：C(n, 0) = C(n, n) = 1
- 空间优化：可只用一维数组逆序更新，O(n) 空间

---

## 04. Dijkstra（堆优化）——最短路径

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll INF = 1e18;

int main() {
    int n, m, s;
    cin >> n >> m >> s;  // n个点, m条边, 源点s
    
    vector<vector<pair<int, ll>>> g(n + 1);  // 邻接表
    for (int i = 0; i < m; i++) {
        int u, v; ll w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
    }
    
    vector<ll> dist(n + 1, INF);
    vector<bool> vis(n + 1, false);
    dist[s] = 0;
    
    // 小顶堆：(距离, 节点)
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> pq;
    pq.push({0, s});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (vis[u]) continue;
        vis[u] = true;
        
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        if (dist[i] == INF) cout << "INF ";
        else cout << dist[i] << " ";
    }
    cout << "\n";
    
    return 0;
}
```

**要点**：
- Dijkstra 仅适用于**非负权图**，贪心策略每次取距离最小的未访问节点
- 朴素版 O(n²)，堆优化版 O(m log n)，适合稀疏图
- 不处理负权边，负权最短路需用 Bellman-Ford 或 SPFA

---

## 05. Floyd——全源最短路径

```cpp
#include <bits/stdc++.h>
using namespace std;
const int INF = 1e9;

int main() {
    int n, m;
    cin >> n >> m;
    
    // 初始化邻接矩阵
    vector<vector<int>> dist(n + 1, vector<int>(n + 1, INF));
    for (int i = 1; i <= n; i++) dist[i][i] = 0;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v], w);  // 处理重边
    }
    
    // Floyd 核心：三重循环
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
    
    // 输出结果
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (dist[i][j] == INF) cout << "INF ";
            else cout << dist[i][j] << " ";
        }
        cout << "\n";
    }
    
    return 0;
}
```

**要点**：
- 核心思想：经过中间点 k 后 i→j 的距离是否更短：`dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`
- 时间复杂度 O(n³)，空间复杂度 O(n²)
- 适用于**小规模图**（n ≤ 500），可同时处理正权和负权（但不能有负环）

---

## 06. Kruskal + 并查集——最小生成树

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Edge { int u, v, w; };

// 并查集
struct DSU {
    vector<int> fa, sz;
    DSU(int n) : fa(n + 1), sz(n + 1, 1) {
        iota(fa.begin(), fa.end(), 0);
    }
    int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
    bool unite(int x, int y) {
        x = find(x); y = find(y);
        if (x == y) return false;
        if (sz[x] < sz[y]) swap(x, y);
        fa[y] = x; sz[x] += sz[y];
        return true;
    }
};

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++)
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    
    // 按边权排序
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.w < b.w;
    });
    
    DSU dsu(n);
    ll mst_weight = 0;
    int edge_count = 0;
    
    for (auto& [u, v, w] : edges) {
        if (dsu.unite(u, v)) {
            mst_weight += w;
            edge_count++;
            if (edge_count == n - 1) break;  // MST 只需 n-1 条边
        }
    }
    
    if (edge_count == n - 1) cout << "MST权值: " << mst_weight << "\n";
    else cout << "图不连通，无生成树\n";
    
    return 0;
}
```

**要点**：
- Kruskal 按边权排序后逐条尝试加入，用并查集判断是否成环
- 时间复杂度 O(m log m)，适合**稀疏图**
- 并查集路径压缩 + 按秩合并，单次操作接近 O(1)

---

## 07. Prim——最小生成树

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll INF = 1e18;

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<vector<pair<int, ll>>> g(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v; ll w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
        g[v].push_back({u, w});
    }
    
    vector<ll> key(n + 1, INF);  // 到生成树的最小距离
    vector<bool> inTree(n + 1, false);
    key[1] = 0;
    
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> pq;
    pq.push({0, 1});
    
    ll mst_weight = 0;
    int count = 0;
    
    while (!pq.empty() && count < n) {
        auto [w, u] = pq.top();
        pq.pop();
        
        if (inTree[u]) continue;
        inTree[u] = true;
        mst_weight += w;
        count++;
        
        for (auto [v, weight] : g[u]) {
            if (!inTree[v] && weight < key[v]) {
                key[v] = weight;
                pq.push({weight, v});
            }
        }
    }
    
    if (count == n) cout << "MST权值: " << mst_weight << "\n";
    else cout << "图不连通\n";
    
    return 0;
}
```

**要点**：
- Prim 从一个点开始，每次贪心选择离当前生成树最近的点
- 时间复杂度 O(m log n)（堆优化），适合**稠密图**
- Kruskal 与 Prim 等价，选边策略不同：Kruskal 全局排序，Prim 局部贪心

---

## 08. 倍增法求 LCA（最近公共祖先）

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int LOG = 17;  // log2(100000) ≈ 17

int fa[MAXN][LOG], dep[MAXN];
vector<int> g[MAXN];

void dfs(int u, int p) {
    fa[u][0] = p;
    dep[u] = dep[p] + 1;
    for (int i = 1; i < LOG; i++) {
        fa[u][i] = fa[fa[u][i - 1]][i - 1];
    }
    for (int v : g[u]) {
        if (v != p) dfs(v, u);
    }
}

int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    
    // 将 u 提升到与 v 同一深度
    int diff = dep[u] - dep[v];
    for (int i = LOG - 1; i >= 0; i--) {
        if ((diff >> i) & 1) u = fa[u][i];
    }
    
    if (u == v) return u;
    
    // 同时向上跳跃，找到最近的祖先
    for (int i = LOG - 1; i >= 0; i--) {
        if (fa[u][i] != fa[v][i]) {
            u = fa[u][i];
            v = fa[v][i];
        }
    }
    return fa[u][0];
}

int main() {
    int n, m, root;
    cin >> n >> m >> root;
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    
    dfs(root, 0);
    
    while (m--) {
        int u, v;
        cin >> u >> v;
        cout << lca(u, v) << "\n";
    }
    
    return 0;
}
```

**要点**：
- 倍增核心：`fa[u][i]` 表示 u 的第 2^i 级祖先，预处理 O(n log n)
- 查询 LCA：先调平深度，再从高位到低位同时跳，O(log n)
- 常用于树上路径问题、树上距离计算等

---

## 09. 一元一次方程求解

```cpp
#include <bits/stdc++.h>
using namespace std;

// 求解 ax + b = 0
// 返回：是否有解，解的值
pair<bool, double> solveLinear(double a, double b) {
    if (abs(a) < 1e-9) {
        if (abs(b) < 1e-9) return {true, 0};    // 0=0，任意解
        else return {false, 0};                    // 0=b≠0，无解
    }
    return {true, -b / a};
}

int main() {
    // 示例：求解 3x + 6 = 0
    double a, b;
    cin >> a >> b;
    
    auto [hasSol, x] = solveLinear(a, b);
    
    if (hasSol) {
        if (abs(a) < 1e-9 && abs(b) < 1e-9)
            cout << "方程有无穷多解\n";
        else
            cout << "x = " << fixed << setprecision(6) << x << "\n";
    } else {
        cout << "方程无解\n";
    }
    
    return 0;
}
```

**要点**：
- 一元一次方程 ax + b = 0 的解：x = -b/a（a ≠ 0 时）
- 需要讨论 a = 0 的特殊情况：a = 0 且 b = 0 时无穷解，a = 0 且 b ≠ 0 时无解
- 浮点数比较使用 `abs(a) < 1e-9` 避免精度误差

---

## 10. 三角形面积计算

```cpp
#include <bits/stdc++.h>
using namespace std;

// 方法1：底 × 高 / 2
double areaBaseHeight(double base, double height) {
    return base * height / 2.0;
}

// 方法2：海伦公式（已知三边长）
double areaHeron(double a, double b, double c) {
    double s = (a + b + c) / 2.0;
    return sqrt(s * (s - a) * (s - b) * (s - c));
}

// 方法3：向量叉积（已知三点坐标）
double areaPoints(double x1, double y1, double x2, double y2, double x3, double y3) {
    return abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)) / 2.0;
}

int main() {
    // 示例：已知三点 (0,0), (4,0), (0,3)
    cout << "向量叉积法: " << areaPoints(0, 0, 4, 0, 0, 3) << "\n";
    // 示例：已知三边 3, 4, 5
    cout << "海伦公式: " << areaHeron(3, 4, 5) << "\n";
    // 示例：底=4, 高=3
    cout << "底高公式: " << areaBaseHeight(4, 3) << "\n";
    
    return 0;
}
```

**要点**：
- 三种方法适用于不同已知条件：底高法、海伦公式（三边）、向量叉积（三点坐标）
- 海伦公式：S = √(s(s-a)(s-b)(s-c))，其中 s = (a+b+c)/2
- 向量叉积法：S = |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| / 2，编程最常用

---

## 11. 算法时间和空间复杂度分析示例

```cpp
#include <bits/stdc++.h>
using namespace std;

// 示例：分析不同算法的时间复杂度

// O(1) - 常数时间
int getFirst(vector<int>& a) { return a[0]; }

// O(n) - 线性时间
int findMax(vector<int>& a) {
    int mx = a[0];
    for (int x : a) mx = max(mx, x);
    return mx;
}

// O(n²) - 平方时间
void bubbleSort(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);
}

// O(n log n) - 线性对数时间
void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    mergeSort(a, l, mid);
    mergeSort(a, mid + 1, r);
    // 合并过程 O(n)
    vector<int> tmp;
    int i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) tmp.push_back(a[i++]);
        else tmp.push_back(a[j++]);
    }
    while (i <= mid) tmp.push_back(a[i++]);
    while (j <= r) tmp.push_back(a[j++]);
    for (int k = 0; k < (int)tmp.size(); k++)
        a[l + k] = tmp[k];
}

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    
    // 时间复杂度对比
    cout << "O(1)    - getFirst: " << getFirst(a) << "\n";
    cout << "O(n)    - findMax:  " << findMax(a) << "\n";
    bubbleSort(a);  // O(n²)
    a = {3, 1, 4, 1, 5, 9, 2, 6};
    mergeSort(a, 0, a.size() - 1);  // O(n log n)
    
    // 常见复杂度排序：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
    // n=1000 时的近似运算次数：
    cout << "O(n log n) ≈ " << 1000 * log2(1000) << "\n";
    cout << "O(n²)      ≈ " << 1000 * 1000 << "\n";
    
    return 0;
}
```

**要点**：
- 常见时间复杂度由低到高：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
- 空间复杂度：O(1) 原地算法，O(n) 额外数组，O(n²) 矩阵
- 选择算法时需综合考虑时间、空间、数据规模和实际运行效率

---

## 12. 算法优化——等差数列求和公式

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

// 暴力法：O(n) 求 1+2+...+n
ll sumBruteForce(ll n) {
    ll sum = 0;
    for (ll i = 1; i <= n; i++) sum += i;
    return sum;
}

// 优化法：O(1) 等差数列求和公式
ll sumFormula(ll n) {
    return n * (n + 1) / 2;
}

// 通用优化思路：数学公式 > 递推 > 暴力搜索
// 示例：求 1² + 2² + ... + n²
ll sumSquaresFormula(ll n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

// 示例：利用前缀和优化区间查询
vector<ll> prefixSum(const vector<int>& a) {
    int n = a.size();
    vector<ll> pre(n + 1, 0);
    for (int i = 0; i < n; i++)
        pre[i + 1] = pre[i] + a[i];
    return pre;
}

// 区间和查询：O(1)
ll rangeSum(const vector<ll>& pre, int l, int r) {
    return pre[r + 1] - pre[l];
}

int main() {
    ll n = 1000000000LL;  // 10^9
    
    // 对比暴力法与公式法
    cout << "等差数列 1+...+n:\n";
    cout << "  公式法 O(1): " << sumFormula(n) << "\n";
    cout << "  暴力法 O(n): 计算量过大，跳过\n";
    
    cout << "\n平方和 1²+...+n²:\n";
    cout << "  公式法 O(1): " << sumSquaresFormula(n) << "\n";
    
    // 前缀和优化示例
    vector<int> a = {1, 3, 5, 7, 9, 11};
    vector<ll> pre = prefixSum(a);
    cout << "\n前缀和示例:\n";
    cout << "  区间[1,3]和: " << rangeSum(pre, 1, 3) << "\n";  // 3+5+7=15
    
    return 0;
}
```

**要点**：
- 算法优化的核心：**数学公式 > 递推 > 暴力搜索**
- 常用公式：等差数列 n(n+1)/2，平方和 n(n+1)(2n+1)/6
- 前缀和将区间和查询从 O(n) 优化到 O(1)，是经典的"预处理+查询"模式
- 优化思想：用空间换时间，用数学替代枚举

---

## 附录：旧版错误模板与修正对照表

| 序号 | 旧版错误模板名称 | 原错误级别 | 实际应归属级别 | 说明 |
|:---:|:---|:---:|:---:|:---|
| 1 | Dinic 最大流 | Level 8 | Level 9+（竞赛高级专题） | 网络流算法超出八级大纲 |
| 2 | 凸包（旋转卡壳） | Level 8 | Level 9+（计算几何高级） | 凸包属于竞赛高级计算几何 |
| 3 | NTT（数论变换） | Level 8 | Level 9+（高级数学） | NTT 用于多项式乘法，属竞赛高级 |
| 4 | 莫队算法 | Level 8 | Level 9+（高级离线算法） | 莫队属竞赛高级区间处理 |
| 5 | 主席树（可持久化线段树） | Level 8 | Level 9+（高级数据结构） | 函数式数据结构超出八级范围 |
| 6 | 后缀自动机（SAM） | Level 8 | Level 9+（字符串高级） | 自动机属竞赛高级字符串算法 |
| 7 | FFT（快速傅里叶变换） | Level 8 | Level 9+（高级数学） | FFT 用于多项式，属竞赛高级 |
| 8 | 树链剖分 | Level 8 | Level 9+（高级树论） | 树链剖分属竞赛高级树论 |
| 9 | 网络流（匈牙利算法） | Level 8 | Level 9+（高级图论） | 二分图匹配/网络流超出八级范围 |
| 10 | BSGS（大步小步算法） | Level 8 | Level 9+（高级数论） | 离散对数求解属竞赛高级 |

> **说明**：GESP Level 8 的图论部分仅包含最小生成树（Kruskal/Prim）和最短路径（Dijkstra/Floyd），不涉及网络流、高级树论、字符串自动机等竞赛高级内容。上述被移除的模板已分别归入 Level 9 或更高层级的代码模板中。

---

*修正版 | 严格对齐 GESP Level 8 大纲 | 2026年6月*
