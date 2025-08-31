# Express.js 学习项目

这是一个为期7天的 Express.js 学习计划项目，旨在帮助初学者系统地学习和掌握 Express.js 框架的核心概念和实践技能。

## 项目结构

- `day1/`: Express 基础和环境搭建
- `day2/`: 路由基础
- `day3/`: 中间件
- `day4/`: 请求和响应对象
- `day5/`: 模板引擎
- `day6/`: 数据库集成
- `day7/`: 项目实战和部署

## 运行项目

1. 克隆仓库:
   ```
   git clone git@github.com:Robbie-Han/express-learning.git
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 运行特定天数的示例:
   ```
   node day1/app.js
   node day2/app.js
   node day3/app.js
   node day4/app.js
   ```

## 学习内容

### 第1天：Express基础和环境搭建
- 了解Express框架及其优势
- 熟悉Node.js环境搭建
- 创建第一个Express应用
- 学习基本的服务器启动和监听端口
- 理解package.json和npm包管理

### 第2天：路由基础
- 学习Express路由概念
- 实现GET、POST、PUT、DELETE请求处理
- 理解路由参数和查询参数
- 使用app.get(), app.post(), app.put(), app.delete()方法
- 创建RESTful API的基本结构

### 第3天：中间件
- 理解中间件概念和执行流程
- 使用内置中间件(express.json, express.urlencoded)
- 创建自定义中间件
- 学习常用第三方中间件(morgan, cors, helmet, express-rate-limit)
- 理解错误处理中间件

### 第4天：请求和响应对象
- 深入学习req对象的属性和方法
- 掌握res对象的常用方法(res.send, res.json, res.render等)
- 处理表单数据和文件上传
- 理解HTTP状态码的设置
- 实践不同类型的响应(JSON、HTML、文件等)

### 第5天：模板引擎
- 学习模板引擎的作用(如EJS, Handlebars, Pug)
- 配置和使用EJS模板引擎
- 理解模板变量、条件判断和循环
- 创建可复用的模板布局
- 实现动态内容渲染

### 第6天：数据库集成
- 学习在Express中连接数据库
- 实现基本的CRUD操作
- 使用Mongoose操作MongoDB(或使用其他数据库)
- 理解数据库连接池和错误处理
- 实践数据验证和安全性

### 第7天：项目实战和部署
- 综合运用前6天所学知识创建完整项目
- 学习项目结构设计
- 实现用户认证和授权
- 了解安全最佳实践
- 学习应用部署到服务器

## 许可证

本项目仅供学习使用。