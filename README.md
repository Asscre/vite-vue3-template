---
theme: channing-cyan
---

## 前言

大家好，我是 Asscre。

近期接手一个 Web 前端项目，通过对公司人员的技术栈和 Javascript 掌握程度分析决定选择 Vue3 框架进项目搭建。

在这里，总结一下本次技术选型后的架构搭建过程。

## 思路

之前一直使用的 Vue2（long long ago）,现在我们也通过之前的开发经验进行搭建。

- 框架： [Vue3](https://v3.cn.vuejs.org/)
- api 请求： [Axios](https://axios-http.com/)
- 路由管理： [Vue-router](https://router.vuejs.org/)
- 状态管理：[Vuex](https://vuex.vuejs.org/)
- Css 库：[Tailwind css](https://tailwindcss.com/)
- UI 组件库：[Element UI](https://element-plus.gitee.io/zh-CN/)
- 代码检查： [Eslint](https://eslint.org/)
- 代码格式化： [Prettier](https://prettier.io/)

下面，我们就对项目架构依次搭建起来。

## 撸一个基础项目出来

### 初始化项目，安装 Vue3

```cmd
npm create vite@latest
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4485a09148b428080656d63bd466609~tplv-k3u1fbpfcp-watermark.image?)

```cmd
// 安装依赖
npm i

// run
npm run dev
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7d610f1a09e40f387124b4ff1626da1~tplv-k3u1fbpfcp-watermark.image?)

### api 请求： Axios

```
npm install axios
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52efa36e22c14cc19274bdb2d927ff27~tplv-k3u1fbpfcp-watermark.image?)

### 路由管理：Vue-router

```cmd
npm install vue-router@4
```

创建 3 个页面

```vue
// home page
<template>
  <div>home page</div>
  <button @click="toAbout">toAbout</button>
</template>

<script setup>
import router from '../routes';

const toAbout = () => {
  router.push('./about');
};
</script>

// about page
<template>
  <div>about page</div>
  <button @click="toHome">toHome</button>
</template>

<script setup>
import router from '../routes';

const toHome = () => {
  router.push('/');
};
</script>

// 404 page
<template>
  <div>404</div>
</template>
```

初始化路由

```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import About from '../pages/about.vue';
import NotFound from '../pages/not-found.vue';

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'Home' },
  },
  {
    path: '/About',
    component: About,
    meta: { title: 'About' },
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  { path: '/:path(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log("路由全局前置守卫", to, from);
  next();
});

// 路由全局后置守卫
router.afterEach((to, from, next) => {
  console.log('路由全局后置守卫', to, from);
  next();
});

export default router;
```

注册路由

/main.js

```js
import { createApp } from 'vue';
// import './tailwind.css';
import App from './App.vue';
import router from './routes';

createApp(App).use(router).mount('#app');
```

src/App.vue

```vue
<template>
  <router-view />
</template>
```

> 效果展示：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6f379a1b2b74c38bb58eed8b2d18c2e~tplv-k3u1fbpfcp-watermark.image?)

### 状态管理： Vuex

```cmd
npm install vuex@next --save
```

初始化 vuex,src/store/index.js

```js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export default store;
```

挂载：

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';

createApp(App).use(router).use(store).mount('#app');
```

使用：

```vue
<template>
  <div>home page</div>
  <p>{{ store.state.count }}</p>
  <button @click="toAbout">toAbout</button>
  <button @click="increment">+</button>
</template>

<script setup>
import router from '../routes';
import store from '../store';

const toAbout = () => {
  router.push('./about');
};

const increment = () => {
  store.commit('increment');
  console.log(store.state.count);
};
</script>
```

效果：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1543af48c2048d5b975f5b90aae686c~tplv-k3u1fbpfcp-watermark.image?)

### Css 库：Tailwind css

Tailwind CSS 的工作原理是扫描您的所有 HTML 文件、JavaScript 组件和任何其他模板以查找类名，生成相应的样式，然后将它们写入静态 CSS 文件。

生成的样式是原子级的 Css。

- 安装 Tailwind css
  因为我们使用的 vite 创建的工程项目，既然要便于开发者快速响应开发，我们就要使用到**PostCSS** 帮助我们快速监听生成 css 样式。
  > 通过 npm 安装`tailwindcss`及其对等依赖项，并创建您的文件。 `tailwind.config.js`

```cmd
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

> 添加`tailwindcss`和`autoprefixer`到您的文件，或在您的项目中配置 PostCSS 的任何位置。 `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

> 在文件中添加所有模板文件的路径`tailwind.config.js`。

```
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

> `@tailwind`将 Tailwind 的每个层的指令添加到您的主 CSS 文件中。
> /index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> `npm run dev`使用文件中配置的命令或任何命令运行构建过程`package.json`。

```cmd
npm run dev
```

> /main.js 中引入 tailwindcss

```js
import './tailwindcss.css';
```

修改一下 home page 代码，效果：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5684a236b3504067b1060f89b32ba578~tplv-k3u1fbpfcp-watermark.image?)

### UI 组件库: 按需导入 Element UI

```
npm install -D unplugin-vue-components unplugin-auto-import
```

> 在 vite.config.js 中导入 element

```
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});

```

### 代码格式化：Prettier

```
npm install --save-dev --save-exact prettier
```

**接下来我们将为 prettier 创建一个配置文件**。

因为 prettier 的目标是开箱即用的配置，所以该配置文件的内容可以只是一个空对象。我们只是添加它，因为一些 IDE 使用它的存在来检测更漂亮。如果您想配置 Prettier 确实提供的少数选项之一，请参阅[配置选项的 Prettier 文档](https://prettier.io/docs/en/options.html)。

```
echo {}> .prettierrc.json
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/604dd1038dd24a119e03960f00386d7d~tplv-k3u1fbpfcp-watermark.image?)

### 代码检查：Eslint

```
npm install --save-dev eslint eslint-plugin-vue
```

**接下来，我们将**通过创建`.eslintrc.js`具有以下配置的文件来配置 ESLint，以便将其配置为使用 ESLint 推荐规则以及 Vue 3 的推荐规则。

```
module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
```

[如果需要，请访问 eslint-plugin-vue 文档](https://eslint.vuejs.org/user-guide/#usage)以查看可用于 Vue 3 的其他配置，以获得不太严格的选项。不同的配置对应[Vue.js 3 style guide](https://v3.vuejs.org/style-guide/)中的 3 个不同的优先级。

### 处理 Prettier 与 ESLint 格式规则冲突

**最后，我们将关闭与 Prettier 冲突的 ESLint 格式规则**。如果我们不执行此步骤，我们将在 2 之间进行一场永无止境的死亡比赛，看起来像这样：

![prettier-eslint-battle.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/024672fe57da4f1cb01c158082861af4~tplv-k3u1fbpfcp-watermark.image?)

如果您在设置 Prettier 和 ESLint 时没有意识到这一步，那么您可能再也不想使用这两个工具了！幸运的是，它很容易修复。

**我们只需要安装`eslint-config-prettier`配置。** 这将禁用 Prettier 将负责处理的 ESLint 中的格式化规则。

```
npm install eslint-config-prettier --save-dev
```

**`.eslintrc.js`并在 extends 下的文件中注册配置**。确保它是在扩展数组中定义的最后一个配置，因为配置的顺序决定了处理不同配置中的重复规则（以后的配置会覆盖以前的配置）！

```
//.eslintrc.js
extends: [
  'eslint:recommended',
  "plugin:vue/vue3-recommended",
  "prettier"
],
```

#### 从命令行运行

此时，我们应该设置为让 ESLint 报告并纠正可修复的错误，并让 Prettier 重新格式化我们的源代码。让我们将以下两项添加到`scripts`package.json 的部分。

```
"scripts":{
  //...
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src",
  "format": "prettier .  --write"
}
```

此处定义的**lint**命令非常适合在 CI/CD 管道中运行 lint 或仅用于在终端中手动测试。您可以通过运行相应的命令来快速查看其中的任何一个，但这不一定是您希望在整个开发过程中持续使用它们的方式。

#### 使用 VS Code 为 Vue 3 设置 ESLint 和 Prettier

为了简化您的工作流程，您需要将这 2 个工具与您的 IDE 集成。这样做可以让您实时为错误添加下划线，并提供 ESLint 错误的自动修复和文件保存时更漂亮的格式。谈论节省时间！由于 VS Code 是一个免费且流行的 IDE，也是我使用的 IDE，让我们看看如何将 ESLint 和 Prettier 与 VS Code 集成到您的 Vite 驱动的 Vue.js 3 项目中。

首先，您需要为 Prettier 和 ESLint 安装 2 个[相应](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)的[插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。[如果您还没有安装 Vetur](https://vuejs.github.io/vetur/) ，您还需要安装它，因为它为 .vue 文件提供语法高亮和更多功能。

接下来，在您的 VS 代码设置中，您应该提供以下内容以关闭 Vetur 对模板的验证，并让 ESLint 根据`.eslintrc.js`文件中的规则处理它。

```
// Code/User/settings.json
"vetur.validation.template": false
```

现在，如果您打开 HelloWorld 组件，您可以看到 ESLint 正在运行。你可以看到下面的黄色波浪线`msg: String`，如果你将鼠标悬停在它上面，你会看到更多关于为什么 ESLint 会警告你的信息。在这种情况下，这是因为规则`vue/require-default-prop`。

![ESLint 使用 VS Code 的屏幕截图，提供黄色波浪线以指示警告](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57c06f13eb6846aab82909b6c59f6ccd~tplv-k3u1fbpfcp-zoom-1.image)

所以为了解决这个问题，我们可以做两件事之一。

1.  如果我们想允许没有默认值的道具，我们可以`vue/require-default-prop`在文件中关闭规则。`.eslintrc.js`

```
// Code/User/settings.json
rules: {
  //...
  "vue/require-default-prop": "off",
},
```

2.  或者我们通过提供默认值来更改代码以遵守规则，并且波浪线消失了！非常好！

![通过使代码符合 ESLint 规则来修复错误的屏幕截图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd00967560184d1180d36808f152037f~tplv-k3u1fbpfcp-zoom-1.image)

现在我们已经让 ESLint 直接在文件中报告错误，但我们没有任何自动设置让 Prettier 重新格式化代码或让 ESLint 自动更正可修复的问题。我们可以通过将以下内容添加到我们的 VS 代码设置中来告诉 VS 代码在保存时执行这两项操作。

```
// Code/User/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

我们还应该确保我们的 vue 和 js 文件已配置为具有以下设置的默认格式化程序更漂亮：

```
// Code/User/settings.json
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

现在，如果你打开 App.vue，然后将图像放在一张上并保存，它会自动弹回它应该在的位置！工作时更漂亮！

![Prettier 重新格式化 App.vue 的 gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/972cce90746a46f581b60d04ba11ba57~tplv-k3u1fbpfcp-zoom-1.image)

如果您将图像更改为循环放置在`key`之前的虚构项目数组，则`v-for`如下所示：

```
<img :key="i" v-for="i in items" alt="Vue logo" src="./assets/logo.png" />
```

您会看到 ESLint 将`vue/attributes-order`规则付诸实施，在保存时自动修复了问题。这太方便了！

![ESLint 修复 vue 属性顺序](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb3914ffad1a46178b8884badffefaab~tplv-k3u1fbpfcp-zoom-1.image)

#### 浏览器中的 ESLint 错误

对于大多数开发人员和团队来说，我们目前的设置可能足以提高生产力。但是，如果您想更进一步，您可以安装 Vite ESLint 插件以在浏览器中查看覆盖在您的应用程序上的 ESLint 问题。

![使用 Vite 在浏览器中覆盖 ESLint 错误](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e6f8f2237e14b4f8f78534ff76435a2~tplv-k3u1fbpfcp-zoom-1.image)

这使得那些无法自动修复的 ESLint 错误无法被忽略。我知道一些喜欢这个的开发人员和其他人觉得它超级烦人，所以如果你愿意就安装它，否则只要确保你特别注意你的 IDE 中的那些红色曲线。

**`vite-plugin-eslint`**通过运行**安装**

```
npm install vite-plugin-eslint --save-dev
```

**然后**通过导入插件注册插件并将其添加为插件`vite.config.js`

```
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslintPlugin()],
});
```

就是这样，任何 ESLint 错误现在都会在浏览器中报告！如果它不适合您，请尝试重新启动**development server**。
