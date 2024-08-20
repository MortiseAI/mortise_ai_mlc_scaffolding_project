import {MlcActionEvent, MlcStateEvent, MlcWorkflow} from "@mai-alpha/mai-mlc-core-tsm";
import {MaiMainBoxActionKeys} from "../component/mai-main-box/action/MaiMainBoxActionKeys";
import {MaiMainDialogStateKeys} from "../component/mai-main-dialog/state/MaiMainDialogStateKeys";
import {MaiMainDialogStateModel} from "../component/mai-main-dialog/state/MaiMainDialogStateModel";

export class MaiMainWorkflow extends MlcWorkflow {

    handleActionEvent(event: MlcActionEvent) {
        switch (event.getSender()) {
            case "MaiMainBox":
                this.handleMaiMainBox(event)
                break
            case "MaiMainDialog":
                this.handleMaiMainDialog(event)
                break
            case "MaiMainLogic":
                this.handleMaiMainLogic(event)
                break
            default:
                super.handleActionEvent(event);
                break
        }
    }

    handleMaiMainBox(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiMainBoxActionKeys.MAI_MAIN_BOX_CLICK:
                const model1 = new MaiMainDialogStateModel()
                model1.content = event.getModel().content
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiMainDialog")
                    .setMessage(MaiMainDialogStateKeys.MAI_MAIN_DIALOG_OPEN)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
        }
    }

    handleMaiMainDialog(event: MlcActionEvent) {
    }

    handleMaiMainLogic(event: MlcActionEvent) {
    }

}
