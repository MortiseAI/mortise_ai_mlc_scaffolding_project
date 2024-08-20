import React from 'react';
import {useLocation} from 'react-router-dom'
import {MlcReactContainer} from "./MlcReactContainer";
import {MlcReactListener} from "./MlcReactListener";
import {MlcActionEvent, MlcErrorEvent, MlcLifecycleEvent, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsm";

/**
 * MLC React 通用页面
 * @constructor
 */
export function MlcReactPage() {

    const location = useLocation()

    const listener: MlcReactListener = {
        onActionEvent(event: MlcActionEvent): void {
            console.log("MlcPage",`ActionEvent >>> ${JSON.stringify(event)}`)
        },
        onStateEvent(event: MlcStateEvent): void {
            console.log("MlcPage",`StateEvent >>> ${JSON.stringify(event)}`)
        },
        onLifecycleEvent(event: MlcLifecycleEvent): void {
            console.log("MlcPage",`LifecycleEvent >>> ${JSON.stringify(event)}`)
        },
        onErrorEvent(event: MlcErrorEvent): void {
            console.log("MlcPage",`MlcErrorEvent >>> ${JSON.stringify(event)}`)
        }
    }

    return (
        <MlcReactContainer debug={location.state.debug} dsl={location.state.dsl} listener={listener}/>
    );

}
