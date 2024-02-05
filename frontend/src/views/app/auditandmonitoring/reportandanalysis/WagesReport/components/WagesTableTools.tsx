import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import WagesTableSearch from './WagesTableSearch'
import WagesFilter from './WagesFilter'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import {
    getWages,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
// Your data table component
import DataTable from '@/components/shared/DataTable'
import type { DataState } from '../store'
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';


const ProductTableTools = () => {
    // Sample data for the data table
    const data = useAppSelector(
        (state) => state.reportsanalysisWagesList.data.productList
    )    

    // Define headers for CSV file
    const headers = [
        { label: 'SNO', key: 'sno' },
        { label: 'User', key: 'user' },
        { label: 'Project/Event', key: 'name' },
        { label: 'Task/Event Type', key: 'taskname' },
        { label: 'Total Time Logged', key: 'spent_time_minutes' },
        { label: 'Non Billable Time', key: 'percent_disapprove' },
        { label: 'Performance Bonus', key: 'performance' },
        { label: 'Performance Deduction', key: 'deduction' },
        { label: 'Wages Per Hours', key: 'wage_per_hour' },
        { label: 'Total Wages', key: 'total_wages' },
        { label: 'Performance Retention', key: 'performance_retention' },
        { label: 'Net Total', key: 'net_total' },
        { label: 'Tax Deduction', key: 'tax_deduction' },
        { label: 'Net Payable', key: 'net_payable' },
        { label: 'Balance Payable', key: 'balance_payable' },
    ];

    // create PDF file
    const handleExportToPDF = () => {
        const pdf = new jsPDF();    
        // Add content to the PDF
        pdf.text('Podjinn User wages list', 20, 10);
        pdf.text('----------------------------------', 20, 20);    
        // Iterate through your data and add it to the PDF
        data.forEach((index) => {
            pdf.text(`${index.sno}. ${index.user}. ${index.name}. ${index.taskname}. ${index.balance_payable}. ${index.deduction}. ${index.wage_per_hour}`, 20, 30 + index.sno * 10);
        });    
        // Save the PDF
        pdf.save('exported_data.pdf');
    };

    // export in excel sheet
    const exportToExcel = (data:any, fileName:any) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };
    const handleExport = () => {
        exportToExcel(data, 'exported_data');
    };      
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <WagesTableSearch />
            <WagesFilter />
            <CSVLink data={data} headers={headers} filename={'wageslist.csv'} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">
                Export to CSV
            </CSVLink>
            <button onClick={handleExportToPDF} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">
                Export to PDF
            </button>
            <button onClick={handleExport} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">Export to Excel</button>
        <div>
      
      {/* Your component content */}
    </div>
            {/* <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
            {/* <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/sales/product-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Product
                </Button>
            </Link> */}
        </div>
    )
}

export default ProductTableTools
