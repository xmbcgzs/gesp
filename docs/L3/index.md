# GESP C++ 三级知识点整理（修正版）

> 共 7 个知识块，严格匹配 GESP Level 3 考试大纲
> 
> 涵盖：数据编码、进制转换、位运算、算法概念与描述、枚举法与模拟法、一维数组、字符串

---

## 一、数据编码 — 原码、反码、补码

### 1.1 三种编码方式

**概念**
- 计算机中整数以二进制形式存储，有三种表示方式
- **原码**：最高位为符号位（0正1负），其余位为绝对值
- **反码**：正数反码 = 原码；负数反码 = 符号位不变，其余位取反
- **补码**：正数补码 = 原码；负数补码 = 反码 + 1

**关键规则**

| 编码 | 正数 | 负数 |
|:---:|:---:|:---:|
| 原码 | 直接表示 | 符号位为1，其余为绝对值 |
| 反码 | 同原码 | 符号位为1，其余位取反 |
| 补码 | 同原码 | 反码 + 1 |

**示例：+5 和 -5（以8位为例）**
```
+5 的原码: 00000101
+5 的反码: 00000101
+5 的补码: 00000101

-5 的原码: 10000101
-5 的反码: 11111010
-5 的补码: 11111011
```

**补码的特殊值**
```
0 的补码: 00000000（唯一）
-128 的补码: 10000000（无对应原码）
8位补码范围: -128 ~ 127
```

### 1.2 补码运算规则

**代码模板**
```cpp
#include <iostream>
using namespace std;

int main() {
    // 验证补码运算：5 + (-3) = 2
    int a = 5;    // 补码: 00000101
    int b = -3;   // 补码: 11111101
    
    // 补码相加
    int sum = a + b;  // 结果: 00000010 = 2 ✓
    cout << "5 + (-3) = " << sum << endl;
    
    // 验证 -5 的补码
    int x = -5;
    unsigned int ux = (unsigned int)x;
    cout << "-5 的补码（无符号解释）: " << ux << endl;  // 251 = 11111011
    
    // 验证 0 的补码唯一性
    int zero = 0;
    unsigned int uzero = (unsigned int)zero;
    cout << "0 的补码: " << uzero << endl;  // 0
    
    return 0;
}
```

**易错点**
- 0 的补码只有一种表示（全0），没有 +0 和 -0 的区别
- 8位补码中 -128 没有对应的原码表示
- 正数的原码、反码、补码三者相同
- 负数的补码需要先取反再加1得到原码

---

## 二、进制转换 — 二进制、八进制、十进制、十六进制

### 2.1 进制基础

**概念**
- **十进制**：逢十进一，数码 0-9
- **二进制**：逢二进一，数码 0-1
- **八进制**：逢八进一，数码 0-7
- **十六进制**：逢十六进一，数码 0-9, A-F（a-f）

**各进制前缀表示**
```
十进制: 123
二进制: 0b1111011 或 0B1111011
八进制: 0173
十六进制: 0x7B
```

### 2.2 转换方法

**十进制 → 二进制：除2取余法**
```
例：十进制 13 → 二进制
13 ÷ 2 = 6 ... 1 (最低位)
 6 ÷ 2 = 3 ... 0
 3 ÷ 2 = 1 ... 1
 1 ÷ 2 = 0 ... 1 (最高位)
结果: 1101
```

**二进制 → 十进制：按权展开法**
```
例：二进制 1101 → 十进制
= 1×2³ + 1×2² + 0×2¹ + 1×2⁰
= 8 + 4 + 0 + 1
= 13
```

**二进制 ↔ 八进制（每3位一组）**
```
二进制: 110 101 → 八进制: 65
八进制: 65 → 二进制: 110 101
```

**二进制 ↔ 十六进制（每4位一组）**
```
二进制: 1101 0111 → 十六进制: D7
十六进制: D7 → 二进制: 1101 0111
```

### 2.3 代码模板

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// 十进制转二进制（字符串）
string decToBin(int n) {
    if (n == 0) return "0";
    string result = "";
    bool neg = false;
    if (n < 0) { neg = true; n = -n; }
    while (n > 0) {
        result += (n % 2) + '0';
        n /= 2;
    }
    if (neg) result += "-";
    reverse(result.begin(), result.end());
    return result;
}

// 二进制转十进制
int binToDec(string bin) {
    int result = 0;
    for (char c : bin) {
        result = result * 2 + (c - '0');
    }
    return result;
}

// 十进制转十六进制
string decToHex(int n) {
    if (n == 0) return "0";
    string result = "";
    while (n > 0) {
        int r = n % 16;
        if (r < 10) result += (r + '0');
        else result += (r - 10 + 'A');
        n /= 16;
    }
    reverse(result.begin(), result.end());
    return result;
}

int main() {
    cout << "13 的二进制: " << decToBin(13) << endl;      // 1101
    cout << "1101 的十进制: " << binToDec("1101") << endl; // 13
    cout << "255 的十六进制: " << decToHex(255) << endl;   // FF
    
    // 利用系统函数验证
    int x = 13;
    cout << "oct: " << oct << x << endl;    // 15
    cout << "dec: " << dec << x << endl;    // 13
    cout << "hex: " << hex << x << endl;    // d
    
    return 0;
}
```

**易错点**
- 十进制转二进制时要从下往上读余数
- 八进制每3位对应二进制，十六进制每4位对应
- 进制转换不涉及小数部分（GESP三级只要求整数）
- 注意0的特殊处理，避免死循环

---

## 三、位运算 — &、|、~、^、<<、>>

### 3.1 位运算符一览

| 运算符 | 名称 | 规则 | 示例 |
|:---:|:---:|:---:|:---:|
| `&` | 按位与 | 两位都为1结果为1 | `5 & 3 = 1` |
| `\|` | 按位或 | 至少一位为1结果为1 | `5 \| 3 = 7` |
| `~` | 按位取反 | 0变1，1变0 | `~0 = -1` |
| `^` | 按位异或 | 不同为1，相同为0 | `5 ^ 3 = 6` |
| `<<` | 左移 | 所有位左移，右边补0 | `1 << 3 = 8` |
| `>>` | 右移 | 所有位右移，左边补符号位 | `8 >> 2 = 2` |

**二进制示例**
```
5 的二进制: 00000101
3 的二进制: 00000011

5 & 3 = 00000001 = 1
5 | 3 = 00000111 = 7
5 ^ 3 = 00000110 = 6
```

### 3.2 位运算常见技巧

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 12, b = 10;
    
    // 1. 交换两个数（不需要临时变量）
    a = a ^ b;  // a = 12 ^ 10
    b = a ^ b;  // b = 12 ^ 10 ^ 10 = 12
    a = a ^ b;  // a = 12 ^ 10 ^ 12 = 10
    cout << "交换后: a=" << a << ", b=" << b << endl;
    
    // 2. 判断奇偶
    int n = 7;
    if (n & 1) cout << n << " 是奇数" << endl;
    else cout << n << " 是偶数" << endl;
    
    // 3. 求2的幂次
    int x = 4;  // 2^2
    if (x > 0 && (x & (x - 1)) == 0)
        cout << x << " 是2的幂" << endl;
    
    // 4. 左移右移
    int val = 5;
    cout << val << " << 2 = " << (val << 2) << endl;  // 20 (×4)
    cout << val << " >> 1 = " << (val >> 1) << endl;  // 2  (÷2)
    
    // 5. 取指定位
    int num = 0b11010110;
    int bit3 = (num >> 3) & 1;  // 取第3位
    cout << "第3位: " << bit3 << endl;
    
    // 6. 设置指定位为1
    num = num | (1 << 2);  // 将第2位置1
    
    // 7. 清除指定位
    num = num & ~(1 << 2); // 将第2位置0
    
    return 0;
}
```

**易错点**
- `~` 是按位取反，不是逻辑非！`~0 = -1`（补码全1）
- 左移 `<<` 相当于乘以2的幂次，右移 `>>` 相当于除以2的幂次
- 异或 `^` 的性质：`a ^ a = 0`，`a ^ 0 = a`
- 位运算优先级低于比较运算符，加括号更安全

---

## 四、算法的概念与描述 — 自然语言、流程图、伪代码

### 4.1 算法的基本概念

**概念**
- **算法**：解决特定问题的一系列明确指令的集合
- **算法的五大特性**：有穷性、确定性、可行性、输入、输出

**算法的评价标准**
- **时间复杂度**：算法执行所需时间的增长趋势
- **空间复杂度**：算法执行所需存储空间的增长趋势

### 4.2 三种描述方式

**① 自然语言描述**
```
【求两个数的最大值】
步骤1：输入两个整数 a 和 b
步骤2：如果 a 大于等于 b，则最大值为 a
步骤3：否则，最大值为 b
步骤4：输出最大值
```

**② 流程图描述**
```
┌─────────┐
│  开始    │
└────┬────┘
     ▼
┌─────────┐
│ 输入a,b │
└────┬────┘
     ▼
┌─────────────┐    是
│   a >= b?   ├───────┐
└─────┬───────┘       │
      │ 否            ▼
      ▼         ┌─────────┐
┌─────────┐     │ max = a  │
│ max = b │     └────┬────┘
└────┬────┘          │
     ▼               │
┌─────────────┐      │
│ 输出 max    │◄─────┘
└─────┬───────┘
      ▼
┌─────────┐
│  结束    │
└─────────┘
```

**③ 伪代码描述**
```
BEGIN
    INPUT a, b
    IF a >= b THEN
        max ← a
    ELSE
        max ← b
    END IF
    OUTPUT max
END
```

### 4.3 三种描述方式对比

| 方式 | 优点 | 缺点 |
|:---:|:---:|:---:|
| 自然语言 | 易懂，人人会用 | 冗长，易有歧义 |
| 流程图 | 直观，逻辑清晰 | 画图耗时，复杂算法难表达 |
| 伪代码 | 简洁，接近程序 | 无统一标准 |

**易错点**
- 算法必须有穷性（不能无限循环）
- 自然语言描述要避免歧义
- 流程图的判断框必须有两个出口
- 伪代码不是某种特定编程语言

---

## 五、算法 — 枚举法与模拟法

### 5.1 枚举法（穷举法）

**概念**
- 列举所有可能的情况，逐一验证是否满足条件
- 适用于解空间有限且不太大的问题
- 关键：确定枚举范围和判断条件

**代码模板**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    // 【例1】找出1-100中所有素数
    cout << "1-100的素数:" << endl;
    for (int i = 2; i <= 100; i++) {
        bool isPrime = true;
        for (int j = 2; j <= sqrt(i); j++) {
            if (i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) cout << i << " ";
    }
    cout << endl;
    
    // 【例2】百钱买百鸡（公鸡5元，母鸡3元，小鸡1元3只）
    // 枚举所有组合
    for (int x = 0; x <= 20; x++) {      // 公鸡数量
        for (int y = 0; y <= 33; y++) {  // 母鸡数量
            for (int z = 0; z <= 100; z += 3) { // 小鸡数量（3的倍数）
                if (x + y + z == 100 && 
                    5*x + 3*y + z/3 == 100) {
                    cout << "公鸡:" << x << " 母鸡:" << y 
                         << " 小鸡:" << z << endl;
                }
            }
        }
    }
    
    return 0;
}
```

**易错点**
- 枚举范围要正确，不能遗漏也不能多余
- 内层循环的终止条件要根据实际情况调整
- 枚举法时间复杂度可能很高，注意优化（如剪枝）

### 5.2 模拟法

**概念**
- 按照问题描述的过程，逐步模拟执行
- 适用于过程明确、规则清晰的问题
- 关键：准确描述每一步的状态变化

**代码模板**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 【例1】约瑟夫问题（n个人围成一圈，每数到m的人出列）
    int n = 7, m = 3;  // 7个人，数到3出列
    vector<int> people;
    for (int i = 1; i <= n; i++) people.push_back(i);
    
    int pos = 0;  // 当前位置
    cout << "出列顺序: ";
    while (!people.empty()) {
        pos = (pos + m - 1) % people.size();  // 数到m的人
        cout << people[pos] << " ";
        people.erase(people.begin() + pos);   // 出列
    }
    cout << endl;
    
    // 【例2】模拟骰子游戏
    // 掷骰子模拟
    int dice[6] = {0};  // 统计每个点数出现次数
    int throws = 1000;
    for (int i = 0; i < throws; i++) {
        int result = (rand() % 6) + 1;  // 1-6
        dice[result - 1]++;
    }
    cout << "掷骰子1000次统计:" << endl;
    for (int i = 0; i < 6; i++) {
        cout << "点数" << i+1 << ": " << dice[i] << "次" << endl;
    }
    
    return 0;
}
```

**易错点**
- 模拟时要注意状态更新的顺序
- 循环终止条件要准确（如数组是否为空）
- 边界情况要特别注意（如第一轮、最后一轮）

---

## 六、C++ 一维数组基本应用

### 6.1 数组基础

**概念**
- **数组**：存储相同类型数据的连续内存空间
- **下标从0开始**，长度为n的数组下标范围 0 到 n-1
- 数组名代表数组首地址（常量指针）

### 6.2 数组的声明与初始化

```cpp
#include <iostream>
using namespace std;

int main() {
    // 1. 声明与初始化
    int a[5] = {1, 2, 3, 4, 5};       // 完全初始化
    int b[5] = {1, 2};                 // 部分初始化，其余为0
    int c[5] = {0};                    // 全部初始化为0
    int d[] = {10, 20, 30};            // 自动确定大小为3
    
    // 2. 访问与修改
    cout << a[0] << endl;  // 访问第一个元素: 1
    a[2] = 100;            // 修改第三个元素
    
    // 3. 遍历数组
    for (int i = 0; i < 5; i++) {
        cout << a[i] << " ";
    }
    cout << endl;
    
    // 4. 数组作为函数参数
    // 注意：传入的是地址，函数内可以修改原数组
    
    return 0;
}
```

### 6.3 数组常见操作

```cpp
#include <iostream>
using namespace std;

// 打印数组
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// 求最大值及其下标
int findMax(int arr[], int n) {
    int maxIdx = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > arr[maxIdx]) {
            maxIdx = i;
        }
    }
    return maxIdx;
}

// 求平均值
double average(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return (double)sum / n;
}

// 数组逆序
void reverseArray(int arr[], int n) {
    for (int i = 0; i < n / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = temp;
    }
}

// 冒泡排序
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;
    
    cout << "原始数组: ";
    printArray(arr, n);
    
    cout << "最大值下标: " << findMax(arr, n) << endl;
    cout << "平均值: " << average(arr, n) << endl;
    
    reverseArray(arr, n);
    cout << "逆序后: ";
    printArray(arr, n);
    
    bubbleSort(arr, n);
    cout << "排序后: ";
    printArray(arr, n);
    
    return 0;
}
```

**易错点**
- 数组下标越界是最常见的错误！`a[n]` 是无效的（下标从0到n-1）
- 数组传参时传的是地址，函数内修改会影响原数组
- 数组大小必须是常量表达式
- 数组名是常量，不能赋值（不能 `arr = arr2`）
- 未初始化的数组元素值是随机的（垃圾值）

---

## 七、字符串及其函数

### 7.1 C风格字符串

**概念**
- C风格字符串是以 `\0`（空字符）结尾的字符数组
- 字符串长度不包括 `\0`
- 使用字符数组存储，末尾自动添加 `\0`

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    // 1. 字符串声明方式
    char s1[] = "Hello";           // 自动添加\0，长度为6
    char s2[] = {'H','e','l','l','o','\0'};  // 手动添加\0
    char s3[10] = "Hi";           // 部分初始化，其余为0
    
    // 2. 字符串长度
    cout << "s1长度: " << strlen(s1) << endl;  // 5（不含\0）
    cout << "s1数组大小: " << sizeof(s1) << endl;  // 6（含\0）
    
    // 3. 字符串输入输出
    char name[50];
    cout << "请输入姓名: ";
    cin >> name;  // 遇到空格停止
    cout << "你好, " << name << endl;
    
    // 4. 逐字符访问
    for (int i = 0; s1[i] != '\0'; i++) {
        cout << s1[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 7.2 字符串函数

**常用函数一览**

| 函数 | 功能 | 头文件 |
|:---:|:---:|:---:|
| `strlen(s)` | 返回字符串长度（不含\0） | `\<cstring\>` |
| `strcpy(dest, src)` | 复制字符串 | `\<cstring\>` |
| `strcat(dest, src)` | 连接字符串 | `\<cstring\>` |
| `strcmp(s1, s2)` | 比较字符串（返回0相等，>0前大，<0后大） | `\<cstring\>` |

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char s1[100] = "Hello";
    char s2[] = "World";
    
    // 1. strlen - 求长度
    cout << "s1长度: " << strlen(s1) << endl;   // 5
    cout << "s2长度: " << strlen(s2) << endl;   // 5
    
    // 2. strcpy - 复制
    char dest[50];
    strcpy(dest, s1);
    cout << "复制后: " << dest << endl;  // Hello
    
    // 3. strcat - 连接
    strcat(dest, s2);
    cout << "连接后: " << dest << endl;  // HelloWorld
    
    // 4. strcmp - 比较
    char a[] = "apple";
    char b[] = "banana";
    int cmp = strcmp(a, b);
    if (cmp == 0) cout << "相等" << endl;
    else if (cmp < 0) cout << a << " < " << b << endl;
    else cout << a << " > " << b << endl;
    
    // 5. 字符串查找
    char str[] = "Hello World";
    char* pos = strchr(str, 'W');  // 查找字符
    if (pos != NULL) {
        cout << "找到'W'的位置: " << (pos - str) << endl;  // 6
    }
    
    // 6. 子串查找
    char* sub = strstr(str, "World");  // 查找子串
    if (sub != NULL) {
        cout << "找到子串'World'" << endl;
    }
    
    return 0;
}
```

### 7.3 string类（C++风格）

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // 1. string声明与初始化
    string s1 = "Hello";
    string s2("World");
    string s3(5, 'A');  // "AAAAA"
    
    // 2. 长度
    cout << "s1长度: " << s1.length() << endl;  // 5
    cout << "s1长度: " << s1.size() << endl;    // 5（等价）
    
    // 3. 拼接
    string s4 = s1 + " " + s2;
    cout << s4 << endl;  // Hello World
    
    // 4. 比较
    if (s1 == s2) cout << "相等" << endl;
    if (s1 < s2) cout << s1 << " < " << s2 << endl;
    
    // 5. 访问字符
    cout << s1[0] << endl;       // H
    cout << s1.at(1) << endl;    // e（带边界检查）
    
    // 6. 字符串查找
    string str = "Hello World";
    size_t pos = str.find("World");
    if (pos != string::npos) {
        cout << "找到位置: " << pos << endl;  // 6
    }
    
    // 7. 子串
    string sub = str.substr(6, 5);  // 从位置6开始取5个字符
    cout << "子串: " << sub << endl;  // World
    
    // 8. 插入和删除
    string s5 = "Hello";
    s5.insert(2, "!!");  // He!!llo
    cout << "插入后: " << s5 << endl;
    s5.erase(2, 2);      // Hello
    cout << "删除后: " << s5 << endl;
    
    // 9. 字符串转数字
    string numStr = "12345";
    int num = stoi(numStr);
    cout << "转换后: " << num << endl;
    
    // 10. 数字转字符串
    string numStr2 = to_string(67890);
    cout << "转换后: " << numStr2 << endl;
    
    return 0;
}
```

### 7.4 字符处理函数

```cpp
#include <iostream>
#include <cctype>
using namespace std;

int main() {
    char ch = 'A';
    
    // 判断函数
    cout << "是否字母: " << isalpha(ch) << endl;   // 非0
    cout << "是否数字: " << isdigit(ch) << endl;   // 0
    cout << "是否大写: " << isupper(ch) << endl;   // 非0
    cout << "是否小写: " << islower(ch) << endl;   // 0
    
    // 转换函数
    cout << "转小写: " << (char)tolower(ch) << endl;  // a
    cout << "转大写: " << (char)toupper('b') << endl;  // B
    
    // ASCII码
    cout << "'A'的ASCII: " << (int)'A' << endl;   // 65
    cout << "'a'的ASCII: " << (int)'a' << endl;   // 97
    cout << "'0'的ASCII: " << (int)'0' << endl;   // 48
    
    return 0;
}
```

**易错点**
- C风格字符串必须以 `\0` 结尾，否则会越界
- `strlen` 返回长度不含 `\0`，`sizeof` 返回数组总大小（含 `\0`）
- `strcpy` 和 `strcat` 要确保目标数组足够大
- `strcmp` 是按字典序比较，不是比较长度
- `string` 类对象可以直接用 `+` 拼接，`char` 数组不行
- `string::npos` 表示未找到，不是 -1

---

## 附录：常用头文件速查

| 头文件 | 用途 |
|:---:|:---:|
| `\<iostream\>` | 输入输出流（cin, cout） |
| `\<cstring\>` | C风格字符串函数（strlen, strcpy等） |
| `\<string\>` | C++ string类 |
| `\<cmath\>` | 数学函数（sqrt, abs等） |
| `\<algorithm\>` | 算法（swap, sort等） |
| `<cctype>` | 字符处理（isalpha, isdigit等） |
| `\<cstdlib\>` | 通用工具（rand, srand等） |

---

## 附录：三级考点速查表

| 知识块 | 考点 | 难度 |
|:---:|:---:|:---:|
| 数据编码 | 原码、反码、补码概念与转换 | ★★☆ |
| 进制转换 | 二进制、八进制、十进制、十六进制互转 | ★★☆ |
| 位运算 | 与、或、非、异或、左移、右移 | ★★★ |
| 算法描述 | 自然语言、流程图、伪代码 | ★☆☆ |
| 枚举法与模拟法 | 穷举所有可能、模拟过程 | ★★☆ |
| 一维数组 | 声明、初始化、遍历、基本操作 | ★★☆ |
| 字符串 | C风格字符串、string类、常用函数 | ★★★ |

---

> 本文档根据 GESP Level 3 考试大纲编写，仅包含三级考点内容
> 
> 更新时间：2026年6月19日
