import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Router } from '@angular/router';
import { PaginationModel } from '../domain/PaginstionModel';

import { ConfigModel } from '../domain/configModel';
import { ajaxOption, HttpAccessor } from '../lib/network/httpAccessor';
import { excelService } from '../lib/common/excelservice';
import { CstExportModel } from '../contract/exportEntity/cstModel';
import { ElNotificationService } from 'element-angular';

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
    this.loadList();
  }

  ngOnInit() {}

  ///表格加载状态
  loadStatus = false;
  tableData: any[] = [];
  //翻页参数
  total = 10;
  pageSize = 10;
  page = 1;
  cTime = '';

  prepareRequestData(): any{
    let reqData = {
      Draw: 1,
      Start: 0,
      Length: 50,
      Order: [
        { Column: 0, Dir: 'desc'}, 
        { Column: 0, Dir: 'asc'}, 
        { Column: 0, Dir: 'asc'}
      ],
      Columns: [
        {"data": "TestDate"},
        { "data": "Wafer" },
        { "data": "Step" },
        { "data": "Cell" },
        { "data": "Owner" },
        { "data": "Purpose" },
        { "data": "Flow" },
        { "data": "Bin" }, 
        { "data": "Eff_DATIME" },
        { "data": "Jsc_Active" },
        { "data": "Rs" },
        { "data": "Vp" },
        { "data": "Np" },
        { "data": "G_Rev" },
        { "data": "FF" },
        { "data": "Von" },
        { "data": "Voc" },
        { "data": "Vbd" } 
      ],
      Search: {
        Value: '',
        Regex: false
      }
    };

    return reqData;
  }

  loadList() {
    this.loadStatus = true;

    let option: ajaxOption = {
      url: this.configModel.serviceUrl + 'api/Metrology/PrismData',
      data: this.prepareRequestData(),
      type: "post",
    };

    HttpAccessor.ajax(option).subscribe({
      next: (val) => {
        this.total = val.recordsTotal;
        this.tableData = val.data;
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
}
