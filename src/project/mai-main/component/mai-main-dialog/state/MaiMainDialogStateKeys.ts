import {AnnMlcStateKey, AnnMlcStateKeysClass, MlcMortiseStateKeys} from "@mai-alpha/mai-mlc-core-tsm";

@AnnMlcStateKeysClass()
export class MaiMainDialogStateKeys extends MlcMortiseStateKeys {

    @AnnMlcStateKey(false, false, "mai_main_dialog_open")
    static MAI_MAIN_DIALOG_OPEN = "mai_main_dialog_open"

}
