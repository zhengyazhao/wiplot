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
  eTime='';

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
    // this.loadStatus = true;
    
    let option: ajaxOption = {
      url: this.configModel.serviceUrl + 'api/Metrology/PrismData',
      data: this.prepareRequestData(),
      type: "post",
    };

    let val = {"draw":1,"recordsTotal":2377859,"recordsFiltered":2377859,"data":[{"Wafer":"AD360646","Step":"Arc","Cell":"L1","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D4/i","screen_date":null,"Prism_date":"2019-03-04T13:27:05.75","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":3.57033753,"Vp":0.9639544,"Np":1.39258134,"Vp_Indoor":0.5841953,"Np_Indoor":5.195115,"Loss_Rs":0.103046544,"Rs_Jsc":1.11251867,"Jsc_Dark":8.992797E-09,"G_Rev":4.033626E-07,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":6.091646E-06,"BD_G_Rev":2.96456528E-06,"Eff_DATIME":0.242193,"Jsc_Active":0.028083,"FF":0.80331,"Von":0.69442,"Voc":1.0907,"Eff_Active":0.24606,"J_Dark":2.1171E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0},{"Wafer":"AD360646","Step":"Arc","Cell":"L2","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D6/i","screen_date":null,"Prism_date":"2019-03-04T13:27:05.843","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":2.264403,"Vp":0.962893963,"Np":1.53085041,"Vp_Indoor":0.612393141,"Np_Indoor":3.50161362,"Loss_Rs":0.0650011152,"Rs_Jsc":0.9477395,"Jsc_Dark":7.168819E-09,"G_Rev":9.716712E-09,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":5.515865E-08,"BD_G_Rev":2.75517527E-06,"Eff_DATIME":0.25786,"Jsc_Active":0.028812,"FF":0.82797,"Von":0.70114,"Voc":1.0982,"Eff_Active":0.26198,"J_Dark":3.7114E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0},{"Wafer":"AD360646","Step":"Arc","Cell":"L3","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"F0","screen_date":null,"Prism_date":"2019-03-04T13:27:05.907","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":0.0,"Vp":0.05111633,"Np":18.6144257,"Vp_Indoor":-881.8302,"Np_Indoor":8.113842,"Loss_Rs":0.0,"Rs_Jsc":0.0,"Jsc_Dark":-4.99306134E-06,"G_Rev":0.145983249,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":0.00115181133,"BD_G_Rev":0.00026228177,"Eff_DATIME":0.014915,"Jsc_Active":0.027358,"FF":0.27233,"Von":4.6782E-08,"Voc":0.20338,"Eff_Active":0.015153,"J_Dark":0.052887,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":-8.6685},{"Wafer":"AD360646","Step":"Arc","Cell":"L4","Owner":"Product - Released","Purpose":"C2 1J Baseline 20% Al pCt","Flow":"BL_Rev25E","Bin":"D6/i","screen_date":null,"Prism_date":"2019-03-04T13:27:05.973","TestDate":"2019-03-04T13:02:04","DATime_date":"2019-03-04T13:31:00","Epi_run_number":"C205191P09","Rs":2.36700583,"Vp":0.971779346,"Np":1.35765755,"Vp_Indoor":0.6345194,"Np_Indoor":4.259183,"Loss_Rs":0.06796272,"Rs_Jsc":0.976641655,"Jsc_Dark":7.35038341E-09,"G_Rev":1.6288821E-08,"Pre_Rs":null,"Pre_Vp":null,"Pre_Np":null,"Pre_Vp_Indoor":null,"Pre_Np_Indoor":null,"Pre_Loss_Rs":null,"Pre_Rs_Jsc":null,"Pre_G_Rev":null,"BD_G_BD":5.14173131E-08,"BD_G_Rev":2.59059175E-06,"Eff_DATIME":0.261282,"Jsc_Active":0.028793,"FF":0.83726,"Von":0.73109,"Voc":1.1011,"Eff_Active":0.26545,"J_Dark":1.6719E-05,"Pre_Eff_DATIME":null,"Pre_Jsc_Active":null,"Pre_FF":null,"Pre_Von":null,"Pre_Voc":null,"Pre_Eff_Active":null,"Pre_Jsc_Dark":null,"Vbd":0.0}],"error":"","HttpCode":0,"msg":null,"total":0,"page":0,"size":0}
    this.tableData = val.data;

    // HttpAccessor.ajax(option).subscribe({
    //   next: (val) => {
    //     this.total = val.recordsTotal;
    //     this.tableData = val.data;
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
}
