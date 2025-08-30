# Day 1: Express 基础教程

## 创建 Express 应用和启动服务器

### 1. 初始化项目

首先确保你已经安装了 Node.js。然后创建一个新的目录并初始化项目：

```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

### 2. 安装 Express

```bash
npm install express
```

### 3. 创建第一个 Express 应用

创建一个名为 `app.js` 的文件，并添加以下代码：

```javascript
// 导入 Express 模块
const express = require('express');

// 创建 Express 应用实例
const app = express();

// 定义端口号
const PORT = 3000;

// 创建一个简单的路由
app.get('/', (req, res) => {
  res.send('Hello World! 欢迎来到 Express 世界！');
});

// 启动服务器并监听指定端口
app.listen(PORT, () => {
  console.log(`服务器正在运行，访问地址: http://localhost:${PORT}`);
});
```

### 4. 运行应用

在终端中运行以下命令启动服务器：

```bash
node app.js
```

你应该会看到控制台输出："服务器正在运行，访问地址: http://localhost:3000"

在浏览器中访问 `http://localhost:3000`，你会看到页面显示 "Hello World! 欢迎来到 Express 世界！"

## 核心概念解释

### Express 应用实例

```javascript
const app = express();
```

这行代码创建了一个 Express 应用实例，它是所有 Express 方法的入口点。

### 路由处理

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

这段代码定义了一个路由处理器：
- `app.get()` 表示处理 GET 请求
- `'/'` 是路由路径（根路径）
- `(req, res) => {...}` 是回调函数，处理请求和响应

### 启动服务器

```javascript
app.listen(PORT, () => {
  console.log(`服务器正在运行，访问地址: http://localhost:${PORT}`);
});
```

`app.listen()` 方法启动服务器并监听指定端口：
- `PORT` 是端口号
- 第二个参数是可选的回调函数，在服务器启动后执行

### res.send() 和 res.json() 的区别

在 Express 中，`res.send()` 和 `res.json()` 都用于向客户端发送响应，但它们有一些重要区别：

#### res.send()
- 可以发送各种类型的数据：字符串、对象、数组、Buffer 等
- 自动设置 Content-Type 头，根据发送的数据类型而定
- 如果发送对象或数组，会自动转换为 JSON 格式并设置 Content-Type 为 application/json
- 如果发送字符串，会设置 Content-Type 为 text/html

```javascript
// 发送字符串
res.send('Hello World');

// 发送对象（自动转换为 JSON）
res.send({ name: '张三', age: 25 });

// 发送数组（自动转换为 JSON）
res.send([1, 2, 3, 4, 5]);

// 发送 HTML 响应
res.send('<h1>这是关于页面</h1><p>在这里你可以了解更多关于我们的信息。</p>');
```

#### res.json()
- 专门用于发送 JSON 数据
- 始终将数据转换为 JSON 格式并设置 Content-Type 为 application/json
- 提供更好的 JSON 输出格式化
- 更明确地表示响应是 JSON 数据

```javascript
// 发送 JSON 数据
res.json({ name: '张三', age: 25 });

// 发送 JSON 数组
res.json([1, 2, 3, 4, 5]);

// 发送 null 作为 JSON
res.json(null);

// 发送 JSON 对象
res.json({ message: '成功', data: [] });
```

#### 使用建议
- 当你需要发送 JSON 数据时，推荐使用 `res.json()`，因为它更明确地表达了意图
- 当你需要发送不同类型的响应（如 HTML 字符串、纯文本等）时，使用 `res.send()`
- 在构建 API 时，通常更倾向于使用 `res.json()` 来保持响应格式的一致性

### HTTP 状态码设置

在 Express 中，你可以使用 `res.status()` 方法来设置 HTTP 状态码：

```javascript
// 设置状态码并发送响应
res.status(200).send('成功');
res.status(404).send('未找到');
res.status(500).send('服务器内部错误');
res.status(403).json({ error: '禁止访问' });
```

常用的状态码包括：
- 200: OK - 请求成功
- 201: Created - 资源创建成功
- 400: Bad Request - 请求参数错误
- 401: Unauthorized - 未授权
- 403: Forbidden - 禁止访问
- 404: Not Found - 资源未找到
- 500: Internal Server Error - 服务器内部错误

你也可以链式调用多个方法：

```javascript
// 链式调用设置状态码和响应
res.status(201).json({ message: '用户创建成功', userId: 123 });

// 设置多个响应头和状态码
res.status(400)
  .set('Content-Type', 'application/json')
  .json({ error: '请求参数无效' });
```

## 更多示例

### 添加更多路由

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// 根路径
app.get('/', (req, res) => {
  res.send('欢迎来到首页！');
});

// 关于页面
app.get('/about', (req, res) => {
  res.send('这是关于页面');
});

// 用户页面
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`用户ID: ${userId}`);
});

app.listen(PORT, () => {
  console.log(`服务器正在运行，访问地址: http://localhost:${PORT}`);
});
```

### 自定义端口

你可以使用环境变量来设置端口：

```javascript
const PORT = process.env.PORT || 3000;
```

这样在生产环境中可以通过环境变量设置端口，开发时默认使用3000端口。

## 总结

今天你学会了：
1. 如何创建 Express 应用
2. 如何启动服务器并监听端口
3. 如何创建基本的路由处理
4. 如何在浏览器中访问你的应用

明天我们将学习更多关于路由的知识！