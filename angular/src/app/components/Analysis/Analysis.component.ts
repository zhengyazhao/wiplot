import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Router } from '@angular/router';
import { PaginationModel } from '../../domain/PaginstionModel';
import { ConfigModel } from '../../domain/configModel';
import { ajaxOption, HttpAccessor } from '../../lib/network/httpAccessor';
import { excelService } from '../../lib/common/excelservice';
import { utilities } from '../../lib/common/utilities';
import { CstExportModel } from '../../contract/exportEntity/cstModel';
import { ElNotificationService } from 'element-angular'
@Component({
    selector: 'Analysis',
    templateUrl: './Analysis.component.html',
    styleUrls: ['./Analysis.component.scss']
})

export class AnalysisComponent implements OnInit {

    constructor(private configModel: ConfigModel, private notify: ElNotificationService, private message: ElMessageService, private Router: Router) {

        this.loadList();
    }
    private excelSercixe: excelService = new excelService();
    private CstExportModel: CstExportModel;

    ngOnInit() {
    }
    //翻页参数
    total = 10;
    pageSize = 10;
    page = 1;
    pageSizeTest = 10;
    //搜索条件
    sTime = '';
    eTime = '';
    pagesizes = [10, 20, 30, 40];
    searchUser = '';//用户名
    searchSex = '';//姓名
    searchMail = '';//日期
    searchPhone = '';//电话

    //导出类型
    exportType = ['.csv', '.xls', '.xlsx'];
    exportStatus = false;
    exportTtile = "导出";
    exportModel: string = this.exportType[0];
    tableData = [
        { id: "1", name: "张三", sex: "男", mail: "414@qq.com", phone: "131122112", date: "2018-08-11" },
    ];

    //点击 搜索按钮
    onSearch(ref: any): void {

        this.loadList();
    }
    /**
     * 弹出导出页面，并且设定默认值
     */
    showExport() {

        this.exportModel = this.exportType[0];
        this.exportStatus = true;

    }
    ///导出
    onExport() {
        //导出标题列
        let execlHead = ['姓名', '性别', '部门', '邮箱', '职称', '语言', '手机号', '备注'];
        let execlDates = [];
        this.tableData.forEach((value, index) => {
            this.CstExportModel = new CstExportModel();
            this.CstExportModel.userName = value.id;
            this.CstExportModel.gender = value.name;
            this.CstExportModel.departmentSeq = value.sex;
            this.CstExportModel.email = value.mail;
            this.CstExportModel.jobtitle = value.phone;
            this.CstExportModel.language = value.date;

            execlDates.push(this.CstExportModel);

        });

        try {
            this.exportStatus = false;
            this.excelSercixe.exportAsExcelFile("卡夹列表", execlHead, null, execlDates, this.exportModel);
            this.notify.success('导出成功!');
        }
        catch (e) {
            this.notify.error("导出失败!");
        }
    }

    //点击翻页
    pageChange(val: any): void {


        this.loadList();

    }

    //查询条件
    loadParms(): any {

        let parms = {
            total: this.total,
            pageSize: this.pageSize,
            page: this.page,
            pageSizeTest: this.pageSizeTest
        };
        //开始日期
        if (!utilities.strIsEmptyOrNull(this.sTime)) {
            parms['stime'] = this.sTime;
        }
        ///结束日期
        if (!utilities.strIsEmptyOrNull(this.eTime)) {
            parms['etime'] = this.eTime;
        }
        //用户名
        if (!utilities.strIsEmptyOrNull(this.searchUser)) {
            parms['user'] = this.searchUser;
        }
        //性别
        if (!utilities.strIsEmptyOrNull(this.searchSex)) {
            parms['sex'] = this.searchSex;
        }
        //邮箱
        if (!utilities.strIsEmptyOrNull(this.searchMail)) {
            parms['mail'] = this.searchMail;
        }
        //电话
        if (!utilities.strIsEmptyOrNull(this.searchPhone)) {
            parms['phone'] = this.searchPhone;
        }

        return parms;
    }
    ///表格加载状态
    loadStatus = false;

    loadList() {
        this.loadStatus = true;

        let option: ajaxOption = {
            url: this.configModel.serviceUrl + 'api/user/list',
            data: this.loadParms(),
            type: "get",
        };

        HttpAccessor.ajax(option).subscribe({
            next: (val) => {
                if (val.HttpCode == 500) {
                    this.message.error(val.msg);
                    return;
                }
                if (val.HttpCode == 400) {
                    this.message.error(val.msg);

                }
                if (val.HttpCode == 200) {
                    this.total = val.total;
                    this.tableData = val.data;
                }
            },
            error: (err) => {
                this.loadStatus = false;
                this.message.error("查询失败");
                return;
            }, complete: () => {

                this.loadStatus = false;
            }
        });


    }



    //行间隔颜色
    rowClassNameFilter(row: any, index: number): string {
        if (index === 1) {
            return 'info-row';
        } else if (index === 3) {
            return 'positive-row';
        }
        return ''
    }

}