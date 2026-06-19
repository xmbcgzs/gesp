# GESP Level 7 知识点整理（修正版）

> **说明**：本文档严格依据 GESP 七级考试大纲编写，涵盖四大知识板块。  
> **修订日期**：2026-06-19  
> **主要修订**：移除了原版中不属于 GESP 大纲的高级竞赛内容（如 Tarjan SCC、LCA、线段树、KMP、Trie 等），确保内容与官方大纲完全一致。

---

## 一、数学库常用函数

### 1.1 三角函数

| 函数 | 功能 | 头文件 | 示例 |
|------|------|--------|------|
| `sin(x)` | 正弦函数，x 为弧度 | `<cmath>` | `sin(3.14159/2)` → `1.0` |
| `cos(x)` | 余弦函数，x 为弧度 | `<cmath>` | `cos(0)` → `1.0` |

**要点：**
- 参数单位为**弧度**，不是角度。角度转弧度公式：`弧度 = 角度 × π / 180`
- `M_PI` 可表示 π（需定义 `_USE_MATH_DEFINES`）
- `tan(x)` = `sin(x) / cos(x)`，也是常用三角函数

### 1.2 对数函数

| 函数 | 功能 | 头文件 | 示例 |
|------|------|--------|------|
| `log10(x)` | 以 10 为底的对数 | `<cmath>` | `log10(100)` → `2.0` |
| `log2(x)` | 以 2 为底的对数 | `<cmath>` | `log2(8)` → `3.0` |
| `log(x)` | 自然对数（以 e 为底） | `<cmath>` | `log(1)` → `0.0` |

**要点：**
- 对数函数的参数必须为**正数**
- 换底公式：`log_a(b) = log(b) / log(a)`，可用于计算任意底数的对数
- 常用于计算一个数的位数：`位数 = (int)log10(n) + 1`

### 1.3 指数函数

| 函数 | 功能 | 头文件 | 示例 |
|------|------|--------|------|
| `exp(x)` | 计算 e^x | `<cmath>` | `exp(0)` → `1.0` |
| `pow(base, exp)` | 计算 base^exp | `<cmath>` | `pow(2, 10)` → `1024.0` |
| `sqrt(x)` | 计算 √x | `<cmath>` | `sqrt(9)` → `3.0` |

**要点：**
- `exp(x)` 与 `log(x)` 互为反函数
- `pow(a, b)` 计算 a 的 b 次幂，结果为 `double` 类型
- 注意整数幂的精度问题：大整数次幂可能溢出

---

## 二、复杂动态规划

### 2.1 二维动态规划

**概念：** 当状态需要两个（或多个）维度来描述时，需要使用二维（或多维）DP 数组。

**典型例题：数字三角形**

```cpp
// dp[i][j] 表示到达第 i 行第 j 列时的最大路径和
int dp[N][N];
dp[0][0] = a[0][0];
for (int i = 1; i < n; i++) {
    for (int j = 0; j <= i; j++) {
        dp[i][j] = a[i][j];
        if (j > 0) dp[i][j] = max(dp[i][j], dp[i-1][j-1] + a[i][j]);
        dp[i][j] = max(dp[i][j], dp[i-1][j] + a[i][j]);
    }
}
```

**典型例题：01背包（二维写法）**

```cpp
// dp[i][j] 表示前 i 个物品、容量为 j 时的最大价值
for (int i = 1; i <= n; i++) {
    for (int j = 0; j <= W; j++) {
        dp[i][j] = dp[i-1][j];  // 不选第 i 个
        if (j >= w[i]) {
            dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);  // 选第 i 个
        }
    }
}
```

### 2.2 动态规划最值优化

**概念：** 求最大值或最小值的 DP 问题，通常使用 `max()` / `min()` 进行状态转移。

**核心思路：**
- **最值型 DP** 的转移方程中包含 `max()` 或 `min()` 操作
- 优化方法包括：**单调队列优化**、**决策单调性优化**、**斜率优化**等（GESP 七级要求掌握基本概念）

**示例：最大子数组和（Kadane算法）**

```cpp
// dp[i] 表示以第 i 个元素结尾的最大子数组和
int dp[N];
dp[0] = a[0];
for (int i = 1; i < n; i++) {
    dp[i] = max(a[i], dp[i-1] + a[i]);
}
int ans = *max_element(dp, dp + n);
```

### 2.3 区间DP

**概念：** 在一个区间 `[i, j]` 上进行决策，将区间分成两部分或更多部分进行合并，逐步扩大区间范围。

**状态定义：** `dp[i][j]` 表示区间 `[i, j]` 上的最优解。

**转移方程（通用形式）：**
```
dp[i][j] = min/max over all k in [i, j) of { dp[i][k] + dp[k+1][j] + cost(i,j,k) }
```

**典型例题：石子合并**

```cpp
// dp[i][j] 表示合并区间 [i, j] 的最小代价
// sum[i][j] 表示区间 [i, j] 的石子总数
for (int len = 2; len <= n; len++) {       // 区间长度
    for (int i = 1; i + len - 1 <= n; i++) { // 左端点
        int j = i + len - 1;                 // 右端点
        dp[i][j] = INF;
        for (int k = i; k < j; k++) {        // 枚举分割点
            dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + sum[i][j]);
        }
    }
}
```

**要点：**
- 遍历顺序：**先枚举区间长度**，再枚举左端点，最后枚举分割点
- 时间复杂度通常为 O(n³)

### 2.4 最长递增子序列（LIS）

**概念：** 在一个序列中找到最长的子序列，使得子序列中的元素严格递增。

**方法一：O(n²) DP**

```cpp
// dp[i] 表示以第 i 个元素结尾的最长递增子序列长度
int dp[N];
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) {
            dp[i] = max(dp[i], dp[j] + 1);
        }
    }
}
int ans = *max_element(dp, dp + n);
```

**方法二：O(n log n) 贪心 + 二分**

```cpp
vector<int> tail;  // tail[i] 表示长度为 i+1 的递增子序列的最小末尾
for (int i = 0; i < n; i++) {
    auto it = lower_bound(tail.begin(), tail.end(), a[i]);
    if (it == tail.end()) {
        tail.push_back(a[i]);
    } else {
        *it = a[i];
    }
}
int ans = tail.size();
```

### 2.5 最长公共子序列（LCS）

**概念：** 给定两个序列，找到它们的最长公共子序列（子序列不要求连续）。

**状态转移方程：**
```
dp[i][j] = dp[i-1][j-1] + 1,                if a[i] == b[j]
dp[i][j] = max(dp[i-1][j], dp[i][j-1]),     otherwise
```

```cpp
int dp[N][N];
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (a[i] == b[j]) {
            dp[i][j] = dp[i-1][j-1] + 1;
        } else {
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
}
cout << dp[n][m];  // 最长公共子序列的长度
```

**要点：**
- 时间复杂度和空间复杂度均为 O(n×m)
- 可通过路径回溯输出具体的 LCS 内容
- 注意与**最长公共子串（连续）** 的区别

### 2.6 滚动数组优化

**概念：** 当 DP 状态转移只依赖于前一行（或前几行）时，可以用滚动数组将二维数组压缩为一维，节省空间。

**原理：** `dp[i]` 只依赖 `dp[i-1]`，因此只需要两行交替使用，甚至只需要一行。

**示例：01背包滚动数组优化**

```cpp
// 一维滚动数组（注意内层循环必须逆序！）
int dp[W + 1];
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {  // 逆序！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}
```

**LCS 滚动数组优化：**
```cpp
int dp[2][N];  // 只用两行
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (a[i] == b[j]) {
            dp[i%2][j] = dp[(i-1)%2][j-1] + 1;
        } else {
            dp[i%2][j] = max(dp[(i-1)%2][j], dp[i%2][j-1]);
        }
    }
}
cout << dp[n%2][m];
```

**要点：**
- 空间复杂度从 O(n×m) 降至 O(m)
- 01 背包必须**逆序遍历**，完全背包则**正序遍历**

---

## 三、图的定义及遍历

### 3.1 图的基本概念

**图（Graph）** 由**顶点（Vertex）** 和**边（Edge）** 组成，表示对象之间的关系。

| 类型 | 特点 | 示例 |
|------|------|------|
| **有向图** | 边有方向，(A→B) 与 (B→A) 不同 | 社交网络中的关注关系 |
| **无向图** | 边无方向，(A-B) 与 (B-A) 相同 | 地图上的道路 |

**节点的度（Degree）：**
- **无向图**：顶点 v 的度 = 与 v 相连的边的数量
- **有向图**：
  - **入度（In-degree）**：指向 v 的边的数量
  - **出度（Out-degree）**：从 v 出发的边的数量

### 3.2 图的存储方式

**邻接矩阵：**
```cpp
int graph[N][N];  // graph[i][j] 表示从 i 到 j 的边权
```
- 优点：查询边是否存在 O(1)
- 缺点：空间复杂度 O(n²)，稀疏图浪费空间

**邻接表：**
```cpp
vector<int> graph[N];  // graph[i] 存储与 i 相邻的顶点
// 有权图：
vector<pair<int,int>> graph[N];  // graph[i] 存储 (邻居, 边权)
```
- 优点：空间复杂度 O(n + m)，适合稀疏图
- 缺点：查询边是否存在需要 O(degree)

### 3.3 深度优先搜索（DFS）

**概念：** 从一个顶点出发，沿一条路径尽可能深地探索，直到无法继续再回溯。

**递归实现：**
```cpp
bool visited[N];
vector<int> graph[N];

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";
    for (int v : graph[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}
```

**非递归实现（使用栈）：**
```cpp
void dfs(int start) {
    stack<int> st;
    st.push(start);
    visited[start] = true;
    while (!st.empty()) {
        int u = st.top(); st.pop();
        cout << u << " ";
        for (int v : graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                st.push(v);
            }
        }
    }
}
```

**特点：**
- 时间复杂度：O(n + m)，n 为顶点数，m 为边数
- 适用于：路径搜索、连通性判断、回溯类问题

### 3.4 广度优先搜索（BFS）

**概念：** 从一个顶点出发，先访问所有距离为 1 的顶点，再访问距离为 2 的顶点，依此类推。

```cpp
void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

**特点：**
- 时间复杂度：O(n + m)
- 适用于：**无权图的最短路径**、层序遍历、最短步数问题

### 3.5 泛洪填充（Flood Fill）

**概念：** 从一个种子点出发，将与其相连的、满足条件的区域全部标记或填充。类似于"油漆桶"工具。

**典型应用：**
- 连通块计数（如计算地图上有多少个独立的区域）
- 图像处理中的区域填充
- 围棋中的气的计算

```cpp
// 统计连通块数量
int count = 0;
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        if (!visited[i][j] && grid[i][j] == '.') {
            bfs(i, j);  // 或 dfs(i, j)
            count++;
        }
    }
}
cout << "连通块数量: " << count << endl;
```

**四方向移动：**
```cpp
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

bool isValid(int x, int y) {
    return x >= 0 && x < n && y >= 0 && y < m;
}
```

---

## 四、哈希表的概念与知识及其应用

### 4.1 哈希表的基本概念

**哈希表（Hash Table）** 是一种通过**哈希函数**将键（Key）映射到数组下标，从而实现快速查找的数据结构。

**核心思想：** `下标 = Hash(键) % 表长`

| 操作 | 平均时间复杂度 | 最坏时间复杂度 |
|------|--------------|--------------|
| 插入 | O(1) | O(n) |
| 查找 | O(1) | O(n) |
| 删除 | O(1) | O(n) |

### 4.2 常见的哈希函数

| 哈希函数 | 适用场景 | 公式 |
|---------|---------|------|
| 直接定址法 | 键值范围较小 | `H(key) = key` |
| 除留余数法 | 通用 | `H(key) = key % p`（p 为质数） |
| 平方取中法 | 键值分布不均匀 | 取 key² 的中间几位 |
| 字符串哈希 | 字符串键 | 如 BKDRHash、DJBHash |

**字符串哈希示例（BKDRHash）：**
```cpp
unsigned int BKDRHash(string s) {
    unsigned int seed = 131;
    unsigned int hash = 0;
    for (char c : s) {
        hash = hash * seed + c;
    }
    return hash;
}
```

### 4.3 哈希冲突及解决方法

**哈希冲突：** 不同的键经过哈希函数后映射到相同的下标。

**方法一：链地址法（拉链法）**

每个位置存储一个链表（或 vector），冲突的元素追加到链表中。

```cpp
const int MOD = 10007;
vector<int> hashTable[MOD];

void insert(int key) {
    int idx = key % MOD;
    hashTable[idx].push_back(key);
}

bool search(int key) {
    int idx = key % MOD;
    for (int x : hashTable[idx]) {
        if (x == key) return true;
    }
    return false;
}
```

**方法二：开放定址法（线性探测）**

冲突时向后探测下一个空位。

```cpp
const int MOD = 10007;
int table[MOD];
bool used[MOD];

void insert(int key) {
    int idx = key % MOD;
    while (used[idx]) {
        idx = (idx + 1) % MOD;  // 线性探测
    }
    table[idx] = key;
    used[idx] = true;
}

bool search(int key) {
    int idx = key % MOD;
    while (used[idx]) {
        if (table[idx] == key) return true;
        idx = (idx + 1) % MOD;
    }
    return false;
}
```

### 4.4 装填因子

**装填因子（Load Factor）** α = 已存元素个数 / 表长

- α 越小，冲突越少，但空间浪费越多
- α 越大，空间利用率高，但冲突增多
- 一般建议 α ≤ 0.75
- 当 α 超过阈值时，需要进行**扩容**（通常将表长扩大一倍，并重新哈希所有元素）

### 4.5 哈希表的应用

**应用一：快速查找与去重**
```cpp
// 统计不重复元素的数量
set<int> seen;  // 底层为红黑树，也可用 unordered_set（哈希表）
int count = 0;
for (int x : arr) {
    if (seen.find(x) == seen.end()) {
        seen.insert(x);
        count++;
    }
}
```

**应用二：计数与频率统计**
```cpp
// 统计每个字符出现的次数
unordered_map<char, int> freq;
for (char c : s) {
    freq[c]++;
}
```

**应用三：两数之和（经典问题）**
```cpp
// 找到数组中两个数使其和为 target
unordered_map<int, int> mp;  // 值 -> 下标
for (int i = 0; i < n; i++) {
    int complement = target - a[i];
    if (mp.find(complement) != mp.end()) {
        cout << mp[complement] << " " << i << endl;
    }
    mp[a[i]] = i;
}
```

**应用四：子数组和（前缀和 + 哈希）**
```cpp
// 找到和为 k 的连续子数组个数
unordered_map<int, int> mp;
mp[0] = 1;
int sum = 0, count = 0;
for (int i = 0; i < n; i++) {
    sum += a[i];
    if (mp.find(sum - k) != mp.end()) {
        count += mp[sum - k];
    }
    mp[sum]++;
}
```

---

## 总结

| 知识板块 | 核心内容 |
|---------|---------|
| 数学库常用函数 | sin/cos、log10/log2、exp/pow/sqrt，参数与精度 |
| 复杂动态规划 | 二维DP、最值优化、区间DP、LIS/LCS、滚动数组 |
| 图的定义及遍历 | 有向图/无向图、度、邻接矩阵/表、DFS/BFS、泛洪填充 |
| 哈希表 | 哈希函数、冲突解决（链地址/开放定址）、装填因子、应用 |

---

*本文档仅供 GESP 七级备考参考，如有疑问请以官方最新大纲为准。*
