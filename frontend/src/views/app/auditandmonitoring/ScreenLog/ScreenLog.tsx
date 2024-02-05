
import React, { useState, useEffect, useRef } from 'react'
import Button from '@/components/ui/Button';
import 'reactjs-popup/dist/index.css';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import Progress from '@/components/ui/Progress'
import Select from '@/components/ui/Select'
import reducer, { useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
import { ScreenLogsState, getScreenlog } from './store/screenlogSlice';
import { apiGetScreenLogs } from '@/services/Audit';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import Drawer from '@/components/ui/Drawer'
import { FaTrashCan } from "react-icons/fa6";
import DatePicker from '@/components/ui/DatePicker'
import Card from '@/components/ui/Card';
import moment from 'moment';
import Tooltip from '@/components/ui/Tooltip'
import Rating from '@mui/material/Rating';
import Popup from "reactjs-popup";
import { CSVLink } from 'react-csv';
import Input from '@/components/ui/Input'
import { styled } from '@mui/material/styles';
import {
    HiDownload,
    HiOutlineSearch,
    HiOutlineTrash,
    HiOutlineFilter,
    HiOutlineSwitchHorizontal,
    HiOutlinePencil,
    HiOutlineFlag,
    HiOutlineCog,
} from 'react-icons/hi'
import 'reactjs-popup/dist/index.css';
import { IoMdClose } from "react-icons/io";
injectReducer('screenlog', reducer)

const ScreenLog = () => {

    const { DatePickerRange } = DatePicker
    const dispatch = useAppDispatch()
    const [selectedUser, setSelectedUser] = useState();
    const ApiScreenLogData = useAppSelector(state => state.screenlog.data.screenlogdata);
    const userList = ApiScreenLogData?.usersData;
    const [start, setStart] = useState<number | null>(null);
    const [end, setEnd] = useState<number | null>(null);
    const [screenData, setScreenData] = useState<ScreenLogsState | null>(null);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const pdf = new jsPDF();

    useEffect(() => {
        dispatch(getScreenlog())
    }, [dispatch])

    const handleUserChange = (selectedOption: any) => {
        setSelectedUser(selectedOption.value);
    };

    const fetchDataForSelectedUser = async () => {
        try {
            if (selectedUser) {
                const userId = selectedUser;
                const response = await apiGetScreenLogs(userId);
                setScreenData(response.data as ScreenLogsState | null);
            } else {
                console.error('Selected user is undefined');
            }
        } catch (error) {
            console.error('Error fetching screen data:', error);
        }
    };

    const [zoomed, setZoomed] = useState(null);

    const handleMouseEnter = (itemId: any) => {
        setZoomed(itemId);
    };

    const handleMouseLeave = () => {
        setZoomed(null);
    };

    const openModal = (screenImageData: any) => {
        setSelectedImage(screenImageData);
        setOpen(true)
    };

    const closeModal = () => {
        setSelectedImage(null);
        setOpen(false);
    };

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false);
    }

    const exportToPDF = async () => {
      const pdf = new jsPDF();
      pdf.text('Screen Shots Export', 20, 20);

      const imageWidth = 100;
      const imageHeight = 75;

      for (const entry of screenData?.screenlog || []) {
        for (const item of entry.data || []) {
          const imageDataRaw = await getImageData(item.image_path);
          const imageData: string = imageDataRaw as string;
          pdf.addImage(imageData, 'JPEG', 20, 30, imageWidth, imageHeight);
          pdf.addPage();
        }
      }
      pdf.save('screen-shots-export.pdf');
    };

    const getImageData = async (imageUrl: any) => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };
    const userName = screenData?.screenlog[0]?.data[0]?.user?.name;
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const UserName = userName ? capitalizeFirstLetter(userName) : '';
    const getColorClass = (attentivenessData: any, baseColor: string) => {
        let dynamicColor = baseColor;
        if (attentivenessData <= 30) {
            return 'red-500';
        } else if (attentivenessData <= 60) {
            return 'yellow-500';
        } else if (attentivenessData <= 75) {
            return 'green-500';
        }
        return dynamicColor;
    };

    return (
        <div>

            <div className="modal-design">
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal-reset">
                        <Button className="close" onClick={closeModal}>
                            <IoMdClose />
                        </Button>
                        <Card
                            header={<span>Screen Shot</span>}
                            headerClass="font-semibold text-lg text-indigo-600"
                            bodyClass="text-center"
                            footerClass="flex flex-col-reverse justify-end items-end"
                        >
                            <div className='container'>
                                <figure>
                                    <Link
                                        to=""
                                        className="thumbnail"
                                        data-image-id=""
                                        data-toggle="modal"
                                        data-title=""
                                        data-image={selectedImage}
                                        data-target={`#image-gallery`}
                                    >
                                        <img
                                            className={`img-thumbnail height ${zoomed === selectedImage ? "zoomed" : ""}`}
                                            src={selectedImage ?? ''}
                                            alt={`Screenshot`}
                                            onClick={() => openModal(selectedImage)}
                                        />
                                    </Link>
                                </figure>
                            </div>
                        </Card>
                    </div>
                </Popup>
            </div>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <div className='container'>
                    <h6 className="text-left pb-2">User</h6>
                    <Select
                        placeholder="Please Select"
                        options={userList && Array.isArray(userList) ? userList.map(user => ({
                            value: user.user_id,
                            label: user.name
                        })) : []}
                        onChange={handleUserChange}
                    ></Select>
                    <h6 className="text-left pb-2">Date</h6>
                    <DatePickerRange
                        dateViewCount={2}
                        placeholder="date view"
                        onChange={(dates: any) => {
                            setStart(dates[0]);
                            setEnd(dates[1]);
                        }}
                    />
                    <Button
                        style={{ marginTop: "20px", alignItems: "center", backgroundColor: "#7460ee", color: "white" }}
                        onClick={fetchDataForSelectedUser}
                    >
                        Query
                    </Button>{" "}{" "}
                    <Button
                        style={{ marginTop: "20px", alignItems: "center", backgroundColor: "white", color: "#7460ee" }}
                        onClick={onDrawerClose}
                    >
                        Cancel
                    </Button>
                </div>
            </Drawer>
            <div className='ss-sec'>
                <div className="lg:flex items-center justify-between mb-4">
                    <h4 style={{ fontSize: "24px" }}>Screen Log</h4>
                    <div className="flex flex-col lg:flex-row lg:items-center">
                        <Button
                          onClick={exportToPDF}
                            className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round select-none h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                        >
                            Export to PDF
                        </Button>
                        <Button size="sm" onClick={() => openDrawer()} icon={<HiOutlineFilter />} className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">Filter</Button>
                    </div>
                </div>
                <h4 style={{ paddingBottom: "20px", color: "#455A64" }}>{UserName}</h4>
                <div className="ss-ac-box">
                    <div className='row'>
                        {((screenData?.screenlog[0]?.data || []) as any).map((item: any) => (
                            <div className='col-md-2' key={item.id}>
                                <div key={item.id}>
                                    <div
                                        className="thumb margin"
                                        style={{ position: "relative" }}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <figure>
                                            <Link
                                                className="thumbnail"
                                                to=""
                                                data-image-id=""
                                                data-toggle="modal"
                                                data-title=""
                                                data-image={item.image_path}
                                                data-target={`#image-gallery${item.id}`}
                                            >
                                                <img
                                                    className={'img-thumbnail height'}
                                                    src={item.image_path}
                                                    alt={`Screenshot ${item.id}`}
                                                    onClick={() => openModal(item.image_path)}
                                                />
                                            </Link>
                                        </figure>
                                        <div className="screen-check-wrap mt-3 p-d-box">
                                            <label style={{ color: "#212529" }}>
                                                {moment(item.created_at).format('ddd, MMM DD, YYYY')}
                                            </label>
                                        </div>
                                        <label style={{ color: "#212529" }}>
                                            <span>{moment(item.created_at).format('h:mm:ss a')}</span>
                                        </label>
                                        <div className="screen-check-wrap p-d-box">
                                            <Tooltip title={`Mouse event's : ${item.mouse_event}`}>
                                                <label className="no-space" style={{ color: '#212529', fontWeight: 'bold' }}>{`M,${item.mouse_event}`}</label>
                                            </Tooltip>
                                            <Tooltip title={`Keyboard stroke : ${item.keyboard_stroke}`}>
                                                <label className="no-space" style={{ color: '#212529', fontWeight: 'bold' }}>{`K,${item.keyboard_stroke}`}</label>
                                            </Tooltip>
                                        </div>
                                        <Progress percent={item.attentiveness} color={getColorClass(item.attentiveness, 'your-base-color')} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ScreenLog


