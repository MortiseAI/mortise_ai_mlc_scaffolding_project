import React, {useEffect, useState} from "react";
import {BaseMlcBrick, MlcComponentMortiseConfig, MlcComponentProxy, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsm";

/**
 * 默认兜底 Brick
 */
export class MlcBrick extends BaseMlcBrick {

    onCreateBrick(config: MlcComponentMortiseConfig) {

        const proxy = new MlcComponentProxy(this.getWebPromise(), {
            name: config.dsl.name,
            data: config.dsl.data,
            ext: config.dsl.ext,
            style: this.getStyle(),
        })

        return <MlcBrickProxyComponent key={config.dsl.name} proxy={proxy}/>
    }

}

function MlcBrickProxyComponent(props: any) {

    const [install, setInstall] = useState(false)
    const [hide, setHide] = useState(false)

    const [style, setStyle] = useState()
    const [gravity, setGravity] = useState()

    const [name, setName] = useState()

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
            setName(props.proxy.getName())
        }
    }

    return (
        (!install || hide) ? null :
            <div style={style} className={gravity}>
                <span style={{fontSize: "15px", color: "#000"}}>{`Def MlcBrick : ${name}`}</span>
            </div>
    )

}
