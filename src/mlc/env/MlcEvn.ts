import {IMlcEnv} from "@mai-alpha/mai-mlc-core-tsm";
import {MlcBrick} from "../common/component/mai-def/MlcBrick";
import {MlcLayer} from "../common/component/mai-def/MlcLayer";
import {MlcVirtual} from "../common/component/mai-def/MlcVirtual";
import {mai_main_dsl} from "../../project/mai-main/dsl/mai_main_dsl";
import {MaiMainBoxBrick} from "../../project/mai-main/component/mai-main-box/MaiMainBoxBrick";
import {MaiMainBoxActionKeys} from "../../project/mai-main/component/mai-main-box/action/MaiMainBoxActionKeys";
import {MaiMainBoxStateKeys} from "../../project/mai-main/component/mai-main-box/state/MaiMainBoxStateKeys";
import {MaiMainDialogVirtual} from "../../project/mai-main/component/mai-main-dialog/MaiMainDialogVirtual";
import {MaiMainDialogActionKeys} from "../../project/mai-main/component/mai-main-dialog/action/MaiMainDialogActionKeys";
import {MaiMainDialogStateKeys} from "../../project/mai-main/component/mai-main-dialog/state/MaiMainDialogStateKeys";
import {MaiMainLogic} from "../../project/mai-main/logic/mai-main-logic/MaiMainLogic";
import {MaiMainLogicActionKeys} from "../../project/mai-main/logic/mai-main-logic/action/MaiMainLogicActionKeys";
import {MaiMainLogicStateKeys} from "../../project/mai-main/logic/mai-main-logic/state/MaiMainLogicStateKeys";
import {MaiMainWorkflow} from "../../project/mai-main/workflow/MaiMainWorkflow";

export class MlcEvn implements IMlcEnv {

    private _dsl: any = {
        mai_main_dsl,
    }

    private _mortiseView: any = {
        /** common **/
        MlcBrick,
        MlcLayer,
        MlcVirtual,
        /** mai-main **/
        MaiMainBoxBrick,
        MaiMainDialogVirtual,
    }

    private _mortiseLogic: any = {
        /** mai-main **/
        MaiMainLogic,
    }

    private _mortiseWorkflow: any = {
        /** mai-main **/
        MaiMainWorkflow,
    }

    private _actionKeys: any = {
        /** mai-main **/
        MaiMainBoxActionKeys,
        MaiMainDialogActionKeys,
        MaiMainLogicActionKeys,
    }

    private _stateKeys: any = {
        /** mai-main **/
        MaiMainBoxStateKeys,
        MaiMainDialogStateKeys,
        MaiMainLogicStateKeys,
    }

    private _sidecar: any = {}

    appId(): string {
        return "";
    }

    dsl(key: string): any {
        return this._dsl[key]
    }

    mortiseView(key: string): any {
        return this._mortiseView[key]
    }

    mortiseLogic(key: string): any {
        return this._mortiseLogic[key]
    }

    mortiseWorkflow(key: string): any {
        return this._mortiseWorkflow[key]
    }

    actionKeys(key: string): any {
        return this._actionKeys[key]
    }

    stateKeys(key: string): any {
        return this._stateKeys[key]
    }

    sidecarClass(key: string): any {
        return this._sidecar[key]
    }

}
