
# 第3天：Express 中间件

欢迎来到 Express 学习计划的第三天！今天我们将深入探讨 Express 框架一个最核心、最强大的概念——中间件（Middleware）。

## 1. 什么是中间件？

在 Express 中，中间件是一个函数，它可以访问请求对象（`req`）、响应对象（`res`）以及应用程序的请求-响应循环中的下一个中间件函数（通常表示为 `next`）。

你可以将中间件想象成是 Express 应用处理流程中的一个个“关卡”或“检查站”。当一个请求到达时，它会按顺序通过你定义的这些中间件函数，每个函数都可以对请求进行检查、修改，或者直接结束响应。

中间件的功能包括：
- 执行任何代码。
- 修改请求（`req`）和响应（`res`）对象。
- 结束请求-响应循环（例如直接发送响应给客户端）。
- 调用堆栈中的下一个中间件。

如果当前中间件函数没有结束请求-响应循环，它必须调用 `next()` 将控制权传递给下一个中间件，否则请求将被“挂起”。

## 2. 中间件的执行流程

想象一下请求处理流程像一条流水线：
`请求 -> 中间件1 -> 中间件2 -> 中间件3 -> ... -> 路由处理器 -> 响应`

每个中间件都是流水线上的一个工人，他可以处理一下这个请求，然后把它传递给下一个工人。如果某个工人完成了所有工作，他也可以直接把产品打包（发送响应）并结束流程。

## 3. 内置中间件

Express 提供了一些非常有用的内置中间件，方便我们处理常见的任务。

### `express.json()`
这个中间件用于解析传入的 JSON 格式的请求体。当客户端发送一个 `Content-Type` 为 `application/json` 的 POST 或 PUT 请求时，这个中间件会将请求体中的 JSON 数据解析成一个 JavaScript 对象，并挂载到 `req.body` 上。

### `express.urlencoded()`
这个中间件用于解析 URL 编码的请求体（通常来自 HTML 表单提交）。它会将 `Content-Type` 为 `application/x-www-form-urlencoded` 的请求体数据解析成一个对象，并挂载到 `req.body` 上。`extended: true` 选项允许解析富对象和数组。

#### 示例 (`day3/app.js`):
```javascript
import express from 'express';

const app = express();
const port = 3000;

// 使用 express.json() 中间件来解析 JSON 请求体
app.use(express.json());
// 使用 express.urlencoded() 中间件来解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));

// 一个处理 POST 请求的路由
app.post('/profile', (req, res) => {
  console.log('Request Body:', req.body);
  res.json({
    message: 'Data received successfully!',
    data: req.body
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```
你可以使用 Postman 或 curl 来测试这个 `/profile` 路由，发送一个 JSON 数据，看看服务器如何接收和响应。

## 4. 自定义中间件

除了使用内置的中间件，我们还可以创建自己的中间件来处理特定的逻辑。

**一个自定义中间件就是一个函数，它接收 `req`, `res`, `next` 三个参数。**

### 示例：日志记录中间件
让我们创建一个简单的中间件，它会在控制台打印出每个请求的方法、URL 和时间。

#### 示例 (`day3/app.js` 中添加):
```javascript
// ... (之前的代码)

// 自定义日志中间件
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // 将控制权传递给下一个中间件
};

// 在所有路由之前使用这个日志中间件
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello World with Logger!');
});

// ... (之前的 POST /profile 路由和 app.listen)
```
现在，每次你的应用收到请求，控制台都会先打印出一条日志，然后再由相应的路由处理器处理。

## 5. 常用第三方中间件

Express 拥有一个庞大的生态系统，有许多优秀的第三方中间件可以帮助我们快速开发。
- **morgan**: 一个非常流行的 HTTP 请求日志记录器，比我们自己写的要强大得多。
- **cors**: 用于处理跨域资源共享（CORS）。
- **helmet**: 通过设置各种 HTTP 头来帮助保护你的应用免受一些众所周知的 Web 漏洞的影响。

安装 morgan:
```bash
npm install morgan
```

#### 示例：使用 morgan
```javascript
import express from 'express';
import morgan from 'morgan'; // 引入 morgan

const app = express();
const port = 3000;

// 使用 morgan 中间件，'dev' 是一种预定义的日志格式
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello with Morgan!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```
运行这个应用并发起请求，你会看到 morgan 在控制台输出了彩色的、格式化的日志信息。

## 6. 错误处理中间件

在 Express 中，错误处理有自己专门的中间件。它与其他中间件的定义方式略有不同：它接收四个参数 `(err, req, res, next)`。

错误处理中间件必须在所有其他 `app.use()` 和路由调用之后定义，以便捕获它们抛出的任何错误。

#### 示例 (`day3/app.js`):
```javascript
import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome! Try /error to see error handling.');
});

// 一个会主动抛出错误的路由
app.get('/error', (req, res, next) => {
  const err = new Error('This is a simulated error!');
  err.status = 500;
  // 将错误传递给 Express 的错误处理机制
  next(err);
});

// 404 Not Found 中间件
// 如果请求没有被任何路由处理，它会到达这里
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// 错误处理中间件 (必须有 4 个参数)
app.use((err, req, res, next) => {
  console.error(err.stack); // 在服务器控制台打印错误堆栈
  res.status(err.status || 500).json({
    message: err.message,
    error: 'An unexpected error occurred!'
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```
在这个例子中：
1.  如果你访问 `/error`，路由会创建一个错误对象并调用 `next(err)`。
2.  Express 会跳过所有常规的中间件和路由，直接寻找错误处理中间件（即有4个参数的那个）。
3.  我们的错误处理中间件会捕获这个错误，并向客户端发送一个 500 状态码和 JSON 格式的错误信息。
4.  如果你访问一个不存在的路由，比如 `/not-found`，它会经过所有路由都无法匹配，最终落入 404 中间件，返回 404 响应。

## 总结

今天你学习了 Express 中间件的全部基础知识。中间件是 Express 的支柱，理解它将为你构建复杂、健壮的 Web 应用打下坚实的基础。

**今日关键点:**
- 中间件是在请求和响应之间执行的函数。
- 使用 `app.use()` 来应用一个中间件到所有的请求。
- 必须调用 `next()` 来传递控制权，除非你想提前结束响应。
- Express 提供了 `express.json()` 和 `express.urlencoded()` 等内置中间件。
- 错误处理中间件有特殊的四个参数 `(err, req, res, next)`，并且应该在最后定义。

在接下来的课程中，我们将不断地使用中间件。请务必花时间消化和练习今天的内容！
