# 配置 convertonline.toolkitlife.com 到 Vercel

本指南专门针对将子域名 `convertonline.toolkitlife.com` 配置到 Vercel 的步骤。

## 步骤 1: 在 Vercel 中添加域名

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目（ConvertOnline）
3. 进入 **Settings** → **Domains**
4. 点击 **Add Domain** 或 **Add** 按钮
5. 输入域名：`convertonline.toolkitlife.com`
6. 点击 **Add** 或 **Continue**

Vercel 会显示需要配置的 DNS 记录信息，通常类似于：
- **CNAME 记录**: `convertonline.toolkitlife.com` → `cname.vercel-dns.com`
  - 或者显示一个具体的 CNAME 目标，例如：`your-project.vercel.app`

**请记录下 Vercel 提供的具体 CNAME 目标地址！**

## 步骤 2: 在 Cloudflare 中配置 DNS 记录

### 配置步骤

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择域名：`toolkitlife.com`
3. 进入 **DNS** → **Records**
4. 点击 **Add record** 按钮

### DNS 记录配置

配置以下记录：

- **Type（类型）**: `CNAME`
- **Name（名称）**: `convertonline`
- **Target（目标）**: 输入 Vercel 提供的 CNAME 目标
  - 可能是：`cname.vercel-dns.com`
  - 或者：`your-project.vercel.app`（Vercel 会自动替换为正确地址）
- **Proxy status（代理状态）**: ⚠️ **关闭代理**（点击云朵图标，使其变为**灰色云朵**，显示 "DNS only"）
- **TTL**: `Auto` 或 `3600`

### 重要：代理状态设置

⚠️ **必须关闭 Cloudflare 代理（灰色云朵）**，原因：
- Vercel 会自动提供 SSL 证书
- 如果开启 Cloudflare 代理，可能造成 SSL 冲突
- DNS only 模式性能更好，延迟更低

**如何关闭代理**：
- 点击记录右侧的橙色云朵图标
- 使其变为灰色云朵
- 状态应显示 "DNS only"

## 步骤 3: 等待 DNS 传播

1. **保存 DNS 记录后**，等待 DNS 传播
2. 通常需要 **5-30 分钟**，最长可能需要 24 小时
3. 可以在 Vercel Dashboard 的 **Domains** 页面查看配置状态

### 状态说明

- ⏳ **Pending（待处理）**: DNS 记录正在验证中
- ✅ **Valid（有效）**: 配置成功，域名已生效
- ❌ **Invalid Configuration（配置无效）**: 需要检查 DNS 配置

## 步骤 4: 验证配置

### 方法 1: 检查 DNS 解析

在命令行中运行以下命令检查 DNS 解析：

```bash
# Windows PowerShell
nslookup convertonline.toolkitlife.com

# 或者使用 dig（如果已安装）
dig convertonline.toolkitlife.com
```

预期结果应该指向 Vercel 的服务器。

### 方法 2: 在浏览器中访问

1. 等待几分钟让 DNS 生效
2. 在浏览器中访问：`https://convertonline.toolkitlife.com`
3. 如果网站正常加载，说明配置成功

### 方法 3: 在 Vercel Dashboard 查看

在 Vercel Dashboard → Settings → Domains 页面：
- 查看域名状态是否显示为 **Valid**
- 检查是否有任何错误提示

## 步骤 5: SSL 证书（自动处理）

Vercel 会自动为您的域名配置 SSL 证书：
- **无需手动配置**
- 证书会在 DNS 配置生效后自动生成
- 通常需要 **几分钟到几小时**

## 常见问题排查

### 问题 1: 域名显示 "Invalid Configuration"

**可能原因**：
- DNS 记录未正确配置
- CNAME 目标地址错误
- Cloudflare 代理未关闭

**解决方案**：
1. 检查 Cloudflare DNS 记录是否正确
2. 确认 CNAME 目标与 Vercel 提供的一致
3. 确保代理状态为灰色云朵（DNS only）
4. 等待几分钟后刷新 Vercel Dashboard

### 问题 2: 网站无法访问（404 或无法连接）

**检查清单**：
1. ✅ DNS 记录是否正确添加
2. ✅ CNAME 目标是否正确
3. ✅ 等待足够时间让 DNS 传播（至少 5-10 分钟）
4. ✅ 清除浏览器 DNS 缓存
5. ✅ 检查 Vercel 项目是否已成功部署

**清除 DNS 缓存**：
```bash
# Windows
ipconfig /flushdns

# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemd-resolve --flush-caches
```

### 问题 3: SSL 证书错误

**如果使用 DNS only（推荐）**：
- Vercel 会自动处理 SSL
- 等待证书生成（通常几分钟）
- 如果超过 1 小时仍有问题，检查 DNS 配置

**如果开启了 Cloudflare 代理**：
- 需要将 SSL/TLS 模式设置为 **Full (strict)**
- 位置：Cloudflare Dashboard → SSL/TLS → Overview

### 问题 4: 仍然显示旧的网站内容

**原因**：浏览器或 DNS 缓存

**解决方案**：
1. 清除浏览器缓存
2. 使用无痕/隐私模式访问
3. 等待 DNS 完全传播（最多 24 小时）

## 推荐配置总结

### Cloudflare DNS 记录

```
类型: CNAME
名称: convertonline
目标: cname.vercel-dns.com（或 Vercel 提供的具体地址）
代理: 关闭（灰色云朵，DNS only）
TTL: Auto
```

### Cloudflare SSL/TLS 设置

- 如果使用 **DNS only**（推荐）：模式可以是任何模式（不影响）
- 如果使用 **代理**：设置为 **Full (strict)**

## 配置完成后的检查清单

- [ ] Vercel Dashboard 中域名状态显示为 **Valid**
- [ ] Cloudflare DNS 记录已正确添加
- [ ] 代理状态为灰色云朵（DNS only）
- [ ] 浏览器中可以访问 `https://convertonline.toolkitlife.com`
- [ ] SSL 证书正常工作（浏览器显示锁定图标）
- [ ] 网站内容正常加载

## 需要帮助？

如果遇到问题：
1. 检查 Vercel Dashboard 的错误信息
2. 检查 Cloudflare DNS 记录配置
3. 等待足够时间让 DNS 传播
4. 查看 [Vercel 域名文档](https://vercel.com/docs/concepts/projects/domains)

