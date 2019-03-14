/**
 * http返回消息类型
 */
export enum HttpCodeEnum{
    ///消息
    message=100,
    //成功
    success=200,
    //重定向
    redirect=300,
    //异常
    error=400,
    //服务器内部错误
    serviceError=500

   

}