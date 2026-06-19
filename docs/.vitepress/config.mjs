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
    ],
    
    sidebar: {
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
