import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// 设置模板引擎
app.set('view engine', 'ejs');
// 使用绝对路径设置视图目录
app.set('views', path.join(__dirname, 'views'));

// 使用 express-ejs-layouts 中间件
app.use(expressLayouts);

// 定义默认布局
app.set('layout', 'layouts/main');

// 静态文件中间件
app.use(express.static(path.join(__dirname, 'public')));

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