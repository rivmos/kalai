import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';
import type { MouseEvent } from 'react';
import Select from '@/components/ui/Select';

import { injectReducer, useAppDispatch } from '@/store';
import Avatar from '@/components/ui/Avatar';

import reducer, {
  JinnState,
  ServicesState,
  SpecificServiceState,
  TechState,
  getJinnServices,
  getServices,
  getSpecificServices,
  getTechServices,
  // getTechList,
  useAppSelector,
} from './store';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { HiOutlinePlusCircle } from 'react-icons/hi';


const AddPodjinn = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);

  const servicesData = useAppSelector((state) => state.podjinns.data.services.data);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const specificServicesData = useAppSelector((state) => state.podjinns.data.sservices);
  const techlistData = useAppSelector((state) => state.podjinns.data.techservices);
  const jinnsData = useAppSelector((state) => state.podjinns.data.jinnservices);


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    if (selectedServiceId !== null) {
      dispatch(getSpecificServices(Number(selectedServiceId)));
      dispatch(getTechServices(Number(selectedServiceId)));
      dispatch(getJinnServices(Number(selectedServiceId)))
    }
  }, [selectedServiceId, dispatch]);





  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = (e: MouseEvent) => {
    setIsOpen(false);
  };

  const onDialogOk = async () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (selectedServiceId !== null) {
      dispatch(getSpecificServices(Number(selectedServiceId)));
      dispatch(getJinnServices(Number(selectedServiceId)))
    }
  }, [selectedServiceId, dispatch]);

  // Update handleServiceChange to reset selected tech when service changes
  const handleServiceChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedServiceId(selectedOption?.value || null);
    // Reset selected tech when service changes
  };

  // Update handleTechChange to set the selected tech ID
  const handleTechChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedTechId(selectedOption?.value || null);
  };
  const handleJinnsChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedJinnId(selectedOption?.value || null);
  };

  return (
    <div>
      <Button
        size="sm"
        variant="twoTone"
        icon={<HiOutlinePlusCircle />}
        onClick={() => openDialog()}
      >
        Add Podjinn
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Create Podjinn</h5>
        <p className="font-bold">Services</p>
        <div>
          <Select
            size="sm"
            className="mb-4"
            placeholder="Please Select"
            options={(servicesData || []).map((service: ServicesState) => ({
              value: service.id.toString(),
              label: service.name,
            }))}
            onChange={(selectedOption: { value: string; label: string } | null) => handleServiceChange(selectedOption)}

          />
        </div>
        <p className="font-bold">Specific Services</p>
        <div>
          <Select
            size="sm"
            className="mb-4"
            placeholder="Please Select"
            options={(specificServicesData || []).map((specificService: SpecificServiceState) => ({
              value: specificService.id.toString(),
              label: specificService.name,
            }))}
          />
        </div>
        <p className="font-bold">Tech List</p>
        <div>
          <Select
            size="sm"
            className="mb-4"
            placeholder="Please Select"
            options={(techlistData || []).map((techlist: TechState) => ({
              value: techlist.id.toString(),
              label: techlist.name,
            }))}

          />


        </div>
        <p className="font-bold">Jinns List</p>
        <div>
          <Select
            size="sm"
            className="mb-4"
            placeholder="Please Select"
            options={(jinnsData || []).map((jinnlist: JinnState) => ({
              value: jinnlist.id.toString(),
              label: jinnlist.name,
            }))}

          />


        </div>
        <div className="text-right mt-6">
          <Button className="ltr:mr-2 rtl:ml-2" variant="plain" onClick={onDialogClose}>
            Cancel
          </Button>
          <Button variant="solid" onClick={onDialogOk}>
            Add
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default AddPodjinn;
function setIsOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function dispatch(arg0: AsyncThunkAction<SpecificServiceState[], number, {
  state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; // Reset selected tech when service changes
  // Reset selected tech when service changes
  rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown;
}>) {
  throw new Error('Function not implemented.');
}

function setSelectedTechId(arg0: string | null) {
  throw new Error('Function not implemented.');
}

function setSelectedJinnId(arg0: string | null) {
  throw new Error('Function not implemented.');
}

