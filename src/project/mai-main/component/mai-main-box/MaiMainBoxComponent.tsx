import React, {useEffect} from "react";
import "./less/mai-main-box.less"
import logo from '../../../../../res/mai_main_logo.png';

export function MaiMainBoxComponent(props: any) {

    useEffect(() => {

    }, [props])

    return (
        <div className='mai_main_box_container'>
            <img className='mai_main_box_logo_icon' src={logo}/>
            <span className='mai_main_box_slogan_txt'>Make a Difference</span>
            <button className="mai_main_box_btn"
                    onClick={() => {
                        props.handleMainBoxClick()
                    }}>
                Click
            </button>
        </div>
    )

}
