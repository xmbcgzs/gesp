# GESP C++ 四级代码模板（修正版）

> 本模板严格对应 GESP 四级大纲：指针、二维数组、结构体、函数（值传递/引用传递）、递推算法、排序算法（冒泡/插入/选择）、文件操作、异常处理。
> 适用于备考复习与快速查阅。

---

## 01. 指针定义与使用

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int* p = &a;          // 指针p存储变量a的地址

    cout << "a的值: " << a << endl;
    cout << "a的地址: " << &a << endl;
    cout << "p存储的地址: " << p << endl;
    cout << "p指向的值: " << *p << endl;  // 解引用

    *p = 20;              // 通过指针修改a的值
    cout << "修改后a的值: " << a << endl;

    // 指针与数组
    int arr[] = {1, 2, 3, 4, 5};
    int* q = arr;         // 数组名即首元素地址
    for (int i = 0; i < 5; i++) {
        cout << *(q + i) << " ";  // 指针偏移访问
    }
    cout << endl;

    // 空指针
    int* np = nullptr;    // C++11推荐用nullptr
    if (np == nullptr) {
        cout << "空指针" << endl;
    }

    return 0;
}
```

**要点**：
- `&`取地址运算符获取变量地址，`*`解引用运算符访问指针指向的值
- 指针变量存储的是内存地址，而非变量本身
- 数组名可视为指向首元素的常量指针
- 用`nullptr`表示空指针，避免野指针

---

## 02. 引用传递

```cpp
#include <iostream>
using namespace std;

// 引用作为函数参数
void swapRef(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// 返回引用
int& getMaxRef(int& a, int& b) {
    return (a > b) ? a : b;
}

int main() {
    int x = 100, y = 200;

    cout << "交换前: x=" << x << ", y=" << y << endl;
    swapRef(x, y);
    cout << "交换后: x=" << x << ", y=" << y << endl;

    // 引用别名
    int val = 42;
    int& ref = val;       // ref是val的别名
    ref = 99;
    cout << "val = " << val << endl;  // 输出99

    // 返回引用可用于赋值
    getMaxRef(x, y) = 500;
    cout << "x=" << x << ", y=" << y << endl;

    return 0;
}
```

**要点**：
- 引用（`&`）是变量的别名，必须在声明时初始化
- 引用传递不会拷贝实参，直接操作原变量，效率高
- 引用一旦绑定不能重新绑定到其他变量
- 函数返回引用时，返回的必须是函数作用域外的有效变量

---

## 03. 二维数组定义与遍历

```cpp
#include <iostream>
using namespace std;

int main() {
    // 定义二维数组
    int arr[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // 嵌套循环遍历
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << arr[i][j] << "\t";
        }
        cout << endl;
    }

    // 部分初始化（其余自动补0）
    int grid[2][3] = {{1, 2}, {4}};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << grid[i][j] << " ";
        }
        cout << endl;
    }

    // 二维数组作为函数参数
    const int ROWS = 2, COLS = 3;
    int mat[ROWS][COLS] = {{1, 2, 3}, {4, 5, 6}};

    // 计算每行之和
    for (int i = 0; i < ROWS; i++) {
        int rowSum = 0;
        for (int j = 0; j < COLS; j++) {
            rowSum += mat[i][j];
        }
        cout << "第" << i + 1 << "行之和: " << rowSum << endl;
    }

    return 0;
}
```

**要点**：
- 二维数组声明格式：`类型 数组名[行数][列数]`
- 初始化时可省略行数，但不能省略列数
- 多维数组通过嵌套循环遍历，外层控制行，内层控制列
- 二维数组作为函数参数时必须指明列数

---

## 04. 结构体定义与使用

```cpp
#include <iostream>
#include <string>
using namespace std;

// 定义结构体
struct Student {
    string name;
    int age;
    double score;
};

// 嵌套结构体
struct Date {
    int year, month, day;
};

struct Employee {
    string name;
    Date birthday;  // 嵌套使用Date结构体
    double salary;
};

int main() {
    // 结构体变量定义与初始化
    Student s1;
    s1.name = "张三";
    s1.age = 15;
    s1.score = 95.5;

    // 初始化列表方式
    Student s2 = {"李四", 16, 88.0};

    // 输出结构体成员
    cout << "姓名: " << s1.name << endl;
    cout << "年龄: " << s1.age << endl;
    cout << "成绩: " << s1.score << endl;

    // 嵌套结构体使用
    Employee emp = {"王五", {2008, 5, 20}, 5000.0};
    cout << emp.name << " 生日: "
         << emp.birthday.year << "-"
         << emp.birthday.month << "-"
         << emp.birthday.day << endl;

    // 结构体指针
    Student* ps = &s2;
    cout << "指针访问: " << ps->name << ", " << ps->age << endl;
    // 箭头运算符等价于 (*ps).成员

    return 0;
}
```

**要点**：
- 结构体用`struct`关键字定义，包含多个不同类型的成员
- 使用`.`运算符访问结构体成员，使用`->`运算符通过指针访问
- 结构体可以嵌套使用，形成复杂的数据组织
- 结构体可以用初始化列表一次性赋值

---

## 05. 结构体数组

```cpp
#include <iostream>
using namespace std;

struct Student {
    string name;
    int score;
};

void printAll(Student arr[], int n) {
    cout << "=== 学生成绩表 ===" << endl;
    for (int i = 0; i < n; i++) {
        cout << arr[i].name << " : " << arr[i].score << "分" << endl;
    }
}

// 按成绩从高到低排序（选择排序）
void sortByScore(Student arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int maxIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j].score > arr[maxIdx].score) {
                maxIdx = j;
            }
        }
        if (maxIdx != i) {
            Student temp = arr[i];
            arr[i] = arr[maxIdx];
            arr[maxIdx] = temp;
        }
    }
}

int main() {
    const int N = 5;
    Student class1[N] = {
        {"张三", 85}, {"李四", 92}, {"王五", 78},
        {"赵六", 95}, {"孙七", 88}
    };

    cout << "排序前:" << endl;
    printAll(class1, N);

    sortByScore(class1, N);

    cout << "\n排序后（按成绩降序）:" << endl;
    printAll(class1, N);

    // 计算平均分
    int total = 0;
    for (int i = 0; i < N; i++) {
        total += class1[i].score;
    }
    cout << "\n平均分: " << (double)total / N << endl;

    return 0;
}
```

**要点**：
- 结构体数组是多个同类型结构体变量的集合
- 访问格式：`数组名[下标].成员名`
- 结构体数组可作为函数参数传递（传递首地址）
- 结构体数组支持排序、查找、统计等常见操作

---

## 06. 函数定义与调用

```cpp
#include <iostream>
using namespace std;

// 无返回值函数
void printLine(int n, char ch) {
    for (int i = 0; i < n; i++) {
        cout << ch;
    }
    cout << endl;
}

// 有返回值函数
int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// 默认参数
int power(int base, int exp = 2) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

// 函数重载
double add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

int main() {
    printLine(30, '=');
    cout << "5! = " << factorial(5) << endl;

    cout << "2^3 = " << power(2, 3) << endl;
    cout << "5^2 = " << power(5) << endl;  // 使用默认参数

    cout << "add(3,4) = " << add(3, 4) << endl;
    cout << "add(1.5, 2.5) = " << add(1.5, 2.5) << endl;

    return 0;
}
```

**要点**：
- 函数由返回类型、函数名、参数列表和函数体组成
- `void`表示无返回值，需要使用`return`语句返回数据
- 默认参数在声明时指定，调用时可省略
- 函数重载允许同名函数通过不同参数列表实现不同功能

---

## 07. 值传递 vs 引用传递

```cpp
#include <iostream>
using namespace std;

// 值传递：函数接收实参的副本，修改不影响原值
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    cout << "值传递函数内: a=" << a << ", b=" << b << endl;
}

// 引用传递：函数直接操作实参，修改会影响原值
void swapByReference(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
    cout << "引用传递函数内: a=" << a << ", b=" << b << endl;
}

// 指针传递：通过地址操作，效果同引用传递
void swapByPointer(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
    cout << "指针传递函数内: *a=" << *a << ", *b=" << *b << endl;
}

int main() {
    int x = 10, y = 20;

    cout << "=== 值传递演示 ===" << endl;
    cout << "调用前: x=" << x << ", y=" << y << endl;
    swapByValue(x, y);
    cout << "调用后: x=" << x << ", y=" << y << " (未改变)" << endl;

    cout << "\n=== 引用传递演示 ===" << endl;
    cout << "调用前: x=" << x << ", y=" << y << endl;
    swapByReference(x, y);
    cout << "调用后: x=" << x << ", y=" << y << " (已交换)" << endl;

    cout << "\n=== 指针传递演示 ===" << endl;
    cout << "调用前: x=" << x << ", y=" << y << endl;
    swapByPointer(&x, &y);
    cout << "调用后: x=" << x << ", y=" << y << " (已交换)" << endl;

    return 0;
}
```

**要点**：
- 值传递复制实参，函数内修改不影响原始变量
- 引用传递直接绑定实参，修改会同步到原始变量
- 指针传递通过地址间接访问，需要解引用操作
- 大对象传递建议使用引用传递，避免不必要的拷贝开销

---

## 08. 递推算法

```cpp
#include <iostream>
using namespace std;

// 斐波那契数列（自底向上递推）
long long fibonacci(int n) {
    if (n <= 2) return 1;
    long long prev1 = 1, prev2 = 1, current;
    for (int i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return current;
}

// 爬楼梯问题：每次可走1阶或2阶，走到n阶有几种走法
int climbStairs(int n) {
    if (n <= 2) return n;
    int dp1 = 1, dp2 = 2, dp3;
    for (int i = 3; i <= n; i++) {
        dp3 = dp1 + dp2;
        dp1 = dp2;
        dp2 = dp3;
    }
    return dp3;
}

// 数塔问题：从顶部到底部的路径最大和
int numberTower() {
    int tower[4][4] = {
        {0, 0, 0, 0},       // 第0行（空）
        {0, 2, 0, 0},       // 第1行
        {0, 3, 4, 0},       // 第2行
        {0, 6, 5, 7}        // 第3行
    };
    int dp[4][4] = {0};

    // 从顶部开始递推
    dp[1][1] = tower[1][1];
    for (int i = 2; i <= 3; i++) {
        for (int j = 1; j <= i; j++) {
            dp[i][j] = tower[i][j] + max(dp[i-1][j-1], dp[i-1][j]);
        }
    }

    int maxSum = 0;
    for (int j = 1; j <= 3; j++) {
        maxSum = max(maxSum, dp[3][j]);
    }
    return maxSum;
}

int main() {
    cout << "斐波那契数列前10项:" << endl;
    for (int i = 1; i <= 10; i++) {
        cout << "F(" << i << ") = " << fibonacci(i) << endl;
    }

    cout << "\n爬10阶楼梯的走法数: " << climbStairs(10) << endl;

    cout << "\n数塔最大路径和: " << numberTower() << endl;

    return 0;
}
```

**要点**：
- 递推算法从已知条件出发，逐步推导未知结果
- 自底向上递推比递归更高效，避免重复计算
- 常见应用：斐波那契数列、爬楼梯、数塔问题
- 核心思想：找到递推关系式，从前向后逐层计算

---

## 09. 冒泡排序

```cpp
#include <iostream>
using namespace std;

// 基础冒泡排序（从小到大）
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换相邻元素
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// 优化冒泡排序（提前终止）
void bubbleSortOptimized(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;  // 本轮无交换，已有序
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr1[] = {64, 34, 25, 12, 22, 11, 90};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);

    cout << "排序前: ";
    printArray(arr1, n1);
    bubbleSort(arr1, n1);
    cout << "冒泡排序后: ";
    printArray(arr1, n1);

    int arr2[] = {5, 1, 4, 2, 8};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);

    cout << "\n排序前: ";
    printArray(arr2, n2);
    bubbleSortOptimized(arr2, n2);
    cout << "优化冒泡排序后: ";
    printArray(arr2, n2);

    return 0;
}
```

**要点**：
- 冒泡排序通过相邻元素比较交换，将大元素逐步"冒泡"到末尾
- 外层控制轮数（n-1轮），内层控制相邻比较
- 每轮结束后，最大未排序元素就位到正确位置
- 优化版本通过`swapped`标志检测提前终止，提高效率

---

## 10. 选择排序

```cpp
#include <iostream>
using namespace std;

// 选择排序（从小到大）
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;  // 记录最小值下标
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // 将最小值交换到当前位置
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}

// 选择排序（从大到小）
void selectionSortDesc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int maxIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] > arr[maxIdx]) {
                maxIdx = j;
            }
        }
        if (maxIdx != i) {
            int temp = arr[i];
            arr[i] = arr[maxIdx];
            arr[maxIdx] = temp;
        }
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr1[] = {29, 10, 14, 37, 13};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);

    cout << "排序前: ";
    printArray(arr1, n1);
    selectionSort(arr1, n1);
    cout << "选择排序后（升序）: ";
    printArray(arr1, n1);

    int arr2[] = {64, 25, 12, 22, 11};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);

    cout << "\n排序前: ";
    printArray(arr2, n2);
    selectionSortDesc(arr2, n2);
    cout << "选择排序后（降序）: ";
    printArray(arr2, n2);

    return 0;
}
```

**要点**：
- 选择排序每轮从未排序区间选出最小（大）元素，放到已排序区间末尾
- 与冒泡排序不同，选择排序每轮只做一次交换，交换次数更少
- 时间复杂度固定为O(n²)，不依赖数据初始顺序
- 选择排序是不稳定的排序算法（相等元素的相对位置可能改变）

---

## 11. 文件读写

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

void writeToFile() {
    // ofstream 写入文件
    ofstream outFile("students.txt");

    if (!outFile.is_open()) {
        cout << "文件打开失败！" << endl;
        return;
    }

    outFile << "张三 95" << endl;
    outFile << "李四 88" << endl;
    outFile << "王五 92" << endl;

    outFile.close();
    cout << "文件写入成功！" << endl;
}

void readFromFile() {
    // ifstream 读取文件
    ifstream inFile("students.txt");

    if (!inFile.is_open()) {
        cout << "文件打开失败！" << endl;
        return;
    }

    string name;
    int score;
    cout << "=== 学生成绩 ===" << endl;
    while (inFile >> name >> score) {
        cout << name << ": " << score << "分" << endl;
    }

    inFile.close();
}

void appendToFile() {
    // 追加模式
    ofstream outFile("students.txt", ios::app);
    if (outFile.is_open()) {
        outFile << "赵六 79" << endl;
        outFile.close();
        cout << "追加写入成功！" << endl;
    }
}

int main() {
    writeToFile();
    readFromFile();

    cout << "\n--- 追加后 ---" << endl;
    appendToFile();
    readFromFile();

    return 0;
}
```

**要点**：
- `ofstream`用于文件写入，`ifstream`用于文件读取，`fstream`两者皆可
- `ios::app`表示追加模式，不覆盖原有内容
- 写入/读取完成后必须调用`close()`关闭文件
- 文件操作前应检查`is_open()`确保文件成功打开

---

## 12. 异常处理（try-catch）

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

// 除法运算（可能产生除零异常）
double divide(double a, double b) {
    if (b == 0) {
        throw runtime_error("除数不能为零！");
    }
    return a / b;
}

// 数组越界检查
int getArrayElement(int arr[], int size, int index) {
    if (index < 0 || index >= size) {
        throw out_of_range("数组下标越界！");
    }
    return arr[index];
}

// 年龄验证
void checkAge(int age) {
    if (age < 0 || age > 150) {
        throw invalid_argument("年龄输入无效！");
    }
    cout << "年龄验证通过: " << age << "岁" << endl;
}

int main() {
    // try-catch捕获异常
    try {
        cout << "10 / 2 = " << divide(10, 2) << endl;
        cout << "10 / 0 = " << divide(10, 0) << endl;
    } catch (const runtime_error& e) {
        cout << "运行时错误: " << e.what() << endl;
    }

    cout << endl;

    // 数组越界异常
    try {
        int arr[] = {10, 20, 30, 40, 50};
        cout << "arr[2] = " << getArrayElement(arr, 5, 2) << endl;
        cout << "arr[10] = " << getArrayElement(arr, 5, 10) << endl;
    } catch (const out_of_range& e) {
        cout << "范围错误: " << e.what() << endl;
    }

    cout << endl;

    // 多重异常捕获
    try {
        checkAge(-5);
    } catch (const invalid_argument& e) {
        cout << "参数错误: " << e.what() << endl;
    } catch (...) {
        // 捕获所有其他类型的异常
        cout << "发生未知异常" << endl;
    }

    cout << "\n程序继续正常运行..." << endl;

    return 0;
}
```

**要点**：
- `try`块包裹可能产生异常的代码，`catch`块处理特定类型的异常
- 使用`throw`关键字抛出异常对象（通常是标准异常类）
- `runtime_error`、`out_of_range`、`invalid_argument`是常用标准异常
- `catch(...)`可捕获所有类型异常，应放在最后作为兜底
- 异常处理用于应对运行时不可预见的错误，增强程序健壮性

---

## 附录：旧版错误模板对照表

| 旧版错误模板编号 | 原错误内容 | 正确归属级别 |
|:---:|:---|:---:|
| 原四级-01 | 链表定义与操作 | 五级 |
| 原四级-02 | 快速排序 | 五级 |
| 原四级-03 | 二叉树遍历 | 五级 |
| 原四级-04 | STL容器（vector/map） | 五级 |
| 原四级-05 | 动态内存分配（new/delete） | 五级 |

> **说明**：以上内容属于 GESP 五级大纲范畴，不应出现在四级模板中。
> 本次修正版已将四级模板内容严格限定为四级大纲知识点，确保备考材料准确对应考试要求。

---

*最后更新：2026年6月*
*本模板严格对应 GESP 四级大纲，用于备考复习与教学参考。*
