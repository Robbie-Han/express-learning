# Day 2: Express 路由基础教程

## 今日学习目标

1. 学习Express路由概念
2. 实现GET、POST、PUT、DELETE请求处理
3. 理解路由参数和查询参数
4. 使用app.get(), app.post(), app.put(), app.delete()方法
5. 创建RESTful API的基本结构

## 什么是路由？

路由是指确定应用程序如何响应客户端对特定端点的请求，这个端点是URI（或路径）和特定的HTTP请求方法（GET、POST等）的组合。

每个路由可以有一个或多个处理函数，这些函数在路由匹配时执行。

## 路由定义

基本的路由定义语法如下：

```javascript
app.METHOD(PATH, HANDLER)
```

其中：
- `app` 是express实例
- `METHOD` 是HTTP请求方法（小写）
- `PATH` 是服务器上的路径
- `HANDLER` 是路由匹配时执行的函数

## HTTP方法示例

### GET 方法

GET方法用于获取资源：

```javascript
// 获取用户列表
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' }
  ]);
});
```

### POST 方法

POST方法用于创建新资源。要处理POST请求中的数据，需要使用中间件来解析请求体：

```javascript
// 解析表单数据
app.use(express.urlencoded({ extended: true }));

// 解析JSON数据
app.use(express.json());

// 创建新用户
app.post('/users', (req, res) => {
  // 获取请求体中的数据
  const { name, email } = req.body;
  res.status(201).json({
    message: '用户创建成功',
    user: { id: 3, name, email }
  });
});
```

### PUT 方法

PUT方法用于更新资源。同样需要中间件来解析请求体：

```javascript
// 更新用户信息
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  res.json({
    message: `用户 ${userId} 更新成功`,
    user: { id: userId, name, email }
  });
});
```

### DELETE 方法

DELETE方法用于删除资源：

```javascript
// 删除用户
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `用户 ${userId} 删除成功`
  });
});
```

## 路由参数

路由参数是命名的URL段，用于捕获URL中的值。捕获的值存储在`req.params`对象中。

```javascript
// 路由参数示例: /users/123
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // '123'
  res.json({ id: userId, name: `用户${userId}` });
});
```

你也可以有多个路由参数：

```javascript
// 多个路由参数: /users/123/posts/456
app.get('/users/:userId/posts/:postId', (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  res.json({ userId, postId });
});
```

## 查询参数

查询参数是URL中?后面的部分，用于传递额外的信息。查询参数存储在`req.query`对象中。

```javascript
// 查询参数示例: /search?q=javascript&page=1
app.get('/search', (req, res) => {
  const query = req.query.q || '未指定';    // 'javascript'
  const page = req.query.page || 1;        // '1'
  res.json({ query, page });
});
```

## RESTful API 设计

RESTful API 是一种设计风格，遵循以下原则：

1. 使用名词而不是动词
2. 使用HTTP方法表示操作类型
3. 使用HTTP状态码表示操作结果

常见的RESTful路由设计：

| HTTP方法 | URL          | 功能           |
|----------|--------------|----------------|
| GET      | /users       | 获取用户列表   |
| GET      | /users/:id   | 获取特定用户   |
| POST     | /users       | 创建新用户     |
| PUT      | /users/:id   | 更新用户信息   |
| DELETE   | /users/:id   | 删除用户       |

## 完整示例

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// 解析请求体数据
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET - 获取资源
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: '张三' }]);
});

// POST - 创建资源
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ 
    message: '用户创建成功',
    user: { id: 2, name, email }
  });
});

// PUT - 更新资源
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  res.json({ 
    message: `用户 ${userId} 更新成功`,
    user: { id: userId, name, email }
  });
});

// DELETE - 删除资源
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `用户 ${userId} 删除成功` });
});

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
```

## 测试路由

你可以使用浏览器或工具（如Postman、curl）来测试路由：

> -X 后面跟的是HTTP方法名，如 GET、POST、PUT、DELETE 等，对于GET方法，-X 可以省略
> -d 后面跟的是请求体数据，如 JSON 字符串、表单数据等
> -H 后面跟的是请求头，如 Content-Type、Authorization 等
> -v 后面跟的是verbose模式，会显示更多的信息
> -i 后面跟的是include模式，会显示响应头信息

```bash
# GET 请求
curl http://localhost:3000/users

# POST 请求（表单数据）
curl -X POST -d "name=张三&email=zhangsan@example.com" http://localhost:3000/users

# POST 请求（JSON数据）
curl -X POST -H "Content-Type: application/json" -d '{"name":"张三","email":"zhangsan@example.com"}' http://localhost:3000/users

# PUT 请求（表单数据）
curl -X PUT -d "name=张三&email=zhangsan@example.com" http://localhost:3000/users/1

# PUT 请求（JSON数据）
curl -X PUT -H "Content-Type: application/json" -d '{"name":"张三","email":"zhangsan@example.com"}' http://localhost:3000/users/1

# DELETE 请求
curl -X DELETE http://localhost:3000/users/1

# 带查询参数的GET请求
curl "http://localhost:3000/search?q=express&page=1"
```

## 总结

今天你学会了：
1. Express路由的基本概念和定义方法
2. 如何使用不同的HTTP方法处理请求
3. 路由参数和查询参数的使用
4. RESTful API的设计原则
5. 如何测试路由

明天我们将学习中间件的概念和使用方法！