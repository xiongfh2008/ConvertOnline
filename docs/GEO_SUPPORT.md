# 地理位置（GEO）支持说明

## 概述

ConvertOnline 网站支持两种地理位置检测方式：

1. **基于IP的地理位置检测**（默认，已启用）
   - 使用 `ipapi.co` API 获取用户地理位置
   - 无需用户授权
   - 精度：城市级别（通常几公里到几十公里）
   - 已用于自动选择最近的视频转换服务器

2. **浏览器 Geolocation API**（可选，需要用户授权）
   - 使用浏览器的 GPS/WiFi/基站定位
   - 需要用户明确授权
   - 精度：通常几米到几十米
   - 更准确但需要用户同意

## 当前功能

### 1. 自动选择最优服务器
网站已实现根据用户地理位置自动选择最近的视频转换服务器：
- 欧洲用户 → EU 服务器（德国）
- 美国用户 → US 服务器（华盛顿）
- 使用 Haversine 公式计算距离

### 2. 地理位置信息获取
通过 `src/lib/util/ip.ts` 中的 `ip()` 函数获取：
- 国家、城市、地区
- 经纬度坐标
- 时区、货币、语言
- IP 地址信息

## 如何使用浏览器 Geolocation API

### 基本用法

```typescript
import { getCurrentPosition, isGeolocationSupported } from '$lib/util/geolocation';

// 检查是否支持
if (isGeolocationSupported()) {
  try {
    const position = await getCurrentPosition({
      enableHighAccuracy: true,  // 使用高精度定位
      timeout: 10000,            // 10秒超时
      maximumAge: 60000         // 缓存1分钟
    });
    
    console.log('纬度:', position.latitude);
    console.log('经度:', position.longitude);
    console.log('精度:', position.accuracy, '米');
  } catch (error) {
    console.error('获取位置失败:', error.message);
  }
}
```

### 在设置中使用

```typescript
import { ip } from '$lib/util/ip';

// 使用浏览器定位增强IP定位
const locationInfo = await ip(true); // 传入 true 启用浏览器定位

if (locationInfo.useBrowserGeolocation) {
  console.log('使用了浏览器定位，精度:', locationInfo.browserAccuracy, '米');
} else {
  console.log('使用IP定位');
}
```

### 监听位置变化

```typescript
import { watchPosition, clearWatch } from '$lib/util/geolocation';

const watchId = watchPosition((position) => {
  console.log('位置更新:', position.latitude, position.longitude);
}, {
  enableHighAccuracy: true
});

// 停止监听
clearWatch(watchId);
```

## 配置说明

### Nginx 配置

已更新 `nginx/default.conf` 和 `nginx/default-ssl.conf`：
- 将 `geolocation=()` 改为 `geolocation=(self)`
- 允许同源使用 Geolocation API

### 隐私考虑

1. **用户授权**：浏览器 Geolocation API 需要用户明确授权
2. **权限状态**：可以使用 `checkGeolocationPermission()` 检查权限状态
3. **降级处理**：如果用户拒绝或浏览器不支持，自动降级到IP定位

## 应用场景建议

### 1. 服务器选择优化
当前已实现，可以进一步优化：
- 使用更精确的浏览器定位选择服务器
- 考虑网络延迟而不仅仅是地理距离

### 2. 内容本地化
- 根据地理位置显示本地化内容
- 自动选择语言和货币

### 3. 合规性
- 根据地理位置应用不同的隐私政策
- GDPR 地区特殊处理

### 4. 性能优化
- 根据地理位置预加载资源
- CDN 节点选择

## 注意事项

1. **HTTPS 要求**：浏览器 Geolocation API 仅在 HTTPS 环境下工作（localhost 除外）
2. **用户隐私**：始终向用户说明为什么需要位置信息
3. **降级策略**：始终提供IP定位作为备选方案
4. **性能影响**：高精度定位可能消耗更多电池和需要更长时间

## 示例：在设置页面中添加位置显示

```svelte
<script lang="ts">
  import { ip } from '$lib/util/ip';
  import { getCurrentPosition, isGeolocationSupported } from '$lib/util/geolocation';
  
  let locationInfo = $state<IpInfo | null>(null);
  let useBrowserGeo = $state(false);
  
  async function loadLocation() {
    locationInfo = await ip(useBrowserGeo);
  }
  
  async function requestBrowserLocation() {
    if (isGeolocationSupported()) {
      try {
        const pos = await getCurrentPosition();
        alert(`您的位置: ${pos.latitude}, ${pos.longitude}`);
        useBrowserGeo = true;
        await loadLocation();
      } catch (error) {
        alert('无法获取位置: ' + error.message);
      }
    }
  }
</script>

{#if locationInfo}
  <p>国家: {locationInfo.country_name}</p>
  <p>城市: {locationInfo.city}</p>
  <p>坐标: {locationInfo.latitude}, {locationInfo.longitude}</p>
  {#if locationInfo.useBrowserGeolocation}
    <p>精度: {locationInfo.browserAccuracy} 米（浏览器定位）</p>
  {/if}
{/if}

<button onclick={requestBrowserLocation}>
  使用精确位置
</button>
```

