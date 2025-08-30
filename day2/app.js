// Day 2: Express 路由基础
const express = require('express');
const app = express();
// 解析请求体内容
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// 基本路由示例
app.get('/', (req, res) => {
  res.send('欢迎来到第二天的学习 - Express 路由基础！');
});

// GET 请求 - 获取用户列表
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' },
    { id: 3, name: '王五', email: 'wangwu@example.com' }
  ]);
});

// GET 请求 - 获取特定用户（路由参数示例）
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    id: userId,
    name: `用户${userId}`,
    email: `user${userId}@example.com`
  });
});

// POST 请求 - 创建新用户
app.post('/users', (req, res) => {
  // 解析请求体内容
  const { name, email } = req.body;
  res.status(201).json({
    message: '用户创建成功',
    user: { id: 4, name, email }
  });
});

// PUT 请求 - 更新用户信息
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `用户 ${userId} 更新成功`,
    user: { id: userId, name: '更新后的用户', email: 'updated@example.com' }
  });
});

// DELETE 请求 - 删除用户
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `用户 ${userId} 删除成功`
  });
});

// 查询参数示例
app.get('/search', (req, res) => {
  const query = req.query.q || '未指定';
  const page = req.query.page || 1;
  res.json({
    query: query,
    page: page,
    results: [
      `搜索结果1 for ${query}`,
      `搜索结果2 for ${query}`,
      `搜索结果3 for ${query}`
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Day 2 Express 应用正在运行，访问地址: http://localhost:${PORT}`);
  console.log('可用的路由:');
  console.log('- GET    http://localhost:' + PORT + '/');
  console.log('- GET    http://localhost:' + PORT + '/users');
  console.log('- GET    http://localhost:' + PORT + '/users/1');
  console.log('- POST   http://localhost:' + PORT + '/users');
  console.log('- PUT    http://localhost:' + PORT + '/users/1');
  console.log('- DELETE http://localhost:' + PORT + '/users/1');
  console.log('- GET    http://localhost:' + PORT + '/search?q=javascript&page=1');
});