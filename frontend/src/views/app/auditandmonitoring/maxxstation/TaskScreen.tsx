
import React, { useState, useEffect, useRef } from 'react'
import Button from '@/components/ui/Button';
import 'reactjs-popup/dist/index.css';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import Progress from '@/components/ui/Progress'
import reducer, { useAppSelector } from './store';
import { injectReducer, useAppDispatch } from '@/store';
import { ScreenLogsState, getScreenlog } from './store/maxxstationSlice';
import { apiGetScreenLogs } from '@/services/WebService';
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

injectReducer('maxxstation', reducer)

const TaskScreen = () => {

  const { DatePickerRange } = DatePicker
  const dispatch = useAppDispatch()
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const { userId } = useParams();
  const [screenData, setScreenData] = useState<ScreenLogsState | null>(null);

  const imagePaths = screenData?.screenlog.map(entry =>
    entry.data.map(item => item.image_path)
  ) || [];

  const screenLogLoading = useAppSelector((state) => state.maxxstation.data.loading);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const pdf = new jsPDF();

  useEffect(() => {
    dispatch(getScreenlog())
  }, [dispatch])


  useEffect(() => {
    if (userId) {
      const [parsedUserId, parsedClientId] = userId.split('&taskId');
      const fetchScreenData = async () => {
        try {
          const id = parsedUserId ? parseInt(parsedUserId) : undefined;
          const clientId = parsedClientId ? parseInt(parsedClientId) : 0;
          if (id !== undefined && !isNaN(id)) {
            const response = await apiGetScreenLogs<ScreenLogsState>(id, clientId);
            setScreenData(response.data);
          } else {
          }
        } catch (error) {
        }
      };
      fetchScreenData();
    }
  }, [userId]);

  const [zoomed, setZoomed] = useState(null);

  const handleMouseEnter = (itemId: any) => {
    setZoomed(itemId);
  };

  const handleMouseLeave = () => {
    setZoomed(null);
  };

  const attentivenessData = screenData?.screenlog[0]?.data[0]?.attentiveness || "";
  const screenImageData = screenData?.screenlog[0]?.data[0]?.image_path || "";

  const openModal = (screenImageData: any) => {
    setSelectedImage(screenImageData);
    setOpen(true)
  };

  const closeModal = () => {
    setSelectedImage(null);
    setOpen(false);
  };

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
  return (
    <div>

      <div className="modal-design">
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal-reset">
            {/* <Button className="close" onClick={closeModal}>
              &times;
            </Button> */}
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
                    <img className={`img-thumbnail height ${zoomed === selectedImage ? "zoomed" : ""}`} src={selectedImage ?? ''} alt={`Screenshot`} onClick={() => openModal(selectedImage)}
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
          <h6 className="text-left pb-2">Date</h6>
          <DatePickerRange
            dateViewCount={2}
            placeholder="date view"
            onChange={(dates: any) => {
              setStart(dates[0]);
              setEnd(dates[1]);
            }}
          />
          <Button style={{ marginTop: "20px", alignItems: "center", backgroundColor: "#7460ee", color: "white" }}>Query</Button>{" "}{" "}
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
          <h4 style={{ fontSize: "24px" }}>ScreenShot Activity</h4>
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
                          className={`img-thumbnail height ${zoomed === item.id ? "zoomed" : ""}`}
                          src={item.image_path}
                          alt={`Screenshot ${item.id}`}
                          onClick={() => openModal(item.image_path)}
                        />
                      </Link>
                    </figure>
                    <div className="screen-check-wrap mt-4 p-d-box time-date">
                      <label style={{ color: "#212529" }}>
                        {moment(item.created_at).format('ddd, MMM DD, YYYY')}
                      </label>
                      <label style={{ color: "#212529" }}>
                        <span>{moment(item.created_at).format('HH:MM A')}</span>
                      </label> 
                    </div>                    
                    <div className="screen-check-wrap p-d-box my-2 m-k-cnt">
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

export default TaskScreen




