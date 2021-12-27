import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 注册参数验证管道
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册异常过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); // 注册接口返回拦截器

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('Nest-demo')
    .setDescription('api list')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
