/**
 * 分页配置
 */
export class PaginationModel {
    elem: any;
    //总条数
    total?: any;
    //当前页
    currentPage?: number = 1;
    //每页多少条
    pageSize?: number;
}