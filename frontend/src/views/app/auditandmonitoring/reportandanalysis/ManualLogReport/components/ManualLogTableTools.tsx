import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ManualLogTableSearch from './ManualLogTableSearch'
import ManualLogFilter from './ManualLogFilter'
import { useAppSelector } from '../store'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import ManualLogAdd from './ManualLogAdd'
import Dropdown from '@/components/ui/Dropdown'
import EllipsisButton from '@/components/shared/EllipsisButton'


const ManualLogTableTools = () => {

    const [dialogIsOpen, setIsOpen] = useState(false)
    const openDialog = () => {
        setIsOpen(true)
    }
    const onDialogClose = () => {
        setIsOpen(false)
    }
    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }
    
    const data = useAppSelector(
        (state) => state.ManualLogList.data.manualLogList
    )
    
    // Define headers for CSV file
    const headers = [
        { label: 'SNO', key: 'sno' },
        { label: 'Meeting Type', key: 'meeting_type' },
        { label: 'Project Name', key: 'project' },
        //{ label: 'User', key: 'username' },        
        { label: 'Meeting Agenda', key: 'meeting_agenda' },
        { label: 'Participant', key: 'participant' },
        { label: 'Start Date Time', key: 'start_time' },
        { label: 'End Date Time', key: 'end_time' },
        { label: 'Billable', key: 'billable' },
        { label: 'Non Billable', key: 'nonbillable' },
    ];

    // create PDF file
    const handleExportToPDF = () => {
        const pdf = new jsPDF();    
        // Add content to the PDF
        pdf.text('Podjinn User wages list', 20, 10);
        pdf.text('----------------------------------', 20, 20);    
        // Iterate through your data and add it to the PDF
        data.forEach((index) => {
            pdf.text(`${index.sno}. ${index.meeting_type}. ${index.project}. ${index.meeting_agenda}. ${index.participant}. ${index.start_time}. ${index.end_time}. ${index.billable}. ${index.nonbillable}`, 20, 30 + index.sno * 10);
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
            <ManualLogTableSearch />
            <ManualLogFilter />
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
            <Link onClick={() => openDialog()} className="ml-2 flex items-center button bg-indigo-50 dark:bg-indigo-500 dark:bg-opacity-20 hover:bg-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-30 active:bg-indigo-200 dark:active:bg-indigo-500 dark:active:bg-opacity-40 text-indigo-800 dark:text-indigo-50 radius-round select-none h-9 px-3 py-2 text-sm" to="#">                                
                    <HiPlusCircle className="mr-1" /> ADD MANUAL LOG
                </Link>
            <Dialog
                isOpen={dialogIsOpen}
                width={1000}
                //height={250}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                
                <h4>Add new manual log</h4>
                <div className="mt-8">
                    <ManualLogAdd onDialogClose={onDialogClose}/>
                </div>
            </Dialog>
        </div>
    )
}

export default ManualLogTableTools
