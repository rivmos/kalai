import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import {
    useAppSelector,
} from '../store'
// Your data table component
import DataTable from '@/components/shared/DataTable'
//import type { DataState } from '../store'
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Dropdown from '@/components/ui/Dropdown'
import EllipsisButton from '@/components/shared/EllipsisButton'

const ProductTableTools = () => {
    const data = useAppSelector(
        (state) => state.reportsanalysisProductList.data.productList
    )
    
    // Define headers for CSV file
    const headers = [
        { label: 'SNO', key: 'sno' },
        { label: 'Project Name', key: 'name' },
        //{ label: 'User', key: 'username' },        
        { label: 'Country', key: 'country' },
        { label: 'Project Service', key: 'project_service' },
        { label: 'Specific Service', key: 'specific_service' },
        { label: 'Pod Name', key: 'podname' },
        { label: 'Start Date', key: 'startdate' },
        { label: 'End Date', key: 'duedate' },
        { label: 'Industry Name', key: 'industryname' },
        { label: 'Project Status', key: 'projectstatus' },
    ];

    // create PDF file
    const handleExportToPDF = () => {
        const pdf = new jsPDF();    
        // Add content to the PDF
        pdf.text('Podjinn User wages list', 20, 10);
        pdf.text('----------------------------------', 20, 20);    
        // Iterate through your data and add it to the PDF
        data.forEach((index) => {
            pdf.text(`${index.sno}. ${index.name}. ${index.country}. ${index.project_service}. ${index.specific_service}. ${index.podname}. ${index.startdate}. ${index.duedate}. ${index.industryname}. ${index.projectstatus}`, 20, 30 + index.sno * 10);
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
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <ProductTableSearch />
            {/* <ProductFilter /> */}
            <Button>
                <Dropdown placement="bottom-end" renderTitle="Export">      
                    <CSVLink data={data} headers={headers} filename={'projectlist.csv'} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4" >
                        Export to CSV
                    </CSVLink>
                    <Button onClick={handleExportToPDF} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4" size="sm" icon={<HiDownload />}>
                        Export to PDF
                    </Button>
                    <Button  onClick={handleExport} className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4" size="sm" icon={<HiDownload />}>Export to Excel</Button>
                    </Dropdown>
            </Button>
            {/* <Link
                
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
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
