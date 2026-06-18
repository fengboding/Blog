# 博客

一个支持多语言、主题切换和 Markdown 渲染的单页博客应用。

## 特性

- **多语言**: 所有 UI 元素支持完整国际化 — English, 中文
- **主题**: 亮色/暗色，支持自动检测
- **Markdown**: 语法高亮渲染，带代码复制按钮
- **搜索**: 按标题/描述/标签筛选文章
- **标签筛选**: AND 逻辑 — 选择多个标签缩小结果范围
- **标签滚动**: 溢出标签自动滚动，悬停暂停
- **分页**: 每页 6 篇文章
- **文章导航**: 上一篇/下一篇按钮显示文章标题，无相关文章时自动隐藏
- **响应式**: 支持移动端和桌面端
- **阅读进度**: 文章详情页的圆形进度指示器，点击返回顶部
- **加载遮罩**: 仅通过滚轮或触摸关闭，防止误操作
- **通知提示**: 毛玻璃风格，右下角显示，彩色左边框区分类型
- **关于页面**: 基于 Markdown 的关于页面，从 `about.md` 渲染
- **配置驱动**: 通过 `data/config/config.json` 进行站点配置

## 使用方法

### 添加文章

在 `data/posts/` 目录下创建带 frontmatter 的 markdown 文件：

```md
---
title: 文章标题
date: 2025-01-15
description: 简短描述
tags: [标签1, 标签2]
---

文章内容...
```

### 配置

编辑 `data/config/config.json` 配置站点：

```json
{
    "siteTitle": {
        "en-US": "Blog",
        "zh-CN": "博客"
    },
    "siteDesc": {
        "en-US": "Exploring ideas, code, and creativity",
        "zh-CN": "探索想法、代码与创意"
    },
    "github": "https://github.com/your-username",
    "email": "hello@example.com",
    "about": "data/config/about.md"
}
```

### 关于页面

创建 `data/config/about.md`，使用 Markdown 格式编写关于内容。

### 构建

```bash
node build.js
```

生成 `data/posts.json` 和 `data/tags.json`。

### 本地运行

```bash
npx serve .
```

### 语言

| 代码   | 语言     |
|--------|----------|
| en-US  | English  |
| zh-CN  | 简体中文  |

语言通过浏览器设置或 localStorage 自动检测。可在顶栏中手动切换。

### 主题

主题自动检测 `prefers-color-scheme`。可通过主题按钮手动切换，选择会保存到 localStorage。

## 项目结构

```
├── index.html          # 单页应用
├── build.js            # 构建脚本（零依赖）
├── package.json
├── data/
│   ├── config/           # 站点配置
│   │   ├── config.json   # 配置文件
│   │   └── about.md      # 关于页面内容
│   ├── posts/            # Markdown 文章
│   ├── assets/           # 图片和静态资源
│   ├── posts.json        # 生成的文章索引
│   └── tags.json         # 生成的标签索引
└── .github/workflows/
    ├── ci.yml            # CI — 推送/PR 时自动构建
    └── deploy.yml        # GitHub Pages 部署
```
