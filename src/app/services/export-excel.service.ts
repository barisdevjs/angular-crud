import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import {imgBase64} from './logo'
import { EmployeeService } from './employee.service';


@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor( public service: EmployeeService) { }

  exportExcel(excelData: { title: any; data: any; headers: any }) {
    //Title, Header & Data
    const title = excelData.title;
    const data = excelData.data;
    const header = excelData.headers;
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Employee DATA'); // TAB oF the excel file

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: imgBase64,
      extension: 'jpeg',
    });
    worksheet.mergeCells('A1:C6');
    worksheet.addImage(myLogoImage, 'A1:C6');

    //Add Row and formatting
    worksheet.mergeCells('D1:G3');
    let titleRow = worksheet.getCell('D1');
    titleRow.value = title;
    titleRow.font = {
      name: 'Calibri',
      size: 14,
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

    // Your Notes 

    worksheet.mergeCells('H1:H6');
    let notesRow = worksheet.getCell('H1');
    
    notesRow.value = 'YOUR NOTES :';
    notesRow.font = {
      name: 'Calibri',
      size: 14,
      bold: true,
      color: { argb: '95F2F5' },
    };
    notesRow.alignment = { vertical: 'top', horizontal: 'left' }

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
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    worksheet.columns = [
      { key: 'name', width: 25  },
      { key: 'email', width: 25 },
      { key: 'category', width: 15 },
      { key: 'wage', width: 10 },
      { key: 'rating', width: 10 },
      { key: 'id', width: 10 },
      { key: 'status', width: 15 },
      { key: 'image', width: 60 },
    ]

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
      row.alignment = { vertical: 'middle', horizontal: 'center' };
    });

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
