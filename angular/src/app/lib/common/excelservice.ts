import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';//浏览器读取本地的文件已经保存文件所需要的依赖。
import * as XLSX from 'xlsx';//数据导出导入所需要的依赖
import {utilities} from './utilities';

@Injectable()
export class excelService {
    constructor() {}

    /**
   * @param excelFileName 文件名
   * @param headers 是否传入文件头，如果传空默认为变量名
   * @param sheetNames sheet名
   * @param obj  所提供的数据
   */
    public exportAsExcelFile(excelFileName: string, headers: string[], sheetNames: string[], obj: any[],exceType:string): void {
        //excelFileName为必填字段，如果传入null会报异常，以下为判断。
        if (typeof excelFileName == "undefined" || excelFileName == null || excelFileName == "") {
            throw new Error("please input excelFileName name");
        }
        //判断数据是否传入
        if (obj == null || obj.length == 0) {
            throw new Error("no datas show");
        }
        //WorkBook对象为主要对象，对象中的SheetNames表示传入的sheet名称。Sheets所对应的数据。两者一一对应。
        const workbook: XLSX.WorkBook = { SheetNames: [], Sheets: {} };
        //添加一个sheet页
        if (sheetNames == null) {
            workbook.SheetNames.push("sheet0");
        }
        //添加数据
        const tempSheet = XLSX.utils.json_to_sheet(obj);
        //判断标题
        for (let i = 0; i < headers.length; i++) {
            tempSheet[this.numberToChart((i)) + "1"] = { v: headers[i] };
        }

        workbook.Sheets[workbook.SheetNames[0]] = tempSheet;

        //使用XLSX.write方法写入
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        //保存文件
        this.saveAsExcelFile(excelBuffer, excelFileName,exceType);

    }
    private saveAsExcelFile(buffer: any, fileName: string,exceType:string): void {

        const buf = new ArrayBuffer(buffer.length);
        const view = new Uint8Array(buf);

        for (let i = 0; i !== buffer.length; ++i) {
            view[i] = buffer.charCodeAt(i) & 0xFF;
        };

        const data: Blob = new Blob([buf], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });

        FileSaver.saveAs(data, fileName + "_" + utilities.getDate(4) + exceType);
    }

    //将数字转化为chart类型
    private numberToChart(i: number): string {
        return String.fromCharCode(65 + i);
    }
}

