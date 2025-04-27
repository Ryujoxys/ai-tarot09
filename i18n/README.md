# Tarot09 多语言支持 (i18n)

这个目录包含 Tarot09 项目的多语言支持文件，用于 Next.js 国际化实现。

## 目录结构

```
/i18n
  ├── zh-CN.json  # 简体中文翻译
  ├── en.json     # 英文翻译
  └── README.md   # 本说明文件
```

## 实现方法

在 Next.js 项目中实现多语言支持，需要按照以下步骤配置：

### 1. 安装依赖

```bash
npm install next-i18next react-i18next i18next
```

### 2. 配置 Next.js

在项目根目录创建 `next-i18next.config.js` 文件:

```js
module.exports = {
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    localeDetection: true
  },
  localePath: './i18n'
}
```

更新 `next.config.js` 引入 i18n 配置:

```js
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  // 其他配置...
}
```

### 3. 创建 _app.js 包装

```jsx
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
```

### 4. 在页面中使用翻译

```jsx
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function HomePage() {
  const { t } = useTranslation('common')
  
  return (
    <div>
      <h1>{t('common.siteName')} - {t('common.siteTitle')}</h1>
      <p>{t('common.siteDescription')}</p>
      
      <nav>
        <ul>
          <li>{t('navigation.home')}</li>
          <li>{t('navigation.aiTarot')}</li>
          <li>{t('navigation.yesNoTarot')}</li>
        </ul>
      </nav>
      
      {/* 示例：使用嵌套翻译 */}
      <section>
        <h2>{t('homepage.hero.title1')}</h2>
        <h2>{t('homepage.hero.title2')}</h2>
        <p>{t('homepage.hero.subtitle')}</p>
        <button>{t('homepage.hero.startButton')}</button>
      </section>
    </div>
  )
}

// 这个函数在每个页面都需要
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
```

### 5. 语言切换功能

```jsx
import { useRouter } from 'next/router'

function LanguageSwitcher() {
  const router = useRouter()
  
  const changeLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale })
  }
  
  return (
    <div>
      <button onClick={() => changeLanguage('zh-CN')}>中文</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  )
}
```

## 翻译键值的组织结构

我们的翻译使用嵌套对象结构，按以下分类组织:

- `common`: 网站通用内容，如网站名称、描述等
- `navigation`: 导航菜单项
- `homepage`: 首页相关内容
- `storyModal`: 故事详情弹窗
- `subscription`: 会员订阅相关
- `tarotQuestion`: 塔罗问题页面
- `tarotCards`: 塔罗牌名称

## 使用提示

1. 使用 `t()` 函数获取翻译时，使用点表示法访问嵌套属性，例如 `t('homepage.hero.title1')`
2. 新增内容时，请同时更新 `zh-CN.json` 和 `en.json` 文件
3. 避免在代码中硬编码文本，应该总是使用翻译键
4. 可以使用变量插值: `t('greeting', { name: 'John' })` 搭配 `"greeting": "你好，{{name}}!"` 