# 第4天：Express 请求和响应对象

欢迎来到 Express 学习计划的第四天！今天我们将深入学习 Express 中两个非常重要的对象：请求对象（`req`）和响应对象（`res`）。这两个对象在每个路由处理函数中都可用，它们提供了处理 HTTP 请求和发送响应所需的各种方法和属性。

## 1. 请求对象（req）

请求对象（`req`）包含了客户端发送的 HTTP 请求的所有信息，包括 URL、HTTP 头、请求体等。

### 1.1 常用属性

- `req.method`: HTTP 请求方法（GET、POST、PUT、DELETE 等）
- `req.url`: 请求的 URL 字符串
- `req.headers`: 包含 HTTP 头的对象
- `req.params`: 包含路由参数的对象
- `req.query`: 包含 URL 查询参数的对象
- `req.body`: 包含请求体数据的对象（需要使用中间件如 express.json() 或 express.urlencoded() 解析）

### 1.2 获取请求数据的示例

```javascript
// 获取请求方法和 URL
console.log('Method:', req.method);
console.log('URL:', req.url);

// 获取请求头
console.log('User-Agent:', req.headers['user-agent']);

// 获取路由参数 (例如: /user/:id)
console.log('Route params:', req.params);

// 获取查询参数 (例如: /user?id=123)
console.log('Query params:', req.query);

// 获取请求体 (需要使用中间件解析)
console.log('Request body:', req.body);
```

## 2. 响应对象（res）

响应对象（`res`）用于向客户端发送 HTTP 响应。它提供了多种方法来设置响应状态码、响应头和响应体。

### 2.1 常用方法

- `res.send()`: 发送 HTTP 响应
- `res.json()`: 发送 JSON 格式的响应
- `res.status()`: 设置 HTTP 状态码
- `res.sendFile()`: 发送文件作为响应
- `res.redirect()`: 重定向到另一个 URL
- `res.render()`: 渲染视图模板

### 2.2 发送不同类型响应的示例

```javascript
// 发送文本响应
res.send('Hello World!');

// 发送 JSON 响应
res.json({ message: 'Hello World!' });

// 设置状态码并发送响应
res.status(404).send('Not Found');

// 发送文件
res.sendFile('/path/to/file.txt');

// 重定向
res.redirect('/new-url');
```

## 3. 处理表单数据和文件上传

### 3.1 处理表单数据

要处理表单数据，我们需要使用适当的中间件来解析请求体：

```javascript
import express from 'express';

const app = express();

// 用于解析 JSON 格式的请求体
app.use(express.json());
// 用于解析 URL 编码的请求体（传统表单）
app.use(express.urlencoded({ extended: true }));

// 处理表单提交
app.post('/submit-form', (req, res) => {
  console.log('Form data:', req.body);
  res.json({ 
    message: 'Form received successfully!',
    data: req.body
  });
});
```

### 3.2 处理文件上传

要处理文件上传，我们需要使用 `multer` 中间件：

```javascript
import multer from 'multer';

// 配置 multer
const upload = multer({ dest: 'uploads/' });

// 处理单个文件上传
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log('File info:', req.file);
  console.log('Form data:', req.body);
  
  res.json({
    message: 'File uploaded successfully!',
    file: req.file,
    data: req.body
  });
});

// 处理多个文件上传
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  console.log('Files info:', req.files);
  res.json({
    message: 'Files uploaded successfully!',
    files: req.files
  });
});
```

## 4. 理解 HTTP 状态码

HTTP 状态码是服务器对客户端请求的响应状态的数字代码。常见的状态码包括：

- `200 OK`: 请求成功
- `201 Created`: 资源创建成功
- `400 Bad Request`: 客户端发送的请求有错误
- `401 Unauthorized`: 未授权访问
- `404 Not Found`: 请求的资源不存在
- `500 Internal Server Error`: 服务器内部错误

在 Express 中，可以通过 `res.status()` 方法设置状态码：

```javascript
// 设置 201 状态码
res.status(201).json({ message: 'Resource created successfully' });

// 设置 404 状态码
res.status(404).send('Resource not found');

// 设置 500 状态码
res.status(500).json({ error: 'Internal server error' });
```

## 5. 实践不同类型的响应

### 5.1 JSON 响应

JSON 响应是 API 开发中最常用的方式：

```javascript
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  res.json(users);
});
```

### 5.2 HTML 响应

可以直接发送 HTML 字符串：

```javascript
app.get('/hello', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});
```

### 5.3 文件响应

可以发送静态文件：

```javascript
import path from 'path';

app.get('/download', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'document.pdf');
  res.sendFile(filePath);
});
```

## 6. 实际示例

下面是一个综合示例，演示了如何使用 req 和 res 对象：

```javascript
import express from 'express';
import multer from 'multer';

const app = express();
const port = 3000;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置 multer
const upload = multer({ dest: 'uploads/' });

// GET 请求示例
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const showDetails = req.query.details === 'true';
  
  console.log('Method:', req.method);
  console.log('User ID:', userId);
  console.log('Query params:', req.query);
  
  if (showDetails) {
    res.json({
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      details: 'Full user details'
    });
  } else {
    res.json({
      id: userId,
      name: 'John Doe'
    });
  }
});

// POST 请求示例
app.post('/user', (req, res) => {
  const userData = req.body;
  
  console.log('Received user data:', userData);
  
  // 模拟创建用户
  const newUser = {
    id: Date.now(),
    ...userData
  };
  
  res.status(201).json({
    message: 'User created successfully',
    user: newUser
  });
});

// 文件上传示例
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalname: req.file.originalname
  });
});

// 错误处理示例
app.get('/error', (req, res) => {
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Day 4 server running at http://localhost:${port}`);
});
```

## 总结

今天你学习了 Express 中请求和响应对象的核心概念：

**今日关键点:**
- 请求对象（`req`）包含了客户端发送的所有请求信息
- 响应对象（`res`）用于向客户端发送响应
- 可以通过 `req.params`、`req.query` 和 `req.body` 获取不同类型的请求数据
- 可以使用 `res.send()`、`res.json()`、`res.status()` 等方法发送不同类型的响应
- 使用 `multer` 中间件处理文件上传
- 理解和正确使用 HTTP 状态码

掌握 req 和 res 对象是构建 Express 应用的基础。在接下来的课程中，我们将继续学习更多 Express 的高级特性。