import {AnnMlcAction, AnnMlcSidecar, AnnMlcState, BaseMlcVirtual, MlcComponentMortiseConfig, MlcComponentProxy, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsm";
import React, {useEffect, useState} from "react";
import {MaiMainDialogComponent} from "./MaiMainDialogComponent";
import {MaiMainDialogActionKeys} from "./action/MaiMainDialogActionKeys";
import {MaiMainDialogStateKeys} from "./state/MaiMainDialogStateKeys";
import {MaiMainDialogStateModel} from "./state/MaiMainDialogStateModel";

@AnnMlcAction(true, MaiMainDialogActionKeys)
@AnnMlcState(true, MaiMainDialogStateKeys)
@AnnMlcSidecar()
export class MaiMainDialogVirtual extends BaseMlcVirtual {

    onCreateVirtual(config: MlcComponentMortiseConfig): any {

        const proxy = new MlcComponentProxy(this.getWebPromise(), {
            name: config.dsl.name,
            data: config.dsl.data,
            ext: config.dsl.ext,
            style: this.getStyle(),
        })

        const _this = this

        return <MaiMainDialogProxyComponent key={config.dsl.name} proxy={proxy} sender={
            {
                sendAction(event: any) {
                    _this.sendActionEvent(event.message, event.model, event.receiver, event.data, event.callback)
                }
            }
        }/>

    }

}

function MaiMainDialogProxyComponent(props: any) {

    const [install, setInstall] = useState(false)
    const [hide, setHide] = useState(false)

    const [style, setStyle] = useState()
    const [gravity, setGravity] = useState()

    const [content, setContent] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (props.proxy) {
            Promise.resolve().then(() => initProxyComponent())
        }
    }, [props])

    const initProxyComponent = () => {

        props.proxy.registryCallBack({
            onInstall() {
                setStyle(props.proxy.getStyle())
                setGravity(props.proxy.getGravity())
                setHide(props.proxy.getHide())
                setInstall(true)
            },
            onUninstall() {
                setInstall(false)
            },
            onRefresh() {
                setStyle(props.proxy.getStyle())
                setGravity(props.proxy.getGravity())
            },
            onHiddenChange(hide: boolean) {
                setHide(hide)
            },
            onStateEvent(event: MlcStateEvent) {
                switch (event.getMessage()) {
                    case MaiMainDialogStateKeys.MAI_MAIN_DIALOG_OPEN:
                        if (event.getModel() && event.getModel() instanceof MaiMainDialogStateModel) {
                            setContent(event.getModel().content)
                            setOpen(true)
                        }
                        break
                    default:
                        break
                }
            },
            onSaveComponentState() {
            },
            onRestoreComponentState(data: any) {
            }
        })
    }

    return (
        (!install || hide) ? null :
            <React.Fragment>
                <MaiMainDialogComponent style={style}
                                        gravity={gravity}
                                        content={content}
                                        open={open}
                                        handleOpen={(open: boolean) => {
                                            setOpen(open)
                                        }}/>
            </React.Fragment>
    )

}