# 第5天：Express 模板引擎

欢迎来到 Express 学习计划的第五天！今天我们将学习如何在 Express 应用中使用模板引擎来动态生成 HTML 页面。

## 1. 什么是模板引擎？

模板引擎是一个工具，它允许我们在 HTML 文件中嵌入动态数据和逻辑，然后将这些模板与实际数据结合，生成最终的 HTML 页面。

使用模板引擎的好处：
- **动态内容**：可以将数据库中的数据动态插入到 HTML 页面中
- **代码复用**：可以创建可复用的模板组件，如页头、页脚等
- **逻辑分离**：将业务逻辑与视图层分离，使代码更清晰易维护
- **提高开发效率**：减少重复的 HTML 代码编写

## 2. 常见的模板引擎

Express 支持多种模板引擎，常用的有：

- **EJS (Embedded JavaScript)**：使用 JavaScript 语法的模板引擎，学习成本低
- **Handlebars**：使用 Handlebars 语法的模板引擎，语法简洁
- **Pug (以前叫 Jade)**：使用缩进语法的模板引擎，代码简洁但学习成本较高

在本教程中，我们将重点学习 EJS，因为它最容易上手且功能强大。

## 3. 配置和使用 EJS 模板引擎

### 3.1 安装 EJS

首先，我们需要安装 EJS 包：

```bash
npm install ejs
```

### 3.2 配置 Express 使用 EJS

在 Express 应用中配置 EJS 非常简单：

```javascript
import express from 'express';
const app = express();
const port = 3000;

// 设置模板引擎为 EJS
app.set('view engine', 'ejs');
// 设置模板文件的目录
app.set('views', './views');

// 静态文件中间件
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
```

### 3.3 创建模板文件目录结构

在项目根目录下创建以下目录结构：

```
project/
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── layouts/
│   │   └── main.ejs
│   ├── index.ejs
│   ├── about.ejs
│   └── users.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── app.js
```

### 3.4 创建基本的 EJS 模板

让我们创建一个简单的 EJS 模板文件 `views/index.ejs`：

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <h1><%= message %></h1>
    <p>当前时间: <%= currentTime %></p>
</body>
</html>
```

在路由中渲染这个模板：

```javascript
app.get('/', (req, res) => {
  res.render('index', {
    title: '首页',
    message: '欢迎来到我的网站',
    currentTime: new Date().toLocaleString()
  });
});
```

## 4. EJS 基本语法

### 4.1 输出变量

使用 `<%= variable %>` 来输出变量的值：

```html
<h1><%= pageTitle %></h1>
<p>用户名: <%= user.name %></p>
```

### 4.2 执行 JavaScript 代码

使用 `<% %>` 来执行 JavaScript 代码（不输出结果）：

```html
<% const greeting = 'Hello, ' + user.name; %>
<p><%= greeting %></p>
```

### 4.3 条件判断

使用 `<% if %>` 和 `<% else %>` 进行条件判断：

```html
<% if (user.isAdmin) { %>
  <p>欢迎，管理员！</p>
<% } else { %>
  <p>欢迎，普通用户！</p>
<% } %>
```

### 4.4 循环

使用 `<% for %>` 或 `<% forEach %>` 进行循环：

```html
<ul>
<% users.forEach(user => { %>
  <li><%= user.name %> - <%= user.email %></li>
<% }); %>
</ul>
```

## 5. 模板变量、条件判断和循环示例

### 5.1 模板变量示例

`views/user-profile.ejs`：
```html
<!DOCTYPE html>
<html>
<head>
    <title>用户资料 - <%= user.name %></title>
</head>
<body>
    <h1>用户资料</h1>
    <p>姓名: <%= user.name %></p>
    <p>邮箱: <%= user.email %></p>
    <p>年龄: <%= user.age %></p>
    <% if (user.isAdmin) { %>
        <p>角色: 管理员</p>
    <% } else { %>
        <p>角色: 普通用户</p>
    <% } %>
</body>
</html>
```

对应的路由：
```javascript
app.get('/user/:id', (req, res) => {
  // 模拟从数据库获取用户数据
  const user = {
    id: req.params.id,
    name: '张三',
    email: 'zhangsan@example.com',
    age: 25,
    isAdmin: false
  };
  
  res.render('user-profile', { user: user });
});
```

### 5.2 条件判断示例

`views/dashboard.ejs`：
```html
<!DOCTYPE html>
<html>
<head>
    <title>控制台</title>
</head>
<body>
    <h1>欢迎来到控制台</h1>
    
    <% if (user) { %>
        <p>您好, <%= user.name %>!</p>
        <% if (user.isAdmin) { %>
            <div class="admin-panel">
                <h2>管理员面板</h2>
                <ul>
                    <li><a href="/admin/users">用户管理</a></li>
                    <li><a href="/admin/settings">系统设置</a></li>
                </ul>
            </div>
        <% } %>
    <% } else { %>
        <p><a href="/login">请登录</a></p>
    <% } %>
</body>
</html>
```

### 5.3 循环示例

`views/users.ejs`：
```html
<!DOCTYPE html>
<html>
<head>
    <title>用户列表</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>用户列表</h1>
    
    <% if (users.length > 0) { %>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>角色</th>
                </tr>
            </thead>
            <tbody>
                <% users.forEach(user => { %>
                    <tr>
                        <td><%= user.id %></td>
                        <td><%= user.name %></td>
                        <td><%= user.email %></td>
                        <td><%= user.role %></td>
                    </tr>
                <% }); %>
            </tbody>
        </table>
    <% } else { %>
        <p>暂无用户数据</p>
    <% } %>
</body>
</html>
```

对应的路由：
```javascript
app.get('/users', (req, res) => {
  // 模拟从数据库获取用户列表
  const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '用户' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '管理员' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' }
  ];
  
  res.render('users', { users: users });
});
```

## 6. 创建可复用的模板布局

### 6.1 使用 EJS Include

EJS 提供了 `include` 功能来复用模板片段。

创建 `views/partials/header.ejs`：
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title || '我的网站' %></title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/about">关于</a></li>
                <li><a href="/users">用户</a></li>
            </ul>
        </nav>
    </header>
    <main>
```

创建 `views/partials/footer.ejs`：
```html
    </main>
    <footer>
        <p>&copy; 2025 我的网站. 保留所有权利.</p>
    </footer>
    <script src="/js/script.js"></script>
</body>
</html>
```

现在可以在其他模板中使用这些片段：

`views/index.ejs`：
```html
<%- include('partials/header', { title: '首页' }) %>
<h1>欢迎来到首页</h1>
<p>这是首页的内容。</p>
<%- include('partials/footer') %>
```

### 6.2 使用 EJS Layouts（需要额外配置）

虽然 EJS 本身不直接支持布局继承，但我们可以使用 `express-ejs-layouts` 中间件来实现：

安装中间件：
```bash
npm install express-ejs-layouts
```

配置中间件：
```javascript
import express from 'express';
import expressLayouts from 'express-ejs-layouts';

const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', './views');

// 使用 express-ejs-layouts 中间件
app.use(expressLayouts);

// 定义默认布局
app.set('layout', 'layouts/main');
```

创建 `views/layouts/main.ejs`：
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title || '我的网站' %></title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/about">关于</a></li>
                <li><a href="/users">用户</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <!-- 页面特定内容将插入到这里 -->
        <%- body %>
    </main>
    
    <footer>
        <p>&copy; 2025 我的网站. 保留所有权利.</p>
    </footer>
    
    <script src="/js/script.js"></script>
</body>
</html>
```

在路由中使用布局：
```javascript
app.get('/', (req, res) => {
  res.render('index', {
    title: '首页',
    message: '欢迎来到我的网站'
  });
});
```

`views/index.ejs`（使用布局）：
```html
<h1><%= message %></h1>
<p>这是首页的内容。</p>
```

## 7. 实现动态内容渲染

让我们创建一个完整的示例来演示动态内容渲染：

### 7.1 项目结构

```
day5/
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── layouts/
│   │   └── main.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── users.ejs
│   └── user-detail.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── app.js
```

### 7.2 示例代码

`day5/app.js`：
```javascript
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

const app = express();
const port = 3000;

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'day5', 'views'));

// 使用 express-ejs-layouts 中间件
app.use(expressLayouts);

// 静态文件中间件
app.use(express.static(path.join(process.cwd(), 'day5', 'public')));

// 模拟数据库数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', age: 25, role: '用户' },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 30, role: '管理员' },
  { id: 3, name: '王五', email: 'wangwu@example.com', age: 28, role: '用户' }
];

// 首页路由
app.get('/', (req, res) => {
  res.render('index', {
    title: '首页',
    message: '欢迎来到 Express 模板引擎示例'
  });
});

// 关于页面路由
app.get('/about', (req, res) => {
  res.render('about', {
    title: '关于',
    description: '这是一个使用 EJS 模板引擎的 Express 应用示例'
  });
});

// 用户列表路由
app.get('/users', (req, res) => {
  res.render('users', {
    title: '用户列表',
    users: users
  });
});

// 用户详情路由
app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.render('user-detail', {
      title: `用户详情 - ${user.name}`,
      user: user
    });
  } else {
    res.status(404).render('error', {
      title: '用户未找到',
      message: '找不到指定的用户'
    });
  }
});

app.listen(port, () => {
  console.log(`第五天的服务器运行在 http://localhost:${port}`);
});
```

## 8. EJS 最佳实践

### 8.1 安全注意事项

1. **转义输出**：使用 `<%= %>` 自动转义 HTML，防止 XSS 攻击
2. **非转义输出**：仅在信任的内容上使用 `<%- %>`，如包含 HTML 标签的变量
3. **验证输入**：始终验证和清理用户输入

### 8.2 性能优化

1. **缓存模板**：在生产环境中启用模板缓存
2. **减少嵌套**：避免过深的模板嵌套
3. **合理使用 partials**：将可复用的组件提取为 partials

### 8.3 代码组织

1. **目录结构**：合理组织模板文件目录
2. **命名规范**：使用一致的命名规范
3. **注释**：在复杂的模板中添加注释

## 总结

今天你学习了 Express 中模板引擎的核心概念和使用方法：

**今日关键点:**
- 模板引擎用于动态生成 HTML 页面
- EJS 是一个流行的模板引擎，使用 JavaScript 语法
- 可以在模板中使用变量、条件判断和循环
- 可以创建可复用的模板组件
- 使用 express-ejs-layouts 可以实现布局继承

掌握模板引擎是构建动态 Web 应用的重要技能。在接下来的课程中，我们将学习如何与数据库集成。