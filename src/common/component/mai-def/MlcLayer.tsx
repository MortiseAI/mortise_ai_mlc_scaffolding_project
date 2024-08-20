import React, {useEffect, useState} from "react";
import {BaseMlcLayer, MlcComponentMortiseConfig, MlcComponentProxy, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsm";

/**
 * 默认兜底 Layer
 */
export class MlcLayer extends BaseMlcLayer {

    onCreateLayer(config: MlcComponentMortiseConfig) {

        const proxy = new MlcComponentProxy(this.getWebPromise(), {
            name: config.dsl.name,
            data: config.dsl.data,
            ext: config.dsl.ext,
            style: this.getStyle(),
        })

        return (
            <MlcLayerProxyComponent key={config.dsl.name} proxy={proxy}>
                {
                    this.buildChildes(config.dsl.child)
                }
            </MlcLayerProxyComponent>
        )
    }

}

function MlcLayerProxyComponent(props: any) {

    const [install, setInstall] = useState(false)
    const [hide, setHide] = useState(false)

    const [style, setStyle] = useState()
    const [gravity, setGravity] = useState()

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
            <div style={style} className={gravity}>
                {child}
            </div>
    )

}
