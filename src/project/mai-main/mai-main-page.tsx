import React from "react";
import ReactDom from 'react-dom';
import "./mai-main-page.less"
import {MlcActionEvent, MlcErrorEvent, MlcLifecycleEvent, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsm";
import {MlcReactListener} from "../../mlc/core/MlcReactListener";
import {MlcReactContainer} from "../../mlc/core/MlcReactContainer";

function MaiMainPage(props: any) {

    const listener: MlcReactListener = {
        onActionEvent(event: MlcActionEvent): void {
            console.log("MaiMainPage", `ActionEvent >>> ${JSON.stringify(event)}`)
        },
        onStateEvent(event: MlcStateEvent): void {
            console.log("MaiMainPage", `StateEvent >>> ${JSON.stringify(event)}`)
        },
        onLifecycleEvent(event: MlcLifecycleEvent): void {
            console.log("MaiMainPage", `LifecycleEvent >>> ${JSON.stringify(event)}`)
        },
        onErrorEvent(event: MlcErrorEvent): void {
            console.log("MaiMainPage", `MlcErrorEvent >>> ${JSON.stringify(event)}`)
        }
    }

    return <MlcReactContainer debug={false} dsl={"mai_main_dsl"} listener={listener}/>
}

ReactDom.render(
    <MaiMainPage/>,
    document.getElementById('root')
);
