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

// 处理多个文件上传
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  
  res.json({
    message: 'Files uploaded successfully',
    files: req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size
    }))
  });
});

// HTML 响应示例
app.get('/hello', (req, res) => {
  res.send('<h1>Hello World!</h1><p>Welcome to Day 4 of Express learning!</p>');
});

// 错误处理示例
app.get('/error', (req, res) => {
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`Day 4 server running at http://localhost:${port}`);
});