import {MlcProvider} from "@mai-alpha/mai-mlc-core-tsm";

export function mai_main_dsl() {

    MlcProvider.registryMlcDsl("mai_main_dsl", {
        "bizId": "10001",
        "bizName": "mai_main_dsl",
        "layout": "mai_main_dsl_layout",
        "logic": "mai_main_dsl_logic",
        "workflow": "mai_main_dsl_workflow",
        "scaleW": 1920,
        "scaleH": 1080
    });

    MlcProvider.registryMlcDsl("mai_main_dsl_layout", [
        {
            "type": "brick",
            "soleId": 10000,
            "name": "MaiMainBox",
            "component": "MaiMainBoxBrick",
            "attrs": {
                "width": -1,
                "height": -1
            },
            "style": {},
        },
        {
            "type": "virtual",
            "soleId": 20000,
            "name": "MaiMainDialog",
            "component": "MaiMainDialogVirtual",
        },
    ]);

    MlcProvider.registryMlcDsl("mai_main_dsl_logic", [
        {
            "name": "MaiMainLogic",
            "logic": "MaiMainLogic",
        },
    ])

    MlcProvider.registryMlcDsl("mai_main_dsl_workflow", [
        {
            "name": "MaiMainWorkflow",
            "workflow": "MaiMainWorkflow",
            "events": [
                {
                    "sender": "MaiMainBox",
                    "action": [
                        "mai_main_box_click"
                    ]
                },
            ]
        }
    ])

}
