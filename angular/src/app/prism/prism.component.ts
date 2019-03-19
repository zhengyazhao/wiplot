import { Component, OnInit } from '@angular/core';
import { ElMessageService, ElNotificationService } from 'element-angular';

import { ConfigModel } from '../domain/configModel';
import { ajaxOption, HttpAccessor } from '../lib/network/httpAccessor';
import { excelService } from '../lib/common/excelservice';
import { PrismExportModel } from '../contract/exportEntity/prismModel';

import { CsvFileTypes, IgxCsvExporterOptions, IgxCsvExporterService } from "igniteui-angular";

@Component({
  selector: 'app-prism',
  templateUrl: './prism.component.html',
  styleUrls: ['./prism.component.scss']
})

export class PrismComponent implements OnInit {
  private excelSercixe: excelService = new excelService();
  private PrismExportModel: PrismExportModel;

  constructor(private configModel: ConfigModel, private message: ElMessageService, private notify: ElNotificationService) {
    this.loadList(false);
  }

  ngOnInit() {}

  ///表格加载状态
  loadStatus = false;
  tableData: any[] = [];
  //翻页参数
  total = 0;
  pageSize = 50;
  page = 1;
  sTime = '';
  eTime='';
  //导出参数
  exportStatus=false;
  exportType = ['.xlsx','.csv','.xls',];
  exportTtile="Export";
  exportModel:string=this.exportType[0];

  onDateSearch(){
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
        "data": "TestDate", "searchable": true, "search":{"regex":false, "value":`${this.sTime}-${this.eTime}`}
      };
    }

    let reqData = {
      Draw: this.page,
      Start: (this.page -1) * this.pageSize,
      Length: this.pageSize,
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

  showExport()
  {
    this.exportModel=this.exportType[0];
    this.exportStatus=true;
  }

  onExcelExport() {
    let execlHead = ['TestDate', 'Wafer', 'Step', 'Cell', 'Owner', 'Purpose', 'Flow', 'Bin', 'Eff_DATIME', 'Jsc_Active', 'Rs', 'Vp', 'Np', 'G_Rev', 'FF', 'Von', 'Voc','Vbd'];
    let execlDates = [];
    this.tableData.forEach((value, index) => {
      this.PrismExportModel = new PrismExportModel();
      this.PrismExportModel.TestDate = value.TestDate;
      this.PrismExportModel.Wafer = value.Wafer;
      this.PrismExportModel.Step = value.Step;
      this.PrismExportModel.Cell = value.Cell;
      this.PrismExportModel.Owner = value.Owner;
      this.PrismExportModel.Purpose = value.Purpose;
      this.PrismExportModel.Flow = value.Flow;
      this.PrismExportModel.Bin = value.Bin;
      this.PrismExportModel.Eff_DATIME = value.Eff_DATIME;
      this.PrismExportModel.Jsc_Active = value.Jsc_Active;
      this.PrismExportModel.Rs = value.Rs;
      this.PrismExportModel.Vp = value.Vp;
      this.PrismExportModel.Np = value.Np;
      this.PrismExportModel.G_Rev = value.G_Rev;
      this.PrismExportModel.FF = value.FF;
      this.PrismExportModel.Von = value.Von;
      this.PrismExportModel.Voc = value.Voc;
      this.PrismExportModel.Vbd = value.Vbd;

      execlDates.push(this.PrismExportModel);
    });
 
    try {
      this.exportStatus = false;
      this.excelSercixe.exportAsExcelFile("Prism data", execlHead, null, execlDates,this.exportModel);
      this.notify.success('Export to excel successfully!');
    }
    catch (e) {
      this.notify.error("Export to excel failed!");
    }
  }
}
