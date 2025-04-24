# AI塔罗牌在线占卜平台

这是一个基于HTML、CSS和JavaScript开发的前端AI塔罗牌占卜平台网站。该平台提供免费在线AI塔罗牌占卜服务，用户可以选择不同类型的塔罗牌解读，包括三张牌解读、发展解读、十字架解读以及单张牌的是非问题解读。

## 功能特点

- 响应式设计，适配各种屏幕尺寸的设备
- 支持中文和英文两种语言界面
- 多种塔罗牌解读方式
  - 三张牌解读（过去、现在、未来）
  - 发展解读（五张牌）
  - 十字架解读（五张牌）
  - 是非问题单张牌解读
- 交互式塔罗牌抽取界面
- 模拟AI塔罗师解读对话
- 支持保存和分享塔罗解读结果
- 用户故事分享功能

## 项目结构

```
ai-tarot09/
├── index.html                # 中文主页
├── index-eng.html            # 英文主页
├── ai-taluopai.html          # 中文塔罗牌选择页面
├── ai-taluopai-eng.html      # 英文塔罗牌选择页面
├── tarot-question.html       # 中文问题输入页面
├── tarot-question-eng.html   # 英文问题输入页面
├── tarot-drawing.html        # 中文塔罗牌抽取界面
├── tarot-drawing-eng.html    # 英文塔罗牌抽取界面
├── tarot-reading.html        # 中文塔罗牌解读页面
├── tarot-reading-eng.html    # 英文塔罗牌解读页面
├── yes-no-tarot.html         # 中文是非塔罗牌选择页面
├── yes-no-tarot-eng.html     # 英文是非塔罗牌选择页面
├── yes-no-question.html      # 中文是非问题输入页面
├── yes-no-question-eng.html  # 英文是非问题输入页面
├── yes-no-result.html        # 中文是非问题结果页面
├── yes-no-result-eng.html    # 英文是非问题结果页面
├── stories.html              # 故事分享页面
├── css/
│   ├── styles.css            # 全局样式文件
│   ├── subscription-fix.css  # 会员订阅弹窗样式修复
│   └── page-styles/          # 页面特定样式文件目录
│       ├── ai-taluopai.css
│       ├── tarot-drawing.css
│       ├── tarot-question-eng.css
│       ├── tarot-reading-eng.css
│       ├── yes-no-question.css
│       └── yes-no-tarot.css
├── js/
│   ├── navbar.js             # 导航栏功能
│   ├── script.js             # 主要JavaScript功能实现
│   ├── subscription.js       # 订阅相关功能
│   ├── tarot-drawing.js      # 塔罗牌抽取功能
│   ├── test-subscription.js  # 订阅测试脚本
│   └── story-sharing.js      # 故事分享功能
└── images/                   # 图片资源文件夹
    └── 塔罗牌图片和其他资源
```

## 页面链路结构

### 中文版页面链路

1. 首页 (`index.html`)
   - → AI塔罗占卜 (`ai-taluopai.html`)
     - → 问题输入 (`tarot-question.html`)
       - → 塔罗牌阵选择 (`tarot-reading.html`)
         - → 抽牌页面 (`tarot-drawing.html`)
   - → 是否塔罗占卜 (`yes-no-tarot.html`)
     - → 是否问题输入 (`yes-no-question.html`)
       - → 结果页面 (`yes-no-result.html`)
   - → 故事分享 (`stories.html`)

### 英文版页面链路

1. 首页 (`index-eng.html`)
   - → AI Tarot Reading (`ai-taluopai-eng.html`)
     - → 问题输入 (`tarot-question-eng.html`)
       - → 塔罗牌阵选择 (`tarot-reading-eng.html`)
         - → 抽牌页面 (`tarot-drawing-eng.html`)
   - → Yes/No Tarot (`yes-no-tarot-eng.html`)
     - → 是否问题输入 (`yes-no-question-eng.html`)
       - → 结果页面 (`yes-no-result-eng.html`)
   - → Stories (`stories.html`)

## 语言切换

所有页面均支持中英文切换:
- index.html ↔ index-eng.html
- ai-taluopai.html ↔ ai-taluopai-eng.html
- tarot-question.html ↔ tarot-question-eng.html
- tarot-reading.html ↔ tarot-reading-eng.html
- tarot-drawing.html ↔ tarot-drawing-eng.html
- yes-no-tarot.html ↔ yes-no-tarot-eng.html
- yes-no-question.html ↔ yes-no-question-eng.html
- yes-no-result.html ↔ yes-no-result-eng.html

## 快速开始

1. 克隆或下载此项目到本地
2. 在浏览器中打开`index.html`（中文）或`index-eng.html`（英文）文件即可访问网站

## 功能模块

### 多种塔罗牌解读方式

- **三张牌解读**：代表过去、现在和未来
- **发展解读**：使用五张牌进行更详细的解读
- **十字架解读**：使用五张牌进行全面的解读
- **是非问题解读**：通过单张牌回答是或否的问题

### 交互式塔罗牌抽取

用户可以在虚拟环境中抽取塔罗牌，系统会随机选择牌面并提供动画效果，增强用户体验。

### AI模拟对话解读

系统模拟塔罗师根据抽取的牌面进行解读，为用户提供个性化的指导和建议。

### 故事分享功能

用户可以浏览其他人的塔罗牌解读经历和故事，也可以分享自己的故事。

## 兼容性

本项目兼容现代浏览器，包括：

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 未来计划

- 集成真实AI解读功能
- 添加更多塔罗牌阵列和解读方式
- 添加详细的塔罗牌历史和知识库
- 增加用户账户系统，保存历史解读记录 