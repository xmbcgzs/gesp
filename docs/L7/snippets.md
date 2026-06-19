# GESP C++ 七级代码模板（修正版）

> 共 12 段高频代码模板，严格对应 GESP 七级考纲：数学库常用函数、复杂动态规划（二维DP/区间DP/LIS/LCS/滚动数组优化）、图的定义及遍历（DFS/BFS/泛洪算法）、哈希表

---

## 01. 数学库函数（sin / cos / log10 / log2 / exp）

```cpp
#include <cmath>
#include <iostream>
using namespace std;

int main() {
    double x = 1.0;

    // 三角函数（参数为弧度）
    double s = sin(x);          // 正弦
    double c = cos(x);          // 余弦
    double t = tan(x);          // 正切

    // 对数函数
    double l10 = log10(x);      // 以 10 为底的对数
    double l2  = log2(x);       // 以 2 为底的对数
    double ln  = log(x);        // 自然对数（以 e 为底）

    // 指数函数
    double e = exp(x);          // e 的 x 次方

    // 幂运算与开方
    double pw = pow(2.0, 10);   // 2^10 = 1024
    double sq = sqrt(25.0);     // √25 = 5

    cout << "sin(1)=" << s << " cos(1)=" << c << endl;
    cout << "log10(100)=" << l10 << " log2(1024)=" << l2 << endl;
    cout << "exp(1)=" << e << endl;
    return 0;
}
```

**要点**：`sin`/`cos` 参数单位是**弧度**，不是角度（角度需 × π/180 转换）。`log` 是自然对数，`log10` 是常用对数，`log2` 是二进制对数。`pow(a,b)` 计算 a^b，`sqrt(x)` 计算 √x。注意浮点数比较要使用精度 EPS。

---

## 02. 二维 DP 基础（0-1 背包）

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 1005;
int n, W;
int w[MAXN], v[MAXN];  // w[i]=重量, v[i]=价值
int dp[MAXN][MAXN];    // dp[i][j]=前i个物品、容量为j的最大价值

int main() {
    cin >> n >> W;
    for (int i = 1; i <= n; i++) cin >> w[i] >> v[i];

    // 初始化：dp[0][0..W] = 0（0个物品价值为0）
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            dp[i][j] = dp[i - 1][j];  // 不选第 i 个物品
            if (j >= w[i])
                dp[i][j] = max(dp[i][j], dp[i - 1][j - w[i]] + v[i]); // 选
        }
    }
    cout << dp[n][W] << endl;
    return 0;
}
```

**要点**：二维 DP 的核心是明确 `dp[i][j]` 的含义（前 i 个物品、容量 j 的最大价值）。转移方程：不选第 i 个 → `dp[i-1][j]`；选第 i 个 → `dp[i-1][j-w[i]] + v[i]`。初始化边界条件（i=0 或 j=0 时的值）要正确。

---

## 03. 区间 DP（矩阵链乘法 / 戳气球）

```cpp
#include <iostream>
#include <algorithm>
#include <climits>
using namespace std;

const int MAXN = 105;
int n;
int p[MAXN];     // p[]为矩阵维度数组，矩阵i为p[i-1]×p[i]
int dp[MAXN][MAXN]; // dp[l][r] = 从 l 到 r 的最小乘法次数

int main() {
    cin >> n;
    for (int i = 0; i <= n; i++) cin >> p[i];

    // 区间DP：先枚举区间长度，再枚举左右端点
    for (int len = 2; len <= n; len++) {       // 区间长度
        for (int l = 1; l + len - 1 <= n; l++) { // 左端点
            int r = l + len - 1;                   // 右端点
            dp[l][r] = INT_MAX;
            for (int k = l; k < r; k++) {          // 分割点
                dp[l][r] = min(dp[l][r],
                    dp[l][k] + dp[k + 1][r] + p[l - 1] * p[k] * p[r]);
            }
        }
    }
    cout << dp[1][n] << endl;
    return 0;
}
```

**要点**：区间 DP 的三重循环顺序：**区间长度 → 左端点 → 分割点**。`dp[l][r]` 表示区间 [l, r] 的最优解。枚举分割点 k，将区间分为 [l,k] 和 [k+1,r] 两部分合并。长度为 1 的区间初始化为 0（无需操作）。

---

## 04. LIS 最长递增子序列 O(n²)

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 1005;
int n, a[MAXN];
int dp[MAXN]; // dp[i] = 以 a[i] 结尾的 LIS 长度

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int i = 0; i < n; i++) {
        dp[i] = 1;  // 每个元素自身构成长度为1的子序列
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i])
                dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    cout << *max_element(dp, dp + n) << endl;
    return 0;
}
```

**要点**：`dp[i]` 表示以 `a[i]` 结尾的最长递增子序列长度。对每个 i，枚举所有 j < i，若 `a[j] < a[i]` 则可以接在后面。最终答案为 `max(dp[0..n-1])`。时间复杂度 O(n²)，适用于 n ≤ 1000 的情况。

---

## 05. LIS 最长递增子序列 O(n log n)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // tail[i] = 长度为 i+1 的 LIS 的最小末尾元素
    vector<int> tail;

    for (int i = 0; i < n; i++) {
        auto it = lower_bound(tail.begin(), tail.end(), a[i]);
        if (it == tail.end()) {
            tail.push_back(a[i]);     // 延长 LIS
        } else {
            *it = a[i];               // 替换，保持最小末尾
        }
    }
    cout << tail.size() << endl;
    return 0;
}
```

**要点**：维护一个数组 `tail`，`tail[i]` 表示长度为 `i+1` 的递增子序列的最小末尾元素。对每个新元素，用 `lower_bound` 二分查找第一个 ≥ 它的位置：若找到则替换（贪心保持最小末尾），否则追加（LIS 长度 +1）。时间复杂度 O(n log n)。若要求**严格递增**用 `lower_bound`，**非严格递增**用 `upper_bound`。

---

## 06. LCS 最长公共子序列

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

const int MAXN = 1005;
int dp[MAXN][MAXN]; // dp[i][j] = s1前i个字符与s2前j个字符的LCS长度

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int n = s1.size(), m = s2.size();

    // 边界：dp[0][j] = 0, dp[i][0] = 0（已由全局初始化为0）

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s1[i - 1] == s2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;  // 字符匹配
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]); // 取较大值
        }
    }
    cout << dp[n][m] << endl;
    return 0;
}
```

**要点**：`dp[i][j]` 表示字符串 `s1` 的前 i 个字符和 `s2` 的前 j 个字符的 LCS 长度。转移：若 `s1[i-1]==s2[j-1]`，则 `dp[i][j] = dp[i-1][j-1]+1`；否则 `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`。时间复杂度 O(nm)，空间复杂度 O(nm)。

---

## 07. 滚动数组优化（二维DP → 一维）

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 1005;
int n, W;
int w[MAXN], v[MAXN];
int dp[MAXN]; // 滚动数组，只需一维

int main() {
    cin >> n >> W;
    for (int i = 1; i <= n; i++) cin >> w[i] >> v[i];

    // 0-1背包滚动数组优化：逆序遍历容量
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {  // 逆序！防止重复选取
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    cout << dp[W] << endl;
    return 0;
}
```

**要点**：当二维 DP 中 `dp[i][j]` 只依赖 `dp[i-1][...]` 时，可以压缩为一维数组。**关键**：0-1 背包必须**逆序**遍历容量 j（从大到小），确保每个物品只用一次；完全背包则**正序**遍历（从小到大），允许重复选取。空间从 O(nW) 降为 O(W)。

---

## 08. 图的邻接表存储

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 1005;
int n, m;         // n=顶点数, m=边数
vector<int> g[MAXN]; // 邻接表：g[u] 存储 u 的所有邻居

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);  // 无向图
        g[v].push_back(u);
        // 有向图只保留: g[u].push_back(v);
    }

    // 打印邻接表
    for (int u = 1; u <= n; u++) {
        cout << u << " -> ";
        for (int v : g[u]) cout << v << " ";
        cout << endl;
    }
    return 0;
}
```

**要点**：邻接表适合稀疏图（边数远小于 n²），空间 O(n+m)。无向图需存两条边（u→v 和 v→u），有向图只存一条。`vector<int> g[MAXN]` 中 `g[u]` 存储 u 的所有邻居。也可用 `vector<pair<int,int>>` 存带权边（`{邻居, 权值}`）。

---

## 09. 图的 DFS 遍历（深度优先搜索）

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 1005;
int n, m;
vector<int> g[MAXN];
bool vis[MAXN]; // 标记是否已访问

void dfs(int u) {
    vis[u] = true;
    cout << u << " ";  // 访问节点 u（按需修改处理逻辑）
    for (int v : g[u]) {
        if (!vis[v]) {
            dfs(v);     // 递归访问未访问的邻居
        }
    }
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    // 可能存在多个连通分量，需要遍历所有节点
    int components = 0;
    for (int i = 1; i <= n; i++) {
        if (!vis[i]) {
            dfs(i);
            components++;
            cout << endl;
        }
    }
    cout << "连通分量个数: " << components << endl;
    return 0;
}
```

**要点**：DFS 使用递归（或栈）实现，沿一条路径深入到底再回溯。必须用 `vis[]` 数组防止重复访问和死循环。注意图可能不连通，需要对每个未访问节点调用一次 DFS 以统计连通分量。时间复杂度 O(n+m)。

---

## 10. 图的 BFS 遍历（广度优先搜索）

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const int MAXN = 1005;
int n, m;
vector<int> g[MAXN];
bool vis[MAXN];
int dist[MAXN]; // 可选：记录最短距离（按层）

void bfs(int start) {
    queue<int> q;
    q.push(start);
    vis[start] = true;
    dist[start] = 0;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";  // 访问节点 u

        for (int v : g[u]) {
            if (!vis[v]) {
                vis[v] = true;
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    cout << endl;
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    bfs(1);  // 从节点 1 开始 BFS

    // 打印各点到起点的最短距离
    for (int i = 1; i <= n; i++)
        cout << "dist[" << i << "]=" << dist[i] << " ";
    cout << endl;
    return 0;
}
```

**要点**：BFS 使用队列，按层逐层扩展，天然求无权图最短路径。入队时标记 `vis`（而非出队时），避免重复入队。`dist[]` 记录从起点到各点的最短距离。时间复杂度 O(n+m)。BFS 适合求最短路径，DFS 适合求连通性/路径枚举。

---

## 11. 泛洪算法（Flood Fill）

```cpp
#include <iostream>
#include <queue>
using namespace std;

const int MAXN = 1005;
int n, m;
char grid[MAXN][MAXN]; // 网格图
bool vis[MAXN][MAXN];

// 四个方向：上、下、左、右
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};

// BFS 泛洪：从 (sx, sy) 开始，填充整个连通区域
void floodFill(int sx, int sy, char target, char replacement) {
    if (grid[sx][sy] != target) return;

    queue<pair<int,int>> q;
    q.push({sx, sy});
    vis[sx][sy] = true;
    grid[sx][sy] = replacement;

    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();

        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue; // 越界
            if (vis[nx][ny] || grid[nx][ny] != target) continue;

            vis[nx][ny] = true;
            grid[nx][ny] = replacement;
            q.push({nx, ny});
        }
    }
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    int sx, sy;
    cin >> sx >> sy;

    floodFill(sx, sy, grid[sx][sy], '#');

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++)
            cout << grid[i][j];
        cout << endl;
    }
    return 0;
}
```

**要点**：泛洪算法用于在网格中找出与起点颜色相同的连通区域并填充。BFS/DFS 均可实现。核心步骤：①检查边界合法性；②检查颜色匹配；③标记已访问并替换颜色。`dx/dy` 数组简化四方向遍历。也可改用 DFS 递归实现（更简洁但可能栈溢出）。

---

## 12. 哈希表（unordered_map）

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    unordered_map<string, int> mp; // 键→值映射

    // 插入/修改
    mp["apple"] = 3;
    mp["banana"] = 5;
    mp.insert({"cherry", 2});

    // 查找
    if (mp.find("apple") != mp.end())
        cout << "apple: " << mp["apple"] << endl;

    // 计数/统计频率
    string words[] = {"cat", "dog", "cat", "bird", "dog", "cat"};
    unordered_map<string, int> freq;
    for (string& w : words) freq[w]++;

    for (auto& [key, val] : freq)
        cout << key << ": " << val << "次" << endl;

    // 删除
    mp.erase("banana");

    // 遍历
    for (auto& [k, v] : mp)
        cout << k << " = " << v << endl;

    // size / empty
    cout << "当前元素个数: " << mp.size() << endl;

    return 0;
}
```

**要点**：`unordered_map` 基于哈希表实现，查找/插入/删除平均 O(1)，最坏 O(n)。注意：`mp[key]` 若 key 不存在会**自动插入默认值**，查找时应用 `find()` 避免误插入。遍历顺序不确定。若需有序可用 `map`（O(log n)）。

---

## 附录：旧版错误模板 → 正确级别对照表

| 旧版模板名称（不属于七级） | 应归属级别 | 说明 |
|---|---|---|
| 线段树建树 | GESP 八级 | 高级数据结构，需掌握基础线段树操作 |
| KMP next 数组 | GESP 八级 | 字符串高级算法 |
| 树状数组 update | GESP 八级 | 高级数据结构 |
| 树状数组 query | GESP 八级 | 高级数据结构 |
| Tarjan SCC 强连通分量 | GESP 八级 | 图论高级算法 |
| LCA 倍增求最近公共祖先 | GESP 八级 | 树上高级算法 |
| 树链剖分求 LCA | GESP 八级 | 树上高级算法 |
| 状压 DP TSP | GESP 八级 | 状态压缩动态规划 |
| 字典树 Trie | GESP 八级 | 高级字符串数据结构 |
| Z-function | GESP 八级 | 字符串高级算法 |
| ST 表 | GESP 八级 | 高级数据结构 |
| 后缀数组 | GESP 八级 | 字符串高级算法 |

> **七级考纲范围**：数学库常用函数(sin/cos/log10/log2/exp)、复杂动态规划(二维DP/区间DP/LIS/LCS/滚动数组优化)、图的定义及遍历(DFS/BFS/泛洪算法)、哈希表。上述旧模板均超出七级范围，已移至八级模板。
