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



#### 数据库的链接
一般可以采用第三方提供的ORM技术来实现数据库的链接和交互，ORM（Object-Relational Mapping）就是把关系型数据库的结构映射在对象上，我们在操作数据库是只需要操作对象而不是使用Node去写底层的SQL语句，目前社区中比较主流的ORM工具就出现了Sequelize、typeORM、Prisma这些ORM框架来做这个转换, （ps：Prisma呼声很高）;
