# GESP C++ 三级代码模板（修正版）

> 共 12 段高频代码模板，严格对应 GESP 三级大纲：
> 数据编码（原码/反码/补码）、进制转换、位运算、算法描述（枚举/模拟）、一维数组、字符串及其函数。

---

## 01. 十进制转二进制

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string decToBin(int n) {
    if (n == 0) return "0";
    string bin = "";
    int num = n;
    while (num > 0) {
        bin += (char)(num % 2 + '0');
        num /= 2;
    }
    reverse(bin.begin(), bin.end());
    return bin;
}

int main() {
    int n;
    cin >> n;
    cout << decToBin(n) << endl;
    return 0;
}
```

**要点**：使用"除 2 取余、逆序排列"的方法。注意 `n=0` 的特殊情况需要单独处理。`reverse()` 头文件为 `\<algorithm\>`。

---

## 02. 二进制转十进制

```cpp
#include <iostream>
#include <string>
using namespace std;

int binToDec(string bin) {
    int result = 0;
    for (char c : bin) {
        result = result * 2 + (c - '0');
    }
    return result;
}

int main() {
    string bin;
    cin >> bin;
    cout << binToDec(bin) << endl;
    return 0;
}
```

**要点**：从左到右扫描每一位，用"乘 2 加当前位"的秦九韶算法（Horner 法则）累加。字符 `'0'` 的 ASCII 码为 48，所以 `c - '0'` 得到数字值。

---

## 03. 十进制转十六进制

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string decToHex(int n) {
    if (n == 0) return "0";
    string hex = "";
    string digits = "0123456789ABCDEF";
    int num = n;
    while (num > 0) {
        hex += digits[num % 16];
        num /= 16;
    }
    reverse(hex.begin(), hex.end());
    return hex;
}

int main() {
    int n;
    cin >> n;
    cout << decToHex(n) << endl;
    return 0;
}
```

**要点**：与十进制转二进制同理，只是基数改为 16。`digits` 数组通过下标直接映射余数到十六进制字符。C++ 也提供 `cout << hex << n` 可直接输出小写十六进制。

---

## 04. 位运算（&、|、^、~）

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 12, b = 10; // a=1100, b=1010（二进制）

    // 按位与：两位都为1才为1
    cout << "a & b = " << (a & b) << endl;   // 输出 8  (1000)

    // 按位或：至少一位为1就为1
    cout << "a | b = " << (a | b) << endl;   // 输出 14 (1110)

    // 按位异或：两位不同才为1
    cout << "a ^ b = " << (a ^ b) << endl;   // 输出 6  (0110)

    // 按位取反：0变1、1变0（补码表示下 ~(x) = -x-1）
    cout << "~a = " << (~a) << endl;          // 输出 -13

    // 常用技巧：异或交换两个数（不使用临时变量）
    int x = 5, y = 3;
    x ^= y; y ^= x; x ^= y;
    cout << "交换后 x=" << x << ", y=" << y << endl; // x=3, y=5

    return 0;
}
```

**要点**：`&` 常用于取特定位，`|` 常用于置位，`^` 常用于翻转或交换。`~` 按位取反在补码体系下 `~n = -n-1`。异或交换：`a^=b; b^=a; a^=b;` 可在不引入临时变量的情况下交换两数。

---

## 05. 左移与右移

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5; // 二进制 101

    // 左移：高位丢弃，低位补0（相当于乘以 2^n）
    cout << "a << 1 = " << (a << 1) << endl;  // 10（二进制 1010）
    cout << "a << 2 = " << (a << 2) << endl;  // 20（二进制 10100）

    // 右移：低位丢弃，高位补符号位（相当于整除 2^n）
    int b = 20; // 二进制 10100
    cout << "b >> 1 = " << (b >> 1) << endl;  // 10
    cout << "b >> 2 = " << (b >> 2) << endl;  // 5

    // 实用：用左移计算 2 的幂
    cout << "2^10 = " << (1 << 10) << endl;   // 1024

    // 判断奇偶：x & 1 == 1 为奇数，== 0 为偶数
    int x = 7;
    cout << x << " 是" << ((x & 1) ? "奇数" : "偶数") << endl;

    return 0;
}
```

**要点**：左移 `<<n` 等价于乘以 2ⁿ，右移 `>>n` 等价于整除 2ⁿ（正数情况下）。判断奇偶用 `x & 1` 比 `x % 2` 效率更高。注意右移对负数是算术右移（补符号位）。

---

## 06. 一维数组定义与初始化

```cpp
#include <iostream>
using namespace std;

int main() {
    // 方式1：定义时指定大小并全部初始化为0
    int a[10] = {0};

    // 方式2：部分初始化，未赋值的元素自动为0
    int b[5] = {1, 2, 3};  // b = {1, 2, 3, 0, 0}

    // 方式3：不写大小，由初始化列表决定
    int c[] = {10, 20, 30, 40, 50};  // 大小为5

    // 方式4：全部赋相同值（C++11起）
    int d[5] = {};  // d = {0, 0, 0, 0, 0}

    // 方式5：循环逐个输入
    int n = 5;
    int arr[100];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    // 输出验证
    for (int i = 0; i < 5; i++) {
        cout << b[i] << " ";
    }
    cout << endl;

    return 0;
}
```

**要点**：数组下标从 0 开始。部分初始化时，未列出的元素自动填 0。数组大小必须是常量表达式（C++ 中可用 `const int` 或 `constexpr`）。数组名代表首元素地址。

---

## 07. 数组遍历与查找

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100];

    // 输入数组
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // 查找最大值及其位置
    int maxVal = a[0], maxPos = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] > maxVal) {
            maxVal = a[i];
            maxPos = i;
        }
    }
    cout << "最大值: " << maxVal << "，位置: " << maxPos << endl;

    // 查找指定元素（线性查找）
    int target;
    cin >> target;
    int found = -1;  // -1 表示未找到
    for (int i = 0; i < n; i++) {
        if (a[i] == target) {
            found = i;
            break;  // 找到第一个就退出
        }
    }
    if (found == -1)
        cout << "未找到" << endl;
    else
        cout << "找到，位置: " << found << endl;

    // 统计某个值出现的次数
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] == target) count++;
    }
    cout << target << " 出现了 " << count << " 次" << endl;

    return 0;
}
```

**要点**：线性查找时间复杂度为 O(n)。查找最大值时，可以先假设第一个元素最大，再逐个比较更新。`break` 可以在找到目标后提前退出循环，避免不必要的遍历。

---

## 08. 数组逆序

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100];

    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // 方法1：双指针交换
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        int temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    // 方法2：借助新数组（空间换思路）
    // int b[100];
    // for (int i = 0; i < n; i++) b[i] = a[n - 1 - i];
    // for (int i = 0; i < n; i++) a[i] = b[i];

    // 输出逆序后的数组
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    cout << endl;

    return 0;
}
```

**要点**：双指针法是逆序数组的经典方法，左右指针分别从首尾向中间移动并交换元素。交换三步：`temp=a[i]; a[i]=a[j]; a[j]=temp;`。循环条件 `i < j` 确保每个元素只交换一次。

---

## 09. 字符串遍历

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);  // 读入一行（含空格）

    // 方法1：下标遍历
    cout << "下标遍历: ";
    for (int i = 0; i < s.size(); i++) {
        cout << s[i] << " ";
    }
    cout << endl;

    // 方法2：范围 for（C++11）
    cout << "范围遍历: ";
    for (char c : s) {
        cout << c << " ";
    }
    cout << endl;

    // 统计大写/小写字母个数
    int upper = 0, lower = 0;
    for (char c : s) {
        if (c >= 'A' && c <= 'Z') upper++;
        if (c >= 'a' && c <= 'z') lower++;
    }
    cout << "大写: " << upper << ", 小写: " << lower << endl;

    // 统计每个字符出现次数（字符计数法）
    int cnt[128] = {0};  // ASCII 码范围
    for (char c : s) {
        cnt[(int)c]++;
    }
    for (int i = 0; i < 128; i++) {
        if (cnt[i] > 0)
            cout << "'" << (char)i << "' : " << cnt[i] << "次  ";
    }
    cout << endl;

    return 0;
}
```

**要点**：`getline(cin, s)` 可读入含空格的整行字符串。范围 `for` 语法更简洁。字符计数法利用 ASCII 码作数组下标，时间复杂度 O(n)，是字符频率统计的常用技巧。

---

## 10. 字符串查找子串

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, sub;
    getline(cin, s);
    getline(cin, sub);

    // 方法1：使用 string::find（推荐）
    size_t pos = s.find(sub);
    if (pos != string::npos) {
        cout << "方法1 - 首次出现位置: " << pos << endl;
    } else {
        cout << "方法1 - 未找到" << endl;
    }

    // 查找所有出现位置
    cout << "所有出现位置: ";
    pos = 0;
    while ((pos = s.find(sub, pos)) != string::npos) {
        cout << pos << " ";
        pos++;  // 继续往后找（避免重叠）
    }
    cout << endl;

    // 方法2：朴素子串查找（暴力匹配，便于理解原理）
    int found = -1;
    for (int i = 0; i <= (int)s.size() - (int)sub.size(); i++) {
        bool match = true;
        for (int j = 0; j < (int)sub.size(); j++) {
            if (s[i + j] != sub[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            found = i;
            break;  // 找到第一个就退出
        }
    }
    if (found != -1)
        cout << "方法2 - 位置: " << found << endl;
    else
        cout << "方法2 - 未找到" << endl;

    return 0;
}
```

**要点**：`string::find(sub)` 返回子串首次出现的下标，未找到返回 `string::npos`。朴素匹配外层循环控制起始位置 i，内层逐字符比对，时间复杂度 O(n×m)。`getline` 需要 `\<string\>` 头文件。

---

## 11. 枚举法示例

```cpp
#include <iostream>
using namespace std;

// 题目：找出三位数中所有各位数字之和等于某个值的数
int main() {
    int target;
    cin >> target;  // 例如输入 15

    cout << "各位数字之和为 " << target << " 的三位数：" << endl;

    // 枚举所有三位数
    for (int num = 100; num <= 999; num++) {
        int a = num / 100;         // 百位
        int b = (num / 10) % 10;   // 十位
        int c = num % 10;          // 个位

        if (a + b + c == target) {
            cout << num << " ";
        }
    }
    cout << endl;

    return 0;
}
```

**要点**：枚举法（穷举法）的核心思想是"不遗漏地列出所有可能的情况，逐一判断"。关键要素：①确定枚举范围（三位数 100~999）；②确定判断条件（各位数字之和等于目标值）；③提取数字的技巧（整除和取余）。时间复杂度与枚举范围成正比。

---

## 12. 模拟法示例

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 题目：模拟扑克牌发牌
// 有 n 个人围成一圈，依次编号 1~n
// 有一副牌依次发出，每人每次一张，直到发完
// 问：最后一个人（编号 n）拿到了哪些牌（按顺序）

int main() {
    int n, m;
    cin >> n >> m;  // n 个人，m 张牌（编号 1~m）

    // 用 vector 模拟每个人的牌
    vector<vector<int>> hands(n);  // n 个空列表

    // 模拟发牌过程
    int card = 1;  // 当前要发的牌
    int person = 0;  // 当前发给谁（从第 0 个人开始）

    while (card <= m) {
        hands[person].push_back(card);  // 发一张牌
        card++;
        person = (person + 1) % n;      // 轮到下一个人
    }

    // 输出每个人的牌
    for (int i = 0; i < n; i++) {
        cout << "第" << i + 1 << "号: ";
        for (int c : hands[i]) {
            cout << c << " ";
        }
        cout << endl;
    }

    return 0;
}
```

**要点**：模拟法是按照题目描述的过程，用代码一步步"还原"操作。核心步骤：①用数据结构表示状态（用 `vector<vector<int>>` 表示每个人的牌）；②用循环模拟过程（取模 `%n` 实现循环报数）；③输出结果。模拟法不需要找数学规律，关键在于忠实还原题意。

---

## 附录：旧版模板内容分级对照表

以下表格列出原文件中错误归入三级的模板及其正确所属级别：

| 序号 | 旧版模板名称 | 错误归入级别 | 正确所属级别 | 说明 |
|:---:|:---|:---:|:---:|:---|
| 01 | 结构体定义 | 三级 | 四级 | 结构体属于四级大纲（结构体与类） |
| 02 | 结构体排序 | 三级 | 四级 | lambda 排序 + 结构体属于四级 |
| 03 | 斐波那契递归 | 三级 | 五级 | 递归算法属于五级大纲 |
| 04 | 读文件全部行 | 三级 | 四级 | 文件操作属于四级大纲（文件读写） |
| 05 | 写文件 | 三级 | 四级 | 文件操作属于四级大纲（文件读写） |
| 06 | 汉诺塔 | 三级 | 五级 | 递归经典题属于五级 |
| 07 | sort 降序 | 三级 | 四级 | STL 排序属于四级大纲（算法与STL） |
| 08 | sstream 分割 | 三级 | 四级 | 字符串流属于四级 |
| 09 | 杨辉三角 | 三级 | 四级 | 二维数组属于四级大纲 |
| 10 | 矩阵加法 | 三级 | 四级 | 二维数组属于四级大纲 |
| 11 | 字符计数 | 三级 | **三级** | 字符计数属于三级（字符串与字符） |
| 12 | 下界查找 | 三级 | 四级 | lower_bound 属于四级 STL 算法 |

> **结论**：原文件 12 个模板中，仅第 11 项（字符计数）真正属于三级大纲，其余 11 项均为四级或五级内容。本修正版全部替换为严格对应三级大纲的模板。
