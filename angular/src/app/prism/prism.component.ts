import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Router } from '@angular/router';
import { PaginationModel } from '../domain/PaginstionModel';

import { ConfigModel } from '../domain/configModel';
import { ajaxOption, HttpAccessor } from '../lib/network/httpAccessor';
import { excelService } from '../lib/common/excelservice';
import { CstExportModel } from '../contract/exportEntity/cstModel';
import { ElNotificationService } from 'element-angular';
import { utilities } from '../lib/common/utilities';

@Component({
  selector: 'app-prism',
  templateUrl: './prism.component.html',
  styleUrls: ['./prism.component.scss']
})

export class PrismComponent implements OnInit {

  private pageInfo: PaginationModel = new PaginationModel();
  private excelSercixe: excelService = new excelService();
  private CstExportModel: CstExportModel;

  constructor(private configModel: ConfigModel, private notify: ElNotificationService, private message: ElMessageService, private Router: Router) {
    this.loadList(false);
  }

  ngOnInit() {}

  ///表格加载状态
  loadStatus = false;
  tableData: any[] = [];
  //翻页参数
  total = 0;
  pageSize = 0;
  page = 0;
  sTime = '';
  eTime='';
  //查询条件

  onDateSearch(){
    console.log('on date search method...');
    this.loadList(true);
  }

  prepareRequestData(needDateSearch: boolean): any{
    var columnsData = [
      { "data": "TestDate", "Searchable": false, "Search": {"Regex":false, "Value":{}}},
      { "data": "Wafer","Searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Step" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Cell" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Owner" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Purpose" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Flow" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Bin" ,"searchable": false, "search": {"regex":false, "value":{}}}, 
      { "data": "Eff_DATIME" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Jsc_Active" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Rs" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Vp" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Np" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "G_Rev" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "FF" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Von" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Voc" ,"searchable": false, "search": {"regex":false, "value":{}}},
      { "data": "Vbd" ,"searchable": false, "search": {"regex":false, "value":{}}} 
    ];

    if(needDateSearch) {
      columnsData[0] = {
        "data": "TestDate", "searchable": true, "search":{"regex":false, "value":`${this.eTime}`}
      };
    }

    let reqData = {
      Draw: 1,
      Start: 0,
      Length: 50,
      Order: [
        { Column: 0, Dir: 'desc'}, 
        { Column: 0, Dir: 'asc'}, 
        { Column: 0, Dir: 'asc'}
      ],
      Columns: columnsData,
      Search: {
        Value: '',
        Regex: false
      }
    };

    console.log('reqData', reqData.Columns);
    return reqData;
  };

  loadList(needDateSearch: boolean) {
    this.loadStatus = true;
    
    let option: ajaxOption = {
      url: this.configModel.serviceUrl + 'api/Metrology/PrismData',
      data: this.prepareRequestData(needDateSearch),
      type: "post",
    };

    HttpAccessor.ajax(option).subscribe({
      next: (val) => {
        this.total = val.recordsTotal;
        this.tableData = val.data;

        this.pageSize = 50;
      },
      error: (err) => {
        this.loadStatus = false;
        this.message.error("Load IV Prison Data fail.");
        return;
      }, complete: () => {
        this.loadStatus = false;
      }
    });
  }

  pageChange(val: any): void {
    this.loadList(false);
  }
}
