import React from 'react';
import * as XLSX from 'xlsx';
import { Buffer } from 'buffer'; // Import the polyfill
import styles from './DownloadExcelReport.module.css';

const DownloadExcelReport = ({ data, dashboardName }) => {
     const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const generateExcelData = () => {
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: Object.keys(data[0]),
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return excelData;
  };

  // if(dashboardName === "periodical") {
  //   const generateExcelData = () => {
  //     const worksheet = XLSX.utils.json_to_sheet(data, {
  //       header: Object.keys(data[0]),
  //     });
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  //     const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     return excelData;
  //   };
  // }

//   const excelData = generateExcelData();

  const handleDownload = () => {
    
    const excelData = generateExcelData();
    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(excelData).toString('base64')}`;

    const downloadLink = document.createElement('a');
    downloadLink.href = dataUri;
    downloadLink.download = `${dashboardName}-${formattedDate}.xlsx`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <button className={styles.generateReportBtn} onClick={handleDownload}>Download Report</button>
  );
};

export default DownloadExcelReport;
