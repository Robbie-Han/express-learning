import express from "express";
// morgan 是一个常用的 HTTP 请求日志中间件
import morgan from "morgan"; // 用于第三方中间件示例
// 其他常用的第三方中间件
import cors from "cors"; // 用于处理跨域资源共享(CORS)
import helmet from "helmet"; // 通过设置各种HTTP头来帮助保护应用
import rateLimit from "express-rate-limit"; // 用于限制请求频率

const app = express();
const port = 3000;

// 1. 第三方中间件: 使用 morgan 进行请求日志记录
app.use(morgan("dev"));

// 2. 其他常用的第三方中间件
// 使用 helmet 中间件来增强应用的安全性
app.use(helmet());

// 使用 cors 中间件来处理跨域资源共享
app.use(cors());

// 创建一个速率限制中间件
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP在窗口期内最多100个请求
  message: "请求过于频繁，请稍后再试！",
});
// 应用速率限制中间件到所有请求
app.use(limiter);

// 3. 内置中间件
// 用于解析 JSON 格式的请求体
app.use(express.json());
// 用于解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));

// 4. 自定义中间件: 一个简单的日志记录器
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[Custom Logger - ${timestamp}] ${req.method} ${req.originalUrl}`,
  );
  next(); // 将控制权传递给下一个中间件
};

// 应用自定义的日志中间件
app.use(requestLogger);

// --- 路由定义 ---

app.get("/", (req, res) => {
  res.send("欢迎来到第三天：学习中间件！");
});

// 用于测试内置中间件的路由
// 测试 JSON 格式的请求体
// curl -X POST -H "Content-Type: application/json" -d '{"name":"张三","age":30}' http://localhost:3000/profile
// 测试 URL 编码的请求体
// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "name=张三&age=30" http://localhost:3000/profile
// 返回：{"message":"数据接收成功!","data":{"name":"张三","age":"30"}}
app.post("/profile", (req, res) => {
  console.log("接收到的请求体:", req.body);
  res.json({
    message: "数据接收成功!",
    data: req.body,
  });
});

// 用于演示错误处理的路由
// 测试：curl http://localhost:3000/error
app.get("/error", (req, res, next) => {
  const err = new Error("这是一个模拟的错误!");
  err.status = 500;
  // 将错误传递给错误处理中间件，代码在 app.use((err, req, res, next) => { ... }) 中
  next(err);
});

// --- 错误处理中间件 ---

// 4. 处理 404 NotFound 的中间件
// 如果没有匹配的路由
// 测试：curl http://localhost:3000/notfound
app.use((req, res, next) => {
  res.status(404).send("抱歉，找不到您要的页面!");
});

// 5. 统一的错误处理中间件
// 注意：它必须有四个参数 (err, req, res, next) 才能被 Express 识别为错误处理中间件
app.use((err, req, res, next) => {
  // 在服务器控制台打印错误堆栈信息
  console.error(err.stack);

  // 向客户端发送一个标准化的错误响应
  res.status(err.status || 500).json({
    message: err.message,
    error: "服务器发生了一个意外错误！",
  });
});

// --- 启动服务器 ---

app.listen(port, () => {
  console.log(`第三天的服务器正在运行于 http://localhost:${port}`);
});
