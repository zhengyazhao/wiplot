export class WipContract<T>{


    /**
     * code码
     */
    public HttpCode: number = -1;
    /**
     * 信息
     */
    public msg: string = '';

    public records: number = 0;

    public page: number = 1;

    public total: number = 0;

    /**
     * ums 返回地址
     */
    result?: T;
}