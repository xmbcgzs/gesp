# NOI入门组知识点整理（2025修订版）

> 适用：CSP-J（CCF非专业级别软件能力认证入门组）  
> 难度系数：1-5  
> 修订时间：2025年4月  
> 代码规范：头文件统一使用 `#include<bits/stdc++.h>`，万能头文件

---

## 📋 总览

| 大类 | 子类数 | 难度范围 |
|:---|:---:|:---:|
| 基础知识与编程环境 | 2 | 1-2 |
| C++程序设计 | 13 | 1-5 |
| 数据结构 | 5 | 3-4 |
| 算法 | 9 | 1-5 |
| 数学与其他 | 5 | 1-4 |

---

# 一、基础知识与编程环境

## 1.1 计算机基础

### 知识点1：计算机的基本构成

计算机由五大部件组成：**运算器、控制器（合称CPU）、存储器、输入设备、输出设备**。

- **CPU（中央处理器）**：执行指令、进行算术和逻辑运算
- **内存（RAM）**：临时存储运行中的程序和数据，断电丢失
- **外存（硬盘/SSD）**：永久存储数据
- **输入设备**：键盘、鼠标、扫描仪等
- **输出设备**：显示器、打印机、音箱等

### 知识点2：操作系统的基本概念

操作系统是管理计算机硬件和软件资源的系统软件。

- **Windows**：图形界面，日常使用广泛
- **Linux**：命令行为主，服务器和竞赛常用
- **macOS**：苹果系统

常见操作：文件管理（创建/复制/删除/移动）、进程管理、内存管理。

### 知识点3：计算机网络和Internet

- **网络协议**：TCP/IP、HTTP、FTP等
- **IP地址**：如 192.168.1.1，标识网络中的设备
- **域名**：如 www.baidu.com，便于记忆的地址
- **客户端-服务器模型**：Client向Server请求服务

### 知识点4：计算机的历史和常见用途

- 1946年 ENIAC：第一台电子计算机
- 发展历程：电子管→晶体管→集成电路→大规模集成电路
- 用途：科学计算、数据处理、自动控制、人工智能等

### 知识点5-6：NOI及竞赛历史与规则

- **NOI**：全国青少年信息学奥林匹克竞赛，始于1984年
- **CSP-J/S**：CCF非专业级别软件能力认证，分入门组(J)和提高组(S)
- **GESP**：CCF编程能力等级认证，一级到八级
- CSP-J初赛：笔试（选择题+阅读程序+完善程序），100分
- CSP-J复赛：上机编程（4道题），OI赛制

### 知识点7：位、字节与字

- **位（bit）**：最小存储单位，只能存0或1
- **字节（Byte）**：1 Byte = 8 bit，可存0~255
- **字（Word）**：计算机一次处理的数据位数，32位系统为4字节，64位为8字节

```
1 Byte = 8 bit
1 KB = 1024 Byte
1 MB = 1024 KB
1 GB = 1024 MB
```

### 知识点8：编译与运行

- **源代码**：人写的C++代码（.cpp文件）
- **编译**：g++将源代码翻译成机器语言（.exe可执行文件）
- **解释**：逐行翻译执行（如Python）
- **调试**：找出并修复程序中的错误（bug）

```cpp
// 万能头文件，包含所有标准库
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 这是最简单的C++程序
    cout << "Hello, NOI!" << endl;
    return 0;
}
```

---

## 1.2 开发环境

### 知识点1：文件操作基础

- **新建**：创建新文件或文件夹
- **复制/粘贴**：Ctrl+C / Ctrl+V
- **删除**：Delete键或右键删除
- **移动**：拖拽或剪切粘贴

### 知识点2：Dev-C++使用

Dev-C++是Windows下常用的C++集成开发环境（IDE）：

1. 文件 → 新建 → 源代码
2. 编写代码
3. F11编译运行
4. Ctrl+S保存

### 知识点3：Linux下Code::Blocks

Linux下常用IDE：Code::Blocks、VS Code + g++插件。

### 知识点4：g++编译命令

```bash
# 基本编译
g++ -o program program.cpp

# 开启优化和调试信息
g++ -O2 -g -o program program.cpp

# C++17标准
g++ -std=c++17 -o program program.cpp

# 运行
./program
```

---

# 二、C++程序设计

## 2.1 程序基本概念

### 知识点1：标识符与关键字

**标识符**：程序员给变量、函数等起的名字。命名规则：
- 以字母或下划线开头
- 只能包含字母、数字、下划线
- 区分大小写（`abc`和`Abc`不同）
- 不能使用关键字

**关键字**：C++保留的特殊词汇，如 `int, double, for, if, return, class` 等。

### 知识点2：常量与变量

**常量**：值不可改变的量。**变量**：值可以改变的量。

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 变量：可以修改
    int a = 10;
    a = 20;  // OK
    cout << "a = " << a << endl;  // 输出 20

    // 常量：不可修改
    const double PI = 3.14159;
    // PI = 3.0;  // 错误！常量不能赋值
    cout << "PI = " << PI << endl;

    // 宏定义常量（另一种方式）
    #define MAXN 100
    cout << "MAXN = " << MAXN << endl;

    return 0;
}
```

### 知识点3：头文件与名字空间

- **头文件**：包含函数声明和类定义，如 `<iostream>`, `<cmath>`, `<algorithm>`
- **万能头文件**：`<bits/stdc++.h>` 包含所有标准库
- **名字空间**：`using namespace std;` 使用标准命名空间，避免 `std::cout` 的繁琐写法

### 知识点4：编辑、编译、解释、调试

| 概念 | 说明 |
|:---|:---|
| 编辑 | 修改源代码 |
| 编译 | 将源代码翻译成机器语言 |
| 解释 | 逐行翻译执行（Python等） |
| 调试 | 找出并修复程序错误 |

---

## 2.2 基本数据类型

### 知识点1：整数型

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // int：4字节，范围约 ±21亿
    int a = 100;
    cout << "int大小: " << sizeof(int) << " 字节" << endl;
    cout << "int范围: " << INT_MIN << " ~ " << INT_MAX << endl;

    // long long：8字节，范围约 ±9×10^18
    long long b = 1000000000000000000LL;
    cout << "long long大小: " << sizeof(long long) << " 字节" << endl;
    cout << "b = " << b << endl;

    // 无符号类型
    unsigned int c = 4294967295U;  // 最大值
    cout << "unsigned int最大: " << c << endl;

    return 0;
}
```

### 知识点2：实数型

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // float：4字节，约7位有效数字
    float f = 3.14f;
    cout << "float: " << f << endl;

    // double：8字节，约15位有效数字（竞赛常用）
    double d = 3.14159265358979;
    cout << "double: " << fixed << setprecision(10) << d << endl;

    // 注意：浮点数比较有精度问题
    double x = 0.1 + 0.2;
    cout << "0.1+0.2 = " << x << endl;
    // 不能直接用 == 比较浮点数！
    // 应该用: fabs(a - b) < 1e-9

    return 0;
}
```

### 知识点3：字符型

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // char：1字节，存储ASCII码
    char c = 'A';
    cout << "字符: " << c << endl;
    cout << "ASCII码: " << (int)c << endl;  // 65

    // 字符运算
    cout << "'A'+1 = " << (char)('A'+1) << endl;  // 'B'
    cout << "'a'-'A' = " << ('a'-'A') << endl;    // 32

    // 常用ASCII码
    // '0'-'9': 48-57
    // 'A'-'Z': 65-90
    // 'a'-'z': 97-122

    // 字符数组（字符串）
    char str[] = "Hello";
    cout << "字符串: " << str << endl;
    cout << "长度: " << strlen(str) << endl;  // 5

    return 0;
}
```

### 知识点4：布尔型

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    bool t = true;
    bool f = false;

    // bool底层是整数：true=1, false=0
    cout << "true = " << t << endl;   // 1
    cout << "false = " << f << endl;  // 0

    // 关系表达式的结果是bool
    cout << "5 > 3 = " << (5 > 3) << endl;   // 1
    cout << "5 < 3 = " << (5 < 3) << endl;   // 0

    // 逻辑运算
    cout << "(true && false) = " << (true && false) << endl;  // 0
    cout << "(true || false) = " << (true || false) << endl;  // 1
    cout << "(!true) = " << (!true) << endl;  // 0

    return 0;
}
```

### 数据类型速查表

| 类型 | 字节 | 范围 | 格式符 |
|:---|:---:|:---|:---:|
| `short` | 2 | -32768~32767 | `%hd` |
| `int` | 4 | ±21亿 | `%d` |
| `long long` | 8 | ±9×10^18 | `%lld` |
| `float` | 4 | 7位有效数字 | `%f` |
| `double` | 8 | 15位有效数字 | `%lf` |
| `char` | 1 | -128~127 | `%c` |
| `bool` | 1 | 0或1 | `%d` |

---

## 2.3 程序基本语句

### 知识点1：输入输出

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // ===== cout / printf 输出 =====
    int a = 42;
    double pi = 3.14;
    string s = "Hello";

    // cout方式
    cout << a << " " << pi << " " << s << endl;

    // printf方式（格式控制更方便）
    printf("a = %d, pi = %.2f\n", a, pi);

    // ===== cin / scanf 输入 =====
    int n;
    cin >> n;
    cout << "你输入的数: " << n << endl;

    // scanf方式（速度更快）
    int x, y;
    scanf("%d %d", &x, &y);
    printf("x=%d, y=%d\n", x, y);

    // 读入一行字符串
    string line;
    getline(cin, line);
    cout << "整行: " << line << endl;

    return 0;
}
```

### 知识点2：三种基本结构

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 顺序结构：从上到下依次执行
    int a = 1, b = 2;
    int c = a + b;
    cout << "顺序: " << c << endl;

    // 分支结构：根据条件选择执行
    int score = 85;
    if (score >= 90) {
        cout << "优秀" << endl;
    } else if (score >= 80) {
        cout << "良好" << endl;
    } else {
        cout << "及格" << endl;
    }

    // 循环结构：重复执行
    for (int i = 1; i <= 5; i++) {
        cout << "循环第" << i << "次" << endl;
    }

    return 0;
}
```

### 知识点3：if语句与switch语句

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // if-else 多层嵌套
    int a = 10, b = 20;
    if (a > b) {
        cout << "a大" << endl;
    } else if (a < b) {
        cout << "b大" << endl;
    } else {
        cout << "相等" << endl;
    }

    // switch语句（适合离散值判断）
    int day;
    cin >> day;
    switch (day) {
        case 1: cout << "星期一" << endl; break;
        case 2: cout << "星期二" << endl; break;
        case 3: cout << "星期三" << endl; break;
        case 4: cout << "星期四" << endl; break;
        case 5: cout << "星期五" << endl; break;
        case 6: cout << "星期六" << endl; break;
        case 7: cout << "星期日" << endl; break;
        default: cout << "无效" << endl;
    }

    return 0;
}
```

### 知识点4：for / while / do-while

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // for循环
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    cout << "1+2+...+100 = " << sum << endl;  // 5050

    // while循环
    int n = 1;
    while (n <= 1024) {
        n *= 2;
    }
    cout << "大于1024的最小2的幂: " << n << endl;  // 2048

    // do-while循环（至少执行一次）
    int m = 0;
    do {
        m++;
    } while (m * m < 100);
    cout << "最小的m使得m*m>=100: " << m << endl;  // 10

    return 0;
}
```

### 知识点5：多层循环

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 打印九九乘法表
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d×%d=%-4d", j, i, i * j);
        }
        cout << endl;
    }

    return 0;
}
```

---

## 2.4 基本运算

### 知识点1：算术运算

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int a = 7, b = 3;

    // 加减乘除
    cout << a + b << endl;   // 10
    cout << a - b << endl;   // 4
    cout << a * b << endl;   // 21

    // 整数除法（截断小数）
    cout << a / b << endl;   // 2（不是2.333）

    // 求余（取模）
    cout << a % b << endl;   // 1

    // 浮点数除法
    cout << (double)a / b << endl;  // 2.33333

    // 注意：整数除以整数=整数
    cout << 10 / 3 << endl;      // 3
    cout << 10.0 / 3 << endl;    // 3.33333

    return 0;
}
```

### 知识点2：关系运算

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int a = 5, b = 3;

    // 关系运算符返回bool值
    cout << (a > b) << endl;   // 1 (true)
    cout << (a >= b) << endl;  // 1
    cout << (a < b) << endl;   // 0 (false)
    cout << (a <= b) << endl;  // 0
    cout << (a == b) << endl;  // 0
    cout << (a != b) << endl;  // 1

    return 0;
}
```

### 知识点3：逻辑运算

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    bool a = true, b = false;

    // && 与：两个都true才true
    cout << (a && a) << endl;  // 1
    cout << (a && b) << endl;  // 0

    // || 或：有一个true就true
    cout << (a || b) << endl;  // 1
    cout << (b || b) << endl;  // 0

    // ! 非：取反
    cout << (!a) << endl;  // 0
    cout << (!b) << endl;  // 1

    // 短路求值
    int x = 0;
    // 如果a为false，后面的表达式不会执行
    // if (a && (x = 1)) 不会执行x=1

    return 0;
}
```

### 知识点4：三目运算符

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int a = 5, b = 3;

    // 条件 ? 为真的值 : 为假的值
    int max_val = (a > b) ? a : b;
    cout << "最大值: " << max_val << endl;  // 5

    // 等价于
    // if (a > b) max_val = a;
    // else max_val = b;

    return 0;
}
```

### 知识点5：位运算

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int a = 12, b = 10;
    // a = 1100 (二进制)
    // b = 1010 (二进制)

    // & 按位与
    cout << (a & b) << endl;   // 8  (1000)

    // | 按位或
    cout << (a | b) << endl;   // 14 (1110)

    // ^ 按位异或
    cout << (a ^ b) << endl;   // 6  (0110)

    // ~ 按位取反
    cout << (~a) << endl;      // -13

    // << 左移（乘以2的幂）
    cout << (1 << 3) << endl;  // 8 (1×2³)

    // >> 右移（除以2的幂）
    cout << (16 >> 2) << endl; // 4 (16÷2²)

    // 常用位运算技巧
    int n = 5;
    cout << (n & 1) << endl;     // 判断奇偶：1=奇数
    cout << (n >> 1) << endl;    // 除以2
    cout << (n << 1) << endl;    // 乘以2
    cout << (1 << 10) << endl;   // 2^10 = 1024

    return 0;
}
```

---

## 2.5 数学库常用函数

### 知识点1：常用数学函数

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 绝对值
    cout << abs(-5) << endl;       // 5（整数）
    cout << fabs(-3.14) << endl;   // 3.14（浮点数）

    // 四舍五入
    cout << round(3.5) << endl;    // 4
    cout << round(3.4) << endl;    // 3

    // 下取整（地板函数）
    cout << floor(3.7) << endl;    // 3
    cout << floor(-3.2) << endl;   // -4

    // 上取整（天花板函数）
    cout << ceil(3.2) << endl;     // 4
    cout << ceil(-3.7) << endl;    // -3

    // 平方根
    cout << sqrt(16) << endl;      // 4

    // 幂函数
    cout << pow(2, 10) << endl;    // 1024

    // 最大最小值
    cout << max(3, 5) << endl;     // 5
    cout << min(3, 5) << endl;     // 3

    // swap交换
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y << endl; // 2 1

    return 0;
}
```

### 知识点2：三角函数与对数

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    const double PI = acos(-1.0);

    // 三角函数（参数为弧度）
    cout << sin(PI / 2) << endl;   // 1
    cout << cos(0) << endl;        // 1
    cout << tan(PI / 4) << endl;   // 1

    // 对数函数
    cout << log(exp(1)) << endl;   // 1（自然对数ln）
    cout << log2(8) << endl;       // 3（以2为底）
    cout << log10(100) << endl;    // 2（以10为底）

    // 指数函数
    cout << exp(1) << endl;        // 2.71828

    return 0;
}
```


## 2.6 数组

### 知识点1：数组与数组下标

数组是存储**相同类型**数据的集合，按下标（索引）访问。

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 一维数组定义
    int a[5];           // 未初始化，值随机
    int b[5] = {1,2,3,4,5};  // 全部初始化
    int c[5] = {1,2};        // c = {1,2,0,0,0}，其余补0
    int d[5] = {};           // 全部初始化为0
    int e[] = {1,2,3};       // 自动推断大小为3

    // 数组下标从0开始！
    // b[0]=1, b[1]=2, b[2]=3, b[3]=4, b[4]=5

    cout << b[0] << endl;  // 1
    cout << b[4] << endl;  // 5
    // b[5] 越界！未定义行为

    return 0;
}
```

### 知识点2：数组的读入与输出

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[n];

    // 读入数组
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // 输出数组
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    cout << endl;

    // 求和
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    cout << "总和: " << sum << endl;

    // 求最大值
    int mx = a[0];
    for (int i = 1; i < n; i++) {
        mx = max(mx, a[i]);
    }
    cout << "最大值: " << mx << endl;

    return 0;
}
```

### 知识点3：多维数组

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 二维数组
    int a[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // 遍历二维数组
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << a[i][j] << "\t";
        }
        cout << endl;
    }

    // 矩阵转置
    int b[4][3];
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            b[j][i] = a[i][j];
        }
    }

    // 三维数组
    int c[2][3][4];
    // c[层][行][列]

    return 0;
}
```

---

## 2.7 字符串的处理

### 知识点1：字符数组

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 字符数组定义
    char s1[] = "Hello";
    char s2[100];
    cin >> s2;  // 读入字符串（遇空格停止）

    // 字符串长度
    cout << "长度: " << strlen(s1) << endl;  // 5

    // 字符串复制
    strcpy(s2, s1);
    cout << s2 << endl;  // Hello

    // 字符串拼接
    char s3[100] = "Hello";
    strcat(s3, " World");
    cout << s3 << endl;  // Hello World

    // 字符串比较
    cout << strcmp("abc", "abd") << endl;  // 负数（abc < abd）

    // 遍历字符串
    for (int i = 0; i < strlen(s1); i++) {
        cout << s1[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### 知识点2：string类

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // string类定义
    string s1 = "Hello";
    string s2;
    cin >> s2;  // 读入（遇空格停止）
    getline(cin, s2);  // 读入整行

    // 字符串长度
    cout << s1.length() << endl;  // 5
    cout << s1.size() << endl;    // 5（同上）

    // 字符串拼接
    string s3 = s1 + " World";
    cout << s3 << endl;  // Hello World

    // 字符串比较（字典序）
    cout << ("abc" < "abd") << endl;  // 1

    // 子串
    cout << s1.substr(1, 3) << endl;  // ell（从下标1取3个字符）

    // 查找
    string s4 = "Hello World";
    int pos = s4.find("World");
    cout << "位置: " << pos << endl;  // 6

    // 插入和删除
    s4.insert(5, ",");
    cout << s4 << endl;  // Hello, World
    s4.erase(5, 1);
    cout << s4 << endl;  // Hello World

    // 遍历
    for (int i = 0; i < s1.length(); i++) {
        cout << s1[i] << " ";
    }
    cout << endl;

    // 范围for
    for (char c : s1) {
        cout << c << " ";
    }
    cout << endl;

    return 0;
}
```

---

## 2.8 函数与递归

### 知识点1：函数定义与调用

```cpp
#include<bits/stdc++.h>
using namespace std;

// 函数声明（可选，定义在main前可省略）
int add(int a, int b);
void printLine(int n, char c);

// 函数定义
int add(int a, int b) {
    return a + b;
}

void printLine(int n, char c) {
    for (int i = 0; i < n; i++) {
        cout << c;
    }
    cout << endl;
}

int main() {
    // 函数调用
    int result = add(3, 5);
    cout << "3+5 = " << result << endl;

    printLine(20, '-');
    cout << "Hello Function!" << endl;
    printLine(20, '-');

    return 0;
}
```

### 知识点2：传值与传引用

```cpp
#include<bits/stdc++.h>
using namespace std;

// 传值：函数内修改不影响原变量
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    // a, b是局部变量，函数结束就销毁
}

// 传引用：函数内修改直接影响原变量
void swapByRef(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 5;

    swapByValue(x, y);
    cout << "传值后: x=" << x << " y=" << y << endl;  // 3 5（没变）

    swapByRef(x, y);
    cout << "传引用后: x=" << x << " y=" << y << endl;  // 5 3（交换了）

    return 0;
}
```

### 知识点3：变量作用域

```cpp
#include<bits/stdc++.h>
using namespace std;

int globalVar = 100;  // 全局变量

void func() {
    int localVar = 200;  // 局部变量
    cout << "全局: " << globalVar << endl;
    cout << "局部: " << localVar << endl;
    globalVar = 300;  // 修改全局变量
}

int main() {
    int localVar = 50;  // main的局部变量
    cout << "main的localVar: " << localVar << endl;
    cout << "全局变量: " << globalVar << endl;

    func();
    cout << "调用func后全局变量: " << globalVar << endl;  // 300

    return 0;
}
```

### 知识点4：递归函数

```cpp
#include<bits/stdc++.h>
using namespace std;

// 阶乘：n! = n × (n-1)!
int factorial(int n) {
    if (n <= 1) return 1;  // 递归终止条件
    return n * factorial(n - 1);  // 递归调用
}

// 斐波那契数列
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

// 汉诺塔
void hanoi(int n, char from, char mid, char to) {
    if (n == 1) {
        cout << from << " -> " << to << endl;
        return;
    }
    hanoi(n-1, from, to, mid);
    cout << from << " -> " << to << endl;
    hanoi(n-1, mid, from, to);
}

int main() {
    cout << "5! = " << factorial(5) << endl;  // 120
    cout << "fib(10) = " << fib(10) << endl;  // 55

    cout << "汉诺塔3层:" << endl;
    hanoi(3, 'A', 'B', 'C');

    return 0;
}
```

### 知识点5：内联函数

```cpp
#include<bits/stdc++.h>
using namespace std;

// 内联函数：建议编译器展开，减少函数调用开销
inline int square(int x) {
    return x * x;
}

int main() {
    // 内联函数在编译时会被展开成代码
    // 相当于直接写 cout << x * x;
    cout << square(5) << endl;   // 25
    cout << square(10) << endl;  // 100

    return 0;
}
```

### 知识点6：函数重载

```cpp
#include<bits/stdc++.h>
using namespace std;

// 函数重载：同名函数，参数列表不同
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << add(3, 5) << endl;      // 8（调用int版本）
    cout << add(3.14, 2.72) << endl; // 5.86（调用double版本）
    cout << add(1, 2, 3) << endl;    // 6（调用三参数版本）

    return 0;
}
```


## 2.9 结构体与联合体

### 知识点1：结构体

```cpp
#include<bits/stdc++.h>
using namespace std;

// 定义结构体
struct Student {
    string name;
    int age;
    double score;

    // 结构体内可以定义函数
    void print() {
        cout << name << " " << age << "岁 " << score << "分" << endl;
    }
};

// 结构体比较（按字典序）
bool cmp(Student a, Student b) {
    return a.score > b.score;  // 按分数降序
}

int main() {
    // 结构体变量
    Student s1 = {"张三", 15, 95.5};
    Student s2;
    s2.name = "李四";
    s2.age = 16;
    s2.score = 88.0;

    s1.print();
    s2.print();

    // 结构体数组
    Student class1[3] = {
        {"王五", 14, 92.0},
        {"赵六", 15, 88.5},
        {"孙七", 14, 96.0}
    };

    // 排序
    sort(class1, class1 + 3, cmp);

    cout << "成绩排名:" << endl;
    for (int i = 0; i < 3; i++) {
        class1[i].print();
    }

    return 0;
}
```

### 知识点2：联合体

```cpp
#include<bits/stdc++.h>
using namespace std;

// 联合体：所有成员共享同一块内存
union Data {
    int i;
    float f;
    char c;
};

int main() {
    Data d;
    d.i = 65;
    cout << "int: " << d.i << endl;     // 65
    cout << "char: " << d.c << endl;    // 'A'（共享内存，65的ASCII码是'A'）

    // 联合体大小 = 最大成员的大小
    cout << "联合体大小: " << sizeof(Data) << " 字节" << endl;  // 4

    return 0;
}
```

### 知识点3：枚举

```cpp
#include<bits/stdc++.h>
using namespace std;

// 枚举：定义一组命名常量
enum Color { RED, GREEN, BLUE };  // RED=0, GREEN=1, BLUE=2
enum Direction { UP=1, DOWN, LEFT, RIGHT };  // 1,2,3,4

int main() {
    Color c = RED;
    cout << "颜色值: " << c << endl;  // 0

    Direction d = DOWN;
    cout << "方向值: " << d << endl;  // 2

    // 枚举在switch中使用
    switch (c) {
        case RED:   cout << "红色" << endl; break;
        case GREEN: cout << "绿色" << endl; break;
        case BLUE:  cout << "蓝色" << endl; break;
    }

    return 0;
}
```

---

## 2.10 指针与引用

### 知识点1：指针基础

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int a = 42;

    // 指针：存储变量地址的变量
    int *p = &a;  // p指向a的地址

    cout << "a的地址: " << &a << endl;
    cout << "p的值: " << p << endl;      // 同一个地址
    cout << "p指向的值: " << *p << endl;  // 42（解引用）

    // 通过指针修改值
    *p = 100;
    cout << "修改后a = " << a << endl;  // 100

    // 空指针
    int *q = nullptr;

    return 0;
}
```

### 知识点2：指针与数组

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int a[5] = {10, 20, 30, 40, 50};

    // 数组名就是首元素地址
    int *p = a;  // 等价于 int *p = &a[0];

    // 指针遍历数组
    for (int i = 0; i < 5; i++) {
        // *(p+i) 等价于 p[i] 等价于 a[i]
        cout << *(p + i) << " ";
    }
    cout << endl;

    // 指针运算
    p++;  // p指向下一个int（地址+4字节）
    cout << *p << endl;  // 20

    return 0;
}
```

### 知识点3：字符指针

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 字符指针指向字符串常量
    const char *str = "Hello, World!";
    cout << str << endl;
    cout << "长度: " << strlen(str) << endl;

    // 指针遍历字符串
    while (*str != '\0') {
        cout << *str;
        str++;
    }
    cout << endl;

    return 0;
}
```

### 知识点4：指向结构体的指针

```cpp
#include<bits/stdc++.h>
using namespace std;

struct Point {
    int x, y;
};

int main() {
    Point p = {3, 4};
    Point *pp = &p;

    // 通过指针访问结构体成员
    cout << "x = " << pp->x << endl;  // -> 运算符
    cout << "y = " << pp->y << endl;

    // 等价写法
    cout << "x = " << (*pp).x << endl;

    return 0;
}
```

### 知识点5：引用

```cpp
#include<bits/stdc++.h>
using namespace std;

// 引用：变量的别名
void increment(int &x) {
    x++;  // 直接修改原变量
}

int main() {
    int a = 10;

    // 引用：a和b是同一个变量
    int &b = a;
    b = 20;
    cout << "a = " << a << endl;  // 20

    // 引用作为函数参数
    increment(a);
    cout << "a = " << a << endl;  // 21

    return 0;
}
```

---

## 2.11 文件及基本读写

### 知识点1：文本文件操作

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 写入文件
    ofstream fout("test.txt");
    fout << "Hello File!" << endl;
    fout << 42 << " " << 3.14 << endl;
    fout.close();

    // 读取文件
    ifstream fin("test.txt");
    string line;
    int num;
    double val;

    getline(fin, line);
    cout << "第一行: " << line << endl;

    fin >> num >> val;
    cout << "数字: " << num << " 小数: " << val << endl;
    fin.close();

    return 0;
}
```

### 知识点2：文件重定向

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 文件重定向：输入输出转向文件
    freopen("input.txt", "r", stdin);   // 从文件读入
    freopen("output.txt", "w", stdout); // 输出到文件

    int n;
    cin >> n;
    cout << "读入的数: " << n << endl;

    fclose(stdin);
    fclose(stdout);

    return 0;
}
```

### 知识点3：文件读写模式

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 追加模式
    ofstream fout("log.txt", ios::app);
    fout << "新日志" << endl;
    fout.close();

    // 二进制文件（了解即可）
    ofstream bout("data.bin", ios::binary);
    int arr[] = {1, 2, 3, 4, 5};
    bout.write((char*)arr, sizeof(arr));
    bout.close();

    return 0;
}
```

---

## 2.12 STL模板

### 知识点1：常用函数与算法

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // min / max
    cout << min(3, 5) << endl;   // 3
    cout << max(3, 5) << endl;   // 5

    // swap
    int a = 1, b = 2;
    swap(a, b);
    cout << a << " " << b << endl;  // 2 1

    // sort
    int arr[] = {5, 3, 1, 4, 2};
    sort(arr, arr + 5);
    for (int x : arr) cout << x << " ";  // 1 2 3 4 5
    cout << endl;

    // 降序排序
    sort(arr, arr + 5, greater<int>());
    for (int x : arr) cout << x << " ";  // 5 4 3 2 1
    cout << endl;

    // lower_bound / upper_bound（需有序数组）
    int brr[] = {1, 3, 5, 7, 9};
    auto it = lower_bound(brr, brr+5, 5);  // 第一个>=5
    cout << "lower_bound(5): " << (it - brr) << endl;  // 2

    return 0;
}
```

### 知识点2：STL容器

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // ===== stack 栈（后进先出LIFO）=====
    stack<int> stk;
    stk.push(1);
    stk.push(2);
    stk.push(3);
    cout << "栈顶: " << stk.top() << endl;  // 3
    stk.pop();
    cout << "弹出后栈顶: " << stk.top() << endl;  // 2
    cout << "栈大小: " << stk.size() << endl;  // 2

    // ===== queue 队列（先进先出FIFO）=====
    queue<int> que;
    que.push(1);
    que.push(2);
    que.push(3);
    cout << "队首: " << que.front() << endl;  // 1
    cout << "队尾: " << que.back() << endl;   // 3
    que.pop();
    cout << "弹出后队首: " << que.front() << endl;  // 2

    // ===== vector 动态数组 =====
    vector<int> v;
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    cout << "大小: " << v.size() << endl;  // 3

    // 遍历
    for (int i = 0; i < v.size(); i++) {
        cout << v[i] << " ";
    }
    cout << endl;

    // 范围for遍历
    for (int x : v) {
        cout << x << " ";
    }
    cout << endl;

    // 排序
    sort(v.begin(), v.end());

    // ===== priority_queue 优先队列（堆）=====
    priority_queue<int> pq;  // 大根堆
    pq.push(3);
    pq.push(1);
    pq.push(4);
    cout << "堆顶(最大): " << pq.top() << endl;  // 4
    pq.pop();

    // 小根堆
    priority_queue<int, vector<int>, greater<int>> minpq;
    minpq.push(3);
    minpq.push(1);
    minpq.push(4);
    cout << "小根堆顶(最小): " << minpq.top() << endl;  // 1

    // ===== map 映射 =====
    map<string, int> mp;
    mp["apple"] = 3;
    mp["banana"] = 5;
    cout << "apple: " << mp["apple"] << endl;  // 3

    // 判断key是否存在
    if (mp.count("cherry")) {
        cout << "cherry存在" << endl;
    } else {
        cout << "cherry不存在" << endl;
    }

    // 遍历map（按key排序）
    for (auto &p : mp) {
        cout << p.first << ": " << p.second << endl;
    }

    // ===== set 集合（去重+排序）=====
    set<int> s;
    s.insert(3);
    s.insert(1);
    s.insert(4);
    s.insert(1);  // 重复，不插入
    cout << "set大小: " << s.size() << endl;  // 3

    for (int x : s) {
        cout << x << " ";  // 1 3 4
    }
    cout << endl;

    // ===== string =====
    string str = "Hello";
    str += " World";
    cout << str << endl;

    return 0;
}
```

---

## 2.13 程序设计方法

### 知识点1：流程图

流程图是用图形表示算法的工具：

| 符号 | 含义 |
|:---:|:---|
| ⬭ 圆角矩形 | 开始/结束 |
| ▭ 矩形 | 处理（赋值、计算） |
| ◇ 菱形 | 判断（条件分支） |
| ➱ 平行四边形 | 输入/输出 |
| → 箭头 | 流程方向 |

### 知识点2：自顶向下、逐步求精

将复杂问题分解为若干小问题，再逐步细化：

```
问题：计算1~n中所有素数的和
├── 子问题1：判断一个数是否为素数
│   └── 细化：从2到√n逐一试除
├── 子问题2：遍历1~n
│   └── 细化：for循环
└── 子问题3：累加求和
    └── 细化：sum += num（如果是素数）
```

### 知识点3：算法描述方式

| 方式 | 说明 | 适用场景 |
|:---|:---|:---|
| 自然语言 | 用日常语言描述 | 交流、文档 |
| 流程图 | 图形化描述 | 直观展示逻辑 |
| 伪代码 | 介于自然语言和代码之间 | 设计阶段 |


---

# 三、数据结构

## 3.1 线性结构

### 知识点1：链表

```cpp
#include<bits/stdc++.h>
using namespace std;

// 单链表节点
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// 单链表基本操作
class LinkedList {
public:
    Node* head;

    LinkedList() : head(nullptr) {}

    // 头插法
    void pushFront(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    // 尾插法
    void pushBack(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
            return;
        }
        Node* cur = head;
        while (cur->next) cur = cur->next;
        cur->next = newNode;
    }

    // 删除节点
    void remove(int val) {
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

    // 打印链表
    void print() {
        Node* cur = head;
        while (cur) {
            cout << cur->data << " -> ";
            cur = cur->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    list.pushFront(0);
    list.print();  // 0 -> 1 -> 2 -> 3 -> NULL

    list.remove(2);
    list.print();  // 0 -> 1 -> 3 -> NULL

    return 0;
}
```

### 知识点2：栈

```cpp
#include<bits/stdc++.h>
using namespace std;

// 手动实现栈（数组模拟）
class Stack {
private:
    int arr[1000];
    int topIdx;
public:
    Stack() : topIdx(-1) {}

    void push(int val) {
        arr[++topIdx] = val;
    }

    void pop() {
        if (!empty()) topIdx--;
    }

    int top() {
        return arr[topIdx];
    }

    bool empty() {
        return topIdx == -1;
    }

    int size() {
        return topIdx + 1;
    }
};

int main() {
    // 栈的应用：括号匹配
    string s;
    cin >> s;

    Stack stk;
    bool valid = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            stk.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (stk.empty()) {
                valid = false;
                break;
            }
            char top = stk.top();
            stk.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                valid = false;
                break;
            }
        }
    }
    if (!stk.empty()) valid = false;

    cout << (valid ? "有效" : "无效") << endl;

    return 0;
}
```

### 知识点3：队列

```cpp
#include<bits/stdc++.h>
using namespace std;

// 手动实现队列（循环数组模拟）
class Queue {
private:
    int arr[1000];
    int frontIdx, rearIdx, sz;
public:
    Queue() : frontIdx(0), rearIdx(-1), sz(0) {}

    void push(int val) {
        rearIdx = (rearIdx + 1) % 1000;
        arr[rearIdx] = val;
        sz++;
    }

    void pop() {
        if (!empty()) {
            frontIdx = (frontIdx + 1) % 1000;
            sz--;
        }
    }

    int front() {
        return arr[frontIdx];
    }

    bool empty() {
        return sz == 0;
    }

    int size() {
        return sz;
    }
};

int main() {
    // 队列的应用：BFS层序遍历
    Queue q;
    q.push(1);
    q.push(2);
    q.push(3);

    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;  // 1 2 3

    return 0;
}
```

---

## 3.2 简单树

### 知识点1：树的定义与概念

- **根节点**：没有父节点的节点
- **叶子节点**：没有子节点的节点
- **度**：节点的子节点数
- **深度/高度**：从根到该节点的边数
- **层次**：根为第1层

### 知识点2：二叉树的定义与性质

- 每个节点最多有两个子节点（左子树、右子树）
- **性质**：
  - 叶子节点数 = 度为2的节点数 + 1
  - n个节点的二叉树最多n层
  - 完全二叉树：第i层最多2^(i-1)个节点

### 知识点3：二叉树的表示与存储

```cpp
#include<bits/stdc++.h>
using namespace std;

// 二叉树节点
struct TreeNode {
    int data;
    TreeNode *left, *right;
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

// 用数组表示二叉树（完全二叉树常用）
// 节点i的左子节点=2*i，右子节点=2*i+1，父节点=i/2
int tree[100];  // 下标从1开始

int main() {
    // 动态创建二叉树
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    return 0;
}
```

### 知识点4：二叉树的遍历

```cpp
#include<bits/stdc++.h>
using namespace std;

struct TreeNode {
    int data;
    TreeNode *left, *right;
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

// 前序遍历：根→左→右
void preOrder(TreeNode* root) {
    if (!root) return;
    cout << root->data << " ";   // 访问根
    preOrder(root->left);         // 遍历左子树
    preOrder(root->right);        // 遍历右子树
}

// 中序遍历：左→根→右
void inOrder(TreeNode* root) {
    if (!root) return;
    inOrder(root->left);
    cout << root->data << " ";
    inOrder(root->right);
}

// 后序遍历：左→右→根
void postOrder(TreeNode* root) {
    if (!root) return;
    postOrder(root->left);
    postOrder(root->right);
    cout << root->data << " ";
}

// 层序遍历（BFS）
void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        cout << node->data << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}

int main() {
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    cout << "前序: "; preOrder(root);    cout << endl;  // 1 2 4 5 3
    cout << "中序: "; inOrder(root);     cout << endl;  // 4 2 5 1 3
    cout << "后序: "; postOrder(root);   cout << endl;  // 4 5 2 3 1
    cout << "层序: "; levelOrder(root);  cout << endl;  // 1 2 3 4 5

    return 0;
}
```

---

## 3.3 特殊树

### 知识点1-2：完全二叉树

完全二叉树：除最后一层外每层都满，最后一层从左到右连续。

```cpp
#include<bits/stdc++.h>
using namespace std;

// 用数组存储完全二叉树
// 下标从1开始：节点i的左子=2i，右子=2i+1，父=i/2
int tree[1001];
int n;  // 节点数

// 建树
void build() {
    for (int i = 1; i <= n; i++) {
        cin >> tree[i];
    }
}

// 前序遍历
void preOrder(int idx) {
    if (idx > n) return;
    cout << tree[idx] << " ";
    preOrder(2 * idx);
    preOrder(2 * idx + 1);
}

// 中序遍历
void inOrder(int idx) {
    if (idx > n) return;
    inOrder(2 * idx);
    cout << tree[idx] << " ";
    inOrder(2 * idx + 1);
}

int main() {
    cin >> n;
    build();
    cout << "前序: "; preOrder(1); cout << endl;
    cout << "中序: "; inOrder(1); cout << endl;

    return 0;
}
```

### 知识点3：哈夫曼树与哈夫曼编码

```cpp
#include<bits/stdc++.h>
using namespace std;

// 哈夫曼编码：最优前缀编码
// 每个字符的编码长度与其频率成反比
// 频率高的字符用短编码，频率低的用长编码

int main() {
    // 模拟哈夫曼编码过程
    // 使用优先队列（小根堆）
    priority_queue<int, vector<int>, greater<int>> pq;

    // 字符频率
    int freq[] = {5, 9, 12, 13, 16, 45};
    int n = 6;
    for (int i = 0; i < n; i++) {
        pq.push(freq[i]);
    }

    int totalCost = 0;
    while (pq.size() > 1) {
        int a = pq.top(); pq.pop();
        int b = pq.top(); pq.pop();
        int combined = a + b;
        totalCost += combined;
        pq.push(combined);
        cout << "合并 " << a << " + " << b << " = " << combined << endl;
    }

    cout << "总加权路径长度(WPL): " << totalCost << endl;

    return 0;
}
```

### 知识点4：二叉搜索树（BST）

```cpp
#include<bits/stdc++.h>
using namespace std;

struct TreeNode {
    int data;
    TreeNode *left, *right;
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

// 插入
TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->data)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}

// 查找
bool search(TreeNode* root, int val) {
    if (!root) return false;
    if (val == root->data) return true;
    if (val < root->data) return search(root->left, val);
    return search(root->right, val);
}

// 中序遍历（BST中序=有序）
void inOrder(TreeNode* root) {
    if (!root) return;
    inOrder(root->left);
    cout << root->data << " ";
    inOrder(root->right);
}

int main() {
    TreeNode* root = nullptr;
    int arr[] = {5, 3, 7, 1, 4, 6, 8};
    for (int x : arr) {
        root = insert(root, x);
    }

    cout << "中序遍历: ";
    inOrder(root);  // 1 3 4 5 6 7 8
    cout << endl;

    cout << "查找4: " << (search(root, 4) ? "找到" : "未找到") << endl;
    cout << "查找9: " << (search(root, 9) ? "找到" : "未找到") << endl;

    return 0;
}
```

---

## 3.4 简单图

### 知识点1：图的定义与概念

- **顶点（Vertex）**：图中的节点
- **边（Edge）**：连接两个顶点的线
- **无向图**：边没有方向
- **有向图**：边有方向
- **权（Weight）**：边的数值
- **完全图**：任意两个顶点之间都有边
- **连通图**：任意两个顶点之间都有路径

### 知识点2：邻接矩阵

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;  // n个顶点，m条边

    // 邻接矩阵
    int g[101][101] = {};

    // 读入边
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u][v] = w;
        g[v][u] = w;  // 无向图，双向
    }

    // 输出邻接矩阵
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cout << g[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
```

### 知识点3：邻接表

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    // 邻接表（vector数组）
    vector<pair<int,int>> adj[101];  // adj[u] = {(v, w), ...}

    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }

    // 输出邻接表
    for (int i = 1; i <= n; i++) {
        cout << i << ": ";
        for (auto &edge : adj[i]) {
            cout << "(" << edge.first << "," << edge.second << ") ";
        }
        cout << endl;
    }

    return 0;
}
```

---

## 3.5 图的其他概念

### 知识点1：图的遍历（DFS）

```cpp
#include<bits/stdc++.h>
using namespace std;

vector<int> adj[101];
bool visited[101];

// 深度优先搜索
void dfs(int u) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    dfs(1);
    cout << endl;

    return 0;
}
```

### 知识点2：图的遍历（BFS）

```cpp
#include<bits/stdc++.h>
using namespace std;

vector<int> adj[101];
bool visited[101];

// 广度优先搜索
void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    bfs(1);
    cout << endl;

    return 0;
}
```

### 知识点3：连通分量

```cpp
#include<bits/stdc++.h>
using namespace std;

vector<int> adj[101];
bool visited[101];

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // 统计连通分量数
    int components = 0;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
            components++;
        }
    }
    cout << "连通分量数: " << components << endl;

    return 0;
}
```

### 知识点4：最小生成树

```cpp
#include<bits/stdc++.h>
using namespace std;

// Kruskal算法
struct Edge {
    int u, v, w;
    bool operator<(const Edge &other) const {
        return w < other.w;
    }
};

int fa[101];
int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]);
}

int main() {
    int n, m;
    cin >> n >> m;

    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }

    sort(edges.begin(), edges.end());

    for (int i = 1; i <= n; i++) fa[i] = i;

    int mstWeight = 0, edgeCount = 0;
    for (auto &e : edges) {
        int fu = find(e.u), fv = find(e.v);
        if (fu != fv) {
            fa[fu] = fv;
            mstWeight += e.w;
            edgeCount++;
        }
    }

    cout << "最小生成树总权值: " << mstWeight << endl;

    return 0;
}
```

### 知识点5：最短路径

```cpp
#include<bits/stdc++.h>
using namespace std;

const int INF = 1e9;

// Dijkstra算法
int main() {
    int n, m, s;
    cin >> n >> m >> s;

    vector<pair<int,int>> adj[101];
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }

    // Dijkstra
    vector<int> dist(n + 1, INF);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[s] = 0;
    pq.push({0, s});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        cout << "从" << s << "到" << i << "的距离: "
             << (dist[i] == INF ? -1 : dist[i]) << endl;
    }

    return 0;
}
```


---

# 四、算法

## 4.1 算法概念与描述

### 知识点1：算法概念

算法是对特定问题求解步骤的一种描述，具有以下特性：

| 特性 | 说明 |
|:---|:---|
| 有穷性 | 必须在有限步内结束 |
| 确定性 | 每一步都是确定的、无歧义的 |
| 可行性 | 每一步都能执行 |
| 输入 | 有零个或多个输入 |
| 输出 | 有一个或多个输出 |

### 知识点2：算法复杂度

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 常见复杂度对比
    // O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

    int n = 10;

    // O(1) - 常数时间
    // 直接访问数组元素
    int arr[10] = {1,2,3,4,5,6,7,8,9,10};
    cout << "O(1): " << arr[5] << endl;

    // O(log n) - 对数时间
    // 二分查找
    int target = 7;
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == target) {
            cout << "O(log n): 找到" << target << "在位置" << mid << endl;
            break;
        } else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }

    // O(n) - 线性时间
    // 遍历数组
    int mx = arr[0];
    for (int i = 1; i < n; i++) {
        mx = max(mx, arr[i]);
    }
    cout << "O(n): 最大值=" << mx << endl;

    // O(n²) - 平方时间
    // 冒泡排序
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n-1-i; j++) {
            if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);
        }
    }
    cout << "O(n²): 排序完成" << endl;

    return 0;
}
```

---

## 4.2 入门算法

### 知识点1：枚举法

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 枚举法：穷举所有可能，找到满足条件的解
    // 例：找出1~100中所有能被3整除但不能被5整除的数

    cout << "能被3整除但不能被5整除的数: ";
    for (int i = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 5 != 0) {
            cout << i << " ";
        }
    }
    cout << endl;

    // 例：百钱买百鸡
    // 鸡翁5元，鸡母3元，鸡雏1元，100元买100只鸡
    for (int x = 0; x <= 20; x++) {       // 鸡翁
        for (int y = 0; y <= 33; y++) {   // 鸡母
            int z = 100 - x - y;          // 鸡雏
            if (z >= 0 && 5*x + 3*y + z == 100) {
                cout << "鸡翁:" << x << " 鸡母:" << y << " 鸡雏:" << z << endl;
            }
        }
    }

    return 0;
}
```

### 知识点2：模拟法

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 模拟法：按题目描述的过程一步步执行
    // 例：约瑟夫问题（报数出圈）
    int n = 7, k = 3;  // n个人，报到k出圈
    queue<int> q;
    for (int i = 1; i <= n; i++) q.push(i);

    cout << "出圈顺序: ";
    while (!q.empty()) {
        for (int i = 1; i < k; i++) {
            q.push(q.front());
            q.pop();
        }
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;  // 3 6 2 7 5 1 4

    return 0;
}
```

---

## 4.3 基础算法

### 知识点1：贪心法

```cpp
#include<bits/stdc++.h>
using namespace std;

struct Item {
    int weight, value;
};

bool cmp(Item a, Item b) {
    // 按性价比降序
    return (double)a.value / a.weight > (double)b.value / b.weight;
}

int main() {
    // 贪心法：每一步都选当前最优的
    // 例：分数背包问题
    int n, W;
    cin >> n >> W;

    vector<Item> items(n);
    for (int i = 0; i < n; i++) {
        cin >> items[i].weight >> items[i].value;
    }

    sort(items.begin(), items.end(), cmp);

    double totalValue = 0;
    int remaining = W;

    for (auto &item : items) {
        if (remaining >= item.weight) {
            remaining -= item.weight;
            totalValue += item.value;
        } else {
            totalValue += (double)remaining / item.weight * item.value;
            break;
        }
    }

    cout << "最大价值: " << fixed << setprecision(1) << totalValue << endl;

    return 0;
}
```

### 知识点2：递推法

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 递推法：从已知条件出发，逐步推导
    // 例：斐波那契数列
    int n = 10;
    vector<int> f(n + 1);
    f[0] = 0;
    f[1] = 1;
    for (int i = 2; i <= n; i++) {
        f[i] = f[i-1] + f[i-2];
    }

    cout << "斐波那契数列前" << n + 1 << "项: ";
    for (int i = 0; i <= n; i++) {
        cout << f[i] << " ";
    }
    cout << endl;

    // 例：爬楼梯（每次1或2步）
    int stairs = 5;
    vector<int> dp(stairs + 1);
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= stairs; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    cout << stairs << "级楼梯有" << dp[stairs] << "种走法" << endl;

    return 0;
}
```

### 知识点3：递归法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 递归法：将问题分解为更小的子问题
// 例：全排列
void permute(string &s, int l, int r) {
    if (l == r) {
        cout << s << endl;
        return;
    }
    for (int i = l; i <= r; i++) {
        swap(s[l], s[i]);
        permute(s, l + 1, r);
        swap(s[l], s[i]);  // 回溯
    }
}

int main() {
    string s = "ABC";
    permute(s, 0, s.length() - 1);
    // 输出: ABC ACB BAC BCA CBA CAB

    return 0;
}
```

### 知识点4：二分法

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 二分法：在有序数组中查找
    int n = 10;
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int target = 7;

    // 整数二分
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == target) {
            cout << "找到" << target << "在位置" << mid << endl;
            break;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    // 浮点二分
    // 求√2
    double l = 0, r = 2;
    for (int i = 0; i < 100; i++) {
        double mid = (l + r) / 2;
        if (mid * mid < 2) l = mid;
        else r = mid;
    }
    cout << "√2 ≈ " << fixed << setprecision(10) << l << endl;

    return 0;
}
```

### 知识点5：倍增法

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 倍增法：利用2的幂次加速
    // 例：快速幂 a^n % mod
    long long quickPow(long long a, long long n, long long mod) {
        long long result = 1;
        a %= mod;
        while (n > 0) {
            if (n & 1) result = result * a % mod;
            a = a * a % mod;
            n >>= 1;
        }
        return result;
    }

    cout << "2^10 % 1000 = " << quickPow(2, 10, 1000) << endl;  // 24
    cout << "3^20 % 1000000007 = " << quickPow(3, 20, 1000000007) << endl;

    return 0;
}
```

---

## 4.4 算法策略

### 知识点1：前缀和

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 前缀和：快速求区间和
    int n = 6;
    int a[] = {0, 3, 1, 4, 1, 5, 9};  // 下标从1开始

    // 构建前缀和数组
    int pre[7] = {};
    for (int i = 1; i <= n; i++) {
        pre[i] = pre[i-1] + a[i];
    }

    // 区间和 query(l, r) = pre[r] - pre[l-1]
    // 求a[2]~a[5]的和
    int l = 2, r = 5;
    cout << "a[" << l << "]~a[" << r << "]的和: "
         << pre[r] - pre[l-1] << endl;  // 1+4+1+5=11

    // 二维前缀和
    int mat[4][4] = {{0,0,0,0},{0,1,2,3},{0,4,5,6},{0,7,8,9}};
    int pre2[4][4] = {};
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            pre2[i][j] = pre2[i-1][j] + pre2[i][j-1]
                        - pre2[i-1][j-1] + mat[i][j];
        }
    }

    // 求子矩阵(1,1)到(2,2)的和
    int r1=1, c1=1, r2=2, c2=2;
    int sum = pre2[r2][c2] - pre2[r1-1][c2]
            - pre2[r2][c1-1] + pre2[r1-1][c1-1];
    cout << "子矩阵和: " << sum << endl;  // 1+2+4+5=12

    return 0;
}
```

### 知识点2：差分

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 差分：区间修改的逆操作
    int n = 5;
    int a[] = {0, 1, 3, 5, 7, 9};  // 原数组

    // 构建差分数组
    int diff[7] = {};
    for (int i = 1; i <= n; i++) {
        diff[i] = a[i] - a[i-1];
    }

    // 区间加操作：[l, r]每个元素加val
    // 只需修改diff[l]和diff[r+1]
    int l = 2, r = 4, val = 3;
    diff[l] += val;
    diff[r+1] -= val;

    // 从差分数组还原
    int b[7] = {};
    for (int i = 1; i <= n; i++) {
        b[i] = b[i-1] + diff[i];
    }

    cout << "修改后的数组: ";
    for (int i = 1; i <= n; i++) {
        cout << b[i] << " ";  // 1 6 8 10 9
    }
    cout << endl;

    return 0;
}
```

---

## 4.5 数值处理算法（高精度）

### 知识点1：高精度加法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 高精度加法
string add(string a, string b) {
    string result = "";
    int carry = 0;

    // 反转方便从低位开始计算
    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());

    // 补齐长度
    while (a.length() < b.length()) a += '0';
    while (b.length() < a.length()) b += '0';

    for (int i = 0; i < a.length(); i++) {
        int sum = (a[i] - '0') + (b[i] - '0') + carry;
        result += (sum % 10) + '0';
        carry = sum / 10;
    }

    if (carry) result += carry + '0';
    reverse(result.begin(), result.end());

    return result;
}

int main() {
    string a = "12345678901234567890";
    string b = "98765432109876543210";
    cout << a << " + " << b << endl;
    cout << "= " << add(a, b) << endl;

    return 0;
}
```

### 知识点2：高精度减法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 高精度减法（假设a >= b）
string subtract(string a, string b) {
    string result = "";
    int borrow = 0;

    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());
    while (b.length() < a.length()) b += '0';

    for (int i = 0; i < a.length(); i++) {
        int diff = (a[i] - '0') - (b[i] - '0') - borrow;
        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        result += diff + '0';
    }

    // 去除前导零
    while (result.length() > 1 && result.back() == '0')
        result.pop_back();

    reverse(result.begin(), result.end());
    return result;
}

int main() {
    cout << "1000000000000 - 1 = " << subtract("1000000000000", "1") << endl;

    return 0;
}
```

### 知识点3：高精度乘法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 高精度乘法
string multiply(string a, string b) {
    int n = a.length(), m = b.length();
    vector<int> result(n + m, 0);

    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            result[i+j] += (a[i] - '0') * (b[j] - '0');
            result[i+j+1] += result[i+j] / 10;
            result[i+j] %= 10;
        }
    }

    string res = "";
    for (int i = 0; i < n + m; i++) {
        res += (result[i]) + '0';
    }

    // 去除前导零
    while (res.length() > 1 && res.back() == '0')
        res.pop_back();

    reverse(res.begin(), res.end());
    return res;
}

int main() {
    cout << "123 × 456 = " << multiply("123", "456") << endl;  // 56088

    return 0;
}
```

### 知识点4：高精度除法

```cpp
#include<bits/stdc++.h>
using namespace std;

// 高精度除以单精度
pair<string, long long> divide(string a, long long b) {
    long long remainder = 0;
    string quotient = "";

    for (char c : a) {
        remainder = remainder * 10 + (c - '0');
        quotient += (remainder / b) + '0';
        remainder %= b;
    }

    // 去除前导零
    int start = 0;
    while (start < quotient.length() - 1 && quotient[start] == '0')
        start++;
    quotient = quotient.substr(start);

    return {quotient, remainder};
}

int main() {
    auto [q, r] = divide("12345678901234567890", 97);
    cout << "商: " << q << endl;
    cout << "余数: " << r << endl;

    return 0;
}
```

---

## 4.6 排序算法

### 知识点1-2：冒泡排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 冒泡排序：相邻比较，大的往后冒
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // 优化：已有序提前退出
    }
}

int main() {
    int arr[] = {5, 3, 1, 4, 2};
    int n = 5;
    bubbleSort(arr, n);
    for (int x : arr) cout << x << " ";  // 1 2 3 4 5
    cout << endl;
    return 0;
}
```

### 知识点3：选择排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 选择排序：每次选最小的放到前面
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}

int main() {
    int arr[] = {5, 3, 1, 4, 2};
    selectionSort(arr, 5);
    for (int x : arr) cout << x << " ";  // 1 2 3 4 5
    cout << endl;
    return 0;
}
```

### 知识点4：插入排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 插入排序：像打牌一样，把牌插入到正确位置
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {5, 3, 1, 4, 2};
    insertionSort(arr, 5);
    for (int x : arr) cout << x << " ";  // 1 2 3 4 5
    cout << endl;
    return 0;
}
```

### 知识点5：计数排序

```cpp
#include<bits/stdc++.h>
using namespace std;

// 计数排序：适用于值域较小的整数排序
void countingSort(int arr[], int n) {
    int mx = *max_element(arr, arr + n);
    int mn = *min_element(arr, arr + n);
    int range = mx - mn + 1;

    vector<int> count(range, 0);
    for (int i = 0; i < n; i++) {
        count[arr[i] - mn]++;
    }

    int idx = 0;
    for (int i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[idx++] = i + mn;
            count[i]--;
        }
    }
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    countingSort(arr, 7);
    for (int x : arr) cout << x << " ";  // 1 2 2 3 3 4 8
    cout << endl;
    return 0;
}
```

### 排序算法对比

| 算法 | 平均复杂度 | 最坏复杂度 | 空间复杂度 | 稳定性 |
|:---|:---:|:---:|:---:|:---:|
| 冒泡排序 | O(n²) | O(n²) | O(1) | 稳定 |
| 选择排序 | O(n²) | O(n²) | O(1) | 不稳定 |
| 插入排序 | O(n²) | O(n²) | O(1) | 稳定 |
| 计数排序 | O(n+k) | O(n+k) | O(k) | 稳定 |
| sort函数 | O(n log n) | O(n log n) | O(log n) | 不稳定 |


## 4.7 搜索算法

### 知识点1：深度优先搜索（DFS）

```cpp
#include<bits/stdc++.h>
using namespace std;

// DFS：沿着一条路走到底，再回溯
// 例：n皇后问题
int n, count_sol;
int queen[20];  // queen[i]表示第i行皇后放在第几列

bool check(int row, int col) {
    for (int i = 0; i < row; i++) {
        if (queen[i] == col || abs(queen[i] - col) == abs(i - row)) {
            return false;
        }
    }
    return true;
}

void dfs(int row) {
    if (row == n) {
        count_sol++;
        return;
    }
    for (int col = 0; col < n; col++) {
        if (check(row, col)) {
            queen[row] = col;
            dfs(row + 1);
            queen[row] = -1;  // 回溯
        }
    }
}

int main() {
    n = 8;
    count_sol = 0;
    memset(queen, -1, sizeof(queen));
    dfs(0);
    cout << n << "皇后问题有" << count_sol << "种解" << endl;  // 92

    return 0;
}
```

### 知识点2：广度优先搜索（BFS）

```cpp
#include<bits/stdc++.h>
using namespace std;

// BFS：逐层搜索，找最短路径
// 例：迷宫最短路径
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int main() {
    int n, m;
    cin >> n >> m;

    char maze[101][101];
    int dist[101][101];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> maze[i][j];
        }
    }

    memset(dist, -1, sizeof(dist));
    queue<pair<int,int>> q;
    q.push({0, 0});
    dist[0][0] = 0;

    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();

        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m
                && maze[nx][ny] == '.' && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }

    cout << "最短路径: " << dist[n-1][m-1] << endl;

    return 0;
}
```

---

## 4.8 图论算法

### 知识点1：深度优先遍历（DFS）

```cpp
#include<bits/stdc++.h>
using namespace std;

vector<int> adj[101];
bool visited[101];

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    cout << "DFS: ";
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    cout << endl;

    return 0;
}
```

### 知识点2：广度优先遍历（BFS）

```cpp
#include<bits/stdc++.h>
using namespace std;

vector<int> adj[101];
bool visited[101];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    cout << "BFS: ";
    bfs(1);
    cout << endl;

    return 0;
}
```

### 知识点3：洪水算法（Flood Fill）

```cpp
#include<bits/stdc++.h>
using namespace std;

// Flood Fill：填充连通区域
// 例：统计岛屿数量
char grid[101][101];
int n, m;

void floodFill(int x, int y) {
    if (x < 0 || x >= n || y < 0 || y >= m) return;
    if (grid[x][y] != '#') return;

    grid[x][y] = '.';  // 标记已访问

    // 四个方向
    floodFill(x + 1, y);
    floodFill(x - 1, y);
    floodFill(x, y + 1);
    floodFill(x, y - 1);
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> grid[i][j];
        }
    }

    int islands = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == '#') {
                floodFill(i, j);
                islands++;
            }
        }
    }

    cout << "岛屿数量: " << islands << endl;

    return 0;
}
```

---

## 4.9 动态规划

### 知识点1：动态规划基本思路

动态规划的关键：
1. **定义状态**：dp[i]表示什么
2. **状态转移方程**：dp[i]如何从dp[i-1]等推导
3. **初始条件**：dp[0]等的值
4. **答案**：通常在dp[n]中

### 知识点2：简单一维DP

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 例：爬楼梯（每次1或2步）
    int n = 10;
    vector<int> dp(n + 1);
    dp[0] = 1;  // 空楼梯1种走法
    dp[1] = 1;  // 1级楼梯1种走法

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];  // 状态转移
    }

    cout << n << "级楼梯有" << dp[n] << "种走法" << endl;

    // 例：最大连续子序列和
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int m = 9;
    vector<int> f(m);
    f[0] = arr[0];
    int maxSum = f[0];

    for (int i = 1; i < m; i++) {
        f[i] = max(arr[i], f[i-1] + arr[i]);
        maxSum = max(maxSum, f[i]);
    }

    cout << "最大连续子序列和: " << maxSum << endl;  // 6

    return 0;
}
```

### 知识点3：简单背包DP

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 0-1背包问题
    // 有n个物品，第i个重量w[i]，价值v[i]
    // 背包容量W，求最大价值

    int n = 4, W = 10;
    int w[] = {0, 2, 3, 4, 5};  // 下标从1开始
    int v[] = {0, 3, 4, 5, 6};

    // dp[i][j] = 前i个物品，容量j的最大价值
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            dp[i][j] = dp[i-1][j];  // 不选第i个
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
            }
        }
    }

    cout << "最大价值: " << dp[n][W] << endl;

    // 空间优化：一维数组
    vector<int> dp2(W + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {  // 逆序遍历
            dp2[j] = max(dp2[j], dp2[j-w[i]] + v[i]);
        }
    }

    cout << "优化后最大价值: " << dp2[W] << endl;

    return 0;
}
```

### 知识点4：简单区间DP

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 区间DP：合并石子问题
    // n堆石子，每次合并相邻两堆，代价为两堆之和
    int n = 4;
    int a[] = {1, 3, 5, 2};

    // 前缀和
    int pre[5] = {};
    for (int i = 1; i <= n; i++) {
        pre[i] = pre[i-1] + a[i-1];
    }

    // dp[i][j] = 合并i~j的最小代价
    vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

    for (int len = 2; len <= n; len++) {        // 区间长度
        for (int i = 1; i + len - 1 <= n; i++) { // 起点
            int j = i + len - 1;                 // 终点
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {        // 分割点
                int cost = dp[i][k] + dp[k+1][j]
                         + pre[j] - pre[i-1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }

    cout << "最小合并代价: " << dp[1][n] << endl;

    return 0;
}
```


---

# 五、数学与其他

## 5.1 数及其运算

### 知识点1：数的类型

- **自然数**：0, 1, 2, 3, ...
- **整数**：..., -2, -1, 0, 1, 2, ...
- **有理数**：可以表示为分数的数（如 1/3, 3/4）
- **实数**：包括有理数和无理数（如 π, √2）

### 知识点2：进制与转换

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 十进制转其他进制
    int n = 255;

    // 十进制转二进制
    cout << "二进制: ";
    for (int i = 7; i >= 0; i--) {
        cout << ((n >> i) & 1);
    }
    cout << endl;  // 11111111

    // 使用bitset
    cout << "bitset: " << bitset<8>(n) << endl;

    // 十进制转八进制
    cout << "八进制: " << oct << n << endl;  // 377

    // 十进制转十六进制
    cout << "十六进制: " << hex << n << endl;  // ff

    // 其他进制转十进制
    int binary = 0b11111111;  // 二进制字面量
    int octal = 0377;         // 八进制字面量
    int hexal = 0xFF;         // 十六进制字面量
    cout << "二进制11111111 = " << binary << endl;  // 255

    return 0;
}
```

---

## 5.2 初等数学

### 知识点1：初中代数

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 一元二次方程 ax² + bx + c = 0
    double a = 1, b = -3, c = 2;
    double delta = b * b - 4 * a * c;

    if (delta > 0) {
        double x1 = (-b + sqrt(delta)) / (2 * a);
        double x2 = (-b - sqrt(delta)) / (2 * a);
        cout << "x1 = " << x1 << ", x2 = " << x2 << endl;  // 2, 1
    } else if (delta == 0) {
        double x = -b / (2 * a);
        cout << "x = " << x << endl;
    } else {
        cout << "无实数解" << endl;
    }

    return 0;
}
```

### 知识点2：初中几何

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    const double PI = acos(-1.0);

    // 三角形面积
    double base = 5, height = 3;
    cout << "三角形面积: " << 0.5 * base * height << endl;  // 7.5

    // 圆的面积和周长
    double r = 3;
    cout << "圆面积: " << PI * r * r << endl;
    cout << "圆周长: " << 2 * PI * r << endl;

    // 勾股定理
    double a = 3, b = 4;
    double c = sqrt(a * a + b * b);
    cout << "斜边: " << c << endl;  // 5

    return 0;
}
```

---

## 5.3 初等数论

### 知识点1：整除与因数

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n = 36;

    // 找出所有因数
    cout << n << "的因数: ";
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            cout << i << " ";
            if (i != n / i) cout << n / i << " ";
        }
    }
    cout << endl;  // 1 2 3 4 6 9 12 18 36

    // 因数个数
    int cnt = 0;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            cnt++;
            if (i != n / i) cnt++;
        }
    }
    cout << "因数个数: " << cnt << endl;  // 9

    return 0;
}
```

### 知识点2：质数与合数

```cpp
#include<bits/stdc++.h>
using namespace std;

// 判断质数
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    // 输出1~100的所有质数
    cout << "1~100的质数: ";
    for (int i = 2; i <= 100; i++) {
        if (isPrime(i)) cout << i << " ";
    }
    cout << endl;

    // 唯一分解定理：将n分解为质因数的乘积
    int n = 360;
    cout << n << " = ";
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            cout << i;
            n /= i;
            if (n > 1) cout << " × ";
        }
    }
    if (n > 1) cout << n;
    cout << endl;  // 360 = 2 × 2 × 2 × 3 × 3 × 5

    return 0;
}
```

### 知识点3：取整运算

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 下取整 floor：≤x的最大整数
    cout << floor(3.7) << endl;    // 3
    cout << floor(-3.2) << endl;   // -4

    // 上取整 ceil：≥x的最小整数
    cout << ceil(3.2) << endl;     // 4
    cout << ceil(-3.7) << endl;    // -3

    // 整数除法的下取整（C++中整数除法自动截断）
    cout << 7 / 2 << endl;     // 3
    cout << -7 / 2 << endl;    // -3（向零截断，不是下取整！）

    // 向下取整除法（处理负数）
    int a = -7, b = 2;
    int div = a / b - (a % b != 0 && (a ^ b) < 0);
    cout << "向下取整: " << div << endl;  // -4

    return 0;
}
```

### 知识点4：模运算

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 模运算性质
    // (a + b) % m = (a%m + b%m) % m
    // (a * b) % m = (a%m * b%m) % m

    int m = 1000000007;  // 常用大质数

    // 快速幂取模
    auto quickPow = [&](long long a, long long n) {
        long long result = 1;
        a %= m;
        while (n > 0) {
            if (n & 1) result = result * a % m;
            a = a * a % m;
            n >>= 1;
        }
        return result;
    };

    cout << "2^100 % 1e9+7 = " << quickPow(2, 100) << endl;
    cout << "3^50 % 1e9+7 = " << quickPow(3, 50) << endl;

    // 负数取模
    int x = -7;
    cout << "(-7) % 3 = " << x % 3 << endl;  // -1
    cout << "(-7 % 3 + 3) % 3 = " << (x % 3 + 3) % 3 << endl;  // 2

    return 0;
}
```

### 知识点5：辗转相除法（GCD）

```cpp
#include<bits/stdc++.h>
using namespace std;

// 辗转相除法求最大公约数
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 最小公倍数
int lcm(int a, int b) {
    return a / gcd(a, b) * b;  // 先除后乘防溢出
}

int main() {
    cout << "gcd(12, 8) = " << gcd(12, 8) << endl;  // 4
    cout << "lcm(12, 8) = " << lcm(12, 8) << endl;  // 24

    // STL内置gcd（C++17）
    cout << "__gcd(12, 8) = " << __gcd(12, 8) << endl;

    return 0;
}
```

### 知识点6-7：素数筛法

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n = 100;

    // 埃氏筛法 O(n log log n)
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    cout << "埃氏筛 1~" << n << "的质数: ";
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) cout << i << " ";
    }
    cout << endl;

    // 线性筛 O(n)
    vector<int> primes;
    vector<bool> isP(n + 1, true);
    isP[0] = isP[1] = false;
    for (int i = 2; i <= n; i++) {
        if (isP[i]) primes.push_back(i);
        for (int j = 0; j < (int)primes.size() && i * primes[j] <= n; j++) {
            isP[i * primes[j]] = false;
            if (i % primes[j] == 0) break;
        }
    }

    cout << "线性筛 1~" << n << "的质数个数: " << primes.size() << endl;

    return 0;
}
```

---

## 5.4 计数原理与排列组合

### 知识点1-3：加法原理与乘法原理

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 加法原理：做一件事有n类方法，每类有m种，总共 n×m 种
    // 例：3件上衣，2条裤子，搭配方式 = 3 × 2 = 6 种

    // 乘法原理：分步完成，每步有若干选择
    // 例：从A到B有3条路，B到C有4条路，总共 3×4=12 种

    // 排列：从n个不同元素中取r个排成一列
    // P(n,r) = n! / (n-r)!

    // 组合：从n个不同元素中取r个（不考虑顺序）
    // C(n,r) = n! / (r! × (n-r)!)

    return 0;
}
```

### 知识点4-5：排列与组合

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 组合数 C(n, r)
    int n = 10, r = 3;

    // 方法1：递推（杨辉三角）
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            C[i][j] = C[i-1][j-1] + C[i-1][j];
        }
    }
    cout << "C(10,3) = " << C[n][r] << endl;  // 120

    // 方法2：公式计算
    long long ans = 1;
    for (int i = 1; i <= r; i++) {
        ans = ans * (n - r + i) / i;
    }
    cout << "C(10,3) = " << ans << endl;  // 120

    // 全排列
    int arr[] = {1, 2, 3};
    int cnt = 0;
    do {
        cnt++;
        for (int x : arr) cout << x << " ";
        cout << endl;
    } while (next_permutation(arr, arr + 3));
    cout << "全排列数: " << cnt << endl;  // 6

    return 0;
}
```

### 知识点6：杨辉三角

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    int n = 10;
    vector<vector<long long>> tri(n, vector<long long>(n, 0));

    for (int i = 0; i < n; i++) {
        tri[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            tri[i][j] = tri[i-1][j-1] + tri[i-1][j];
        }
    }

    // 打印杨辉三角
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << setw(6) << tri[i][j];
        }
        cout << endl;
    }

    return 0;
}
```

---

## 5.5 其他

### 知识点1：ASCII码

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    // 常用ASCII码
    cout << "'0'的ASCII码: " << (int)'0' << endl;  // 48
    cout << "'A'的ASCII码: " << (int)'A' << endl;  // 65
    cout << "'a'的ASCII码: " << (int)'a' << endl;  // 97

    // 大小写转换
    char c = 'A';
    char lower = c + ('a' - 'A');  // 大写转小写
    cout << c << " -> " << lower << endl;  // A -> a

    char d = 'g';
    char upper = d - ('a' - 'A');  // 小写转大写
    cout << d << " -> " << upper << endl;  // g -> G

    // 字符与数字转换
    int num = 42;
    string s = to_string(num);  // 数字转字符串
    cout << "数字转字符串: " << s << endl;

    int back = stoi(s);  // 字符串转数字
    cout << "字符串转数字: " << back << endl;

    // 字符判断
    char ch = '5';
    if (ch >= '0' && ch <= '9') {
        cout << ch << "是数字" << endl;
    }
    if (ch >= 'A' && ch <= 'Z') {
        cout << ch << "是大写字母" << endl;
    }
    if (ch >= 'a' && ch <= 'z') {
        cout << ch << "是小写字母" << endl;
    }

    return 0;
}
```

---

## 📌 备考建议

### CSP-J 考试重点

| 模块 | 重要度 | 建议学习时长 |
|:---|:---:|:---:|
| C++基础语法 | ⭐⭐⭐⭐⭐ | 2-3周 |
| 数组与字符串 | ⭐⭐⭐⭐⭐ | 1-2周 |
| 函数与递归 | ⭐⭐⭐⭐⭐ | 1-2周 |
| 排序算法 | ⭐⭐⭐⭐ | 1周 |
| 二叉树与遍历 | ⭐⭐⭐⭐ | 1-2周 |
| 图论基础 | ⭐⭐⭐ | 1周 |
| 动态规划入门 | ⭐⭐⭐ | 1-2周 |
| 数论基础 | ⭐⭐⭐ | 1周 |
| 排列组合 | ⭐⭐⭐ | 1周 |

### 难度系数说明

| 系数 | 含义 | 对应水平 |
|:---:|:---|:---|
| 【1】 | 最基础 | 零基础入门 |
| 【2】 | 基础 | 初学者 |
| 【3】 | 中等 | 入门级选手 |
| 【4】 | 中等偏难 | CSP-J中等水平 |
| 【5】 | 较难 | CSP-J高水平/入门CSP-S |

### 备考时间线

| 阶段 | 时间 | 内容 |
|:---|:---|:---|
| 基础阶段 | 第1-4周 | C++语法、数据类型、控制结构、函数 |
| 提高阶段 | 第5-8周 | 数组、字符串、STL、递归 |
| 专项阶段 | 第9-12周 | 排序、搜索、DP、数论 |
| 冲刺阶段 | 第13-16周 | 真题训练、模拟考试 |
| 考前阶段 | 最后2周 | 查漏补缺、调整心态 |

### 学习方法

1. **多做题**：光看书不动手等于白学
2. **总结错题**：建立错题本，定期复习
3. **理解原理**：不要死记硬背，理解算法思想
4. **分阶段**：先打好基础，再学高级算法
5. **参加模拟赛**：适应考试节奏和压力

---

> **参考来源**：全国青少年信息学奥林匹克系列竞赛大纲（2025年修订版）
