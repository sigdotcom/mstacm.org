import React from "react";
import "../../index.css";
import { ShoppingCartOutlined } from "@ant-design/icons"

import acmlogo from "../../images/acmlogo.png";

function NavBar() {
    return(
        <div className="NavBar">
            <img src={acmlogo} alt="acmlogo" id="acmlogo" width="85px"/>
            <p className="ShoppingCart">
                <ShoppingCartOutlined/>
            </p>

        </div>
    )
}

export default NavBar;