import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

/**
 * 统一的异常返回格式
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    const { message: exceptionMessage } = exception.getResponse();
    // 设置错误信息
    const errorMessage =
      exceptionMessage.join('') ||
      (exception.message
        ? exception.message
        : `${status >= 500 ? 'Service Error' : 'Client Error'}`);

    console.log('异常', exceptionMessage, errorMessage);

    const errorResponse = {
      message: errorMessage,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
