import { useState } from 'react';
import Button from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';
import type { MouseEvent } from 'react';

const Modal = () => {
    const [dialogIsOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e);
        setIsOpen(false);
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e);
        setIsOpen(false);
    }

    return (
        <div style={{ display: "flex" }}>
            <Button variant="solid" onClick={() => openDialog()} style={{ minWidth: '30px', padding: '3px 10px', backgroundColor: 'purple', color: 'white', fontSize: '12px', height: '24px', marginRight: '8px' }}>
                Assigned Projects 
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Dialog Title</h5>
                <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which dont
                    look even slightly believable.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                        style={{ backgroundColor: 'purple', color: 'white', fontSize: '12px', height: '24px' }}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk} style={{ backgroundColor: 'purple', color: 'white', fontSize: '12px', height: '24px' }}>
                        Okay
                    </Button>
                </div>
            </Dialog>
            <Button variant="solid" onClick={() => openDialog()} style={{ minWidth: '30px', padding: '3px 10px', backgroundColor: 'purple', color: 'white', fontSize: '12px', height: '24px', marginLeft: '8px' }}>
            view All Projects
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Dialog Title</h5>
                <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which dont
                    look even slightly believable.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                        style={{ backgroundColor: 'purple', color: 'white', fontSize: '12px', height: '24px' }}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk} style={{ backgroundColor: 'purple', color: 'white', fontSize: '12px', height: '24px' }}>
                        Okay
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Modal;
