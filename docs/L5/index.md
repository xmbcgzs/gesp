# GESP C++ 五级（L5）知识点整理

> **适用考试：GESP C++ Level 5**
> **知识点范围：初等数论、高精度运算、链表、二分查找/二分答案、贪心算法、分治算法与递归、算法复杂度估算**

---

## 知识块一：初等数论

### 1.1 素数与合数

**概念**
- **素数（质数）**：大于 1 的自然数中，除了 1 和它本身以外不再有其他因数的数。如 2, 3, 5, 7, 11, ...
- **合数**：大于 1 的自然数中，除了 1 和它本身以外还有其他因数的数。如 4, 6, 8, 9, 10, ...
- **1 既不是素数也不是合数**，**2 是唯一的偶素数**

**判断素数 — 试除法**

```cpp
// O(√n) 判断一个数是否为素数
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {  // 只需检查到 √n
        if (n % i == 0) return false;
    }
    return true;
}
```

**易错点**
- 试除法的循环条件必须用 `i * i <= n`，而非 `i < n`
- 必须单独处理 n < 2 的情况（0、1 都不是素数）
- 注意 `i * i` 可能溢出，对大整数应写成 `i <= n / i`

---

### 1.2 素数表 — 埃氏筛法（Sieve of Eratosthenes）

**概念**
- 用布尔数组标记合数，从 2 开始，将每个素数的倍数标记为合数
- 时间复杂度：O(n log log n)

**代码模板**

```cpp
#include <vector>
#include <iostream>
using namespace std;

const int MAXN = 1e6 + 5;
bool is_not_prime[MAXN];  // true 表示是合数

void sieve(int n) {
    is_not_prime[0] = is_not_prime[1] = true;
    for (int i = 2; i * i <= n; i++) {
        if (!is_not_prime[i]) {
            for (int j = i * i; j <= n; j += i) {  // 从 i*i 开始优化
                is_not_prime[j] = true;
            }
        }
    }
}

// 获取 [2, n] 之间所有素数
vector<int> getPrimes(int n) {
    sieve(n);
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (!is_not_prime[i]) primes.push_back(i);
    }
    return primes;
}
```

**易错点**
- 从 `i * i` 开始标记，因为更小的倍数已经被标记过了
- 埃氏筛的外层循环条件是 `i * i <= n`，不是 `i < n`
- 数组大小要预留足够空间，注意下标从 0 开始

---

### 1.3 素数表 — 线性筛（欧拉筛）

**概念**
- 每个合数只被其最小素因子筛掉一次
- 时间复杂度：O(n)，比埃氏筛更快

**代码模板**

```cpp
#include <vector>
using namespace std;

const int MAXN = 1e6 + 5;
int primes[MAXN], cnt;       // primes[] 存储所有素数，cnt 是计数
bool is_not_prime[MAXN];     // 合数标记

void linearSieve(int n) {
    is_not_prime[0] = is_not_prime[1] = true;
    for (int i = 2; i <= n; i++) {
        if (!is_not_prime[i]) {
            primes[cnt++] = i;  // i 是素数
        }
        for (int j = 0; j < cnt && i * primes[j] <= n; j++) {
            is_not_prime[i * primes[j]] = true;
            if (i % primes[j] == 0) break;  // 关键：保证每个数只被筛一次
        }
    }
}
```

**易错点**
- 线性筛中 `if (i % primes[j] == 0) break;` 这句不能省略
- `i * primes[j]` 可能溢出，注意类型和范围
- 线性筛和埃氏筛功能一样，区别在于效率和实现方式

---

### 1.4 最大公约数与最小公倍数

**概念**
- **最大公约数（GCD）**：两个数共有的最大因数
- **最小公倍数（LCM）**：两个数共有的最小倍数
- 关系：`lcm(a, b) = a / gcd(a, b) * b`（先除后乘防溢出）

**欧几里得算法（辗转相除法）**

```cpp
// 递归写法
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 迭代写法
int gcd(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// 最小公倍数
int lcm(int a, int b) {
    return a / gcd(a, b) * b;  // 先除再乘，防止溢出
}
```

**易错点**
- `lcm` 计算时一定要写成 `a / gcd(a, b) * b`，不能写成 `a * b / gcd(a, b)`（后者可能溢出）
- `gcd(0, n)` 的结果是 `n`，但 `gcd(0, 0)` 未定义
- C++17 可直接使用 `std::gcd()` 和 `std::lcm()`

---

### 1.5 约数与倍数

**概念**
- **约数（因数）**：若 a 能被 b 整除，则 b 是 a 的约数
- **倍数**：若 a 能被 b 整除，则 a 是 b 的倍数

**求一个数所有约数**

```cpp
#include <vector>
#include <cmath>
using namespace std;

vector<int> getDivisors(int n) {
    vector<int> divs;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            divs.push_back(i);
            if (i != n / i) {
                divs.push_back(n / i);
            }
        }
    }
    return divs;
}
```

**易错点**
- 求约数的时间复杂度是 O(√n)
- 注意 `i == n / i` 时不要重复添加（即 n 为完全平方数时）
- 因数是成对出现的：若 i 是约数，则 n/i 也是约数

---

### 1.6 质因数分解

**概念**
- **质因数分解**：将一个合数表示为素数的乘积
- 唯一分解定理：任何大于 1 的整数都能唯一地表示为素数的乘积

**代码模板**

```cpp
#include <vector>
#include <utility>
using namespace std;

// 返回 n 的所有质因数及其幂次
vector<pair<int, int>> factorize(int n) {
    vector<pair<int, int>> factors;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            int cnt = 0;
            while (n % i == 0) {
                n /= i;
                cnt++;
            }
            factors.push_back({i, cnt});
        }
    }
    if (n > 1) {
        factors.push_back({n, 1});  // 剩余的大素因子
    }
    return factors;
}
```

**易错点**
- 循环结束后如果 `n > 1`，说明 n 本身是一个素因子，不能遗漏
- 循环条件是 `i * i <= n`，而不是 `i < n`
- 每次除尽当前素因子，保证得到的是质因数分解

---

### 1.7 同余与模运算

**概念**
- **同余**：若 (a - b) 能被 m 整除，则 a 与 b 关于 m 同余，记作 a ≡ b (mod m)
- **模运算性质**：
  - (a + b) % m = ((a % m) + (b % m)) % m
  - (a - b) % m = ((a % m) - (b % m) + m) % m
  - (a * b) % m = ((a % m) * (b % m)) % m

**代码模板**

```cpp
const int MOD = 1e9 + 7;

// 模加法
int addMod(int a, int b) {
    return ((a % MOD) + (b % MOD)) % MOD;
}

// 模减法（注意处理负数）
int subMod(int a, int b) {
    return ((a % MOD) - (b % MOD) + MOD) % MOD;
}

// 模乘法
int mulMod(int a, int b) {
    return (long long)(a % MOD) * (b % MOD) % MOD;
}
```

**易错点**
- 模减法必须加 MOD 再取模，防止结果为负数
- 模乘法需要先转 `long long` 防止中间结果溢出
- 模运算中除法不能直接做，需要使用**快速幂求逆元**

---

### 1.8 奇偶性

**概念**
- **奇数**：不能被 2 整除的数（n % 2 == 1 或 n % 2 == -1）
- **偶数**：能被 2 整除的数（n % 2 == 0）
- 运算规律：
  - 奇 ± 奇 = 偶，偶 ± 偶 = 偶，奇 ± 偶 = 奇
  - 奇 × 奇 = 奇，偶 × 任何 = 偶

**易错点**
- 判断奇偶用 `n % 2 != 0` 比 `n % 2 == 1` 更安全（负数取模结果可能为负）
- 位运算 `(n & 1) == 1` 可以高效判断奇数

---

### 1.9 唯一分解定理

**概念**
- 任何大于 1 的正整数都可以**唯一**地分解为素数的乘积
- 例如：60 = 2² × 3 × 5
- 应用：求约数个数、求约数和

**代码模板**

```cpp
// 利用质因数分解求约数个数
// 若 n = p1^a1 * p2^a2 * ... * pk^ak
// 则约数个数 = (a1+1)(a2+1)...(ak+1)
int countDivisors(int n) {
    int ans = 1;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            int cnt = 0;
            while (n % i == 0) {
                n /= i;
                cnt++;
            }
            ans *= (cnt + 1);
        }
    }
    if (n > 1) ans *= 2;  // 剩余一个素因子，幂次为 1
    return ans;
}
```

---

## 知识块二：C++ 数组模拟高精度运算

### 2.1 高精度加法

**概念**
- 用数组逐位相加，模拟小学生竖式加法
- 每位存储一个数字（0-9），从低位到高位计算

**代码模板**

```cpp
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

// 两个正整数字符串相加
string highAdd(string a, string b) {
    vector<int> A, B, C;
    for (int i = a.size() - 1; i >= 0; i--) A.push_back(a[i] - '0');
    for (int i = b.size() - 1; i >= 0; i--) B.push_back(b[i] - '0');
    
    int carry = 0;
    for (int i = 0; i < (int)max(A.size(), B.size()) || carry; i++) {
        int sum = carry;
        if (i < (int)A.size()) sum += A[i];
        if (i < (int)B.size()) sum += B[i];
        C.push_back(sum % 10);
        carry = sum / 10;
    }
    
    string result;
    for (int i = C.size() - 1; i >= 0; i--) {
        result += to_string(C[i]);
    }
    return result;
}
```

**易错点**
- 数字要从**字符串末尾**开始逐位存入数组
- 循环结束时 carry 可能不为 0，需要额外进位
- 结果字符串要从数组**末尾**开始拼接

---

### 2.2 高精度减法

**概念**
- 模拟竖式减法，需要处理借位
- 前提：被减数 ≥ 减数（否则结果为负，需要单独处理）

**代码模板**

```cpp
// 判断 a >= b（两个正整数字符串）
bool cmp(string a, string b) {
    if (a.size() != b.size()) return a.size() > b.size();
    return a >= b;
}

string highSub(string a, string b) {
    if (!cmp(a, b)) return "-" + highSub(b, a);  // 确保 a >= b
    
    vector<int> A, B, C;
    for (int i = a.size() - 1; i >= 0; i--) A.push_back(a[i] - '0');
    for (int i = b.size() - 1; i >= 0; i--) B.push_back(b[i] - '0');
    
    for (int i = 0; i < (int)A.size(); i++) {
        int diff = A[i] - (i < (int)B.size() ? B[i] : 0);
        if (diff < 0) {
            diff += 10;
            A[i + 1]--;  // 借位
        }
        C.push_back(diff);
    }
    
    // 去除前导零
    while (C.size() > 1 && C.back() == 0) C.pop_back();
    
    string result;
    for (int i = C.size() - 1; i >= 0; i--) {
        result += to_string(C[i]);
    }
    return result;
}
```

**易错点**
- 必须先比较大小，保证被减数 ≥ 减数
- 借位时要修改下一位 `A[i+1]--`，注意 A 的大小可能不够
- 结果要去除前导零（但至少保留一位）

---

### 2.3 高精度乘法

**概念**
- 模拟竖式乘法：用 B 的每一位去乘 A，结果累加
- 时间复杂度：O(n × m)，其中 n、m 是两个数的位数

**代码模板**

```cpp
string highMul(string a, string b) {
    vector<int> A, B, C(a.size() + b.size(), 0);
    for (int i = a.size() - 1; i >= 0; i--) A.push_back(a[i] - '0');
    for (int i = b.size() - 1; i >= 0; i--) B.push_back(b[i] - '0');
    
    for (int i = 0; i < (int)A.size(); i++) {
        for (int j = 0; j < (int)B.size(); j++) {
            C[i + j] += A[i] * B[j];
            C[i + j + 1] += C[i + j] / 10;
            C[i + j] %= 10;
        }
    }
    
    // 去除前导零
    while (C.size() > 1 && C.back() == 0) C.pop_back();
    
    string result;
    for (int i = C.size() - 1; i >= 0; i--) {
        result += to_string(C[i]);
    }
    return result;
}
```

**易错点**
- `C` 数组初始化为 `a.size() + b.size()` 大小（乘积最多这么多位）
- 进位处理是 `C[i+j+1] += C[i+j] / 10`，注意位置
- 最后要去除前导零

---

### 2.4 高精度除法（高精度 ÷ 低精度）

**概念**
- 用大整数除以一个较小的数（int 范围内）
- 从高位到低位逐位试商

**代码模板**

```cpp
pair<string, int> highDiv(string a, int b) {
    vector<int> A;
    for (int i = 0; i < (int)a.size(); i++) A.push_back(a[i] - '0');
    
    string quotient;
    int remainder = 0;
    for (int i = 0; i < (int)A.size(); i++) {
        remainder = remainder * 10 + A[i];
        quotient += to_string(remainder / b);
        remainder %= b;
    }
    
    // 去除前导零
    int pos = 0;
    while (pos < (int)quotient.size() - 1 && quotient[pos] == '0') pos++;
    quotient = quotient.substr(pos);
    
    return {quotient, remainder};  // 返回商和余数
}
```

**易错点**
- 从高位到低位处理（和加减乘方向相反）
- 注意去除商的前导零，但至少保留一位
- 返回值是商和余数的 pair

---

## 知识块三：链表

### 3.1 单链表

**概念**
- 每个节点包含数据域和指向下一个节点的指针
- 头指针指向第一个节点，最后一个节点的 next 为 nullptr

**代码模板**

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// 在链表头部插入节点
void insertHead(Node*& head, int val) {
    Node* p = new Node(val);
    p->next = head;
    head = p;
}

// 在链表尾部插入节点
void insertTail(Node*& head, int val) {
    Node* p = new Node(val);
    if (!head) {
        head = p;
        return;
    }
    Node* cur = head;
    while (cur->next) cur = cur->next;
    cur->next = p;
}

// 删除指定值的节点
void deleteNode(Node*& head, int val) {
    if (!head) return;
    if (head->data == val) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return;
    }
    Node* cur = head;
    while (cur->next && cur->next->data != val) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* temp = cur->next;
        cur->next = temp->next;
        delete temp;
    }
}

// 遍历链表
void printList(Node* head) {
    Node* cur = head;
    while (cur) {
        cout << cur->data << " -> ";
        cur = cur->next;
    }
    cout << "NULL" << endl;
}
```

**易错点**
- 传参要用**引用** `Node*& head`，否则修改不会影响外部指针
- 删除节点后必须 `delete` 释放内存
- 空链表和只有一个节点的情况要单独处理

---

### 3.2 双链表

**概念**
- 每个节点包含 data、prev（前驱指针）和 next（后继指针）
- 可以从任意节点向前或向后遍历

**代码模板**

```cpp
struct DNode {
    int data;
    DNode* prev;
    DNode* next;
    DNode(int val) : data(val), prev(nullptr), next(nullptr) {}
};

// 在节点 p 后面插入值 val
void insertAfter(DNode* p, int val) {
    DNode* node = new DNode(val);
    node->next = p->next;
    node->prev = p;
    if (p->next) p->next->prev = node;
    p->next = node;
}

// 在节点 p 前面插入值 val
void insertBefore(DNode* p, int val) {
    DNode* node = new DNode(val);
    node->prev = p->prev;
    node->next = p;
    if (p->prev) p->prev->next = node;
    else { /* p 是头节点，需要更新头指针 */ }
    p->prev = node;
}

// 删除节点 p
void deleteDNode(DNode*& head, DNode* p) {
    if (p->prev) p->prev->next = p->next;
    else head = p->next;  // p 是头节点
    if (p->next) p->next->prev = p->prev;
    delete p;
}
```

**易错点**
- 插入时要同时维护 prev 和 next 两个方向的指针
- 删除头节点时需要更新头指针
- 操作顺序很重要，先连新节点，再断旧连接

---

### 3.3 循环链表

**概念**
- 尾节点的 next 指向头节点，形成环
- 适合约瑟夫环等问题

**代码模板**

```cpp
// 循环链表的创建（用单链表改造）
void makeCircular(Node* head) {
    if (!head) return;
    Node* cur = head;
    while (cur->next) cur = cur->next;
    cur->next = head;  // 尾节点指向头节点
}

// 遍历循环链表（注意终止条件）
void printCircular(Node* head) {
    if (!head) return;
    Node* cur = head;
    do {
        cout << cur->data << " -> ";
        cur = cur->next;
    } while (cur != head);
    cout << "(回到头节点)" << endl;
}

// 约瑟夫环问题：n 个人围成圈，每次报数到 k 的人出局
int josephus(int n, int k) {
    Node* head = new Node(1);
    Node* cur = head;
    for (int i = 2; i <= n; i++) {
        cur->next = new Node(i);
        cur = cur->next;
    }
    cur->next = head;  // 构成环
    
    Node* prev = cur;  // prev 是当前节点的前一个
    while (prev->next != prev) {  // 只剩一个节点时停止
        for (int i = 1; i < k; i++) {
            prev = prev;
        }
        Node* toDelete = prev->next;
        prev->next = toDelete->next;
        delete toDelete;
    }
    int result = prev->data;
    delete prev;
    return result;
}
```

**易错点**
- 遍历循环链表的终止条件是 `cur != head`（不是 `cur != nullptr`）
- 用 `do...while` 循环处理，确保至少执行一次
- 约瑟夫环中注意删除节点后更新前驱指针

---

## 知识块四：二分查找与二分答案

### 4.1 二分查找（有序数组）

**概念**
- 在**已排序**的数组中查找目标值
- 每次比较中间值，将搜索范围缩小一半
- 时间复杂度：O(log n)

**代码模板**

```cpp
#include <vector>
using namespace std;

// 基本二分查找，返回下标，未找到返回 -1
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;  // 防溢出写法
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

// 查找第一个 ≥ target 的位置（lower_bound）
int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

// 查找第一个 > target 的位置（upper_bound）
int upperBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] > target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

**易错点**
- `mid` 的计算用 `left + (right - left) / 2` 而非 `(left + right) / 2`（防溢出）
- `while (left <= right)` 和 `while (left < right)` 的边界含义不同
- `left = mid + 1` 和 `right = mid - 1` 要根据情况选择

---

### 4.2 二分答案

**概念**
- 对答案进行二分搜索，配合**单调性检查函数**
- 适用于"求满足条件的最小/最大值"类问题
- 关键：答案具有单调性——若 x 满足条件，则所有 ≥ x（或 ≤ x）也满足

**代码模板**

```cpp
// 模板：求满足条件的最小值
// check(x)：当答案为 x 时，是否满足条件
// 若 check 单调（x 满足 → 所有更大的也满足），可以二分

int binarySearchAnswer(int left, int right) {
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (check(mid)) {
            right = mid;      // 满足条件，尝试找更小的
        } else {
            left = mid + 1;   // 不满足，往大了找
        }
    }
    return left;
}

// 示例：在有序数组中找第一个 ≥ target 的数
bool check(int mid, vector<int>& arr, int target) {
    return arr[mid] >= target;
}

// 示例：把 n 个物品分给 m 个人，每个人分到的糖果数相同，求每人最多分几个
// 每堆糖果数量为 a[i]
long long n, m;
vector<long long> a;

bool checkAnswer(long long x) {
    if (x == 0) return true;
    long long cnt = 0;
    for (int i = 0; i < (int)a.size(); i++) {
        cnt += a[i] / x;
    }
    return cnt >= m;
}

long long solve() {
    long long left = 0, right = 1e18;
    while (left < right) {
        long long mid = left + (right - left + 1) / 2;  // 注意 +1 防死循环
        if (checkAnswer(mid)) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    return left;
}
```

**易错点**
- 二分答案的关键是确定**答案的单调性**和**check 函数**
- 求最小值用 `right = mid`，求最大值用 `left = mid`
- 注意 `mid` 计算中 `+1` 的使用，防止 `left == right - 1` 时死循环
- 搜索范围 `[left, right]` 要覆盖所有可能的答案

---

## 知识块五：贪心算法

### 5.1 贪心算法基础

**概念**
- 每一步都做出**当前最优**的选择，期望得到全局最优解
- 贪心能用的前提：问题具有**贪心选择性质**和**最优子结构**
- 不一定能得到全局最优，需要证明正确性

**解题步骤**
1. 分析问题，确定贪心策略
2. 证明贪心选择性质（局部最优 → 全局最优）
3. 编写代码

---

### 5.2 活动选择问题

**概念**
- 有 n 个活动，每个活动有开始时间和结束时间
- 选择尽可能多的不重叠活动
- 贪心策略：按结束时间排序，每次选结束最早的

**代码模板**

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Activity {
    int start, end;
};

bool cmp(Activity a, Activity b) {
    return a.end < b.end;  // 按结束时间升序
}

int maxActivities(vector<Activity>& acts) {
    sort(acts.begin(), acts.end(), cmp);
    int count = 0, lastEnd = -1;
    for (auto& act : acts) {
        if (act.start >= lastEnd) {  // 与上一个活动不重叠
            count++;
            lastEnd = act.end;
        }
    }
    return count;
}
```

---

### 5.3 区间调度 / 分配问题

**常见贪心策略**
- **按结束时间排序**：区间不重叠最多 → 每次选结束最早的
- **按开始时间排序**：区间合并问题 → 每次检查能否合并
- **按权重/价值排序**：背包问题的贪心近似（不一定最优）

**代码模板（区间合并）**

```cpp
vector<pair<int,int>> mergeIntervals(vector<pair<int,int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<pair<int,int>> merged;
    for (auto& inv : intervals) {
        if (!merged.empty() && inv.first <= merged.back().second) {
            merged.back().second = max(merged.back().second, inv.second);
        } else {
            merged.push_back(inv);
        }
    }
    return merged;
}
```

---

### 5.4 贪心常见应用

| 问题类型 | 贪心策略 |
|---------|---------|
| 活动选择 | 按结束时间排序 |
| 任务调度 | 按截止时间或权重排序 |
| 区间合并 | 按开始时间排序 |
| 分糖果 | 两边排序，小的先满足小需求 |
| 跳跃游戏 | 维护最远可达距离 |
| 零钱兑换 | 优先用大面额（仅对特定面额系统成立） |

**易错点**
- 贪心不能证明正确性时，不要盲目使用
- 很多看似贪心的问题实际需要 DP（如背包问题）
- 编码时注意边界条件（空数组、只有一个元素等）

---

## 知识块六：分治算法（归并排序与快速排序）

### 6.1 分治思想

**概念**
- **分（Divide）**：将问题分解为若干规模更小的子问题
- **治（Conquer）**：递归地求解子问题
- **合（Combine）**：将子问题的解合并为原问题的解

**时间复杂度分析（主定理简化版）**
- 若子问题规模为 n/b，共 a 个子问题，合并代价为 O(n^d)
  - a < b^d → O(n^d)
  - a = b^d → O(n^d × log n)
  - a > b^d → O(n^(log_b(a)))

---

### 6.2 归并排序（Merge Sort）

**概念**
- 分治思想的经典应用
- 将数组分成两半，分别排序，再合并
- 时间复杂度：O(n log n)，空间复杂度：O(n)
- **稳定排序**

**代码模板**

```cpp
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (int t = 0; t < (int)temp.size(); t++) {
        arr[left + t] = temp[t];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// 使用示例
// vector<int> a = {5, 2, 8, 1, 9, 3};
// mergeSort(a, 0, a.size() - 1);
```

**易错点**
- `mid` 的计算防止溢出
- 合并时注意 `temp` 数组大小是 `right - left + 1`
- `i <= mid` 和 `j <= right` 的终止条件不要写错
- 归并排序是**稳定排序**（相等元素保持原始顺序）

---

### 6.3 快速排序（Quick Sort）

**概念**
- 分治思想的经典应用
- 选一个基准值（pivot），将数组分为两部分：小于 pivot 和大于 pivot
- 时间复杂度：平均 O(n log n)，最坏 O(n²)，空间复杂度：O(log n)
- **不稳定排序**

**代码模板**

```cpp
#include <vector>
#include <algorithm>
using namespace std;

int partition(vector<int>& arr, int left, int right) {
    int pivot = arr[right];  // 选最后一个元素为基准
    int i = left - 1;        // i 指向小于 pivot 区域的末尾
    
    for (int j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[right]);
    return i + 1;  // pivot 的最终位置
}

void quickSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int pivotIdx = partition(arr, left, right);
    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);
}

// 三数取中优化（避免最坏情况）
int medianOfThree(vector<int>& arr, int left, int right) {
    int mid = left + (right - left) / 2;
    if (arr[left] > arr[mid]) swap(arr[left], arr[mid]);
    if (arr[left] > arr[right]) swap(arr[left], arr[right]);
    if (arr[mid] > arr[right]) swap(arr[mid], arr[right]);
    swap(arr[mid], arr[right]);  // 将中值放到末尾作为 pivot
    return partition(arr, left, right);
}

void quickSortOptimized(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int pivotIdx = medianOfThree(arr, left, right);
    quickSortOptimized(arr, left, pivotIdx - 1);
    quickSortOptimized(arr, pivotIdx + 1, right);
}
```

**易错点**
- 快排最坏情况是 O(n²)（数组已有序时），可用三数取中优化
- `partition` 函数中 `i` 和 `j` 的含义要清晰
- 快排是**不稳定排序**，不要在需要稳定性的场景使用
- 基准值选择影响性能，随机选择或三数取中可以优化

---

### 6.4 归并排序 vs 快速排序

| 特性 | 归并排序 | 快速排序 |
|-----|---------|---------|
| 时间复杂度（平均） | O(n log n) | O(n log n) |
| 时间复杂度（最坏） | O(n log n) | O(n²) |
| 空间复杂度 | O(n) | O(log n) |
| 稳定性 | 稳定 | 不稳定 |
| 适用场景 | 链表排序、需要稳定性 | 数组排序、追求速度 |

---

## 知识块七：递归

### 7.1 递归基础

**概念**
- **递归**：函数直接或间接调用自身
- 三要素：
  1. **递归终止条件（base case）**：防止无限递归
  2. **递推关系**：将大问题分解为小问题
  3. **向终止条件收敛**：每次递归问题规模缩小

**经典示例**

```cpp
// 阶乘 n!
int factorial(int n) {
    if (n <= 1) return 1;  // 终止条件
    return n * factorial(n - 1);  // 递推
}

// 斐波那契数列
int fibonacci(int n) {
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 递归遍历数组求和
int arrSum(int arr[], int n) {
    if (n == 0) return 0;
    return arr[n - 1] + arrSum(arr, n - 1);
}
```

---

### 7.2 递归转迭代

**概念**
- 递归可以改写为迭代（循环），避免栈溢出
- 方法：用栈模拟递归调用

**示例**

```cpp
// 递归版本
int gcd_recursive(int a, int b) {
    return b == 0 ? a : gcd_recursive(b, a % b);
}

// 迭代版本
int gcd_iterative(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// 斐波那契：递归 O(2^n) → 迭代 O(n)
int fibonacci_iterative(int n) {
    if (n <= 2) return 1;
    int a = 1, b = 1;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

---

### 7.3 递归与分治的关系

**概念**
- 分治算法的核心就是递归
- 递归提供"如何分解和组合"的框架
- 分治算法模板：
  ```
  function divideConquer(problem):
      if problem is small enough:
          return solve directly
      subproblems = divide(problem)
      subResults = [divideConquer(sp) for sp in subproblems]
      return combine(subResults)
  ```

**易错点**
- 递归一定要有终止条件，否则栈溢出
- 每次递归要向终止条件靠近
- 递归深度太大时（如 n > 10000）考虑改迭代
- 记忆化搜索（加缓存）可以将指数复杂度降为多项式复杂度

---

## 知识块八：算法复杂度估算

### 8.1 常见复杂度量级

| 复杂度 | 名称 | n=10 | n=100 | n=1000 |
|-------|------|------|-------|--------|
| O(1) | 常数 | 1 | 1 | 1 |
| O(log n) | 对数 | 3 | 7 | 10 |
| O(n) | 线性 | 10 | 100 | 1000 |
| O(n log n) | 线性对数 | 30 | 700 | 10000 |
| O(n²) | 平方 | 100 | 10000 | 10^6 |
| O(n³) | 立方 | 1000 | 10^6 | 10^9 |
| O(2^n) | 指数 | 1024 | 10^30 | 10^301 |

---

### 8.2 复杂度估算方法

**看循环结构**

```cpp
// O(1) — 无循环
int x = a + b;

// O(n) — 单层循环
for (int i = 0; i < n; i++) { /* ... */ }

// O(n²) — 双层嵌套循环
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++) { /* ... */ }

// O(log n) — 循环变量每次翻倍
for (int i = 1; i < n; i *= 2) { /* ... */ }

// O(n log n) — 外层 n，内层 log n
for (int i = 0; i < n; i++)
    for (int j = 1; j < n; j *= 2) { /* ... */ }

// O(2^n) — 每个元素选或不选
void subset(int arr[], int n, int idx, vector<int>& current) {
    if (idx == n) {
        // 处理一个子集
        return;
    }
    subset(arr, n, idx + 1, current);          // 不选
    current.push_back(arr[idx]);
    subset(arr, n, idx + 1, current);          // 选
    current.pop_back();
}
```

---

### 8.3 递归复杂度分析

**常见递推式**

| 递推式 | 复杂度 | 对应算法 |
|-------|--------|---------|
| T(n) = T(n-1) + O(1) | O(n) | 递归遍历 |
| T(n) = T(n-1) + O(n) | O(n²) | 冒泡/选择排序 |
| T(n) = 2T(n/2) + O(n) | O(n log n) | 归并排序 |
| T(n) = 2T(n/2) + O(1) | O(n) | 遍历二叉树 |
| T(n) = T(n-1) + T(n-2) + O(1) | O(2^n) | 斐波那契（朴素递归） |
| T(n) = T(n/2) + O(1) | O(log n) | 二分查找 |

---

### 8.4 复杂度实战判断

**示例分析**

```cpp
// 示例1：O(n)
for (int i = 0; i < n; i++) {
    sum += arr[i];
}

// 示例2：O(n²)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        matrix[i][j] = 0;
    }
}

// 示例3：O(n) — 注意不是 O(n²)
for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        // 内层循环次数: n-i，总次数 = n + (n-1) + ... + 1 = n(n+1)/2
        // 但这是 O(n²)，不是 O(n)
    }
}

// 示例4：O(log n)
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// 示例5：O(√n)
bool isPrime(int n) {
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// 示例6：O(n log n)
void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    mergeSort(arr, l, mid);       // T(n/2)
    mergeSort(arr, mid + 1, r);   // T(n/2)
    merge(arr, l, mid, r);        // O(n)
}
```

---

### 8.5 时间限制与复杂度估算

| 时间限制 | O(n) 最大 n | O(n log n) 最大 n | O(n²) 最大 n | O(2^n) 最大 n |
|---------|------------|-------------------|-------------|--------------|
| 1 秒 | 10^8 | 10^7 | 10^4 | 25 |
| 0.5 秒 | 5×10^7 | 5×10^6 | 7000 | 22 |

**易错点**
- 复杂度分析时，加法取最高项：O(n² + n) = O(n²)
- 乘法直接相乘：O(n) × O(log n) = O(n log n)
- 常数因子可以忽略：O(2n) = O(n)
- 递归复杂度用递推式分析，不要只看递归深度

---

## 综合练习建议

### 历年五级真题常见题型

1. **数论题**：素数判断、GCD/LCM、质因数分解
2. **高精度题**：大数加减乘除运算
3. **链表题**：链表反转、链表合并、环检测
4. **二分题**：有序数组查找、二分答案
5. **贪心题**：区间调度、活动选择
6. **分治题**：归并排序应用（逆序对等）
7. **递归题**：递归实现、递归转迭代
8. **复杂度题**：分析给定代码的时间复杂度

### 备考要点

- ⚠️ **严格区分五级和六级内容**：五级不考栈/队列、BFS/DFS、二叉树/BST、背包DP
- 🔢 **初等数论**是五级的重点和难点，务必掌握各种筛法和模运算
- 📝 **高精度运算**要注意数组存储方向和进位/借位处理
- 🔗 **链表操作**要注意指针的修改顺序和内存释放
- ⚖️ **二分答案**的关键是确定单调性和编写 check 函数
- 🎯 **贪心和分治**要理解适用条件，不能盲目套用
- ⏱️ **复杂度估算**要多练习，能快速判断代码的复杂度量级
