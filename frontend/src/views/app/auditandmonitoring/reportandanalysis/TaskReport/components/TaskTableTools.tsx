import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import TaskTableSearch from './TaskTableSearch'
import TaskFilter from './TaskFilter'
import { Link } from 'react-router-dom'
import {
    useAppSelector,
} from '../store'
import { CSVLink } from 'react-csv'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

const ProductTableTools = () => {
    const data = useAppSelector(
        (state) => state.taskList.data.taskList
    )

    // Define headers for CSV file
    const headers = [
        { label: 'Task Name', key: 'task_name' },
        { label: 'Project Name', key: 'project_name' },        
        { label: 'Start Date', key: 'start_date' },
        { label: 'Due Date', key: 'due_date' },
        { label: 'Estimated Time', key: 'approved_hour' },
        { label: 'Assigned To', key: 'assigned_to' },
        { label: 'Status', key: 'status' },
    ];

    // create PDF file
    const handleExportToPDF = () => {
        const pdf = new jsPDF();    
        // Add content to the PDF
        pdf.text('Podjinn User Task list', 20, 10);
        pdf.text('----------------------------------', 20, 20);    
        // Iterate through your data and add it to the PDF
        data.forEach((index) => {
            pdf.text(`${index.task_name}. ${index.project_name}. ${index.start_date}. ${index.due_date}. ${index.approved_hour}. ${index.assigned_to}. ${index.status}`, 20, 30 + index.sno * 10);
        });    
        // Save the PDF
        pdf.save('project_exported_data.pdf');
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
            <TaskTableSearch />
            <TaskFilter />
            <CSVLink data={data} headers={headers} filename={'projectlist.csv'} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">
                Export to CSV
            </CSVLink>
            <button onClick={handleExportToPDF} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">
                Export to PDF
            </button>
            <button onClick={handleExport} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">Export to Excel</button>
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
