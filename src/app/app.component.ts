import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lang: string = "en-us";
  file: string = "json";
  inputdata: any = {};
  constructor() { }
  OUT() {

  }
  IN(evt) {
    /* 連接文件閱讀器 */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* 閱讀工作簿 */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* 抓住頁籤 */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* 保存數據 */
      let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      data.forEach(item => this.inputdata[item[0]] = item[1]);
      console.log(this.inputdata)

      let content = new Blob([JSON.stringify(this.inputdata)], { type: "text/plain;charset=utf-8" });
      saveAs(content, this.lang + "." + this.file);
      evt.target.value = "" // 清空
    };
    reader.readAsBinaryString(target.files[0]);
  }
  ngOnInit() {
  }
}
