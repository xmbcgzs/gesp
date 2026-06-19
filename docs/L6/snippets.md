# GESP C++ 六级代码模板（修正版）

> 严格依据 CCF GESP 六级大纲，共 **15段** 代码模板
>
> ⚠️ 修正说明：原文件中 Dijkstra、Floyd、Kruskal（八级）、LIS（七级）、GCD/快速幂/欧拉筛/二分（五级）等均不属于六级，已全部替换为六级大纲内的正确模板。

---

## 一、树相关（模板 1–4）

### 01. 哈夫曼树 WPL 计算

```cpp
#include <cstdio>
#include <queue>
using namespace std;
int main() {
    int n;
    scanf("%d", &n);
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int i = 0; i < n; i++) {
        long long w;
        scanf("%lld", &w);
        pq.push(w);
    }
    long long ans = 0;
    if (n == 1) ans = pq.top();  // 边界：只有一种字符
    else while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        ans += a + b;             // 累加合并代价 = WPL
        pq.push(a + b);
    }
    printf("%lld\n", ans);
    return 0;
}
```

**要点**：WPL = 所有合并代价之和，无需真正建树

---

### 02. 完全二叉树 — 数组存储与遍历

```cpp
// 数组存储（下标从1开始）
// 节点i的左孩子 = 2*i，右孩子 = 2*i+1，父节点 = i/2

int a[N];  // 节点值，a[1]为根

// 中序遍历
void inorder(int i, int n) {
    if (i > n) return;
    inorder(2 * i, n);
    printf("%d ", a[i]);
    inorder(2 * i + 1, n);
}

// 层序遍历（就是按数组顺序输出）
for (int i = 1; i <= n; i++) printf("%d ", a[i]);
```

**要点**：完全二叉树用数组存储最高效，不需要指针

---

### 03. BST 插入与搜索

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

// 搜索（返回深度，-1表示未找到）
int search(Node* root, int val, int depth) {
    if (!root) return -1;
    if (root->val == val) return depth;
    if (val < root->val) return search(root->left, val, depth + 1);
    else return search(root->right, val, depth + 1);
}

// 中序遍历（输出有序序列）
void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->val);
    inorder(root->right);
}
```

**要点**：BST 中序遍历一定是递增有序序列

---

### 04. 二叉树前序/中序/后序遍历

```cpp
struct TreeNode {
    int val;
    TreeNode *left, *right;
};

// 前序：根→左→右
void preorder(TreeNode* root) {
    if (!root) return;
    printf("%d ", root->val);
    preorder(root->left);
    preorder(root->right);
}

// 中序：左→根→右
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->val);
    inorder(root->right);
}

// 后序：左→右→根
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->val);
}
```

**要点**：先序+中序 可唯一确定一棵二叉树；后序+中序 也可以

---

## 二、编码相关（模板 5–6）

### 05. 格雷编码生成（异或法）

```cpp
// 生成n位格雷编码序列
int n;
scanf("%d", &n);
int total = 1 << n;  // 2^n
for (int i = 0; i < total; i++) {
    int gray = i ^ (i >> 1);  // 核心公式
    for (int j = n - 1; j >= 0; j--)
        printf("%d", (gray >> j) & 1);
    printf("\n");
}
```

**要点**：`gray(i) = i XOR (i >> 1)`，相邻编码恰好1位不同

---

### 06. 格雷编码生成（递推法）

```cpp
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int n;
scanf("%d", &n);
vector<string> gray = {"0", "1"};
for (int i = 2; i <= n; i++) {
    vector<string> next;
    for (auto& s : gray) next.push_back("0" + s);   // 前半加0
    reverse(gray.begin(), gray.end());
    for (auto& s : gray) next.push_back("1" + s);   // 后半反转加1
    gray = next;
}
for (auto& s : gray) printf("%s\n", s.c_str());
```

**要点**：G(n) = "0"+G(n-1) 拼接 "1"+reverse(G(n-1))

---

## 三、搜索算法（模板 7–9）

### 07. DFS — 网格搜索（递归）

```cpp
int n, m;
int grid[N][N];
bool vis[N][N];
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

void dfs(int x, int y) {
    vis[x][y] = true;
    for (int d = 0; d < 4; d++) {
        int nx = x + dx[d], ny = y + dy[d];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m
            && !vis[nx][ny] && grid[nx][ny] == 1)
            dfs(nx, ny);
    }
}

// 遍历所有连通分量
int cnt = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        if (grid[i][j] == 1 && !vis[i][j]) {
            dfs(i, j);
            cnt++;
        }
```

**要点**：DFS 适合求连通分量、路径搜索；注意边界和访问标记

---

### 08. BFS — 层序遍历 / 最短路径

```cpp
#include <queue>
// 二叉树层序遍历
queue<int> q;
q.push(1);  // 根节点
while (!q.empty()) {
    int sz = q.size();
    for (int i = 0; i < sz; i++) {
        int u = q.front(); q.pop();
        printf("%d ", u);
        if (lch[u] != -1) q.push(lch[u]);
        if (rch[u] != -1) q.push(rch[u]);
    }
    printf("\n");
}

// BFS求无权图最短路径
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
```

**要点**：BFS 天然求无权图最短路径；层序遍历用 `sz` 控制每层

---

### 09. DFS — 二叉树非递归（栈实现）

```cpp
#include <stack>
void dfs_iter(TreeNode* root) {
    if (!root) return;
    stack<TreeNode*> st;
    st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        printf("%d ", node->val);
        // 注意：先右后左，保证左先出栈
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
}
```

**要点**：非递归前序遍历，先压右孩子再压左孩子

---

## 四、动态规划（模板 10–12）

### 10. 0/1 背包（逆序！）

```cpp
int n, W;
scanf("%d%d", &n, &W);
int w[N], v[N];
for (int i = 0; i < n; i++) scanf("%d%d", &w[i], &v[i]);
int dp[N] = {0};
for (int i = 0; i < n; i++)
    for (int j = W; j >= w[i]; j--)         // 逆序！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
printf("%d\n", dp[W]);
```

**要点**：0/1背包内层**逆序**，保证每个物品只用一次

---

### 11. 完全背包（正序！）

```cpp
int n, W;
scanf("%d%d", &n, &W);
int w[N], v[N];
for (int i = 0; i < n; i++) scanf("%d%d", &w[i], &v[i]);
int dp[N] = {0};
for (int i = 0; i < n; i++)
    for (int j = w[i]; j <= W; j++)          // 正序！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
printf("%d\n", dp[W]);
```

**要点**：完全背包内层**正序**，允许同一物品重复选择

---

### 12. 一维 DP（打家劫舍 / 不相邻最大和）

```cpp
// 不能选相邻元素，求最大和
int n, a[N];
scanf("%d", &n);
for (int i = 0; i < n; i++) scanf("%d", &a[i]);
int dp[N];
dp[0] = a[0];
if (n > 1) dp[1] = max(a[0], a[1]);
for (int i = 2; i < n; i++)
    dp[i] = max(dp[i - 1], dp[i - 2] + a[i]);
printf("%d\n", dp[n - 1]);
```

**要点**：dp[i] = max(不选第i个, 选第i个)；注意 n=1 的边界

---

## 五、栈和队列（模板 13–15）

### 13. 括号匹配（栈）

```cpp
#include <cstdio>
#include <stack>
using namespace std;
char s[100005];

int main() {
    scanf("%s", s);
    int depth = 0, maxDepth = 0;
    bool valid = true;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(') {
            depth++;
            if (depth > maxDepth) maxDepth = depth;
        } else {
            depth--;
            if (depth < 0) { valid = false; break; }
        }
    }
    if (depth != 0) valid = false;
    printf("%d\n", valid ? maxDepth : -1);
    return 0;
}
```

**要点**：depth < 0 说明右括号多余；最终 depth ≠ 0 说明左括号多余

---

### 14. 循环队列

```cpp
const int MAX = 5;  // 容量5，实际最多存4个
int queue[MAX];
int front = 0, rear = 0;

void enqueue(int x) {
    queue[rear] = x;
    rear = (rear + 1) % MAX;
}

void dequeue() {
    front = (front + 1) % MAX;
}

bool isFull() {
    return (rear + 1) % MAX == front;
}

bool isEmpty() {
    return front == rear;
}

int size() {
    return (rear - front + MAX) % MAX;
}
```

**要点**：留一个空位区分满和空；判满 `(rear+1)%MAX==front`

---

### 15. 栈模拟 — 出栈序列判断

```cpp
#include <cstdio>
#include <stack>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    stack<int> st;
    int next = 1;
    bool valid = true;
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        while (st.empty() || st.top() != x) {
            if (next > n) { valid = false; break; }
            st.push(next++);
        }
        st.pop();
    }
    printf("%s\n", valid ? "Yes" : "No");
    return 0;
}
```

**要点**：入栈顺序固定 1,2,...,n；不断入栈直到栈顶等于目标值

---

## 附录：模板速查表

| 编号 | 模板 | 大纲归属 | 核心要点 |
|:---:|:---|:---:|:---|
| 01 | 哈夫曼WPL | 六级 | 小顶堆，累加合并代价 |
| 02 | 完全二叉树数组 | 六级 | 左=2i，右=2i+1 |
| 03 | BST插入/搜索 | 六级 | 左小右大，中序有序 |
| 04 | 二叉树遍历 | 六级 | 前序/中序/后序递归 |
| 05 | 格雷编码(异或) | 六级 | gray=i^(i>>1) |
| 06 | 格雷编码(递推) | 六级 | 0+前半，1+反转后半 |
| 07 | DFS网格搜索 | 六级 | 递归+方向数组+vis |
| 08 | BFS层序/最短路 | 六级 | 队列+sz分层 |
| 09 | DFS非递归(栈) | 六级 | 先右后左入栈 |
| 10 | 0/1背包 | 六级 | 内层**逆序** |
| 11 | 完全背包 | 六级 | 内层**正序** |
| 12 | 打家劫舍DP | 六级 | dp[i]=max(dp[i-1],dp[i-2]+a[i]) |
| 13 | 括号匹配 | 六级 | depth计数+合法性 |
| 14 | 循环队列 | 六级 | 取模运算，留空位判满 |
| 15 | 出栈序列判断 | 六级 | 栈模拟，next指针 |

---

## 附录B：原文件错误模板迁移

| 原编号 | 错误模板 | 正确级别 | 已替换为 |
|:---:|:---|:---:|:---|
| 01 | vector去重 | 未列入大纲 | 哈夫曼WPL |
| 02 | Dijkstra | **八级** | 完全二叉树数组 |
| 03 | 并查集 | 未列入大纲 | BST插入/搜索 |
| 05 | LIS | **七级** | 二叉树遍历 |
| 06 | 前缀和 | 未列入大纲 | 格雷编码(异或) |
| 07 | 差分 | 未列入大纲 | 格雷编码(递推) |
| 08 | Kruskal | **八级** | DFS网格搜索 |
| 09 | 拓扑排序 | 未列入大纲 | BFS层序/最短路 |
| 10 | Floyd | **八级** | DFS非递归 |
| 11 | 单调栈 | 未列入大纲 | 完全背包 |
| 12 | GCD | **五级** | 打家劫舍DP |
| 13 | 快速幂 | 未列入大纲 | 括号匹配 |
| 14 | 欧拉筛 | **五级** | 循环队列 |
| 15 | 二分答案 | **五级** | 出栈序列判断 |
