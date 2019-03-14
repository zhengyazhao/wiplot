import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Router } from '@angular/router';
import { PaginationModel } from '../domain/PaginstionModel';

import { ConfigModel } from '../domain/configModel';
import { ajaxOption, HttpAccessor } from '../lib/network/httpAccessor';
@Component({
  selector: 'wip_cst',
  templateUrl: './cst.component.html',
  styleUrls: ['./cst.component.css']
})
export class CstComponent implements OnInit {
  // 分页实体
  private pageInfo: PaginationModel = new PaginationModel();

  constructor(private configModel: ConfigModel, private message: ElMessageService, private Router: Router) {

    this.loadList();
  }

  ngOnInit() {
  }


  successStatus = false;

  total = 10;
  pageSize = 10;
  page = 1;
  //点击菜单按钮

  handle(event: any) {


  }
  //点击 搜索按钮
  onSearch(ref: any): void {
    this.pageInfo.total = 10;


    this.message.show("搜索中");

    this.loadList();
  }
  //点击确认按钮
  onSave(ref: any): void {

    this.message.show(ref.rowData.name + ":点击1次");

  }
  //点击翻页
  pageChange(val: any): void {

    this.loadList();

  }
  //点击删除按钮
  onDel(val: any): void {


    this.message.error(val.rowData.UserName + '删除成功！');
  }
 
  loadList() {
    let parms = {
      total: this.total,
      pageSize: this.pageSize,
      page: this.page
    };
    let option: ajaxOption = {
      url: this.configModel.serviceUrl + 'api/user/list',
      data: parms,
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
        this.message.error("查询失败");
        return;
      }
    });


  }
  // in component
  tableData: any[] = [];



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
