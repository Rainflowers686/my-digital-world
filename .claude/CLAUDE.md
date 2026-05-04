# Rain Lab

正式域名：[https://rain-lab.com](https://rain-lab.com)

## 定位

大一计算机学生的个人数字实验室。记录项目、学习路线、文章和实验。

## 技术栈

Astro 6 + TypeScript + Tailwind CSS v4 + React 19 + MDX + Cloudflare Pages

## 常用命令

```bash
npm run dev        # http://localhost:4321
npm run build      # 输出到 dist/
npm run preview    # 预览构建结果
```

## 部署

- GitHub main 分支 push 后 Cloudflare Pages 自动部署
- Build command: `npm run build`
- Output directory: `dist`

## 当前版本

v1.6.1

## 搜索引擎收录

- Google Search Console 已验证，sitemap 已提交 (`sitemap-index.xml`)
- Bing Webmaster 已通过 Cloudflare DNS CNAME 验证，sitemap 已提交

## 重要规则

- **不要随意改视觉主风格**（暖色极简 Claude-inspired）
- **不要随意改主题系统**（3 套主题 × 4 种背景 × 3 档玻璃强度）
- **不要随意改背景系统**（SVG 纹理 + CSS 变量 + overlay）
- **不要随意改路由结构**（12 个页面）
- **不要编造不真实的经历或身份信息**
- **所有大改必须先进入 Plan mode 输出计划**
- **修改后必须运行 `npm run build` 验证**
- **不要自动 commit 或 push**，除非明确要求
- **页面内容语气保持真实**，不要商业官网化，保留大一学生的探索感
