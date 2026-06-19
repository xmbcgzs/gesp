# GESP C++ 二级（L2 基础）知识点整理

> 共 6 大知识模块，涵盖计算机基础、程序设计概念、流程图、编码、数据类型转换、分支循环结构及数学函数

---

## 一、计算机的存储与网络（ROM / RAM / CACHE / TCP-IP / IP地址）

### 1.1 存储器分类

| 存储器 | 全称 | 特点 |
|:---:|:---|:---|
| **ROM** | 只读存储器 | 断电不丢失，存储固件（BIOS等），只能读不能写 |
| **RAM** | 随机存取存储器 | 断电数据丢失，速度快，存储运行中的程序和数据 |
| **Cache** | 高速缓存 | 位于CPU与内存之间，速度最快，容量最小，缓解速度差异 |

**存储器速度关系**：Cache > RAM > ROM > 硬盘

**存储器容量关系**：硬盘 > RAM > Cache > ROM

**关键概念**：
- **内存（RAM）**：程序运行时，代码和数据先从硬盘加载到内存，CPU再从内存读取执行
- **外存（硬盘/U盘）**：永久保存数据，断电不丢失
- **Cache的作用**：CPU访问内存速度较慢，Cache预先存放CPU常用数据，提高访问效率

**常见易错点**：
- RAM 断电后数据丢失，ROM 断电后数据保留
- Cache 不是越大越好，还需要考虑命中率和成本
- 程序运行时必须先加载到内存（RAM）才能被CPU执行

### 1.2 网络基础

**TCP/IP 协议**：
- TCP（传输控制协议）：面向连接、可靠传输、有序、有重传机制
- IP（网际协议）：负责寻址和路由，将数据包从源地址送到目的地址
- 常用端口：HTTP=80，HTTPS=443，FTP=21，SMTP=25

**IP地址**：
- 格式：由4个0~255的十进制数用点分隔，如 `192.168.1.1`
- IPv4：32位地址，约43亿个地址
- IPv6：128位地址，地址数量极大扩展
- 特殊地址：`127.0.0.1` 表示本机（localhost）
- 网络号 + 主机号构成完整IP地址

**域名与DNS**：
- 域名：便于记忆的地址，如 `www.baidu.com`
- DNS：域名解析系统，将域名转换为IP地址
- URL：统一资源定位符，如 `https://www.baidu.com/index.html`

**常见易错点**：
- IP地址是数字形式，域名是便于记忆的字符串形式
- DNS的作用是将域名转换为IP地址
- `127.0.0.1` 是回环地址，代表本机

---

## 二、程序设计语言的特点（分类 / 常见高级语言）

### 2.1 计算机语言分类

| 类型 | 特点 | 示例 |
|:---:|:---|:---|
| **机器语言** | 二进制代码（0和1），CPU直接执行，效率最高但难以编写 | `01001000 01100101` |
| **汇编语言** | 用助记符代替二进制，需要汇编器转换，与硬件相关 | `MOV AX, 1` |
| **高级语言** | 接近自然语言，需编译器/解释器转换，可移植性好 | C++、Python、Java |

**编译型语言 vs 解释型语言**：

| 特性 | 编译型语言 | 解释型语言 |
|:---:|:---|:---|
| 执行方式 | 源代码 → 编译器 → 机器码 → 执行 | 源代码 → 解释器逐行执行 |
| 执行速度 | 快 | 相对较慢 |
| 可移植性 | 较差（不同平台需重新编译） | 较好（有解释器即可运行） |
| 典型语言 | C、C++、Go | Python、JavaScript |

### 2.2 常见高级语言对比

| 语言 | 特点 | 应用领域 |
|:---:|:---|:---|
| **C语言** | 接近底层、效率高、指针操作 | 操作系统、嵌入式开发 |
| **C++** | 在C基础上增加面向对象、模板等 | 游戏引擎、系统软件 |
| **Python** | 语法简洁、动态类型、丰富的库 | 数据分析、AI、Web开发 |
| **Java** | 跨平台（JVM）、面向对象、强类型 | 企业应用、Android开发 |
| **JavaScript** | 浏览器脚本语言、事件驱动 | 前端开发、Web交互 |

**常见易错点**：
- 机器语言是唯一能被CPU直接执行的语言
- 高级语言不能被CPU直接执行，需要编译器或解释器转换
- C/C++是编译型语言，Python是解释型语言
- 高级语言的可移植性优于汇编语言和机器语言

---

## 三、流程图的概念与描述

### 3.1 流程图基本概念

流程图是用图形符号表示算法步骤的一种图示方法，能直观展示程序的逻辑流程。

**流程图的作用**：
- 直观展示算法逻辑
- 帮助分析和调试程序
- 便于交流和沟通算法思想
- 是编写代码前的重要设计工具

### 3.2 基本符号

| 符号 | 名称 | 用途 |
|:---:|:---|:---|
| ○（圆角矩形/椭圆） | 起止框 | 表示算法的开始和结束 |
| □（矩形） | 处理框 | 表示计算、赋值等操作 |
| ◇（菱形） | 判断框 | 表示条件判断，有"是"和"否"两个出口 |
| ▱（平行四边形） | 输入输出框 | 表示数据的输入或输出 |
| →（箭头） | 流程线 | 表示执行顺序 |

### 3.3 流程图绘制规范

**绘制步骤**：
1. 确定算法的开始和结束
2. 分析算法的每一步操作
3. 判断是否存在分支（条件）
4. 用标准符号和箭头连接各步骤
5. 检查流程是否完整

**示例：判断一个数的正负**

```
        [开始]
           |
     [输入n]
           |
        ◇ n > 0 ?
       /       \
    [是]      [否]
      |          |
  [输出正数]  ◇ n = 0 ?
                /       \
            [是]      [否]
              |          |
         [输出零]   [输出负数]
              |          |
           [结束]<-------
```

**结构化程序设计的三种基本结构**：
1. **顺序结构**：步骤从上到下依次执行
2. **选择（分支）结构**：根据条件选择不同的执行路径
3. **循环结构**：满足条件时重复执行一段代码

**常见易错点**：
- 流程线必须有箭头指示方向
- 判断框必须有两个出口（是/否）
- 流程图只能有一个开始和一个结束
- 三种基本结构可以组合成任意复杂算法

---

## 四、ASCII编码（常见字符ASCII码 / 编码转换）

### 4.1 ASCII编码概述

ASCII（美国标准信息交换码）使用7位二进制编码，可表示128个字符（0~127）。

### 4.2 常见ASCII码值

| 字符 | ASCII码 | 字符 | ASCII码 |
|:---:|:---:|:---:|:---:|
| `'0'` | **48** | `'A'` | **65** |
| `'1'` | 49 | `'B'` | 66 |
| `'2'` | 50 | `'C'` | 67 |
| `'9'` | **57** | `'Z'` | **90** |
| `' '`（空格）| **32** | `'a'` | **97** |
| `'+'` | 43 | `'z'` | **122** |
| `'\0'` | **0** | `'A'-'Z'` | **连续** |
| `'0'-'9'` | **连续** | `'a'-'z'` | **连续** |

**重要规律**：
- `'A'`(65) 到 `'Z'`(90)：连续26个大写字母
- `'a'`(97) 到 `'z'`(122)：连续26个小写字母
- `'0'`(48) 到 `'9'`(57)：连续10个数字字符
- 大写字母与小写字母相差 **32**（如 `'a' - 'A' = 32`）
- 数字字符与数值的关系：`'0'` 对应数值 0

### 4.3 编码转换

**字符 ↔ ASCII码转换**：
```cpp
#include <iostream>
using namespace std;

int main() {
    // 字符 → ASCII码（隐式转换）
    char ch = 'A';
    int code = ch;           // code = 65
    cout << (int)ch << endl; // 强制转换输出：65

    // ASCII码 → 字符
    int n = 97;
    char c = (char)n;       // c = 'a'
    cout << c << endl;      // 输出：a

    // 大小写转换
    char upper = 'B';
    char lower = upper + 32;      // lower = 'b'
    char back = lower - 32;       // back = 'B'

    // 数字字符 ↔ 数值
    char digit = '5';
    int value = digit - '0';      // value = 5
    char back_char = value + '0'; // back_char = '5'

    return 0;
}
```

**常见应用**：
- 大小写转换：`ch - 'A' + 'a'`（大转小），`ch - 'a' + 'A'`（小转大）
- 判断是否为数字：`ch >= '0' && ch <= '9'`
- 数字字符转数值：`ch - '0'`
- 数值转数字字符：`n + '0'`

**常见易错点**：
- `'0'` 的ASCII码是48，不是0
- 字符 `'5'` 的ASCII码是53，不是5
- 大小写转换靠±32实现，而不是直接赋值
- 判断字符是否为数字用范围判断，不能用 `==` 逐一比较

---

## 五、数据类型的转换（强制 / 隐式）

### 5.1 常见数据类型

| 类型 | 关键字 | 字节数 | 取值范围 |
|:---:|:---:|:---:|:---|
| 整型 | `int` | 4 | -2^31 ~ 2^31-1 |
| 短整型 | `short` | 2 | -32768 ~ 32767 |
| 长整型 | `long` | 4/8 | 取决于系统 |
| 无符号整型 | `unsigned int` | 4 | 0 ~ 2^32-1 |
| 单精度浮点 | `float` | 4 | 约6~7位有效数字 |
| 双精度浮点 | `double` | 8 | 约15~16位有效数字 |
| 字符型 | `char` | 1 | -128 ~ 127 |
| 布尔型 | `bool` | 1 | true / false |

### 5.2 隐式类型转换（自动转换）

当不同类型的数据参与运算时，编译器自动将"小类型"转换为"大类型"。

**转换规则**：`char` → `short` → `int` → `long` → `float` → `double`

```cpp
#include <iostream>
using namespace std;

int main() {
    // int + double → double
    int a = 3;
    double b = 2.5;
    double result = a + b;  // result = 5.5（int自动转为double）

    // char + int → int
    char c = 'A';           // c的ASCII值为65
    int n = c + 1;          // n = 66（char自动转为int）

    // 整数与浮点数运算
    int x = 7, y = 2;
    double div1 = x / y;        // div1 = 3.0（先整数除法，再转double）
    double div2 = (double)x / y; // div2 = 3.5（先转double再除）

    // 赋值时的隐式转换
    double pi = 3.14;
    int trunc = pi;          // trunc = 3（小数部分被截断）
    cout << "trunc = " << trunc << endl;

    return 0;
}
```

### 5.3 强制类型转换（显式转换）

用 `(类型名)表达式` 或 `类型名(表达式)` 将数据强制转换为指定类型。

```cpp
#include <iostream>
using namespace std;

int main() {
    // C风格强制转换
    double pi = 3.14159;
    int int_pi = (int)pi;            // int_pi = 3（截断小数）

    // C++风格强制转换
    double e = 2.71828;
    int int_e = int(e);              // int_e = 2

    // 整数除法的结果
    int a = 5, b = 2;
    cout << a / b << endl;           // 输出：2（整数除法）
    cout << (double)a / b << endl;   // 输出：2.5（先转double再除）
    cout << (double)(a / b) << endl; // 输出：2（先算整除再转double）

    // 字符与整数的转换
    char ch = 'A';
    cout << (int)ch << endl;         // 输出：65
    int code = 97;
    cout << (char)code << endl;      // 输出：a

    return 0;
}
```

### 5.4 浮点数精度问题

```cpp
#include <iostream>
using namespace std;

int main() {
    float f = 0.1 + 0.2;
    double d = 0.1 + 0.2;
    cout << "float:  " << (f == 0.3) << endl;   // 可能输出0（不相等）
    cout << "double: " << (d == 0.3) << endl;   // 可能输出0（不相等）

    // 浮点数比较应使用差值判断
    if (abs(d - 0.3) < 1e-9) {
        cout << "d 约等于 0.3" << endl;
    }
    return 0;
}
```

**常见易错点**：
- 整数除法会截断小数：`5 / 2 = 2`，不是 `2.5`
- 浮点数转整数会截断小数部分，不是四舍五入
- `(double)a / b` 和 `(double)(a / b)` 结果不同
- 浮点数不能用 `==` 直接比较，应使用差值判断
- 隐式转换可能导致精度丢失

---

## 六、多层分支结构与多层循环结构

### 6.1 多层分支结构

#### 6.1.1 if 嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "请输入成绩: ";
    cin >> score;

    // if嵌套：成绩等级判定
    if (score >= 0 && score <= 100) {
        if (score >= 90) {
            cout << "优秀" << endl;
        } else {
            if (score >= 80) {
                cout << "良好" << endl;
            } else {
                if (score >= 70) {
                    cout << "中等" << endl;
                } else {
                    if (score >= 60) {
                        cout << "及格" << endl;
                    } else {
                        cout << "不及格" << endl;
                    }
                }
            }
        }
    } else {
        cout << "成绩无效！" << endl;
    }

    return 0;
}
```

**else-if 链（推荐写法，更清晰）**：
```cpp
#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;

    if (score >= 0 && score <= 100) {
        if (score >= 90) {
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
    } else {
        cout << "成绩无效！" << endl;
    }

    return 0;
}
```

#### 6.1.2 switch 嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    int year, month;
    cin >> year >> month;

    // switch嵌套：判断月份天数
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            cout << "31天" << endl;
            break;
        case 4: case 6: case 9: case 11:
            cout << "30天" << endl;
            break;
        case 2:
            // 嵌套switch判断闰年
            switch ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                case 1:
                    cout << "29天（闰年）" << endl;
                    break;
                case 0:
                    cout << "28天（平年）" << endl;
                    break;
            }
            break;
        default:
            cout << "月份无效！" << endl;
            break;
    }

    return 0;
}
```

**常见易错点**：
- `switch` 的表达式结果必须是整型或字符型，不能是浮点型
- `case` 后面必须是常量表达式，不能是变量
- `switch` 中忘记 `break` 会导致"穿透"（执行后续所有case）
- if嵌套时注意 `else` 与最近的未匹配 `if` 配对
- 多条件判断建议用 `else if` 代替深层嵌套，提高可读性

### 6.2 多层循环结构

#### 6.2.1 while 嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    // 输出九九乘法表
    int i = 1;
    while (i <= 9) {
        int j = 1;
        while (j <= i) {
            cout << j << "×" << i << "=" << i * j << "\t";
            j++;
        }
        cout << endl;
        i++;
    }
    return 0;
}
```

**while 嵌套练习 — 打印图形**：
```cpp
#include <iostream>
using namespace std;

int main() {
    // 打印直角三角形（5行）
    int i = 1;
    while (i <= 5) {
        int j = 1;
        // 打印空格
        while (j <= 5 - i) {
            cout << " ";
            j++;
        }
        // 打印星号
        j = 1;
        while (j <= 2 * i - 1) {
            cout << "*";
            j++;
        }
        cout << endl;
        i++;
    }
    return 0;
}
```

#### 6.2.2 do-while 嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    // do-while嵌套：输入验证
    int n;
    do {
        cout << "请输入1-100之间的整数: ";
        cin >> n;
        if (n < 1 || n > 100) {
            cout << "输入无效，请重新输入！" << endl;
        }
    } while (n < 1 || n > 100);

    // do-while嵌套打印图形
    int i = 1;
    do {
        int j = 1;
        do {
            cout << "*";
            j++;
        } while (j <= i);
        cout << endl;
        i++;
    } while (i <= 5);

    return 0;
}
```

#### 6.2.3 for 嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    // for嵌套：输出九九乘法表
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << "×" << i << "=" << i * j << "\t";
        }
        cout << endl;
    }

    cout << endl;

    // for嵌套：打印菱形（7行）
    for (int i = 1; i <= 7; i++) {
        // 打印空格
        int spaces = i <= 4 ? 4 - i : i - 4;
        for (int s = 0; s < spaces; s++) cout << " ";
        // 打印星号
        int stars = i <= 4 ? 2 * i - 1 : 2 * (7 - i) + 1;
        for (int k = 0; k < stars; k++) cout << "*";
        cout << endl;
    }

    return 0;
}
```

#### 6.2.4 混合嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    // for + while 混合：计算1! + 2! + 3! + ... + 10!
    long long sum = 0;
    for (int i = 1; i <= 10; i++) {
        long long factorial = 1;
        int j = 1;
        while (j <= i) {
            factorial *= j;
            j++;
        }
        sum += factorial;
        cout << i << "! = " << factorial << endl;
    }
    cout << "1!+2!+...+10! = " << sum << endl;

    return 0;
}
```

### 6.3 循环中的 break 和 continue

```cpp
#include <iostream>
using namespace std;

int main() {
    // break：跳出当前循环
    for (int i = 1; i <= 10; i++) {
        if (i == 5) break;   // i=5时跳出循环
        cout << i << " ";    // 输出：1 2 3 4
    }
    cout << endl;

    // continue：跳过本次循环
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;  // 跳过偶数
        cout << i << " ";           // 输出：1 3 5 7 9
    }
    cout << endl;

    // 多层循环中break只跳出最内层
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            if (j == 2) break;  // 只跳出内层for
            cout << "(" << i << "," << j << ") ";
        }
    }
    // 输出：(1,1) (2,1) (3,1)

    return 0;
}
```

**三种循环对比**：

| 特性 | for | while | do-while |
|:---:|:---|:---|:---|
| 执行次数 | 通常已知 | 可能为0次 | 至少1次 |
| 语法 | `for(初始化; 条件; 更新)` | `while(条件)` | `do{ }while(条件);` |
| 适用场景 | 循环次数已知 | 循环次数未知 | 至少执行一次 |

**常见易错点**：
- `for` 循环中三个表达式都可以省略，但分号不能省
- `do-while` 末尾必须有分号
- 嵌套循环中 `break` 只能跳出最内层循环
- 死循环：循环条件始终为真，需避免
- for嵌套时内外循环变量不要重复（如都用 `i`）

---

## 七、常用数学函数（abs / sqrt / max / min / pow / ceil / floor）

### 7.1 头文件与函数列表

使用数学函数需包含头文件：`#include &lt;cmath&gt;` 或 `#include <math.h>`

| 函数 | 功能 | 示例 | 结果 |
|:---:|:---|:---:|:---:|
| `abs(x)` | 求整数绝对值 | `abs(-5)` | 5 |
| `fabs(x)` | 求浮点数绝对值 | `fabs(-3.14)` | 3.14 |
| `sqrt(x)` | 求平方根（x≥0） | `sqrt(16)` | 4.0 |
| `max(a, b)` | 求较大值 | `max(3, 7)` | 7 |
| `min(a, b)` | 求较小值 | `min(3, 7)` | 3 |
| `pow(x, y)` | 求x的y次幂 | `pow(2, 10)` | 1024.0 |
| `ceil(x)` | 向上取整 | `ceil(3.2)` | 4.0 |
| `floor(x)` | 向下取整 | `floor(3.8)` | 3.0 |

### 7.2 函数详解与示例

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    // 1. abs / fabs — 绝对值
    int a = -10;
    cout << "abs(-10) = " << abs(a) << endl;         // 10

    double b = -3.14;
    cout << "fabs(-3.14) = " << fabs(b) << endl;     // 3.14

    // 2. sqrt — 平方根
    double s = sqrt(25.0);
    cout << "sqrt(25) = " << s << endl;               // 5.0
    cout << "sqrt(2) = " << sqrt(2.0) << endl;       // 1.41421...

    // 3. max / min — 求最大最小值
    cout << "max(10, 20) = " << max(10, 20) << endl;  // 20
    cout << "min(10, 20) = " << min(10, 20) << endl;  // 10

    // 求三个数的最大值
    int x = 15, y = 25, z = 10;
    int maxVal = max(x, max(y, z));
    cout << "最大值: " << maxVal << endl;              // 25

    // 4. pow — 幂运算
    cout << "2^10 = " << pow(2, 10) << endl;          // 1024
    cout << "3^3 = " << pow(3, 3) << endl;            // 27

    // 5. ceil / floor — 取整
    cout << "ceil(3.2) = " << ceil(3.2) << endl;      // 4
    cout << "ceil(-3.2) = " << ceil(-3.2) << endl;    // -3
    cout << "floor(3.8) = " << floor(3.8) << endl;    // 3
    cout << "floor(-3.8) = " << floor(-3.8) << endl;  // -4

    return 0;
}
```

### 7.3 其他常用数学运算

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    // 取余运算（%）
    cout << 17 % 5 << endl;    // 2
    cout << -7 % 3 << endl;    // -1（结果符号与被除数相同）

    // round — 四舍五入（C++11）
    cout << round(3.5) << endl;  // 4
    cout << round(3.4) << endl;  // 3

    // log / log10 — 自然对数 / 以10为底的对数
    cout << "ln(e) = " << log(2.71828) << endl;   // 约1.0
    cout << "lg(100) = " << log10(100.0) << endl;  // 2.0

    return 0;
}
```

### 7.4 数学函数的实际应用

**应用1：判断一个数是否为完全平方数**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int root = (int)sqrt((double)n);
    if (root * root == n) {
        cout << n << " 是完全平方数" << endl;
    } else {
        cout << n << " 不是完全平方数" << endl;
    }
    return 0;
}
```

**应用2：计算圆的面积**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double r;
    cin >> r;
    double area = M_PI * pow(r, 2);  // M_PI是cmath中定义的π常量
    cout << "面积 = " << area << endl;
    return 0;
}
```

**应用3：取余判断奇偶**
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            cout << i << " 是偶数" << endl;
        } else {
            cout << i << " 是奇数" << endl;
        }
    }
    return 0;
}
```

**常见易错点**：
- `abs()` 对整数使用，浮点数用 `fabs()`
- `sqrt()` 的参数不能为负数
- `pow()` 返回 `double` 类型，需注意类型转换
- `ceil(-3.2)` = -3（向正无穷方向取整），`floor(-3.2)` = -4（向负无穷方向取整）
- `max` / `min` 函数参数类型必须相同
- 使用 `sqrt` 和 `pow` 需要包含 `&lt;cmath&gt;` 头文件

---

## 总结

| 模块 | 核心要点 |
|:---|:---|
| 计算机存储与网络 | ROM断电保留/RAM断电丢失/Cache高速缓存；TCP-IP协议；IP地址格式 |
| 程序设计语言特点 | 机器语言→汇编语言→高级语言；编译型vs解释型；常见语言对比 |
| 流程图 | 5种基本符号；三种基本结构（顺序/选择/循环）；绘制规范 |
| ASCII编码 | '0'=48, 'A'=65, 'a'=97；大小写差32；字符↔ASCII码转换 |
| 数据类型转换 | 隐式转换规则：char→int→float→double；强制转换`(int)x`；整数除法截断 |
| 多层分支/循环 | if嵌套/else-if链；switch嵌套/break穿透；for/while/do-while嵌套；break/continue |
| 常用数学函数 | abs/sqrt/pow/ceil/floor/max/min；头文件`&lt;cmath&gt;`；四舍五入与取整区别 |
