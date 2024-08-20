import React, {useEffect, useRef, useState} from "react";
import "./less/mai-main-dialog.less"
import {Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";

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
               destroyOnClose={true}
               centered={true}
               footer={null}
               bodyStyle={{padding: 0}}
               onCancel={() => {
                   props.handleOpen(false)
               }}>
            <div className="mai_main_dialog_container">
                <div className="mai_main_dialog_head_container">
                    <span className='mai_main_dialog_title_txt'>MainDialog</span>
                    <CloseOutlined className='mai_main_dialog_title_close'
                                   onClick={() => {
                                       props.handleOpen(false)
                                   }}/>
                </div>
                <div className='mai_main_dialog_content_container'>
                    <span className='mai_main_dialog_content_txt'>{`${props.content}`}</span>
                </div>
            </div>
        </Modal>
    )

}
