import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
    return (
        <div className="nav-bar">
            <nav>
                <ul>
                    <li>
                        <Link to='/add'>Add Item</Link>
                    </li>
                    <li>
                        <Link to='/update'>Update Item</Link>
                    </li>
                    <li>
                        <Link to='/remove'>Remove Item</Link>
                    </li>
                    <li>
                        <Link to='/displayC'>Display Items by Categories</Link>
                    </li>
                    <li>
                        <Link to='/displayA'>Display All Items</Link>
                    </li>
                    <li>
                        <Link to='/search'>Search Item</Link>
                    </li>
                    <li>
                        <Link to='/sort'>Sort</Link>
                    </li>   
                    <li>
                        <Link to='/displayL'>Display Low Stock Items</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
