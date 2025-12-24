# 将 Cloudflare 域名配置到 Vercel 指南

本指南将帮助您将 Cloudflare 管理的域名配置到 Vercel 部署。

## 前置条件

- 已在 Vercel 部署了项目
- 域名在 Cloudflare 管理
- 已登录 Cloudflare 和 Vercel 账户

## 步骤 1: 在 Vercel 中添加域名

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** → **Domains**
4. 点击 **Add Domain** 或 **Add**
5. 输入您的域名（例如：`example.com` 或 `www.example.com`）
6. Vercel 会显示需要配置的 DNS 记录信息

### Vercel 会提供以下信息：

- **A 记录**：指向 Vercel 的 IP 地址
- **CNAME 记录**：指向 Vercel 的 CNAME（例如：`cname.vercel-dns.com`）

**推荐配置**：
- 对于根域名（`example.com`）：使用 **A 记录**
- 对于子域名（`www.example.com`）：使用 **CNAME 记录**

## 步骤 2: 在 Cloudflare 中配置 DNS 记录

### 选项 A：使用 A 记录（根域名）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择您的域名
3. 进入 **DNS** → **Records**
4. 点击 **Add record**

配置根域名：
- **Type**: `A`
- **Name**: `@` 或留空（表示根域名）
- **IPv4 address**: 输入 Vercel 提供的 IP 地址（通常是 `76.76.21.21`）
- **Proxy status**: ⚠️ **关闭代理**（灰色云朵，DNS only）
- **TTL**: `Auto`

### 选项 B：使用 CNAME 记录（推荐用于子域名）

配置 www 子域名：
- **Type**: `CNAME`
- **Name**: `www`
- **Target**: 输入 Vercel 提供的 CNAME（例如：`cname.vercel-dns.com`）
- **Proxy status**: ⚠️ **关闭代理**（灰色云朵，DNS only）
- **TTL**: `Auto`

### 选项 C：使用 CNAME Flattening（Cloudflare 根域名推荐方案）

Cloudflare 支持 CNAME Flattening，可以将根域名指向 CNAME：

1. 在 Cloudflare DNS 中添加记录：
   - **Type**: `CNAME`
   - **Name**: `@`
   - **Target**: Vercel 提供的 CNAME（例如：`cname.vercel-dns.com`）
   - **Proxy status**: ⚠️ **关闭代理**
   - **TTL**: `Auto`

**注意**：确保在 Cloudflare 的 **DNS** → **Settings** 中启用了 **CNAME Flattening**

## 步骤 3: Cloudflare SSL/TLS 设置

### 重要：Cloudflare 代理设置

⚠️ **如果 Cloudflare 代理开启（橙色云朵）**：
- SSL/TLS 模式应设置为：**Full (strict)** 或 **Full**
- 位置：**SSL/TLS** → **Overview** → **SSL/TLS encryption mode**

⚠️ **如果 Cloudflare 代理关闭（灰色云朵，推荐）**：
- SSL/TLS 模式可以是任何模式（因为流量直接到达 Vercel）
- Vercel 会自动提供 SSL 证书

### 推荐配置（DNS only，灰色云朵）

1. 确保 DNS 记录的代理状态为 **DNS only**（灰色云朵）
2. Cloudflare SSL/TLS 模式可以是 **Flexible**（但不影响，因为流量不经过 Cloudflare）
3. Vercel 会自动处理 SSL 证书

## 步骤 4: 等待 DNS 传播

1. DNS 更改通常需要 **几分钟到几小时** 才能生效
2. 可以在 Vercel Dashboard 的 **Domains** 页面查看域名状态
3. 状态会显示：
   - ⏳ **Pending**：等待 DNS 配置
   - ✅ **Valid**：配置成功
   - ❌ **Invalid**：配置有问题

## 步骤 5: 验证配置

1. 在浏览器中访问您的域名
2. 检查是否正常加载
3. 检查 SSL 证书（应该看到锁定图标）

## 常见问题排查

### 问题 1: 域名显示 "Invalid Configuration"

**原因**：
- DNS 记录未正确配置
- 使用了错误的 IP 地址或 CNAME
- Cloudflare 代理开启但 SSL 模式不正确

**解决方案**：
1. 检查 Cloudflare DNS 记录是否正确
2. 确认 IP/CNAME 与 Vercel 提供的一致
3. 如果使用代理，确保 SSL 模式为 Full 或 Full (strict)

### 问题 2: 网站无法访问

**检查清单**：
1. DNS 记录是否正确指向 Vercel
2. 等待足够时间让 DNS 传播（最多 24-48 小时）
3. 使用 `dig` 或 `nslookup` 命令检查 DNS 解析
4. 清除浏览器 DNS 缓存

### 问题 3: SSL 证书问题

**如果 Cloudflare 代理关闭（推荐）**：
- Vercel 会自动提供 SSL 证书
- 等待 SSL 证书生成（通常几分钟）

**如果 Cloudflare 代理开启**：
- 使用 Cloudflare 的 SSL/TLS 设置
- 确保模式设置为 Full 或 Full (strict)

### 问题 4: 根域名和 www 都要配置

**推荐配置**：
```
A 记录 或 CNAME（@） → Vercel（根域名）
CNAME（www） → Vercel CNAME（www 子域名）
```

**或者使用重定向**：
- 在 Vercel 中配置重定向规则，将 `www` 重定向到根域名，反之亦然

## 推荐的最终配置

### 方案 1：DNS only（推荐，性能最佳）

```
Cloudflare DNS:
  @ (CNAME) → cname.vercel-dns.com [DNS only - 灰色云朵]
  www (CNAME) → cname.vercel-dns.com [DNS only - 灰色云朵]

Cloudflare SSL/TLS: 任意模式（不影响）
```

### 方案 2：使用 Cloudflare 代理

```
Cloudflare DNS:
  @ (A) → 76.76.21.21 [Proxied - 橙色云朵]
  www (CNAME) → cname.vercel-dns.com [Proxied - 橙色云朵]

Cloudflare SSL/TLS: Full (strict)
```

## Vercel 配置检查

确保您的 `vercel.json` 配置正确。对于 SvelteKit 项目，应该使用：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".svelte-kit/output",
  "framework": "sveltekit",
  "installCommand": "npm install --legacy-peer-deps"
}
```

## 参考链接

- [Vercel 域名文档](https://vercel.com/docs/concepts/projects/domains)
- [Cloudflare DNS 文档](https://developers.cloudflare.com/dns/)
- [Cloudflare SSL/TLS 设置](https://developers.cloudflare.com/ssl/ssl-modes/)

