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
    this.loadList(false, false);
  }

  ngOnInit() {}

  ///表格加载状态
  loadStatus = false;
  tableData: any[] = [];
  sizeOptions = [
    {
      label : "Show 100 rows",
      value : 100
    },
    {
      label : "Show 50 rows",
      value : 50
    },
    {
      label : "Show 20 rows",
      value : 20
    },
    {
      label : "Show 10 rows",
      value : 10
    }
  ];
  //翻页参数
  total = 0;

  pageSize1 = this.sizeOptions[1];
  pageSize = this.pageSize1.value;

  page = 1;
  sTime = '';
  eTime = '';
  wafer = '';
  //导出参数
  exportStatus=false;
  exportType = ['.xlsx','.csv','.xls',];
  exportTtile="Export";
  exportModel:string=this.exportType[0];

  onDateSearch(){

    if(this.sTime){
      this.loadList(true, false);
    }

  }

  onWaferSearch(){
    if(this.wafer) {
      this.loadList(false, true);
    }
  }

  prepareRequestData(needDateSearch: boolean, needWaferSearch: boolean): any{
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

    if(needWaferSearch) {
      columnsData[1] = {
        "data": "Wafer", "searchable": true, "search":{"regex":false, "value":`${this.wafer}`}
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

  loadList(needDateSearch: boolean, needWaferSearch: boolean) {
    this.loadStatus = true;

    let option: ajaxOption = {
      url: this.configModel.serviceUrl + 'api/Metrology/PrismData',
      data: this.prepareRequestData(needDateSearch, needWaferSearch),
      type: "post",
    };


    let val = {"draw":1,"recordsTotal":2377859,"recordsFiltered":2377859,"data":[{"Wafer":"AD360646","Step":"Arc","Cell":"L1","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D4/i","screen_date":null,"Prism_date":"2019-03-04T13:27:05.75","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":3.57033753,"Vp":0.9639544,"Np":1.39258134,"Vp_Indoor":0.5841953,"Np_Indoor":5.195115,"Loss_Rs":0.103046544,"Rs_Jsc":1.11251867,"Jsc_Dark":8.992797E-09,"G_Rev":4.033626E-07,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":6.091646E-06,"BD_G_Rev":2.96456528E-06,"Eff_DATIME":0.242193,"Jsc_Active":0.028083,"FF":0.80331,"Von":0.69442,"Voc":1.0907,"Eff_Active":0.24606,"J_Dark":2.1171E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0},{"Wafer":"AD360646","Step":"Arc","Cell":"L2","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D6/i","screen_date":null,"Prism_date":"2019-03-04T13:27:05.843","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":2.264403,"Vp":0.962893963,"Np":1.53085041,"Vp_Indoor":0.612393141,"Np_Indoor":3.50161362,"Loss_Rs":0.0650011152,"Rs_Jsc":0.9477395,"Jsc_Dark":7.168819E-09,"G_Rev":9.716712E-09,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":5.515865E-08,"BD_G_Rev":2.75517527E-06,"Eff_DATIME":0.25786,"Jsc_Active":0.028812,"FF":0.82797,"Von":0.70114,"Voc":1.0982,"Eff_Active":0.26198,"J_Dark":3.7114E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0},{"Wafer":"AD360646","Step":"Arc","Cell":"L3","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"F0","screen_date":null,"Prism_date":"2019-03-04T13:27:05.907","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":0.0,"Vp":0.05111633,"Np":18.6144257,"Vp_Indoor":-881.8302,"Np_Indoor":8.113842,"Loss_Rs":0.0,"Rs_Jsc":0.0,"Jsc_Dark":-4.99306134E-06,"G_Rev":0.145983249,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":0.00115181133,"BD_G_Rev":0.00026228177,"Eff_DATIME":0.014915,"Jsc_Active":0.027358,"FF":0.27233,"Von":4.6782E-08,"Voc":0.20338,"Eff_Active":0.015153,"J_Dark":0.052887,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":-8.6685},{"Wafer":"AD360646","Step":"Arc","Cell":"L4","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D6/i","screen_date":null,"Prism_date":"2019-03-04T13:27:05.973","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":2.36700583,"Vp":0.971779346,"Np":1.35765755,"Vp_Indoor":0.6345194,"Np_Indoor":4.259183,"Loss_Rs":0.06796272,"Rs_Jsc":0.976641655,"Jsc_Dark":7.35038341E-09,"G_Rev":1.6288821E-08,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":5.14173131E-08,"BD_G_Rev":2.59059175E-06,"Eff_DATIME":0.261282,"Jsc_Active":0.028793,"FF":0.83726,"Von":0.73109,"Voc":1.1011,"Eff_Active":0.26545,"J_Dark":1.6719E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0},{"Wafer":"AD360646","Step":"Arc","Cell":"L5","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D6/i","screen_date":null,"Prism_date":"2019-03-04T13:27:06.04","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":2.437875,"Vp":0.971208334,"Np":1.34229529,"Vp_Indoor":0.6297781,"Np_Indoor":3.34593129,"Loss_Rs":0.07006284,"Rs_Jsc":0.971192,"Jsc_Dark":7.837971E-09,"G_Rev":6.565124E-08,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":8.553884E-08,"BD_G_Rev":2.71310523E-06,"Eff_DATIME":0.260966,"Jsc_Active":0.028811,"FF":0.83602,"Von":0.72877,"Voc":1.1007,"Eff_Active":0.26513,"J_Dark":1.6695E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0},{"Wafer":"AD360646","Step":"Arc","Cell":"M1","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D3/r","screen_date":null,"Prism_date":"2019-03-04T13:27:06.147","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":0.0,"Vp":0.899322748,"Np":27.1440678,"Vp_Indoor":-248.0891,"Np_Indoor":2.257533,"Loss_Rs":0.0,"Rs_Jsc":0.860499144,"Jsc_Dark":-2.42592414E-05,"G_Rev":0.0239532683,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":0.00581186,"BD_G_Rev":0.004500459,"Eff_DATIME":0.233901,"Jsc_Active":0.028157,"FF":0.77507,"Von":-0.00082717,"Voc":1.0889,"Eff_Active":0.23764,"J_Dark":0.014544,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":-1.4828},{"Wafer":"AD360646","Step":"Arc","Cell":"M2","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D5/i","screen_date":null,"Prism_date":"2019-03-04T13:27:06.213","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":2.33667064,"Vp":0.969426,"Np":1.40714765,"Vp_Indoor":0.6309602,"Np_Indoor":4.17633533,"Loss_Rs":0.0670639947,"Rs_Jsc":0.928255856,"Jsc_Dark":1.021081E-08,"G_Rev":8.962538E-09,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":1.15942864E-08,"BD_G_Rev":3.24046745E-08,"Eff_DATIME":0.25472,"Jsc_Active":0.028316,"FF":0.83184,"Von":0.72605,"Voc":1.0986,"Eff_Active":0.25878,"J_Dark":1.8468E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0},{"Wafer":"AD360646","Step":"Arc","Cell":"M3","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D6/i","screen_date":null,"Prism_date":"2019-03-04T13:27:06.28","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":2.478718,"Vp":0.9666653,"Np":1.37036288,"Vp_Indoor":0.630110264,"Np_Indoor":4.27267647,"Loss_Rs":0.071716696,"Rs_Jsc":0.9937329,"Jsc_Dark":9.55528E-09,"G_Rev":1.23308475E-08,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":3.267023E-07,"BD_G_Rev":3.643944E-08,"Eff_DATIME":0.255646,"Jsc_Active":0.028451,"FF":0.83354,"Von":0.72645,"Voc":1.0952,"Eff_Active":0.25973,"J_Dark":1.7629E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0}]};
    this.tableData = val.data;
    this.total = 8;
  


    // HttpAccessor.ajax(option).subscribe({
    //   next: (val) => {
    //     this.total = val.recordsTotal;
    //     this.tableData = val.data;

    //     this.pageSize = 50;
    //   },
    //   error: (err) => {
    //     this.loadStatus = false;
    //     this.message.error("Load IV Prison Data fail.");
    //     return;
    //   }, complete: () => {
    //     this.loadStatus = false;
    //   }
    // });
  }
  pageChange(needDateSearch: boolean, needWaferSearch: boolean): void {
    this.loadList(needDateSearch, needWaferSearch);

  }

  handle(event: any, needDateSearch: boolean, needWaferSearch: boolean):void {
    this.pageSize = event;
    this.loadList(needDateSearch, needWaferSearch);
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
