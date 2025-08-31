import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

// 中间件配置
// 用于解析 JSON 格式的请求体数据
app.use(express.json());
// 用于解析 URL 编码的请求体数据（extended: true 表示使用 qs 库解析，支持嵌套对象）
app.use(express.urlencoded({ extended: true }));

// morgan 是一个常用的 HTTP 请求日志中间件
app.use(morgan('dev'));

// 配置 multer 中间件用于处理文件上传
// 通过 storage 配置来保留原始文件名和扩展名
const storage = multer.diskStorage({
  // 指定文件存储目录
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // 自定义文件名，保留原始文件名和扩展名
  filename: function (req, file, cb) {
    // 获取文件扩展名
    const ext = path.extname(file.originalname);
    // 生成新的文件名：字段名 + 当前时间戳 + 扩展名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB 限制
    files: 5, // 限制上传文件数量为 1
  }
 });

// GET 请求示例 - 获取用户信息
// 路由参数 :id 可以通过 req.params.id 获取
// 查询参数 ?details=true 可以通过 req.query.details 获取
app.get('/user/:id', (req, res) => {
  // 从路由参数中获取用户 ID
  const userId = req.params.id;
  // 从查询参数中获取是否显示详细信息的标志
  // http://localhost:3000/user/1222?details=true
  const showDetails = req.query.details === 'true';
  
  // 在控制台打印请求信息，用于调试
  console.log('请求方法:', req.method);
  console.log('用户 ID:', userId);
  console.log('查询参数:', req.query);
  
  // 根据查询参数决定返回详细信息还是基本信息
  if (showDetails) {
    // 返回详细的用户信息
    res.json({
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      details: '完整的用户详细信息'
    });
  } else {
    // 只返回基本的用户信息
    res.json({
      id: userId,
      name: 'John Doe'
    });
  }
});

// POST 请求示例 - 创建新用户
// 通过 req.body 获取客户端发送的 JSON 数据
// curl -X POST -H "Content-Type: application/json" -d '{"name":"张三","age":30}' http://localhost:3000/user
app.post('/user', (req, res) => {
  // 从请求体中获取用户数据
  const userData = req.body;
  
  // 在控制台打印接收到的用户数据，用于调试
  console.log('接收到的用户数据:', userData);
  
  // 模拟创建用户的过程
  const newUser = {
    // 使用当前时间戳作为用户 ID
    id: Date.now(),
    // 使用展开运算符将用户数据合并到新用户对象中
    ...userData
  };
  
  // 设置 HTTP 状态码为 201 (Created)，表示资源创建成功
  // 返回创建成功的消息和新用户信息
  res.status(201).json({
    message: '用户创建成功',
    user: newUser
  });
});

// 文件上传示例 - 处理单个文件上传
// upload.single('avatar') 中间件处理名为 'avatar' 的单个文件
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log('----------', req.file);
  // 检查是否有文件被上传
  if (!req.file) {
    // 如果没有文件，返回 400 错误状态码和错误信息
    return res.status(400).json({ error: '没有上传文件' });
  }
  // 文件上传成功，返回成功信息和文件信息
  res.status(200).json({
    message: '文件上传成功',
    file: {
      // 服务器生成的文件名（包含扩展名）
      filename: req.file.filename,
      // 原始文件名
      originalname: req.file.originalname,
      // 文件大小（字节）
      size: req.file.size,
      // 文件 MIME 类型
      mimetype: req.file.mimetype,
      // 文件保存路径
      path: req.file.path
    }
  });
});

// 处理多个文件上传
// upload.array('photos', 5) 中间件处理最多 5 个名为 'photos' 的文件
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  // 检查是否有文件被上传
  if (!req.files || req.files.length === 0) {
    // 如果没有文件，返回 400 错误状态码和错误信息
    return res.status(400).json({ error: '没有上传文件' });
  }
  
  // 文件上传成功，返回成功信息和所有文件的信息
  res.json({
    message: '文件上传成功',
    // 使用 map 函数处理每个文件，返回文件的关键信息
    files: req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path
    }))
  });
});

// HTML 响应示例
// 直接发送 HTML 字符串作为响应
app.get('/hello', (req, res) => {
  res.send('<h1>Hello World!</h1><p>欢迎来到 Express 学习第四天!</p>');
});

// 错误处理示例
// 模拟服务器内部错误
app.get('/error', (req, res) => {
  // 设置 HTTP 状态码为 500 (Internal Server Error)
  // 返回错误信息
  res.status(500).json({ error: '服务器发生错误!' });
});

// 404 处理中间件
// 当没有其他路由匹配时，这个中间件会处理所有请求
// 注意：这个中间件必须放在所有路由定义之后
app.use((req, res) => {
  // 设置 HTTP 状态码为 404 (Not Found)
  // 返回错误信息
  res.status(404).json({ error: '找不到请求的端点' });
});

// 错误处理中间件
// 注意：这个中间件必须放在所有路由和404处理中间件之后
// 它会捕获路由处理过程中发生的任何错误
app.use((err, req, res, next) => {
  // 检查是否是 multer 错误
  console.log(err)
  if (err instanceof multer.MulterError) {
    // 文件数量超过限制
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: '上传文件数量超过限制',
        message: '您上传的文件数量超过了允许的最大数量'
      });
    }
    
    // 文件大小超过限制
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: '文件大小超过限制',
        message: '您上传的文件大小超过了允许的最大大小'
      });
    }
    
    // 其他 multer 错误
    return res.status(400).json({ 
      error: '文件上传错误',
      message: err.message
    });
  }
  
  // 处理其他类型的错误
  console.error('服务器错误:', err);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: '服务器发生了意外错误'
  });
});

// 启动服务器并监听指定端口
app.listen(port, () => {
  console.log(`第四天的服务器正在运行于 http://localhost:${port}`);
});