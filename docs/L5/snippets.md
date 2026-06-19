# GESP C++ 五级代码模板（修正版）

> 本模板严格对应 GESP Level 5 考纲：初等数论（素数/GCD/模运算/质因数分解/埃氏筛/线性筛/唯一分解定理）、高精度运算（数组模拟加减乘除）、链表（单链表/双链表/循环链表）、二分算法（二分查找/二分答案）、递归算法、分治算法（归并排序/快速排序）、贪心算法、算法复杂度估算。

---

## 01. 素数判断

```cpp
// 判断 n 是否为素数（n >= 2）
bool isPrime(long long n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    // 只需检查 6k ± 1 形式的因子，时间复杂度 O(√n)
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}
```

**要点**：素数大于 3 时一定形如 6k±1，因此只需从 5 开始每次跳 6 检查 i 和 i+2，将复杂度从 O(n) 优化到 O(√n)。注意处理 n < 2 的边界情况。

---

## 02. 埃氏筛法（Sieve of Eratosthenes）

```cpp
// 线性预处理 [0, n] 中所有素数，时间复杂度 O(n log log n)
const int MAXN = 10000005;
bool is_composite[MAXN];  // true 表示合数
vector<int> primes;

void sieve(int n) {
    fill(is_composite, is_composite + n + 1, false);
    primes.clear();
    for (int i = 2; i <= n; i++) {
        if (!is_composite[i]) {
            primes.push_back(i);
            // 从 i*i 开始标记，因为更小的倍数已被之前的素数标记
            for (long long j = (long long)i * i; j <= n; j += i) {
                is_composite[j] = true;
            }
        }
    }
}
```

**要点**：埃氏筛的内层循环从 i² 开始，因为更小的倍数（如 2i、3i 等）已被更小的素数标记。总时间复杂度为 O(n log log n)，空间 O(n)。

---

## 03. 线性筛（欧拉筛）

```cpp
// 线性时间预处理素数，每个合数只被其最小质因子标记一次，时间复杂度 O(n)
const int MAXN = 10000005;
bool is_composite[MAXN];
int primes[MAXN], cnt = 0;

void linearSieve(int n) {
    fill(is_composite, is_composite + n + 1, false);
    cnt = 0;
    for (int i = 2; i <= n; i++) {
        if (!is_composite[i]) {
            primes[cnt++] = i;
        }
        for (int j = 0; j < cnt && (long long)i * primes[j] <= n; j++) {
            is_composite[i * primes[j]] = true;
            if (i % primes[j] == 0) {
                // primes[j] 是 i 的最小质因子，break 保证每个合数只被筛一次
                break;
            }
        }
    }
}
```

**要点**：线性筛的关键是 `i % primes[j] == 0` 时 break。这保证了每个合数 n 仅在 i = n / (n的最小质因子) 时被标记，从而实现严格 O(n) 复杂度。同时 primes 数组天然支持线性求欧拉函数等积性函数。

---

## 04. GCD / LCM

```cpp
// 最大公约数（辗转相除法）
long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

// 最小公倍数（注意先除后乘防止溢出）
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

// 扩展欧几里得算法：求 ax + by = gcd(a,b) 的一组整数解
// 返回 gcd(a,b)，同时通过引用返回 x, y
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    long long g = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}
```

**要点**：GCD 使用欧几里得辗转相除法，时间复杂度 O(log(min(a,b)))。计算 LCM 时务必先做 a/gcd 再乘 b 以防止中间结果溢出。扩展欧几里得算法可用于求解线性同余方程。

---

## 05. 质因数分解

```cpp
// 唯一分解定理：将 n 分解为质因数的乘积
// 返回 vector<pair<质因子, 幂次>>
vector<pair<long long, int>> factorize(long long n) {
    vector<pair<long long, int>> factors;
    // 先处理小质因子 2
    if (n % 2 == 0) {
        int cnt = 0;
        while (n % 2 == 0) { n /= 2; cnt++; }
        factors.push_back({2, cnt});
    }
    // 再从 3 开始检查奇数因子
    for (long long i = 3; i * i <= n; i += 2) {
        if (n % i == 0) {
            int cnt = 0;
            while (n % i == 0) { n /= i; cnt++; }
            factors.push_back({i, cnt});
        }
    }
    // 如果剩余部分 > 1，说明 n 本身是一个大质因子
    if (n > 1) {
        factors.push_back({n, 1});
    }
    return factors;
}

// 使用示例：计算 n 的约数个数
long long countDivisors(long long n) {
    auto factors = factorize(n);
    long long res = 1;
    for (auto &[p, e] : factors) {
        res *= (e + 1);
    }
    return res;
}
```

**要点**：唯一分解定理（算术基本定理）：任意大于 1 的整数可唯一表示为素数的乘积。分解时先试除 2，再只检查奇数因子，复杂度 O(√n)。由此可推导约数个数、约数和等。

---

## 06. 模运算 / 快速幂

```cpp
// 快速幂：计算 base^exp % mod，时间复杂度 O(log exp)
long long power(long long base, long long exp, long long mod) {
    base %= mod;
    long long result = 1;
    while (exp > 0) {
        if (exp & 1) {
            result = result * base % mod;
        }
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}

// 模逆元（费马小定理）：当 mod 为素数时，a 的逆元 = a^(mod-2) mod mod
long long modInverse(long long a, long long mod) {
    return power(a, mod - 2, mod);
}

// 模运算注意事项：
// (a + b) % mod = ((a % mod) + (b % mod)) % mod
// (a - b) % mod = ((a % mod) - (b % mod) + mod) % mod
// (a * b) % mod = ((a % mod) * (b % mod)) % mod
// ⚠️ 模运算下没有除法！必须用乘法逆元

// 组合数 C(n, k) % mod（预处理阶乘和逆元）
const int MAXF = 200005;
long long fact[MAXF], inv_fact[MAXF];

void precomputeFact(long long mod) {
    fact[0] = 1;
    for (int i = 1; i < MAXF; i++)
        fact[i] = fact[i - 1] * i % mod;
    inv_fact[MAXF - 1] = power(fact[MAXF - 1], mod - 2, mod);
    for (int i = MAXF - 2; i >= 0; i--)
        inv_fact[i] = inv_fact[i + 1] * (i + 1) % mod;
}

long long C(long long n, long long k, long long mod) {
    if (k < 0 || k > n) return 0;
    return fact[n] % mod * inv_fact[k] % mod * inv_fact[n - k] % mod;
}
```

**要点**：快速幂通过二进制分解指数实现 O(log n) 的幂运算。模逆元要求 mod 为素数（费马小定理）。预处理阶乘和逆元后可 O(1) 查询组合数。

---

## 07. 高精度加法

```cpp
// 大整数加法：用数组模拟，支持任意位数的正整数加法
// 数组按低位在前存储（index 0 存个位）
string addBigInt(string a, string b) {
    vector<int> A, B;
    // 逆序存储，方便从低位开始计算
    for (int i = a.size() - 1; i >= 0; i--) A.push_back(a[i] - '0');
    for (int i = b.size() - 1; i >= 0; i--) B.push_back(b[i] - '0');

    vector<int> C;
    int carry = 0;
    int n = max(A.size(), B.size());
    for (int i = 0; i < n || carry; i++) {
        int sum = carry;
        if (i < (int)A.size()) sum += A[i];
        if (i < (int)B.size()) sum += B[i];
        C.push_back(sum % 10);
        carry = sum / 10;
    }

    // 转回字符串（逆序回来）
    string result;
    for (int i = C.size() - 1; i >= 0; i--)
        result += to_string(C[i]);
    return result;
}
```

**要点**：高精度加法核心是模拟竖式计算。将字符串逆序后按位相加并处理进位。时间复杂度 O(max(len(a), len(b)))。注意处理最高位进位和结果前导零。

---

## 08. 高精度乘法

```cpp
// 大整数乘法：用数组模拟，时间复杂度 O(len(a) * len(b))
string multiplyBigInt(string a, string b) {
    vector<int> A, B;
    for (int i = a.size() - 1; i >= 0; i--) A.push_back(a[i] - '0');
    for (int i = b.size() - 1; i >= 0; i--) B.push_back(b[i] - '0');

    int n = A.size(), m = B.size();
    vector<int> C(n + m, 0);  // 乘积最多 n+m 位

    // 模拟竖式乘法：A 的第 i 位 × B 的第 j 位，结果放在 C[i+j] 和 C[i+j+1]
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            C[i + j] += A[i] * B[j];
            C[i + j + 1] += C[i + j] / 10;  // 进位到高位
            C[i + j] %= 10;                   // 本位取模
        }
    }

    // 统一处理进位（简化版，也可以在循环内逐步进位）
    for (int i = 0; i < n + m - 1; i++) {
        C[i + 1] += C[i] / 10;
        C[i] %= 10;
    }

    // 转回字符串，去除前导零
    string result;
    int start = n + m - 1;
    while (start > 0 && C[start] == 0) start--;  // 跳过前导零
    for (int i = start; i >= 0; i--)
        result += to_string(C[i]);
    return result;
}
```

**要点**：高精度乘法模拟竖式乘法。第 i 位 × 第 j 位的结果影响结果的第 i+j 和 i+j+1 位。最后统一处理进位并去除前导零。时间复杂度 O(nm)。

---

## 09. 单链表（创建 / 插入 / 遍历）

```cpp
// 单链表基本操作
struct Node {
    int val;
    Node* next;
    Node(int v) : val(v), next(nullptr) {}
};

// 头插法创建链表（新节点插入头部，最终顺序与输入相反）
Node* createList(const vector<int>& arr) {
    Node* head = nullptr;
    for (int i = (int)arr.size() - 1; i >= 0; i--) {
        Node* node = new Node(arr[i]);
        node->next = head;
        head = node;
    }
    return head;
}

// 尾插法创建链表（保持输入顺序）
Node* createListTail(const vector<int>& arr) {
    Node* dummy = new Node(0);  // 哑节点简化操作
    Node* tail = dummy;
    for (int val : arr) {
        tail->next = new Node(val);
        tail = tail->next;
    }
    Node* head = dummy->next;
    delete dummy;
    return head;
}

// 在第 pos 个位置（0-indexed）插入值 val
Node* insertAt(Node* head, int pos, int val) {
    if (pos == 0) {
        Node* node = new Node(val);
        node->next = head;
        return node;
    }
    Node* cur = head;
    for (int i = 0; i < pos - 1 && cur; i++) {
        cur = cur->next;
    }
    if (cur) {
        Node* node = new Node(val);
        node->next = cur->next;
        cur->next = node;
    }
    return head;
}

// 删除第 pos 个位置的节点
Node* deleteAt(Node* head, int pos) {
    if (!head) return nullptr;
    if (pos == 0) {
        Node* newHead = head->next;
        delete head;
        return newHead;
    }
    Node* cur = head;
    for (int i = 0; i < pos - 1 && cur->next; i++) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* del = cur->next;
        cur->next = del->next;
        delete del;
    }
    return head;
}

// 正向遍历链表
void traverse(Node* head) {
    Node* cur = head;
    while (cur) {
        cout << cur->val << " -> ";
        cur = cur->next;
    }
    cout << "NULL" << endl;
}
```

**要点**：链表操作核心是指针。头插法改变头部，尾插法用哑节点简化边界处理。插入/删除时注意维护前后节点的 next 指针。遍历时用临时指针 cur 以免丢失头指针。

---

## 10. 双链表插入

```cpp
// 双链表基本操作
struct DNode {
    int val;
    DNode *prev, *next;
    DNode(int v) : val(v), prev(nullptr), next(nullptr) {}
};

// 在双链表 head 的第 pos 个位置插入值 val
DNode* insertDNode(DNode* head, int pos, int val) {
    DNode* newNode = new DNode(val);
    if (!head || pos == 0) {
        // 插入到头部
        newNode->next = head;
        if (head) head->prev = newNode;
        return newNode;
    }
    DNode* cur = head;
    for (int i = 0; i < pos - 1 && cur->next; i++) {
        cur = cur->next;
    }
    // 在 cur 之后插入 newNode
    newNode->next = cur->next;
    newNode->prev = cur;
    if (cur->next) cur->next->prev = newNode;
    cur->next = newNode;
    return head;
}

// 删除双链表中指定节点
DNode* deleteDNode(DNode* head, DNode* target) {
    if (!target) return head;
    if (target->prev) {
        target->prev->next = target->next;
    } else {
        head = target->next;  // 删除的是头节点
    }
    if (target->next) {
        target->next->prev = target->prev;
    }
    delete target;
    return head;
}

// 双链表正向遍历
void traverseForward(DNode* head) {
    DNode* cur = head;
    while (cur) {
        cout << cur->val << " ";
        cur = cur->next;
    }
    cout << endl;
}

// 双链表反向遍历（先到尾部再反向）
void traverseBackward(DNode* head) {
    if (!head) return;
    DNode* cur = head;
    while (cur->next) cur = cur->next;  // 找到尾节点
    while (cur) {
        cout << cur->val << " ";
        cur = cur->prev;
    }
    cout << endl;
}
```

**要点**：双链表每个节点有 prev 和 next 两个指针，支持双向遍历。插入时需同时维护两个方向的指针。删除节点时注意检查 prev 是否为空以判断是否为头节点。

---

## 11. 二分查找

```cpp
// 标准二分查找（升序数组），返回目标值的下标，未找到返回 -1
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = (int)arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;  // 防止 left + right 溢出
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// 查找第一个 >= target 的位置（lower_bound）
int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = (int)arr.size();  // 注意：right 初始为 n
    while (left < right) {                   // 注意：< 不是 <=
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

// 查找第一个 > target 的位置（upper_bound）
int upperBound(vector<int>& arr, int target) {
    int left = 0, right = (int)arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
```

**要点**：二分查找的三种写法区别：标准查找用 `left <= right`，区间收缩型用 `left < right`。lower_bound 找的是插入位置，upper_bound 找的是比目标大的第一个位置。关键是理解区间定义和 mid 的处理。

---

## 12. 二分答案

```cpp
// 二分答案模板：在答案空间上二分，用 check() 验证可行性
// 典型应用：最小化最大值 / 最大化最小值

// 示例：将 n 个物品分给 m 人，每人最多分连续的一段，使最大和最小
// 求最小的最大和
long long distributeBooks(vector<int>& weights, int m) {
    // 答案的搜索范围
    long long left = *max_element(weights.begin(), weights.end());  // 下界：至少一个物品的重量
    long long right = 0;                                            // 上界：所有重量之和
    for (int w : weights) right += w;

    // check 函数：判断在最大和不超过 mid 的情况下，能否用 m 人分完
    auto check = [&](long long mid) -> bool {
        int cnt = 1;           // 已用人数
        long long curSum = 0;  // 当前人的累计和
        for (int w : weights) {
            if (curSum + w > mid) {
                cnt++;
                curSum = w;
                if (cnt > m) return false;  // 人数不够
            } else {
                curSum += w;
            }
        }
        return true;
    };

    // 二分查找最小的可行答案
    while (left < right) {
        long long mid = left + (right - left) / 2;
        if (check(mid)) {
            right = mid;      // mid 可行，尝试更小的
        } else {
            left = mid + 1;   // mid 不可行，需要更大的
        }
    }
    return left;
}

// 示例：在 [1, 10^9] 范围内二分找最小满足条件的 x
long long solve(long long n) {
    long long left = 1, right = 1e9;
    while (left < right) {
        long long mid = left + (right - left) / 2;
        // 判断 mid 是否满足题目条件
        if (check(mid)) {
            right = mid;      // 满足则缩小右边界
        } else {
            left = mid + 1;   // 不满足则缩小左边界
        }
    }
    return left;
}
```

**要点**：二分答案的核心思想是"答案具有单调性"——如果 x 可行，那么大于 x 的值也可行（或反过来）。将问题转化为对答案空间二分，用 check 函数验证可行性。模板中 `left < right` 和 `right = mid` 配合使用。

---

## 13. 归并排序（分治算法）

```cpp
// 归并排序：时间复杂度 O(n log n)，空间复杂度 O(n)
// 同时可以统计逆序对数量

int temp[500005];  // 辅助数组（全局以避免栈溢出）

void merge(vector<int>& arr, int left, int mid, int right) {
    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int i = left; i <= right; i++) {
        arr[i] = temp[i];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);       // 递归排序左半部分
    mergeSort(arr, mid + 1, right);  // 递归排序右半部分
    merge(arr, left, mid, right);    // 合并两个有序子数组
}

// 带逆序对统计的归并排序
long long mergeCount(vector<int>& arr, int left, int mid, int right) {
    long long invCount = 0;
    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            // arr[i] > arr[j]，则 arr[i..mid] 都大于 arr[j]，共 mid-i+1 个逆序对
            temp[k++] = arr[j++];
            invCount += (mid - i + 1);
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int i = left; i <= right; i++) arr[i] = temp[i];
    return invCount;
}

long long mergeSortCount(vector<int>& arr, int left, int right) {
    if (left >= right) return 0;
    int mid = left + (right - left) / 2;
    long long cnt = 0;
    cnt += mergeSortCount(arr, left, mid);
    cnt += mergeSortCount(arr, mid + 1, right);
    cnt += mergeCount(arr, left, mid, right);
    return cnt;
}
```

**要点**：归并排序是经典的分治算法：分 → 递归排序 → 合。时间复杂度稳定 O(n log n)，且是稳定排序。合并时统计逆序对是经典应用：右半部分元素先放入时，左半部分剩余元素个数即为该元素的逆序对数。

---

## 14. 快速排序（分治算法）

```cpp
// 快速排序：平均时间复杂度 O(n log n)，最坏 O(n²)
// 优化：随机选择 pivot 避免最坏情况

#include <random>

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

int partition(vector<int>& arr, int left, int right) {
    // 随机选择 pivot 并放到最右边
    int pivotIdx = left + rng() % (right - left + 1);
    swap(arr[pivotIdx], arr[right]);
    int pivot = arr[right];

    int i = left;  // i 指向小于 pivot 的区域的末尾
    for (int j = left; j < right; j++) {
        if (arr[j] < pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    swap(arr[i], arr[right]);  // 将 pivot 放到最终位置
    return i;
}

void quickSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int p = partition(arr, left, right);
    quickSort(arr, left, p - 1);   // 递归排序左半部分
    quickSort(arr, p + 1, right);  // 递归排序右半部分
}

// 三路快速排序（处理大量重复元素的优化版本）
void quickSort3Way(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    // 随机选 pivot
    int pivotIdx = left + rng() % (right - left + 1);
    int pivot = arr[pivotIdx];

    int lt = left, gt = right, i = left;
    // arr[left..lt-1] < pivot
    // arr[lt..i-1] == pivot
    // arr[gt+1..right] > pivot
    while (i <= gt) {
        if (arr[i] < pivot) {
            swap(arr[lt++], arr[i++]);
        } else if (arr[i] > pivot) {
            swap(arr[i], arr[gt--]);
        } else {
            i++;
        }
    }
    quickSort3Way(arr, left, lt - 1);
    quickSort3Way(arr, gt + 1, right);
}
```

**要点**：快排的核心是 partition 操作，将数组分为小于和大于 pivot 的两部分。随机化 pivot 可将最坏情况概率降到极低。三路快排在有大量重复元素时效率更高，时间复杂度从 O(n²) 降为 O(n)。快排不是稳定排序。

---

## 15. 贪心算法（区间调度）

```cpp
// 区间调度问题：给定 n 个区间 [start, end]，选择最多的互不重叠区间
// 贪心策略：按结束时间从小到大排序，每次选结束最早且不冲突的区间

struct Interval {
    int start, end;
};

bool compareByEnd(const Interval& a, const Interval& b) {
    return a.end < b.end;
}

int maxNonOverlapIntervals(vector<Interval>& intervals) {
    if (intervals.empty()) return 0;

    // 按结束时间升序排序
    sort(intervals.begin(), intervals.end(), compareByEnd);

    int count = 1;              // 选择的第一个区间
    int lastEnd = intervals[0].end;

    for (int i = 1; i < (int)intervals.size(); i++) {
        if (intervals[i].start >= lastEnd) {
            // 当前区间与已选区间不重叠
            count++;
            lastEnd = intervals[i].end;
        }
    }
    return count;
}

// 相关贪心经典问题模板：

// 2. 分配问题：将 n 个任务分配给 m 个工人，使总代价最小
// 策略：按代价从小到大排序，优先分配代价小的

// 3. 活动选择问题变体：区间带权，求最大不重叠权值和
// 转化为动态规划 + 二分，此处不展开（属六级内容）

// 4. 背包贪心（分数背包）：每个物品可取一部分
struct Item {
    double weight, value, unitValue;  // 重量、价值、单位价值
};

double fractionalKnapsack(vector<Item>& items, double capacity) {
    // 按单位价值降序排序
    sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return a.unitValue > b.unitValue;
    });

    double totalValue = 0;
    for (auto& item : items) {
        if (capacity >= item.weight) {
            // 整个物品放入
            totalValue += item.value;
            capacity -= item.weight;
        } else {
            // 放入剩余容量对应的分数
            totalValue += item.unitValue * capacity;
            break;
        }
    }
    return totalValue;
}
```

**要点**：贪心算法每步选局部最优，期望达到全局最优。区间调度问题按结束时间排序是标准解法。关键要证明贪心选择性质：选择结束最早的区间一定不差于选择其他区间。分数背包贪心有效，但 0-1 背包不能用贪心。

---

## 附录：旧模板错误映射表

下表列出原版错误文件中不属于 GESP Level 5 的内容及其正确归属级别。

| 序号 | 原模板内容（错误放置在五级） | 正确归属级别 | 说明 |
|:---:|:---|:---:|:---|
| 1 | 栈（Stack）基本操作 | Level 6 | 栈属于数据结构进阶，不在五级考纲 |
| 2 | 队列（Queue）基本操作 | Level 6 | 队列属于数据结构进阶，不在五级考纲 |
| 3 | 0-1 背包问题（DP） | Level 6 | 背包 DP 属于动态规划，不在五级考纲 |
| 4 | BFS 广度优先搜索 | Level 6 | 图的 BFS 属于图论基础，不在五级考纲 |
| 5 | 二叉树前序/中序/后序遍历 | Level 6 | 树的遍历属于数据结构进阶，不在五级考纲 |
| 6 | 树的层序遍历（BFS应用） | Level 6 | 树的层序遍历属于数据结构进阶，不在五级考纲 |

> **五级考纲范围**：初等数论、高精度运算、链表、二分算法、递归算法、分治算法、贪心算法、算法复杂度估算。

---

*最后更新：2026-06-19*
