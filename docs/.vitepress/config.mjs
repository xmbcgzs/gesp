import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'

export default defineConfig({
  title: 'GESP C++ 知识点',
  description: '中国计算机学会 GESP C++ 等级考试知识点整理 L1-L8',
  
  // 暗黑主题
  appearance: 'dark',
  
  // 基础 URL（GitHub Pages）
  base: '/gesp/',
  
  // KaTeX CSS
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css' }],
  ],
  
  // markdown-it 插件
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  },
  
  // 主题配置
  themeConfig: {
    siteTitle: 'GESP 知识点',
    
    nav: [
      { text: '首页', link: '/' },
      { text: 'L1 入门', link: '/L1/' },
      { text: 'L2 基础', link: '/L2/' },
      { text: 'L3 进阶', link: '/L3/' },
      { text: 'L4 提高', link: '/L4/' },
      { text: 'L5 中级', link: '/L5/' },
      { text: 'L6 高级', link: '/L6/' },
      { text: 'L7 拔高', link: '/L7/' },
      { text: 'L8 顶级', link: '/L8/' },
      { text: '📚 代码模板', link: '/snippets/' },
      { text: '🏆 NOI 竞赛', items: [
        { text: 'NOI 入门组 (CSP-J)', link: '/noi-j/' },
        { text: 'NOI 提高级 (CSP-S)', link: '/noi-s/' },
        { text: 'NOI 级', link: '/noi-level/' },
      ]},
    ],
    
    sidebar: {
      '/noi-j/': [
        {
          text: 'NOI 入门组 (CSP-J)',
          items: [
            { text: '一、基础知识与编程环境', items: [
              { text: '1.1 计算机基础', link: '/noi-j/#11-计算机基础' },
              { text: '1.2 开发环境', link: '/noi-j/#12-开发环境' },
            ]},
            { text: '二、C++程序设计', items: [
              { text: '2.1 程序基本概念', link: '/noi-j/#21-程序基本概念' },
              { text: '2.2 基本数据类型', link: '/noi-j/#22-基本数据类型' },
              { text: '2.3 基本语句', link: '/noi-j/#23-程序基本语句' },
              { text: '2.4 基本运算', link: '/noi-j/#24-基本运算' },
              { text: '2.5 数学库', link: '/noi-j/#25-数学库常用函数' },
              { text: '2.6 数组', link: '/noi-j/#26-数组' },
              { text: '2.7 字符串', link: '/noi-j/#27-字符串的处理' },
              { text: '2.8 函数与递归', link: '/noi-j/#28-函数与递归' },
              { text: '2.9 结构体', link: '/noi-j/#29-结构体与联合体' },
              { text: '2.10 指针与引用', link: '/noi-j/#210-指针与引用' },
              { text: '2.11 文件读写', link: '/noi-j/#211-文件及基本读写' },
              { text: '2.12 STL', link: '/noi-j/#212-stl模板' },
              { text: '2.13 程序设计方法', link: '/noi-j/#213-程序设计方法' },
            ]},
            { text: '三、数据结构', items: [
              { text: '3.1 线性结构', link: '/noi-j/#31-线性结构' },
              { text: '3.2 简单树', link: '/noi-j/#32-简单树' },
              { text: '3.3 特殊树', link: '/noi-j/#33-特殊树' },
              { text: '3.4 简单图', link: '/noi-j/#34-简单图' },
              { text: '3.5 图的其他概念', link: '/noi-j/#35-图的其他概念' },
            ]},
            { text: '四、算法', items: [
              { text: '4.1 算法概念', link: '/noi-j/#41-算法概念与描述' },
              { text: '4.2 入门算法', link: '/noi-j/#42-入门算法' },
              { text: '4.3 基础算法', link: '/noi-j/#43-基础算法' },
              { text: '4.4 算法策略', link: '/noi-j/#44-算法策略' },
              { text: '4.5 数值处理', link: '/noi-j/#45-数值处理算法' },
              { text: '4.6 排序算法', link: '/noi-j/#46-排序算法' },
              { text: '4.7 搜索算法', link: '/noi-j/#47-搜索算法' },
              { text: '4.8 图论算法', link: '/noi-j/#48-图论算法' },
              { text: '4.9 动态规划', link: '/noi-j/#49-动态规划' },
            ]},
            { text: '五、数学与其他', items: [
              { text: '5.1 数及其运算', link: '/noi-j/#51-数及其运算' },
              { text: '5.2 初等数学', link: '/noi-j/#52-初等数学' },
              { text: '5.3 初等数论', link: '/noi-j/#53-初等数论' },
              { text: '5.4 排列组合', link: '/noi-j/#54-计数原理与排列组合' },
              { text: '5.5 其他', link: '/noi-j/#55-其他' },
            ]},
          ]
        }
      ],
      '/noi-s/': [
        {
          text: 'NOI 提高级 (CSP-S)',
          items: [
            { text: '一、基础知识', items: [
              { text: '1.1 Linux操作', link: '/noi-s/#11-linux操作' },
            ]},
            { text: '二、C++程序设计', items: [
              { text: '2.1 类', link: '/noi-s/#21-类class' },
              { text: '2.2 STL模板', link: '/noi-s/#22-stl模板' },
            ]},
            { text: '三、数据结构', items: [
              { text: '3.1 线性结构', link: '/noi-s/#31-线性结构' },
              { text: '3.2 集合与森林', link: '/noi-s/#32-集合与森林' },
              { text: '3.3 特殊树', link: '/noi-s/#33-特殊树' },
              { text: '3.4 常见图', link: '/noi-s/#34-常见图' },
              { text: '3.5 哈希表', link: '/noi-s/#35-哈希表' },
            ]},
            { text: '四、算法', items: [
              { text: '4.1 复杂度分析', link: '/noi-s/#41-复杂度分析' },
              { text: '4.2 算法策略', link: '/noi-s/#42-算法策略' },
              { text: '4.3 基础算法', link: '/noi-s/#43-基础算法' },
              { text: '4.4 排序算法', link: '/noi-s/#44-排序算法' },
              { text: '4.5 字符串算法', link: '/noi-s/#45-字符串算法' },
              { text: '4.6 搜索算法', link: '/noi-s/#46-搜索算法' },
              { text: '4.7 图论算法', link: '/noi-s/#47-图论算法' },
              { text: '4.8 动态规划', link: '/noi-s/#48-动态规划' },
            ]},
            { text: '五、数学与其他', items: [
              { text: '5.1 初等数学', link: '/noi-s/#51-初等数学' },
              { text: '5.2 初等数论', link: '/noi-s/#52-初等数论' },
              { text: '5.3 离散与组合', link: '/noi-s/#53-离散与组合数学' },
              { text: '5.4 线性代数', link: '/noi-s/#54-线性代数' },
            ]},
          ]
        }
      ],
      '/noi-level/': [
        {
          text: 'NOI 级',
          items: [
            { text: '一、C++程序设计', items: [
              { text: '1.1 面向对象', link: '/noi-level/#11-面向对象' },
            ]},
            { text: '二、数据结构', items: [
              { text: '2.1 线性结构', link: '/noi-level/#21-线性结构' },
              { text: '2.2 复杂树', link: '/noi-level/#22-复杂树' },
              { text: '2.3 可合并堆', link: '/noi-level/#23-可合并堆' },
              { text: '2.4 可持久化', link: '/noi-level/#24-可持久化数据结构' },
            ]},
            { text: '三、算法', items: [
              { text: '3.1 算法策略', link: '/noi-level/#31-算法策略' },
              { text: '3.2 字符串算法', link: '/noi-level/#32-字符串算法' },
              { text: '3.3 搜索算法', link: '/noi-level/#33-搜索算法' },
            ]},
            { text: '四、图论算法', items: [
              { text: '图论算法', link: '/noi-level/#四图论算法' },
            ]},
            { text: '五、动态规划', items: [
              { text: '动态规划', link: '/noi-level/#五动态规划' },
            ]},
            { text: '六、数学与其他', items: [
              { text: '6.1 初等数论', link: '/noi-level/#61-初等数论' },
              { text: '6.2 离散与组合', link: '/noi-level/#62-离散与组合数学' },
              { text: '6.3 线性代数', link: '/noi-level/#63-线性代数' },
              { text: '6.4 高等数学', link: '/noi-level/#64-高等数学' },
              { text: '6.5 概率论', link: '/noi-level/#65-概率论' },
              { text: '6.6 博弈论', link: '/noi-level/#66-博弈论' },
              { text: '6.7 最优化', link: '/noi-level/#67-最优化' },
              { text: '6.8 计算几何', link: '/noi-level/#68-计算几何' },
              { text: '6.9 信息论', link: '/noi-level/#69-信息论' },
              { text: '6.10 其他', link: '/noi-level/#610-其他' },
            ]},
          ]
        }
      ],
      '/L6/': [
        {
          text: 'L6 高级 (18个知识点)',
          items: [
            { text: '一、树', items: [
              { text: '1 树的基本概念', link: '/L6/#1-树的基本概念' },
              { text: '2 二叉树遍历', link: '/L6/#2-二叉树遍历' },
              { text: '3 二叉搜索树', link: '/L6/#3-二叉搜索树' },
              { text: '4 哈夫曼树', link: '/L6/#4-哈夫曼树' },
            ]},
            { text: '二、图', items: [
              { text: '5 图的存储与遍历', link: '/L6/#5-图的存储与遍历' },
              { text: '6 最短路径', link: '/L6/#6-最短路径' },
              { text: '7 最小生成树', link: '/L6/#7-最小生成树' },
            ]},
            { text: '三、排序', items: [
              { text: '8 比较排序', link: '/L6/#8-比较排序' },
              { text: '9 非比较排序', link: '/L6/#9-非比较排序' },
            ]},
            { text: '四、查找与字符串', items: [
              { text: '10 二分查找', link: '/L6/#10-二分查找' },
              { text: '11 STL容器', link: '/L6/#11-stl容器' },
              { text: '12 高级排序算法', link: '/L6/#12-高级排序算法' },
              { text: '13 递归与分治', link: '/L6/#13-递归与分治' },
              { text: '14 回溯算法', link: '/L6/#14-回溯算法' },
              { text: '15 贪心算法', link: '/L6/#15-贪心算法' },
              { text: '16 字符串处理', link: '/L6/#16-字符串处理' },
              { text: '17 概率与统计', link: '/L6/#17-概率与统计' },
              { text: '18 综合应用', link: '/L6/#18-综合应用' },
            ]},
          ]
        }
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xmbcgzs/gesp' }
    ],
    
    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2024-2026 熊猫编程工作室'
    },
    
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '目录' },
    docFooter: { prev: '上一级', next: '下一级' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  }
})
