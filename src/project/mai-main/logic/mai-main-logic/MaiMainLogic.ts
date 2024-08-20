import {AnnMlcAction, AnnMlcSidecar, AnnMlcState, MlcLogic, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsm";
import {MaiMainLogicActionKeys} from "./action/MaiMainLogicActionKeys";
import {MaiMainLogicStateKeys} from "./state/MaiMainLogicStateKeys";

@AnnMlcAction(true, MaiMainLogicActionKeys)
@AnnMlcState(true, MaiMainLogicStateKeys)
@AnnMlcSidecar()
export class MaiMainLogic extends MlcLogic {

    onAttach() {
        super.onAttach();
    }

    onInstall() {
        super.onInstall();
    }

    onDetach() {
        super.onDetach();
    }

    handleStateEvent(event: MlcStateEvent) {
        switch (event.getMessage()) {
            default:
                super.handleStateEvent(event);
                break
        }
    }

}
