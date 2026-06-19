# GESP C++ 二级代码模板（修正版）

> 本模板严格对应 GESP Level 2 考纲：计算机的存储与网络基础、程序设计语言的特点、流程图的概念与描述、ASCII 编码、数据类型的转换（强制/隐式）、多层分支与循环结构、常用数学函数（abs/sqrt/max/min/pow/ceil/floor）。共 10 段高频代码模板。

---

## 01. 常用数学函数（abs / sqrt / pow）

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int a = -5;
    double b = 16.0, c = 2.0;

    // abs()：取绝对值（整数版本）
    cout << "abs(-5) = " << abs(a) << endl;          // 5

    // sqrt()：求平方根（参数和返回值均为 double）
    cout << "sqrt(16) = " << sqrt(b) << endl;        // 4

    // pow()：求幂，pow(x, y) = x^y
    cout << "pow(2, 10) = " << pow(c, 10) << endl;  // 1024

    // fabs()：浮点数取绝对值
    double d = -3.14;
    cout << "fabs(-3.14) = " << fabs(d) << endl;     // 3.14

    return 0;
}
```

**要点**：`abs()` 用于整数取绝对值，浮点数应使用 `fabs()`。`sqrt()` 和 `pow()` 头文件为 `&lt;cmath&gt;`，参数和返回值均为 `double` 类型。使用前须 `#include &lt;cmath&gt;`。

---

## 02. max / min 函数

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int a = 10, b = 20;

    // max() / min()：求两数最大值/最小值
    cout << "max(10, 20) = " << max(a, b) << endl;  // 20
    cout << "min(10, 20) = " << min(a, b) << endl;  // 10

    // 三个数取最大值：嵌套使用
    int c = 15;
    int m = max(a, max(b, c));
    cout << "max(10, 20, 15) = " << m << endl;      // 20

    // 三个数取最小值
    int n = min(a, min(b, c));
    cout << "min(10, 20, 15) = " << n << endl;      // 10

    // 自定义比较函数（二级不要求，仅了解）
    // 三目运算符也可实现：int m2 = (a > b) ? a : b;

    return 0;
}
```

**要点**：`max(a, b)` 和 `min(a, b)` 头文件为 `&lt;algorithm&gt;`，要求两个参数类型相同。三个数取最值可用嵌套调用 `max(a, max(b, c))`。也可用三目运算符 `(a > b) ? a : b` 实现。

---

## 03. ceil / floor 取整函数

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double a = 3.2, b = 3.7, c = -2.3, d = -2.7;

    // ceil()：向上取整（天花板）
    cout << "ceil(3.2)  = " << ceil(a)  << endl;   // 4
    cout << "ceil(3.7)  = " << ceil(b)  << endl;   // 4
    cout << "ceil(-2.3) = " << ceil(c)  << endl;   // -2
    cout << "ceil(-2.7) = " << ceil(d)  << endl;   // -2

    // floor()：向下取整（地板）
    cout << "floor(3.2)  = " << floor(a)  << endl; // 3
    cout << "floor(3.7)  = " << floor(b)  << endl; // 3
    cout << "floor(-2.3) = " << floor(c)  << endl; // -3
    cout << "floor(-2.7) = " << floor(d)  << endl; // -3

    // round()：四舍五入（C++11）
    cout << "round(3.5)  = " << round(3.5)  << endl; // 4
    cout << "round(2.4)  = " << round(2.4)  << endl; // 2

    return 0;
}
```

**要点**：`ceil(x)` 返回不小于 x 的最小整数（向上取整），`floor(x)` 返回不大于 x 的最大整数（向下取整）。对负数要特别注意：`ceil(-2.3) = -2`，`floor(-2.3) = -3`。返回值类型为 `double`。

---

## 04. ASCII 码与字符转换

```cpp
#include <iostream>
using namespace std;

int main() {
    // 字符 → ASCII 码（隐式转换）
    char ch = 'A';
    int code = ch;               // 隐式转换：char → int
    cout << "'A' 的 ASCII 码 = " << code << endl;       // 65

    // ASCII 码 → 字符（强制类型转换）
    int num = 97;
    char ch2 = (char)num;        // 强制转换：int → char
    cout << "ASCII 97 对应字符 = " << ch2 << endl;       // a

    // 常用 ASCII 码范围
    cout << "数字 '0'-'9': " << (int)'0' << " - " << (int)'9' << endl;   // 48-57
    cout << "大写 'A'-'Z': " << (int)'A' << " - " << (int)'Z' << endl;   // 65-90
    cout << "小写 'a'-'z': " << (int)'a' << " - " << (int)'z' << endl;   // 97-122

    // 字符遍历：用循环输出所有可打印字符
    for (int i = 32; i <= 126; i++) {
        cout << (char)i << " ";
    }
    cout << endl;

    return 0;
}
```

**要点**：`char` 本质上是一个整数，存储 ASCII 码值。字符赋值给 `int` 时自动隐式转换；`int` 赋值给 `char` 需强制转换 `(char)`。数字字符 `'0'-'9'` 对应 48-57，大写 `'A'-'Z'` 对应 65-90，小写 `'a'-'z'` 对应 97-122。

---

## 05. 大小写字母转换

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";

    // 方法一：利用 ASCII 码差值（大写和小写相差 32）
    for (int i = 0; i < s.length(); i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            s[i] = s[i] + 32;   // 大写 → 小写
        }
    }
    cout << "全部转小写: " << s << endl;  // hello world

    // 方法二：转大写
    for (int i = 0; i < s.length(); i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = s[i] - 32;   // 小写 → 大写
        }
    }
    cout << "全部转大写: " << s << endl;  // HELLO WORLD

    // 方法三：使用 cctype 库函数（二级了解即可）
    // #include <cctype>
    // toupper(ch) 转大写，tolower(ch) 转小写

    return 0;
}
```

**要点**：ASCII 码中，同一字母的大写与小写相差 32（如 `'A'=65`，`'a'=97`）。判断大小写可用范围比较 `s[i]>='A' && s[i]<='Z'`。转换时直接对字符做加减运算即可。`toupper()` 和 `tolower()` 在 `<cctype>` 中。

---

## 06. 强制类型转换

```cpp
#include <iostream>
using namespace std;

int main() {
    // C 风格强制转换
    int a = 7, b = 2;

    // 整数除法：默认截断小数部分
    cout << "7 / 2 = " << a / b << endl;               // 3

    // 强制转换为 double 后除法：保留小数
    cout << "7.0 / 2 = " << (double)a / b << endl;     // 3.5
    cout << "7 / 2.0 = " << a / (double)b << endl;     // 3.5

    // C++ 风格强制转换
    cout << "static_cast: " << static_cast<double>(a) / b << endl; // 3.5

    // 整数转浮点、浮点转整数
    double pi = 3.14159;
    int intPi = (int)pi;           // 截断取整：3
    int intPi2 = (int)(pi + 0.5); // 四舍五入：3
    cout << "(int)3.14159 = " << intPi << endl;         // 3
    cout << "(int)(3.14159+0.5) = " << intPi2 << endl;  // 3

    // char 与 int 互转
    char ch = 65;
    cout << "(char)65 = " << (char)65 << endl;          // A
    cout << "(int)'A' = " << (int)'A' << endl;          // 65

    return 0;
}
```

**要点**：两个 `int` 相除结果仍为 `int`（自动截断小数）。若要得到小数结果，必须先将至少一个操作数转为 `double`。C 风格 `(type)` 和 C++ 风格 `static_cast<type>()` 均可。浮点数转整数会截断小数部分（不是四舍五入）。

---

## 07. 隐式类型转换

```cpp
#include <iostream>
using namespace std;

int main() {
    // 隐式转换规则：小类型自动提升为大类型

    // 1. char → int（自动提升）
    char c = 'A';
    int n = c;          // 隐式转换，n = 65
    cout << "char → int: " << n << endl;

    // 2. int → double（自动提升）
    int x = 10;
    double y = x;       // 隐式转换，y = 10.0
    cout << "int → double: " << y << endl;

    // 3. 整数与浮点数混合运算时，int 自动提升为 double
    int a = 5;
    double b = 2.0;
    double result = a / b;   // a 自动提升为 5.0，结果 2.5
    cout << "5 / 2.0 = " << result << endl;  // 2.5

    // 4. int → bool（非零为 true，零为 false）
    int val1 = 42, val2 = 0;
    bool b1 = val1;     // true
    bool b2 = val2;     // false
    cout << "42 → bool: " << b1 << ", 0 → bool: " << b2 << endl;

    // 5. 赋值时的隐式转换（可能丢失精度）
    double d = 3.99;
    int m = d;          // 截断为 3，精度丢失！
    cout << "double 3.99 → int: " << m << endl;  // 3

    // 6. 混合运算中的链式提升
    char ch = 'A';      // 65
    int sum = ch + 1;   // char 提升为 int，结果 66
    cout << "'A' + 1 = " << sum << endl;          // 66

    return 0;
}
```

**要点**：隐式类型转换按"小类型 → 大类型"方向自动进行：`char → int → long → float → double`。混合运算中较低精度类型自动提升为较高精度类型。赋值给较小类型时会截断（如 `double → int` 丢失小数），不会报错但可能产生非预期结果。

---

## 08. 多层 for 循环（嵌套循环）

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5;

    // 双重 for 循环：输出 n×n 矩阵
    cout << "=== 矩阵 ===" << endl;
    for (int i = 1; i <= n; i++) {        // 外层：控制行
        for (int j = 1; j <= n; j++) {    // 内层：控制列
            cout << i * j << "\t";
        }
        cout << endl;
    }

    // 三重 for 循环：遍历三维（示例为求 1~n 的组合数）
    cout << "\n=== 三重循环计数 ===" << endl;
    int count = 0;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            for (int k = 1; k <= n; k++)
                count++;
    cout << n << " 重循环总次数: " << count << endl;  // 125

    // 嵌套循环 + 条件：打印三角形
    cout << "\n=== 直角三角形 ===" << endl;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {    // 每行打印 i 个星号
            cout << "* ";
        }
        cout << endl;
    }

    return 0;
}
```

**要点**：多层嵌套循环中，外层每执行一次，内层完整执行一轮。n 层循环总执行次数为各层循环次数之积。内层循环变量 `j` 每轮都会重新初始化。注意避免不必要的多层循环导致时间复杂度过高（O(n²)、O(n³)等）。

---

## 09. 嵌套 if-else 多层分支

```cpp
#include <iostream>
using namespace std;

int main() {
    int score;

    // 成绩等级判定（嵌套 if-else）
    cout << "请输入成绩(0-100): ";
    cin >> score;

    if (score < 0 || score > 100) {
        cout << "输入无效！" << endl;
    } else if (score >= 90) {
        cout << "优秀" << endl;
    } else if (score >= 80) {
        cout << "良好" << endl;
    } else if (score >= 70) {
        cout << "中等" << endl;
    } else if (score >= 60) {
        cout << "及格" << endl;
    } else {
        cout << "不及格" << endl;
    }

    // 嵌套 if（闰年判断）
    int year;
    cout << "\n请输入年份: ";
    cin >> year;

    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                cout << year << " 是闰年" << endl;
            } else {
                cout << year << " 不是闰年" << endl;
            }
        } else {
            cout << year << " 是闰年" << endl;
        }
    } else {
        cout << year << " 不是闰年" << endl;
    }

    // 等价简化写法
    // if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)

    return 0;
}
```

**要点**：多层 `if-else if-else` 按顺序判断，一旦匹配则执行对应分支并跳过后续。嵌套 `if` 用于条件的进一步细分（如闰年：能被4整除 → 再判断能否被100整除 → 再判断能否被400整除）。`else` 与最近的未配对 `if` 匹配。

---

## 10. 多层循环应用（九九乘法表变体）

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    // 经典九九乘法表（正三角）
    cout << "=== 九九乘法表（正三角）===" << endl;
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << "×" << i << "=" << i * j << "\t";
        }
        cout << endl;
    }

    // 九九乘法表（倒三角）
    cout << "\n=== 九九乘法表（倒三角）===" << endl;
    for (int i = 9; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            cout << j << "×" << i << "=" << i * j << "\t";
        }
        cout << endl;
    }

    // 求乘法表中所有积的总和
    int total = 0;
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            total += i * j;
        }
    }
    cout << "\n乘法表所有积之和 = " << total << endl;  // 1155

    // 找出乘法表中所有积为偶数的个数
    int evenCount = 0;
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            if ((i * j) % 2 == 0) {
                evenCount++;
            }
        }
    }
    cout << "乘法表中偶数积的个数 = " << evenCount << endl;  // 30

    return 0;
}
```

**要点**：九九乘法表是经典的双层循环应用。外层 `i` 控制行（被乘数），内层 `j` 控制列（乘数），内层范围 `j <= i` 形成三角形状。通过在内层循环中加入条件判断或累加，可实现各种统计变体。注意 `\t` 制表符用于对齐输出。

---

## 附录：旧模板错误映射表

下表列出原版错误文件中不属于 GESP Level 2 的内容及其正确归属级别。

| 序号 | 原模板内容（错误放置在二级） | 正确归属级别 | 说明 |
|:---:|:---|:---:|:---|
| 1 | 反转字符串 `string(s.rbegin(), s.rend())` | Level 3 | 字符串进阶操作不在二级考纲 |
| 2 | 阶乘递归 `int f(int n) { return n*f(n-1); }` | Level 3 | 递归函数属于三级考纲 |
| 3 | string 拼接与子字符串 `substr` | Level 3 | 字符串进阶操作不在二级考纲 |
| 4 | 冒泡排序 | Level 4 | 排序算法属于四级考纲 |
| 5 | 选择排序 | Level 4 | 排序算法属于四级考纲 |
| 6 | 插入排序 | Level 4 | 排序算法属于四级考纲 |
| 7 | 数组反转（双指针） | Level 3 | 数组操作与双指针属于三级考纲 |
| 8 | 字符统计（字符频次数组） | Level 3 | 字符串与数组组合操作属于三级考纲 |
| 9 | 斐波那契递归 | Level 3 | 递归函数属于三级考纲 |
| 10 | 数组求和（函数封装） | Level 3 | 函数定义与数组参数属于三级考纲 |
| 11 | 两数最大值（函数定义 `int max(int a, int b)`） | Level 2✅ | 保留，但应使用标准库 `max()` 更规范 |

> **二级考纲范围**：计算机的存储与网络基础、程序设计语言的特点、流程图的概念与描述、ASCII 编码、数据类型的转换（强制/隐式）、多层分支与循环结构、常用数学函数（abs/sqrt/max/min/pow/ceil/floor）。

---

*最后更新：2026-06-19*
