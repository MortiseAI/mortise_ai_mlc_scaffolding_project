import React, {useEffect, useState} from "react";
import "./less/mai-main-dialog.less"
import {Modal} from "antd";

export function MaiMainDialogComponent(props: any) {

    const [zIndex, setZIndex] = useState(0)

    const [open, setOpen] = useState(false)

    useEffect(function () {

        if (zIndex == 0 && props.style) {
            setZIndex(props.style.zIndex)
        }

        if (open != props.open) {
            setOpen(props.open)
        }

    }, [props])

    return (
        <Modal width={500}
               zIndex={zIndex}
               open={open}
               footer={null}
               closable={false}
               destroyOnClose={true}
               bodyStyle={{padding: 0}}
               onCancel={() => {
                   props.handleOpen(false)
               }}>
            <div className="mai_main_dialog_container">
                <span className='mai_main_dialog_txt'>{`${props.content}`}</span>
            </div>
        </Modal>
    )

}
