import {AnnMlcActionKey, AnnMlcActionKeysClass, MlcMortiseActionKeys} from "@mai-alpha/mai-mlc-core-tsm";

@AnnMlcActionKeysClass()
export class MaiMainBoxActionKeys extends MlcMortiseActionKeys {

    @AnnMlcActionKey(false, "mai_main_box_click", "MaiMainBoxActionModel")
    static MAI_MAIN_BOX_CLICK = "mai_main_box_click"

}
