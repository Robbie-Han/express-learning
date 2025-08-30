// 导入 Express 模块
const express = require('express');

// 创建 Express 应用实例
// app 对象包含了所有 Express 的方法和中间件
const app = express();

// 定义端口号
// 这里使用 3000 端口，也可以通过环境变量设置
const PORT = 3000;

// 创建一个简单的路由
// app.get() 处理 GET 请求
// '/' 是路由路径（根路径）
// (req, res) => {} 是回调函数，处理请求和响应
app.get('/', (req, res) => {
  // res.send() 发送响应给客户端
  res.send('Hello World! 欢迎来到 Express 世界！');
});

app.get('/about', (req, res) => {
  res.send('关于我们');
});

// 启动服务器并监听指定端口
// app.listen() 启动服务器
// 第一个参数是端口号
// 第二个参数是可选的回调函数，在服务器启动后执行
app.listen(PORT, () => {
  console.log(`服务器正在运行，访问地址: http://localhost:${PORT}`);
});
