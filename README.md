## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 一些问题记录
#### Nest热更新 <br>
解：<br>
* 自行解决：
安装开发环境依赖 webpack-node-externals，并在根目录下新建webpack.config.ts文件，扩展webpack配置，如下：
```js
  import nodeExternals from 'webpack-node-externals';
  module.exports = (options) => {
    console.log(options);
    return {
      ...options,
      entry: ['webpack/hot/poll？100', './src/main.ts'],
      watch: true,
      externals: [nodeExternals({})],
    };
  };

```
* 脚手架支撑
```js
 yarn start:dev
```

#### 路由匹配<br>
在一个Controller中的路由匹配的顺序与书写顺序有关，因此需要注意匹配不中时调整路由的顺序

#### 设置全局路由前缀<br>

#### nest-cli提供的几个有用的命令<br>

* 创建模块
```js
  nest g mo posts // nest g [文件类型] [文件名] [文件目录]
```
上面命令在会创建如下文件夹及文件   src/posts/posts.module.ts, 一般文件目录可不填默认src

* 创建控制器
```js
 nest g co posts
```

* 创建服务类
```js
  nest g service posts
```

* 一键创建CRUD模块
```js
  nest g resource user
```



### 数据库的链接
一般可以采用第三方提供的ORM技术来实现数据库的链接和交互，ORM（Object-Relational Mapping）就是把关系型数据库的结构映射在对象上，我们在操作数据库是只需要操作对象而不是使用Node去写底层的SQL语句，目前社区中比较主流的ORM工具就出现了Sequelize、typeORM、Prisma这些ORM框架来做这个转换, （ps：Prisma呼声很高）;

entity对象中
+ 实现字段名驼峰转下划线命名, createTime和updateTime字段转为下划线命名方式存入数据库， 只需要在@Column装饰器中指定name属性；
+ 在创建User实体, 使用@PrimaryGeneratedColumn('uuid')创建一个主列id，该值将使用uuid自动生成。Uuid 是一个独特的字符串;

### swagger 配置
### 参数校验
参数校验使用nest提供的pipe工具，ValidationPipe 配合class-validator


### 用户注册
+ 用户信息不能明文，用户密码需要加密，加密方案：bcryptjs
+ 对于已经创建的用户，每次查询用户时密码是不可返回的，因此password字段不返回的方式有两种: <br>
  1、在Entity的列定义中，使用select字段来决定查询是要不要返回 <br>
  2、使用class-transformer提供的Exclude来序列化，对返回的数据实现过滤掉password字段的效果。首先在user.entity.ts中使用@Exclude装饰：
  ```js
    @Exclude()
    @Column() 
    password: string;  // 密码
  ```
  接着在对应请求的地方标记使用ClassSerializerInterceptor，此时，POST /api/user/register这个请求返回的数据中，就不会包含password这个字段。
  ```js
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    register(@Body() createUser: CreateUserDto) {...}
  ```

### 本地登录验证
Passport.js,它功能单一，只能做登录验证，但非常强大，支持本地账号验证和第三方账号登录验证（OAuth和OpenID等），支持大多数Web网站和服务。
passport中最重要的概念是策略，passport模块本身不能做认证，所有的认证方法都以策略模式封装为插件，需要某种认证时将其添加到package.json即可


### 参考文章
[NestJs入门](https://mp.weixin.qq.com/s/oprPwqR7Xsg6TmK21CKUuw)
[用户注册与登录](https://mp.weixin.qq.com/s/LgZu1v2yrNvtwoJlfJVAqQ)
