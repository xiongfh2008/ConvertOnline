# 域名替换分析报告：vert.sh → convertonline.toolkitlife.com

## 📋 分析概述

本文档分析了将 `vert.sh` 替换为 `convertonline.toolkitlife.com` 的影响范围。

---

## ✅ 需要替换的部分（SEO/网站标识相关）

这些部分需要替换，以正确标识您的网站，并确保搜索引擎和社交媒体正确索引和分享。

### 1. Canonical URLs（所有页面）

**文件位置**：
- `src/routes/+layout.svelte` (第154行)
- `src/routes/about/+page.svelte` (第163行)
- `src/routes/contact/+page.svelte` (第25行)
- `src/routes/convert/+page.svelte` (第157行)
- `src/routes/faq/+page.svelte` (第24行)
- `src/routes/privacy/+page.svelte` (第24行) - ⚠️ 注意：当前是 `toolkitlife.com`，应该改为 `convertonline.toolkitlife.com`
- `src/routes/settings/+page.svelte` (第73行)

**影响**：SEO 关键 - 告诉搜索引擎这是网站的规范 URL

**替换建议**：
```html
<!-- 当前 -->
<link rel="canonical" href="https://vert.sh/" />

<!-- 应该改为 -->
<link rel="canonical" href="https://convertonline.toolkitlife.com/" />
```

### 2. Open Graph Meta Tags（社交媒体分享）

**文件位置**：`src/routes/+layout.svelte`

**需要替换的行**：
- 第130行：`<meta property="og:url" content="https://vert.sh" />`

**影响**：社交媒体分享时显示的 URL（Facebook、LinkedIn 等）

### 3. Twitter Card Meta Tags

**文件位置**：`src/routes/+layout.svelte`

**需要替换的行**：
- 第142行：`<meta property="twitter:domain" content="vert.sh" />`
- 第143行：`<meta property="twitter:url" content="https://vert.sh" />`

**影响**：Twitter 分享时显示的 URL

### 4. JSON-LD 结构化数据

**文件位置**：`src/routes/+layout.svelte`

**需要替换的位置**（在 JSON-LD 中）：
- 第168行：`"url": "https://vert.sh"`
- 第199行：`"url": "https://vert.sh"`（Organization）
- 第200行：`"sameAs": "https://vert.sh"`
- 第213行：`"url": "https://vert.sh"`（WebSite）
- 第216行：`"target": "https://vert.sh/convert/?q={search_term_string}"`（SearchAction）
- 第222行：`"url": "https://vert.sh"`（Publisher）

**影响**：搜索引擎结构化数据（影响搜索结果展示）

### 5. Plausible Analytics 域名默认值

**文件位置**：`src/routes/+layout.svelte`

**第229行**：
```javascript
data-domain={PUB_HOSTNAME || "vert.sh"}
```

**影响**：如果未设置 PUB_HOSTNAME 环境变量，会使用默认值

**替换建议**：
```javascript
data-domain={PUB_HOSTNAME || "convertonline.toolkitlife.com"}
```

---

## ❌ 不应该替换的部分（功能/官方服务）

这些部分应该保持不变，因为它们指向外部服务和官方资源。

### 1. vertd 视频转换服务器地址

**文件位置**：`src/lib/sections/settings/vertdSettings.svelte.ts`

**不应替换**：
- `https://eu.vertd.vert.sh`
- `https://usa.vertd.vert.sh`
- `https://vertd.vert.sh`

**原因**：这是官方的视频转换服务器地址，功能依赖这些服务

### 2. 官方捐赠链接

**文件位置**：
- `src/routes/about/+page.svelte`
- `src/lib/sections/about/Donate.svelte`

**不应替换**：
- `https://donations.vert.sh`
- `OFFICIAL_DONATION_URL = "https://donations.vert.sh"`

**原因**：这是官方捐赠页面，如果您要支持官方项目，应该保持原样

### 3. 官方联系邮箱

**文件位置**：`src/lib/sections/about/Sponsors.svelte`

**不应替换**：
- `hello@vert.sh`

**原因**：这是官方联系邮箱

### 4. 分析链接（Plausible Analytics）

**文件位置**：`src/lib/sections/settings/Privacy.svelte`

**不应替换**：
- `https://ats.vert.sh/vert.sh`

**原因**：这是官方的分析统计链接

---

## 🔧 功能影响分析

### ✅ 替换后不会影响的功能

1. **文件转换功能**：完全不受影响
   - 图片、音频、文档转换（本地处理）
   - 视频转换（使用 vertd 服务器，保持不变）

2. **用户界面功能**：完全不受影响
   - 所有页面功能正常
   - 设置、转换、上传等功能正常

3. **本地存储**：完全不受影响
   - 缓存、设置存储等正常

### ⚠️ 需要注意的影响

1. **SEO 影响**（正面）：
   - ✅ 正确设置 canonical URL 有助于搜索引擎理解您的网站
   - ✅ 社交媒体分享会显示正确的域名
   - ⚠️ 需要确保所有页面都更新了 canonical URL

2. **环境变量配置**：
   - ✅ 建议在 Vercel 中设置 `PUB_HOSTNAME=convertonline.toolkitlife.com`
   - ✅ 这样代码中的 `PUB_HOSTNAME || "convertonline.toolkitlife.com"` 会使用环境变量值

---

## 📝 替换清单

### 需要替换的文件和位置

#### `src/routes/+layout.svelte`
- [ ] 第130行：`og:url`
- [ ] 第142行：`twitter:domain`
- [ ] 第143行：`twitter:url`
- [ ] 第154行：`canonical`
- [ ] 第168行：JSON-LD `url`（WebApplication）
- [ ] 第199行：JSON-LD `url`（Organization）
- [ ] 第200行：JSON-LD `sameAs`（Organization）
- [ ] 第213行：JSON-LD `url`（WebSite）
- [ ] 第216行：JSON-LD `target`（SearchAction）
- [ ] 第222行：JSON-LD `url`（Publisher）
- [ ] 第229行：`data-domain` 默认值

#### `src/routes/about/+page.svelte`
- [ ] 第163行：`canonical`

#### `src/routes/contact/+page.svelte`
- [ ] 第25行：`canonical`
- [ ] 第32行：JSON-LD `url`
- [ ] 第37行：JSON-LD `url`

#### `src/routes/convert/+page.svelte`
- [ ] 第157行：`canonical`

#### `src/routes/faq/+page.svelte`
- [ ] 第24行：`canonical`

#### `src/routes/privacy/+page.svelte`
- [ ] 第24行：`canonical`（当前是 `toolkitlife.com`，需要改为完整域名）

#### `src/routes/settings/+page.svelte`
- [ ] 第73行：`canonical`

---

## 🎯 推荐方案

### 方案 A：直接替换硬编码 URL（推荐用于单域名部署）

**适用场景**：您的网站只会在 `convertonline.toolkitlife.com` 上运行

**操作**：
1. 将所有 SEO 相关的 `vert.sh` 替换为 `convertonline.toolkitlife.com`
2. 保持功能相关的外部服务 URL 不变
3. 在 Vercel 环境变量中设置 `PUB_HOSTNAME=convertonline.toolkitlife.com`

### 方案 B：使用环境变量动态生成（推荐用于多域名部署）

**适用场景**：网站可能在多个域名上运行

**操作**：
1. 创建辅助函数生成基础 URL
2. 使用 `PUB_HOSTNAME` 环境变量
3. 所有 URL 使用函数生成，而不是硬编码

---

## ⚠️ 重要注意事项

1. **不要替换外部服务 URL**：
   - vertd 服务器地址必须保持原样
   - 官方捐赠链接可以保持原样（除非您有自己的捐赠页面）

2. **确保环境变量配置**：
   - 在 Vercel 项目设置中添加 `PUB_HOSTNAME=convertonline.toolkitlife.com`

3. **测试验证**：
   - 部署后检查所有页面的 canonical URL
   - 验证社交媒体分享是否正确显示新域名
   - 检查 JSON-LD 结构化数据

4. **隐私页面注意**：
   - `src/routes/privacy/+page.svelte` 中的 canonical URL 当前是 `toolkitlife.com`，应该改为完整的 `convertonline.toolkitlife.com`

---

## ✅ 结论

**可以安全替换**：所有 SEO 相关的 URL（canonical、og:url、twitter:url、JSON-LD 等）

**不会影响功能**：文件转换、用户界面、设置等所有功能都不会受到影响

**建议操作**：
1. ✅ 替换所有 SEO 相关的 URL
2. ✅ 保持外部服务 URL 不变
3. ✅ 配置 Vercel 环境变量 `PUB_HOSTNAME`
4. ✅ 测试验证所有页面

