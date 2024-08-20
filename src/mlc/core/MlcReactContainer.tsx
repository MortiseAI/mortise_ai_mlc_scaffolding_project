import React, {useEffect, useRef, useState} from 'react';
import {MlcActionEvent, MlcBuilder, MlcInstance, MlcLifecycleEvent, MlcStateEvent, MlcProvider, MlcErrorEvent} from "@mai-alpha/mai-mlc-core-tsm";
import {MlcEvn} from "../env/MlcEvn";

/**
 * MLC React 通用容器
 * @param props
 * @constructor
 */
export function MlcReactContainer(props: any) {

    const [dsl, setDsl] = useState<string>()

    const [debug, seDebug] = useState(false)

    let mlcInstance = useRef<MlcInstance | null>()

    let mlcDom = useRef<any>()

    useEffect(function () {

        if (!window.onerror) {
            window.onerror = function (err) {
                if(err === 'ResizeObserver loop limit exceeded') {
                    console.warn('Ignored: ResizeObserver loop limit exceeded');
                    return true;
                }
            }
        }
        if (!MlcProvider.isRegistryMlcEnv()) {
            MlcProvider.registryMlcEnv(new MlcEvn())
        }

        if (props.debug) {
            seDebug(props.debug)
        }

        if (dsl != props.dsl) {
            handleDsl(props.dsl)
        }

        return () => {
            if (mlcInstance.current) {
                mlcInstance.current.uninstall()
                mlcInstance.current = null
            }
            if (window.onerror) {
                window.onerror = null
            }

        }

    }, [props])

    const handleDsl = (dls: string) => {
        new Promise<string>(function (resolve) {
            const loadDslFun = MlcProvider.MlcEnv().dsl(dls)
            if (loadDslFun) {
                loadDslFun()
                resolve(dls)
            }
        }).then(function (dls) {
            setDsl(`${dls}`)
        })
    }

    const handleDom = () => {
        if (!mlcInstance.current && dsl) {
            mlcInstance.current = new MlcBuilder(debug).dls(dsl).observer({
                handleActionEvent(event: MlcActionEvent) {
                    props.listener?.onActionEvent(event)
                },
                handleStateEvent(event: MlcStateEvent) {
                    props.listener?.onStateEvent(event)
                },
                handleLifecycleEvent(event: MlcLifecycleEvent) {
                    props.listener?.onLifecycleEvent(event)
                },
                handleErrorEvent(event: MlcErrorEvent) {
                    props.listener?.onErrorEvent(event)
                }
            }).build()
            if (props.onMlcInstanceCallBack) {
                props.onMlcInstanceCallBack(mlcInstance.current)
            }
        }
        if (!mlcDom.current) {
            mlcDom.current = mlcInstance.current?.install()
        }
        return mlcDom.current
    }

    return (
        <div style={{width: "100vw", height: "100vh"}}>
            {dsl ? handleDom() : null}
        </div>
    )

}

