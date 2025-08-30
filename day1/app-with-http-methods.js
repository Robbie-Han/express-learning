// 导入 Express 模块
const express = require('express');

// 创建 Express 应用实例
const app = express();

// 定义端口号
const PORT = 3000;

// 演示不同 HTTP 方法的路由

// GET 请求 - 用于获取资源
app.get('/api/users', (req, res) => {
  // 模拟用户数据
  const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' },
    { id: 3, name: '王五', email: 'wangwu@example.com' }
  ];
  res.json(users);
});

// POST 请求 - 用于创建新资源
// 注意：实际应用中需要中间件来处理请求体数据
app.post('/api/users', (req, res) => {
  res.status(201).json({
    message: '用户创建成功',
    user: { id: 4, name: '新用户', email: 'newuser@example.com' }
  });
});

// PUT 请求 - 用于更新资源
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `用户 ${userId} 更新成功`,
    user: { id: userId, name: '更新后的用户', email: 'updated@example.com' }
  });
});

// DELETE 请求 - 用于删除资源
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `用户 ${userId} 删除成功`
  });
});

// 演示路由参数和查询参数

// 路由参数示例: /api/users/123
app.get('/api/users/:id', (req, res) => {
  // req.params.id 获取路由参数
  const userId = req.params.id;
  res.json({
    id: userId,
    name: `用户${userId}`,
    email: `user${userId}@example.com`
  });
});

// 查询参数示例: /api/search?q=javascript&page=1
app.get('/api/search', (req, res) => {
  // req.query 获取查询参数
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

// 启动服务器
app.listen(PORT, () => {
  console.log(`HTTP 方法演示服务器正在运行，访问地址: http://localhost:${PORT}`);
  console.log('可用的路由:');
  console.log('- GET    http://localhost:' + PORT + '/api/users');
  console.log('- POST   http://localhost:' + PORT + '/api/users');
  console.log('- PUT    http://localhost:' + PORT + '/api/users/1');
  console.log('- DELETE http://localhost:' + PORT + '/api/users/1');
  console.log('- GET    http://localhost:' + PORT + '/api/users/123');
  console.log('- GET    http://localhost:' + PORT + '/api/search?q=javascript&page=1');
});