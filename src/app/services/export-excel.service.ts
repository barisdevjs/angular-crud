import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import {imgBase64} from './logo'
import { EmployeeService } from './employee.service';


@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  list : any[] = [];

  constructor( public service: EmployeeService) { }

  call() {
    this.service.getEmployees().subscribe(data => this.list = data)
  }


  exportExcel(excelData: { title: any; data: any; headers: any }) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Employee DATA'); // TAB oF the excel file

    //Add Row and formatting
    worksheet.mergeCells('D1', 'G3');
    let titleRow = worksheet.getCell('D1');
    titleRow.value = title;
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Date
    worksheet.mergeCells('D4:G6');
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('D4');
    dateCell.value = date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    };
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' };

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: imgBase64,
      extension: 'jpeg',
    });
    worksheet.mergeCells('A1:C6');
    worksheet.addImage(myLogoImage, 'A1:C6');

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      };
    });

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 25  },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Wage', key: 'wage', width: 10 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Image', key: 'image', width: 60 },
    ]

     worksheet.addRows(this.list)

    // Adding Data with Conditional Formatting
    data.forEach((d: any) => {
      let row = worksheet.addRow(Object.values(d));

      let rating = row.getCell(5);
      let color = 'FF99FF99';
      let rating_val = rating.value || 0;
      // Conditional fill color
      if (rating_val > 4) {
        color = 'FF9999';
      }
      if (rating_val > 3 && rating_val <5) {
        color = 'E1EB34';
      }
      if (rating_val < 3) {
        color = 'EB4034';
      }

      rating.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

/*     worksheet.getColumn(1).width = 25;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 10;
    worksheet.getColumn(6).width = 25;
    worksheet.getColumn(7).width = 30;
    worksheet.getColumn(8).width = 100; */


    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow([
      'Employee Status Report Generated  at ' + date,
    ]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' },
    };
    footerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title + '.xlsx');
    });
  }
}
