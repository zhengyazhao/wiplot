import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';

@Component({
  selector: 'wip_main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor(private message: ElMessageService) {}

  ngOnInit() {}

  //导航菜单数组
  datas: any[] = [
    { index: 2, title: "基板信息配置", linkUrl: '' },
    { index: 3, title: "卡夹管理", linkUrl: '' },
    { index: 4, title: "Metrology", linkUrl: '' },
    { index: 5, title: "生产作业", linkUrl: '' },
    { index: 6, title: "异常作业", linkUrl: '' },
    { index: 7, title: "CFM看板", linkUrl: '' },
  ];

  childMenuDates: any[] = [
    { index: 2, title: "工厂信息", linkUrl: '', pIndex: 2 },
    { index: 3, title: "卡夹基础信息", linkUrl: './cst', pIndex: 3 },
    { index: 4, title: "IV_Prism", linkUrl: './prism', pIndex: 4 },
    { index: 5, title: "Analysis", linkUrl: './analysis', pIndex: 5 },
    { index: 6, title: "HOLD", linkUrl: '', pIndex: 6 },
    { index: 7, title: "看板", linkUrl: '', pIndex: 7},
  ];
  menuDate: any[] = [{}];

  //获取子菜单
  getChildMenuDate(item) {
    this.menuDate=[];

    for (let i = 0; i < this.childMenuDates.length; i++) {
      if (this.childMenuDates[i].pIndex == item.index) {
        this.menuDate.push(this.childMenuDates[i]);
      }
    }
    return this.menuDate;
  }
}
