import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

export const ExportCsv = ({ excelData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const fileExtension1 = '.csv';

  const generateCSV = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([{ a: 1, b: 2 }]);
    XLSX.utils.book_append_sheet(wb, ws, 'test');
    XLSX.writeFile(wb, 'test.csv');
  };

  return (
    <button type="button" onClick={(e) => generateCSV()}>
      Export
    </button>
  );
};
