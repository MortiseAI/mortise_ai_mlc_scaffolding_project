import React, {useEffect, useState} from "react";
import {BaseMlcVirtual, MlcComponentMortiseConfig, MlcComponentProxy, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsm";

/**
 * 默认兜底 Virtual
 */
export class MlcVirtual extends BaseMlcVirtual {

    onCreateVirtual(config: MlcComponentMortiseConfig): any {

        const proxy = new MlcComponentProxy(this.getWebPromise(), {
            name: config.dsl.name,
            data: config.dsl.data,
            ext: config.dsl.ext,
            style: this.getStyle(),
        })

        return (
            <MlcVirtualProxyComponent key={config.dsl.name} proxy={proxy}>
                {
                    this.buildChildes(config.dsl.child)
                }
            </MlcVirtualProxyComponent>
        )

    }

}

function MlcVirtualProxyComponent(props: any) {

    const [install, setInstall] = useState(false)
    const [hide, setHide] = useState(false)
    const [child, setChild] = useState()

    useEffect(function () {
        if (props.proxy) {
            Promise.resolve().then(() => initProxyComponent())
        }
    }, [props])

    const initProxyComponent = () => {
        if (props.proxy) {
            props.proxy.registryCallBack({
                onInstall() {
                    setHide(props.proxy.getHide())
                    setInstall(true)
                },
                onUninstall() {
                    setInstall(false)
                },
                onRefresh() {
                    setChild(props.proxy.getChild())
                },
                onHiddenChange(hide: boolean) {
                    setHide(hide)
                },
                onStateEvent(event: MlcStateEvent) {
                },
                onSaveComponentState() {
                },
                onRestoreComponentState(data: any) {
                }
            })
        }

        if (!child && props.children) {
            setChild(props.children)
        }
    }

    return (
        (!install || hide) ? null :
            <React.Fragment>
                {child}
            </React.Fragment>
    )

}
