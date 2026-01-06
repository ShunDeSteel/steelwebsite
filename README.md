# Steel Website (EN / 中文)

一个用于**中国钢铁制造厂外贸拓客**的中英文双语官网骨架（Next.js + Tailwind + next-intl）。

## 本地运行

在项目根目录执行：

```bash
npm run dev
```

如果你的 PowerShell 遇到 `npm.ps1 cannot be loaded`（执行策略拦截），用下面方式之一：

- **方式 A（推荐，最简单）**：使用 `npm.cmd`

```powershell
& "$env:ProgramFiles\nodejs\npm.cmd" run dev
```

- **方式 B**：修改当前用户执行策略（只影响你自己的用户）

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

然后再次执行 `npm run dev`。

启动后访问：
- `http://localhost:3000/en`
- `http://localhost:3000/zh`

## 内容修改入口

- **中英文文案**：`messages/en.json`、`messages/zh.json`
- **联系方式占位**：`src/app/[locale]/contact/page.tsx` 里的 `CONTACT`
- **页面文件**
  - 首页：`src/app/[locale]/page.tsx`
  - 产品与能力：`src/app/[locale]/products/page.tsx`
  - 关于我们：`src/app/[locale]/about/page.tsx`
  - 联系方式：`src/app/[locale]/contact/page.tsx`
- **图片**：放到 `public/`（例如 `public/images/`），然后在页面中用 `next/image` 引用

## 部署到公网（全球可访问）

## 托管到 GitHub Pages（github.io，纯静态）

> 重要限制：GitHub Pages 只能托管静态文件，**不支持 Next.js 的 API Routes / Middleware**。  
> 因此本项目已经切换为 `output: "export"` 静态导出模式。

### 1) 准备一个 GitHub 仓库

在 GitHub 新建仓库（例如 `steelwebsite`）。

### 2) 推送代码到 GitHub

在项目根目录执行：

```bash
git add .
git commit -m "deploy to github pages"
git branch -M main
git remote add origin <你的仓库地址>
git push -u origin main
```

### 3) 配置 GitHub Pages

GitHub 仓库页面 → **Settings → Pages**：

- **Build and deployment**：选择 **GitHub Actions**

> 下一步需要添加一个 GitHub Actions workflow 来构建并发布静态站点。

### 4) 生成静态站点（本地验证）

```bash
npm run build
```

构建后会生成 `out/` 目录（静态文件）。你可以用任意静态服务器预览，例如：

```bash
npx --yes serve out
```

### 5) 询盘表单（GitHub Pages 模式）

GitHub Pages 无法运行后端发邮件接口，所以询盘表单默认使用 `mailto:` 打开用户本地邮箱客户端，发送到：
- `NEXT_PUBLIC_INQUIRY_TO`（默认 `shundesteel@gmail.com`）

如果你希望“提交表单后自动发到 Gmail（不依赖用户本地邮件客户端）”，推荐使用第三方表单服务（例如 Formspree / Getform / Google Forms）。  
你可以把第三方的 JSON 接口地址设置到：
- `NEXT_PUBLIC_INQUIRY_ENDPOINT`

并在 GitHub Actions / Pages 环境中设置这些环境变量即可。

### 6) basePath（很重要）

如果你的 Pages 地址是 `https://<username>.github.io/<repo>/`，那么需要设置：
- `NEXT_PUBLIC_BASE_PATH=/<repo>`

这样所有资源与路由才能正确工作。

## （备选）部署到 Vercel（带后端能力）

如果你需要 Next.js API（例如服务器端自动发邮件到 Gmail），推荐使用 Vercel：

1. **把代码推到 GitHub**
   - 新建仓库（例如 `steelwebsite`）
   - 在本项目根目录：`git add . && git commit -m "init" && git push`
2. **Vercel 导入仓库**
   - 在 Vercel 新建项目并选择该 GitHub 仓库
   - Framework 选 Next.js（一般自动识别）
   - 点击 Deploy
3. **绑定域名**
   - 在 Vercel 项目设置里添加域名（建议 `.com`）
   - 按提示在域名服务商处添加 DNS 记录
   - 等待生效（通常几分钟到数小时）

## 询盘表单（发送到 Gmail）

本项目的联系页表单会请求 `POST /api/inquiry`，由服务器通过 SMTP 把询盘邮件发送到你的邮箱。

你需要配置环境变量（参考 `env.example.txt`）：

- `SMTP_HOST`：例如 Gmail 为 `smtp.gmail.com`
- `SMTP_PORT`：Gmail 推荐 `465`
- `SMTP_SECURE`：Gmail 为 `true`
- `SMTP_USER`：你的 Gmail，例如 `shundesteel@gmail.com`
- `SMTP_PASS`：**Gmail App Password**（不是登录密码）
- `INQUIRY_TO`：收件人，例如 `shundesteel@gmail.com`
- `INQUIRY_CC`：（可选）抄送，例如 `1309035031@qq.com`

### Gmail App Password 获取方式

1. 在 Gmail 开启“两步验证”
2. 生成“App password”
3. 把生成的 16 位 app password 填到 `SMTP_PASS`

本地运行时，你可以在系统环境变量里设置这些值，然后重启 `npm run dev`。

## 常见升级（后续可做）

- 询盘表单从 `mailto:` 升级为真正的后端提交（邮件/CRM/飞书）
- 产品页增加参数表、下载 PDF、案例页、新闻页
- SEO：站点地图、结构化数据、OpenGraph、Google/Bing 收录
