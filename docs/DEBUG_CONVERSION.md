# 转换功能诊断指南

在浏览器控制台（F12）中运行以下代码来诊断转换功能问题。

## ⚠️ 重要提示

如果遇到 `Invalid locale` 错误，请先运行以下代码清理无效的 locale：

```javascript
// 清理无效的 locale（必须先运行）
const validLocales = ['en', 'es', 'fr', 'de', 'it', 'hr', 'tr', 'ja', 'ko', 'el', 'id', 'zh-Hans', 'zh-Hant', 'pt-BR'];
const storedLocale = localStorage.getItem('locale');
if (storedLocale && !validLocales.includes(storedLocale)) {
  console.log(`⚠️ 发现无效的 locale: ${storedLocale}，已清理`);
  localStorage.removeItem('locale');
  console.log('✅ 已清理，请刷新页面后重试');
} else {
  console.log('✅ locale 设置正常');
}
```

## 1. 检查所有转换器状态（安全版本，不会触发 locale 错误）

```javascript
// 安全版本：只检查转换器，不导入 store
(async () => {
  try {
    const { converters } = await import('/src/lib/converters/index.ts');
    console.log('=== 转换器状态 ===');
    converters.forEach(c => {
      console.log(`${c.name}: ${c.status}`, {
        status: c.status,
        ready: c.ready || 'N/A',
        supportedFormats: c.supportedFormats.length,
        reportsProgress: c.reportsProgress
      });
    });
  } catch (error) {
    console.error('导入转换器时出错:', error);
  }
})();
```

## 2. 检查 files store 状态（安全版本）

```javascript
// 安全版本：先清理无效的 locale，再导入 store
(async () => {
  try {
    // 先清理可能存在的无效 locale
    const storedLocale = localStorage.getItem('locale');
    const validLocales = ['en', 'es', 'fr', 'de', 'it', 'hr', 'tr', 'ja', 'ko', 'el', 'id', 'zh-Hans', 'zh-Hant', 'pt-BR'];
    if (storedLocale && !validLocales.includes(storedLocale)) {
      console.log(`⚠️ 发现无效的 locale: ${storedLocale}，已清理`);
      localStorage.removeItem('locale');
    }
    
    const { files } = await import('/src/lib/store/index.svelte.ts');
    console.log('=== Files Store 状态 ===');
    console.log('文件数量:', files.files.length);
    console.log('files.ready:', files.ready);
    console.log('requiredConverters:', files.requiredConverters);
    console.log('requiredConverters 状态:', 
      files.requiredConverters.map(c => `${c.name}: ${c.status}`)
    );
    
    if (files.files.length > 0) {
      console.log('=== 文件详情 ===');
      files.files.forEach((file, i) => {
        console.log(`文件 ${i + 1}:`, {
          name: file.name,
          from: file.from,
          to: file.to,
          processing: file.processing,
          converters: file.converters.map(c => `${c.name}(${c.status})`),
          findConverter: file.findConverter()?.name || 'null'
        });
      });
    }
  } catch (error) {
    console.error('导入 files store 时出错:', error);
    console.log('💡 提示: 可能是 locale 错误，请先运行清理代码');
  }
})();
```

## 3. 检查转换器加载详情

```javascript
// 检查每个转换器的详细状态
(async () => {
  const { converters } = await import('/src/lib/converters/index.ts');
  
  console.log('=== 转换器详细状态 ===');
  for (const converter of converters) {
    console.group(`${converter.name} (${converter.status})`);
    console.log('状态:', converter.status);
    console.log('ready:', converter.ready || 'N/A');
    console.log('支持的格式数量:', converter.supportedFormats.length);
    console.log('支持进度报告:', converter.reportsProgress);
    
    // 检查特定转换器的属性
    if (converter.name === 'ffmpeg') {
      console.log('FFmpeg 实例:', converter.ffmpeg ? '已创建' : '未创建');
    }
    if (converter.name === 'imagemagick') {
      console.log('WASM 已加载:', converter.wasm ? '是' : '否');
    }
    if (converter.name === 'pandoc') {
      console.log('WASM 已加载:', converter.wasm ? '是' : '否');
    }
    
    console.groupEnd();
  }
})();
```

## 4. 检查网络请求（WASM 文件）

```javascript
// 检查 WASM 文件是否成功加载
console.log('=== 检查 WASM 文件 ===');

// 检查 pandoc.wasm
fetch('/pandoc.wasm', { method: 'HEAD' })
  .then(r => console.log('pandoc.wasm:', r.ok ? '✓ 可访问' : `✗ 错误 ${r.status}`))
  .catch(e => console.log('pandoc.wasm:', '✗ 无法访问', e));

// 检查 ImageMagick WASM
fetch('/node_modules/@imagemagick/magick-wasm/dist/magick.wasm', { method: 'HEAD' })
  .then(r => console.log('magick.wasm:', r.ok ? '✓ 可访问' : `✗ 错误 ${r.status}`))
  .catch(e => console.log('magick.wasm:', '✗ 无法访问', e));

// 检查 FFmpeg CDN
fetch('https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm', { method: 'HEAD' })
  .then(r => console.log('ffmpeg-core.wasm (CDN):', r.ok ? '✓ 可访问' : `✗ 错误 ${r.status}`))
  .catch(e => console.log('ffmpeg-core.wasm (CDN):', '✗ 无法访问', e));
```

## 5. 完整诊断脚本（一键运行）

```javascript
// 完整诊断 - 复制粘贴整个代码块运行
(async () => {
  console.log('🔍 开始诊断转换功能...\n');
  
  try {
    // 1. 检查转换器
    const { converters } = await import('/src/lib/converters/index.ts');
    console.log('📦 转换器列表:');
    converters.forEach(c => {
      const statusIcon = c.status === 'ready' ? '✅' : c.status === 'downloading' ? '⏳' : c.status === 'error' ? '❌' : '⚠️';
      console.log(`  ${statusIcon} ${c.name}: ${c.status}`);
    });
    
    // 2. 检查 files store
    const { files } = await import('/src/lib/store/index.svelte.ts');
    console.log('\n📁 Files Store:');
    console.log(`  文件数量: ${files.files.length}`);
    console.log(`  ready: ${files.ready ? '✅' : '❌'}`);
    console.log(`  需要的转换器: ${files.requiredConverters.length}`);
    
    if (files.requiredConverters.length > 0) {
      console.log('  转换器状态:');
      files.requiredConverters.forEach(c => {
        const statusIcon = c.status === 'ready' ? '✅' : '❌';
        console.log(`    ${statusIcon} ${c.name}: ${c.status}`);
      });
    }
    
    if (files.files.length > 0) {
      console.log('\n📄 已上传的文件:');
      files.files.forEach((file, i) => {
        const converter = file.findConverter();
        console.log(`  ${i + 1}. ${file.name}`);
        console.log(`     格式: ${file.from} → ${file.to}`);
        console.log(`     转换器: ${converter ? converter.name + ' (' + converter.status + ')' : '未找到'}`);
        console.log(`     处理中: ${file.processing ? '是' : '否'}`);
        console.log(`     可用转换器: ${file.converters.map(c => c.name).join(', ')}`);
      });
    }
    
    // 3. 检查环境变量
    console.log('\n⚙️ 环境配置:');
    try {
      const { DISABLE_ALL_EXTERNAL_REQUESTS } = await import('/src/lib/util/consts.ts');
      console.log(`  禁用外部请求: ${DISABLE_ALL_EXTERNAL_REQUESTS ? '是' : '否'}`);
    } catch (e) {
      console.log('  无法读取环境配置');
    }
    
    // 4. 总结
    console.log('\n📊 诊断总结:');
    const allReady = converters.every(c => c.status === 'ready');
    console.log(`  所有转换器就绪: ${allReady ? '✅' : '❌'}`);
    
    if (!allReady) {
      const notReady = converters.filter(c => c.status !== 'ready');
      console.log(`  未就绪的转换器: ${notReady.map(c => c.name).join(', ')}`);
    }
    
    if (files.files.length > 0 && !files.ready) {
      console.log('  ⚠️ 有文件但转换按钮被禁用');
      console.log('  原因可能是:');
      if (files.requiredConverters.some(c => c.status !== 'ready')) {
        console.log('    - 转换器未就绪');
      }
      if (files.files.some(f => f.processing)) {
        console.log('    - 有文件正在处理');
      }
    }
    
  } catch (error) {
    console.error('❌ 诊断过程中出错:', error);
  }
})();
```

## 6. 实时监控转换器状态

```javascript
// 每2秒检查一次转换器状态
const monitor = setInterval(async () => {
  const { converters } = await import('/src/lib/converters/index.ts');
  const statuses = converters.map(c => `${c.name}:${c.status}`).join(' | ');
  console.log(`[${new Date().toLocaleTimeString()}] ${statuses}`);
  
  // 如果所有转换器都就绪，停止监控
  if (converters.every(c => c.status === 'ready')) {
    console.log('✅ 所有转换器已就绪！');
    clearInterval(monitor);
  }
}, 2000);

// 30秒后自动停止
setTimeout(() => {
  clearInterval(monitor);
  console.log('⏹️ 监控已停止');
}, 30000);
```

## 7. 测试转换功能

```javascript
// 创建一个测试文件并尝试转换
(async () => {
  const { files } = await import('/src/lib/store/index.svelte.ts');
  
  // 创建一个测试图片文件（1x1 像素的 PNG）
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 1, 1);
  
  canvas.toBlob(async (blob) => {
    const testFile = new File([blob], 'test.png', { type: 'image/png' });
    files.add(testFile);
    
    console.log('✅ 测试文件已添加');
    console.log('files.ready:', files.ready);
    console.log('文件数量:', files.files.length);
    
    if (files.files.length > 0) {
      const file = files.files[0];
      console.log('文件转换器:', file.converters.map(c => c.name));
      console.log('找到的转换器:', file.findConverter()?.name);
    }
  });
})();
```

## 常见问题排查

### 问题1: 所有转换器状态都是 "not-ready"
**可能原因**: 超时（30秒内未完成加载）
**解决方案**: 检查网络连接，确保可以访问 CDN

### 问题2: 转换器状态是 "error"
**可能原因**: WASM 文件下载失败
**解决方案**: 
- 检查 Network 标签查看失败的请求
- 检查浏览器控制台的错误信息

### 问题3: 转换器状态是 "downloading" 但一直不变化
**可能原因**: 网络慢或 CDN 无法访问
**解决方案**: 
- 检查网络连接
- 尝试访问 `https://cdn.jsdelivr.net` 确认是否可访问

### 问题4: files.ready 是 false 但转换器都是 ready
**可能原因**: 
- 文件没有找到合适的转换器
- requiredConverters 计算有问题
**解决方案**: 运行诊断脚本查看详细信息


