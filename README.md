# Rain Lab

个人数字实验室 — 记录计算机学习、项目作品、技术文章与长期成长的个人网站。

⚡ [rain-lab.com](https://rain-lab.com)

**设计风格**：暖色极简 + Claude-inspired  
**技术栈**：Astro 6 + TypeScript + Tailwind CSS v4 + React 19 + MDX

## 功能模块

- **首页** — Hero 入口 + 精选项目 ×3 + 学习路线预览 + 最新文章 ×3
- **项目** — `/projects` 列表页 + `/projects/[slug]` 案例研究详情页（MDX）
- **文章** — `/articles` 列表页 + `/articles/[slug]` 技术文章详情页（MDX）
- **学习路线** — `/learning` 七阶段时间线展示
- **实验室** — `/lab` 实验项目占位
- **外观设置** — 右下角面板：3 套主题 × 4 种背景 × 3 档玻璃强度（localStorage 持久化）
- **404** — 自定义未找到页面

## 本地运行

```bash
npm install
npm run dev        # http://localhost:4321
```

## 构建

```bash
npm run build      # 输出到 dist/
npm run preview    # 预览构建结果
```

## 目录结构

```
mywebsite/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg          # 品牌 R 图标
│   ├── og.svg               # Open Graph 分享图
│   ├── robots.txt
│   └── backgrounds/         # 4 个 SVG 背景纹理
├── src/
│   ├── components/
│   │   ├── react/
│   │   │   └── AppearancePanel.tsx   # 外观设置面板
│   │   ├── Navbar.tsx
│   │   ├── Hero.astro
│   │   ├── FeaturedProjects.astro
│   │   ├── LatestArticles.astro
│   │   ├── LearningPath.astro
│   │   ├── SectionHeading.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── projects/        # 项目 MDX（3 篇）
│   │   └── articles/        # 文章 MDX（3 篇）
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── learning.astro
│   │   ├── lab.astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── articles/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 版本路线

| 版本 | 内容 |
|------|------|
| V0.1 | Astro 初始化 + 首页落地 |
| V0.2 | 深色科技风（已废弃） |
| V0.3 | 暖色极简 Claude 风格确立 |
| V0.4 | 内容骨架：Content Collections + 多页面 |
| V0.5 | 详情页质感升级：prose-custom + Case Study |
| V0.6 | 外观设置系统：3 主题 × 4 背景 × 3 玻璃强度 |
| V0.7 | 移动端适配与纵向节奏统一 |
| V0.8 | SEO + 404 + OG 分享图 + 项目清理 + 部署准备 |
| V0.9 | Cloudflare Pages 部署 + 正式域名 rain-lab.com |
| V1.0 | 品牌统一为 Rain Lab + 正式上线 |
| V1.1 | 真实内容替换——以大一学生视角重写全部内容 |
| V1.2 | 第一篇正式长文章《我为什么从零构建 Rain Lab》 |
| V1.3 | 核心项目 Case Study 完善 |
| V1.4 | 全站发布质量审计 |
| V1.4.1 | 版本记录同步 |
| V1.5 | Sitemap + Footer 链接 + 项目元信息收尾 |
| V1.6 | 搜索引擎收录准备与提交 |

## 部署

正式域名：[https://rain-lab.com](https://rain-lab.com)

部署平台：**Cloudflare Pages**（通过 GitHub 自动部署）

### 部署配置

| 字段 | 值 |
|------|-----|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | `22.x` |

无需环境变量。

### 部署前需手动替换

- [ ] `src/components/Footer.astro` → Twitter / Email 链接（GitHub 已更新）

## GitHub About 建议

仓库 Description：
```
Rain Lab — A personal digital lab for projects, notes, learning and experiments.
```

仓库 Topics：
```
astro tailwindcss typescript mdx personal-website portfolio digital-garden cloudflare-pages
```
