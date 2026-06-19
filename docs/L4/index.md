# GESP 四级知识点整理

> 本文档严格依据 GESP Level 4 考试大纲编写，涵盖全部核心知识点。

---

## 知识块一：函数的定义与调用、形参与实参、作用域

### 1.1 函数的定义

C++ 中函数是一段可重复调用的代码块，用于完成特定任务。

**函数定义的语法格式：**

```cpp
返回类型 函数名(参数列表) {
    // 函数体
    return 返回值; // 若返回类型为 void 则可省略
}
```

**示例：**

```cpp
// 无返回值函数
void printHello() {
    cout << "Hello, GESP!" << endl;
}

// 有返回值函数
int add(int a, int b) {
    return a + b;
}

// 带默认参数的函数
int power(int base, int exp = 2) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}
```

### 1.2 函数的调用

函数定义后需要通过**函数调用**来执行。

```cpp
int main() {
    printHello();           // 调用无参函数
    int sum = add(3, 5);    // 调用有参函数，返回值赋给 sum
    cout << sum << endl;    // 输出 8

    cout << power(2) << endl;     // 使用默认参数，输出 4
    cout << power(2, 3) << endl;  // 显式传参，输出 8

    return 0;
}
```

### 1.3 形参与实参

| 概念 | 说明 |
|------|------|
| **形参（形式参数）** | 函数定义时参数列表中的变量名，是占位符 |
| **实参（实际参数）** | 函数调用时传递给函数的具体值或变量 |

**注意事项：**
- 形参和实参的**个数**应匹配
- 形参和实参的**类型**应对应（可自动类型转换时除外）
- 函数调用时，实参的值**复制**给形参（值传递情况下）
- 形参在函数体内作为局部变量使用

### 1.4 作用域

**局部变量（Local Variable）：**
- 在函数内部或代码块 `{}` 内声明的变量
- 仅在声明它的代码块内有效
- 函数调用时创建，函数结束时销毁

```cpp
void func() {
    int x = 10;       // 局部变量
    if (x > 5) {
        int y = 20;   // 块作用域局部变量
        cout << x + y << endl;  // 合法
    }
    // cout << y << endl;  // 错误：y 不可见
}
```

**全局变量（Global Variable）：**
- 在所有函数外部声明的变量
- 从声明处到文件末尾所有函数均可访问
- 程序运行期间始终存在

```cpp
int g_count = 0;  // 全局变量

void increment() {
    g_count++;     // 函数内可直接修改
}

int main() {
    increment();
    cout << g_count << endl;  // 输出 1
    return 0;
}
```

**作用域规则：**
- 局部变量与全局变量同名时，**局部变量优先**（局部遮蔽全局）
- 建议避免全局变量的大量使用，以增强程序可维护性

---

## 知识块二：C++ 指针类型的概念及基本应用

### 2.1 内存地址的概念

每个变量在内存中都占据一定空间，拥有唯一的**内存地址**。可以通过 `&` 运算符获取变量的地址。

```cpp
int x = 42;
cout << "x 的值: " << x << endl;
cout << "x 的地址: " << &x << endl;  // 输出 x 在内存中的地址
```

### 2.2 指针变量的定义与使用

**指针（Pointer）** 是一种存储内存地址的变量。

```cpp
// 定义指针：类型 *指针名;
int x = 42;
int *p = &x;    // p 指向 x，存储的是 x 的地址

cout << *p << endl;      // 解引用，输出 42（p 所指向的值）
cout << p << endl;       // 输出 x 的地址
*p = 100;                // 通过指针修改 x 的值
cout << x << endl;       // 输出 100
```

**指针基本操作：**

| 运算符 | 名称 | 作用 |
|--------|------|------|
| `&` | 取地址运算符 | 获取变量的内存地址 |
| `*` | 解引用运算符 | 访问指针所指向的内存中的值 |

### 2.3 指针的初始化

```cpp
int a = 10;
int *p1 = &a;        // 正确：指向变量 a
int *p2 = nullptr;   // 推荐：空指针，表示不指向任何对象
// int *p3;          // 危险：野指针，未初始化的指针不要使用
```

### 2.4 指针与数组

数组名在大多数情况下会退化为指向数组首元素的指针：

```cpp
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;         // p 指向 arr[0]

cout << *p << endl;       // 输出 10
cout << *(p + 1) << endl; // 输出 20（p+1 指向下一个元素）
cout << p[2] << endl;     // 输出 30（指针支持下标运算）
```

### 2.5 空指针与野指针

- **空指针（nullptr）：** 不指向任何有效内存地址，推荐用 `nullptr` 初始化
- **野指针：** 未初始化或指向已释放内存的指针，使用野指针会导致未定义行为
- **使用指针前应判空：** `if (p != nullptr) { ... }`

---

## 知识块三：函数参数传递——值传递、引用传递与指针传递

### 3.1 值传递（Pass by Value）

函数调用时，实参的**副本**传递给形参，函数内对形参的修改不影响实参。

```cpp
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    // 函数结束后 a, b 被销毁
}

int main() {
    int x = 3, y = 5;
    swapByValue(x, y);
    cout << x << " " << y << endl;  // 输出 3 5，未交换！
    return 0;
}
```

### 3.2 引用传递（Pass by Reference）

使用引用作为形参，形参是实参的**别名**，函数内对形参的修改直接作用于实参。

```cpp
void swapByReference(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 5;
    swapByReference(x, y);
    cout << x << " " << y << endl;  // 输出 5 3，成功交换！
    return 0;
}
```

### 3.3 指针传递（Pass by Pointer）

通过传递变量的地址，在函数内通过指针间接修改实参。

```cpp
void swapByPointer(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 3, y = 5;
    swapByPointer(&x, &y);
    cout << x << " " << y << endl;  // 输出 5 3，成功交换！
    return 0;
}
```

### 3.4 三种传递方式对比

| 特性 | 值传递 | 引用传递 | 指针传递 |
|------|--------|----------|----------|
| 是否修改实参 | 否 | 是 | 是 |
| 是否复制数据 | 是 | 否 | 仅复制地址 |
| 效率 | 较低（大对象） | 高 | 高 |
| 语法复杂度 | 简单 | 简单 | 较复杂 |
| 可否传 nullptr | N/A | 不可 | 可以 |

---

## 知识块四：C++ 结构体

### 4.1 结构体的定义

**结构体（struct）** 用于将不同类型的数据组合在一起，形成一个自定义的数据类型。

```cpp
struct Student {
    string name;
    int age;
    double score;
};
```

### 4.2 结构体变量的声明与初始化

```cpp
// 方式一：先声明后赋值
Student s1;
s1.name = "张三";
s1.age = 15;
s1.score = 95.5;

// 方式二：声明时初始化
Student s2 = {"李四", 16, 88.0};

// 方式三：C++11 列表初始化
Student s3{"王五", 14, 92.3};
```

### 4.3 结构体成员的访问

使用**成员运算符 `.`** 访问结构体的成员变量：

```cpp
cout << s1.name << endl;     // 输出 张三
cout << s2.score << endl;    // 输出 88
```

### 4.4 结构体数组

```cpp
Student class1[3] = {
    {"张三", 15, 95.5},
    {"李四", 16, 88.0},
    {"王五", 14, 92.3}
};

// 遍历结构体数组
for (int i = 0; i < 3; i++) {
    cout << class1[i].name << " " << class1[i].score << endl;
}
```

### 4.5 结构体与函数

结构体可以作为函数参数传递：

```cpp
// 值传递
void printStudent(Student s) {
    cout << s.name << " " << s.score << endl;
}

// 引用传递（推荐，避免拷贝）
void updateScore(Student &s, double newScore) {
    s.score = newScore;
}

int main() {
    Student s1 = {"张三", 15, 95.5};
    printStudent(s1);
    updateScore(s1, 100.0);
    cout << s1.score << endl;  // 输出 100
    return 0;
}
```

---

## 知识块五：C++ 二维数组与多维数组基本应用

### 5.1 二维数组的定义

二维数组可以看作"数组的数组"，类似于表格（行和列）的结构。

```cpp
// 语法格式：类型 数组名[行数][列数];
int arr[3][4];  // 3 行 4 列的二维数组，共 12 个元素
```

### 5.2 二维数组的初始化

```cpp
// 完全初始化
int arr[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

// 部分初始化（未赋值的元素默认为 0）
int arr2[2][3] = {{1}, {4}};

// 按顺序初始化
int arr3[2][3] = {1, 2, 3, 4, 5, 6};

// 省略第一维大小（编译器自动推断行数）
int arr4[][3] = {{1, 2, 3}, {4, 5, 6}};
```

### 5.3 二维数组的访问与遍历

使用**双重循环**按行按列访问二维数组：

```cpp
int arr[3][4] = {
    {1,  2,  3,  4},
    {5,  6,  7,  8},
    {9, 10, 11, 12}
};

// 遍历输出
for (int i = 0; i < 3; i++) {       // 遍历行
    for (int j = 0; j < 4; j++) {   // 遍历列
        cout << arr[i][j] << "\t";
    }
    cout << endl;
}
```

**内存存储方式：** 二维数组在内存中按**行优先**顺序连续存储，即先存第一行的所有元素，再存第二行，以此类推。

### 5.4 二维数组的常见应用

**矩阵运算：**

```cpp
// 矩阵转置（3x4 转为 4x3）
int a[3][4], b[4][3];
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        b[j][i] = a[i][j];
```

**二维数组模拟坐标系/棋盘：**

```cpp
int grid[8][8] = {0};  // 8x8 棋盘初始化为 0
grid[3][4] = 1;         // 在 (3,4) 位置放置棋子
```

### 5.5 多维数组

三维及以上数组的定义与使用类似二维数组：

```cpp
int arr3d[2][3][4];  // 三维数组：2 个 3x4 的二维数组

// 三层循环遍历
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        for (int k = 0; k < 4; k++)
            arr3d[i][j][k] = 0;
```

---

## 知识块六：算法——递推

### 6.1 递推算法的概念

**递推（Recurrence / Iteration）** 是一种通过已知的初始条件，按照一定规律逐步推导出后续结果的算法思想。每一步的计算都依赖于前一步或前几步的结果。

### 6.2 递推的基本要素

1. **初始条件（Base Case）：** 递推开始时已知的值
2. **递推关系（Recurrence Relation）：** 由已知项推导未知项的公式或规律
3. **终止条件：** 确定何时停止递推

### 6.3 经典递推问题

**斐波那契数列：**

```
F(1) = 1, F(2) = 1（初始条件）
F(n) = F(n-1) + F(n-2)（递推关系）
```

```cpp
int fib(int n) {
    if (n == 1 || n == 2) return 1;
    int a = 1, b = 1, c;
    for (int i = 3; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

**爬楼梯问题：**

```
到达第 n 阶的方案数 = 到达第 n-1 阶的方案数 + 到达第 n-2 阶的方案数
dp[1] = 1, dp[2] = 2
dp[n] = dp[n-1] + dp[n-2]
```

**兔群繁殖问题：**

```
第 1 个月：1 对
第 2 个月：1 对
第 n 个月：f(n) = f(n-1) + f(n-2)（每月一对新兔，成熟需 1 个月）
```

### 6.4 递推的实现要点

- **注意边界条件：** 确保递推从正确的初始值开始
- **变量滚动技巧：** 当只需前几项时，可用滚动变量节省空间（如斐波那契中的 a, b, c）
- **数据范围：** 递推结果可能快速增长，注意选择合适的数据类型（如 `long long`）
- **递推 vs 递归：** 递推通常用循环实现，效率高于递归（避免重复计算和栈溢出）

---

## 知识块七：排序概念与稳定性、排序算法（冒泡/插入/选择）

### 7.1 排序的基本概念

**排序（Sorting）** 是将一组数据按照特定顺序（升序或降序）重新排列的过程。

**排序的关键指标：**
- **时间复杂度：** 排序操作的时间消耗
- **空间复杂度：** 排序过程中额外使用的内存空间
- **稳定性：** 排序后相同元素的相对位置是否改变

### 7.2 排序的稳定性

**稳定排序：** 如果两个相同值的元素在排序前的相对顺序与排序后相同，则称该排序算法是**稳定**的。

**不稳定排序：** 相同值的元素在排序后相对位置可能发生改变。

| 排序算法 | 是否稳定 |
|----------|----------|
| 冒泡排序 | ✅ 稳定 |
| 插入排序 | ✅ 稳定 |
| 选择排序 | ❌ 不稳定 |

**稳定性的意义：** 当排序对象有多个关键字时，稳定排序可以保留次要关键字的原有顺序。例如：先按成绩排序，再按年龄排序时，若年龄排序是稳定的，成绩相同的同学仍按原顺序排列。

### 7.3 冒泡排序（Bubble Sort）

**思想：** 相邻元素两两比较，将较大的元素向后"冒泡"，每一轮将当前未排序部分的最大元素移到正确位置。

**算法步骤：**
1. 从第一个元素开始，依次比较相邻两个元素
2. 如果前者 > 后者，交换两者位置
3. 一轮比较后，最大元素"冒泡"到末尾
4. 重复以上过程，直到没有元素需要交换

```cpp
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // 优化：无交换说明已有序
    }
}
```

- **时间复杂度：** 最优 O(n)，最差/平均 O(n²)
- **空间复杂度：** O(1)
- **稳定性：** ✅ 稳定

### 7.4 插入排序（Insertion Sort）

**思想：** 将待排序元素逐个插入到已排序序列的正确位置，类似整理扑克牌。

**算法步骤：**
1. 从第二个元素开始，将当前元素作为"待插入"元素
2. 在已排序部分从后向前扫描，找到正确位置
3. 将待插入元素插入到正确位置，后续元素依次后移
4. 重复直到所有元素处理完毕

```cpp
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
```

- **时间复杂度：** 最优 O(n)，最差/平均 O(n²)
- **空间复杂度：** O(1)
- **稳定性：** ✅ 稳定

### 7.5 选择排序（Selection Sort）

**思想：** 每一轮从未排序部分选出最小（或最大）的元素，放到已排序部分的末尾。

**算法步骤：**
1. 从第一个位置开始，遍历剩余元素找最小值
2. 将最小值与当前位置元素交换
3. 从未排序部分的下一个位置重复上述操作
4. 直到所有元素处理完毕

```cpp
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
```

- **时间复杂度：** 最优/最差/平均均 O(n²)
- **空间复杂度：** O(1)
- **稳定性：** ❌ 不稳定

---

## 知识块八：简单算法复杂度估算

### 8.1 时间复杂度的概念

**时间复杂度** 是衡量算法执行时间随输入规模增长变化趋势的指标。通常用 **大O表示法** 表示。

- 只保留最高阶项
- 忽略常数系数
- 表示的是增长趋势，而非精确执行时间

### 8.2 多项式复杂度

| 复杂度 | 名称 | 典型算法 | n=1000 时操作量级 |
|--------|------|----------|-------------------|
| O(1) | 常数级 | 数组按索引访问 | 1 |
| O(log n) | 对数级 | 二分查找 | ~10 |
| O(n) | 线性级 | 遍历数组 | ~1,000 |
| O(n log n) | 线性对数级 | 归并排序 | ~10,000 |
| O(n²) | 平方级 | 冒泡排序、选择排序 | ~1,000,000 |
| O(n³) | 立方级 | 朴素矩阵乘法 | ~1,000,000,000 |

**判断方法：** 观察循环嵌套层数和循环次数的关系。
- 单层循环遍历 n 次 → O(n)
- 两层嵌套循环各 n 次 → O(n²)
- 三层嵌套循环各 n 次 → O(n³)

**示例分析：**

```cpp
// O(n)：单层循环
for (int i = 0; i < n; i++) {
    cout << arr[i] << endl;
}

// O(n²)：两层嵌套循环
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        cout << i * j << endl;

// O(n²)：虽然 j 的起始值变化，但总操作数仍为 n(n-1)/2，即 O(n²)
for (int i = 0; i < n; i++)
    for (int j = i; j < n; j++)
        cout << i + j << endl;
```

### 8.3 指数复杂度

指数复杂度 O(2ⁿ) 或 O(kⁿ) 表示算法执行时间随输入规模呈**指数级增长**，在 n 稍大时计算量就极其巨大。

**典型例子：** 暴力枚举所有子集

```cpp
// 生成 n 个元素的所有子集：O(2^n)
void enumerateSubsets(int arr[], int n) {
    for (int mask = 0; mask < (1 << n); mask++) {
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                cout << arr[i] << " ";
            }
        }
        cout << endl;
    }
}
```

**常见指数复杂度：**
- O(2ⁿ)：n 个元素的所有子集、暴力枚举排列
- O(n!)：全排列问题

**复杂度对比：**

| n | O(n) | O(n²) | O(2ⁿ) | O(n!) |
|---|------|-------|--------|-------|
| 5 | 5 | 25 | 32 | 120 |
| 10 | 10 | 100 | 1,024 | 3,628,800 |
| 20 | 20 | 400 | 约100万 | 约2.4×10¹⁸ |

当 n ≥ 30 时，2ⁿ 已超过 10 亿，指数复杂度算法在实际中基本不可用。

---

## 知识块九：文件重定向与文件读写、异常处理

### 9.1 文件重定向

**文件重定向** 可以将程序的输入/输出从键盘/屏幕改为文件，无需修改程序代码即可改变数据来源和去向。

**命令行重定向（在程序外操作）：**

```bash
# 输入重定向：从文件读取输入
./program < input.txt

# 输出重定向：将输出写入文件
./program > output.txt

# 同时重定向输入和输出
./program < input.txt > output.txt
```

**C++ 代码中的重定向：**

```cpp
#include <fstream>

int main() {
    // 重定向标准输入
    freopen("input.txt", "r", stdin);
    // 重定向标准输出
    freopen("output.txt", "w", stdout);

    int a, b;
    cin >> a >> b;        // 从 input.txt 读取
    cout << a + b << endl; // 输出到 output.txt

    return 0;
}
```

### 9.2 C++ 文件读写

**C++ 使用 `fstream` 库进行文件操作。**

```cpp
#include <fstream>
#include <iostream>
#include <string>
using namespace std;
```

**写入文件：**

```cpp
ofstream outFile("data.txt");  // 创建/打开文件用于写入
if (outFile.is_open()) {
    outFile << "Hello, File!" << endl;
    outFile << 100 << " " << 3.14 << endl;
    outFile.close();  // 关闭文件
} else {
    cout << "无法打开文件！" << endl;
}
```

**读取文件：**

```cpp
ifstream inFile("data.txt");  // 打开文件用于读取
if (inFile.is_open()) {
    string line;
    int num;
    double val;

    // 逐行读取
    getline(inFile, line);
    cout << line << endl;

    // 按格式读取
    inFile >> num >> val;
    cout << num << " " << val << endl;

    inFile.close();
} else {
    cout << "无法打开文件！" << endl;
}
```

**追加写入模式：**

```cpp
ofstream outFile("log.txt", ios::app);  // 追加模式
outFile << "新的一条记录" << endl;
outFile.close();
```

**判断文件是否到达末尾：**

```cpp
ifstream inFile("data.txt");
int x;
while (inFile >> x) {  // 当读取失败（到达末尾）时循环结束
    cout << x << " ";
}
inFile.close();
```

### 9.3 异常处理

**异常处理（Exception Handling）** 用于处理程序运行时可能出现的错误，使程序能够优雅地应对异常情况，而不是直接崩溃。

**C++ 使用 `try-catch` 机制：**

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        throw runtime_error("除数不能为零！");
    }
    return a / b;
}

int main() {
    try {
        double result = divide(10, 0);
        cout << "结果：" << result << endl;
    } catch (const runtime_error &e) {
        cout << "错误：" << e.what() << endl;
    }
    return 0;
}
```

**异常处理的基本结构：**

```
try {
    // 可能抛出异常的代码
    throw 表达式;  // 抛出异常
} catch (异常类型 变量名) {
    // 处理异常的代码
}
```

**常见标准异常类：**

| 异常类 | 说明 |
|--------|------|
| `runtime_error` | 运行时错误 |
| `logic_error` | 逻辑错误 |
| `invalid_argument` | 无效参数 |
| `out_of_range` | 越界访问 |

**异常处理的要点：**
- `throw` 用于抛出异常对象
- `catch` 用于捕获并处理异常
- 可以使用多个 `catch` 块处理不同类型的异常
- 异常应只在真正的异常情况下使用，不应替代正常的程序逻辑控制
- 使用异常处理时需包含 `<stdexcept>` 头文件

**综合示例——文件读取与异常处理结合：**

```cpp
#include <fstream>
#include <stdexcept>
#include <iostream>
using namespace std;

int main() {
    try {
        ifstream inFile("score.txt");
        if (!inFile.is_open()) {
            throw runtime_error("无法打开文件 score.txt");
        }

        double score;
        inFile >> score;
        if (score < 0 || score > 100) {
            throw invalid_argument("成绩超出合法范围！");
        }

        cout << "读取成绩：" << score << endl;
        inFile.close();
    } catch (const exception &e) {
        cout << "发生异常：" << e.what() << endl;
    }
    return 0;
}
```

---

## 总结

| 知识块 | 核心内容 |
|--------|----------|
| 一 | 函数定义与调用、形参与实参、局部/全局作用域 |
| 二 | 指针概念、地址运算符 `&`、解引用 `*`、空指针 |
| 三 | 值传递/引用传递/指针传递的区别与应用 |
| 四 | 结构体定义、初始化、成员访问、结构体数组 |
| 五 | 二维数组定义与初始化、双重循环遍历、矩阵运算 |
| 六 | 递推算法思想、斐波那契数列、递推关系 |
| 七 | 排序稳定性、冒泡排序、插入排序、选择排序 |
| 八 | 大O表示法、多项式复杂度、指数复杂度 |
| 九 | 文件重定向、fstream 文件读写、try-catch 异常处理 |

> **注意事项：** 本文档内容严格依据 GESP Level 4 大纲编写，不包含 Level 5 及以上的内容（如链表、快速排序等）。
