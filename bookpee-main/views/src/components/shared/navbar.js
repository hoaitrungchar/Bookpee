import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo from '../../img/SIMSBCLogo.png'
import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from 'axios';
const cookies = new Cookies();
const token = cookies.get("TOKEN");
const UserContext = createContext();

export default function Navbar() {
    const navigate = useNavigate();
    const [signin, setSignIn] = useState(false);
    const cookies = new Cookies();
    const [role, setRole] = useState(null);
    useEffect(() => {
        axios.post("/api/signin/getRole", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => { setRole(response.data.role); console.log(response.data.role); if (response.data.role === "provider" || response.data.role === "customer") setSignIn(true)})
            .catch((error) => {
                console.log(error.response);
            })
      }, [])
        const handleSignOut = (e) => {
            cookies.remove('TOKEN', {
                path: "/",
            });
            setSignIn(false);
            setRole(null);
            navigate("signin");
        }
        
    let navItem = null, renderSignOut = null, renderSignIn = null;

    if (!signin) {
        navItem = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                        Trang chủ
                    </Link>
                </li>
            </>
        )
        renderSignIn = (
            <Link className="nav-link" to="/signin">
                Đăng nhập
            </Link>
        );
    }
    else {
        if (role === "customer") {
            navItem = (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/order">
                            Đặt hàng
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/viewhistory">
                            Tác giả yêu thích của bạn
                        </Link>
                    </li>
                </>
            );
        }
        else if (role === "provider") {
            navItem = (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/crudBook">
                            Quản lý sách
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/createBook">
                            Thêm sách
                        </Link>
                    </li>
                </>
            );
        }
        else {
            navItem = (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wip">
                            Đang phát triển (WIP)...
                        </Link>
                    </li>
                </>
            );
        }renderSignOut = (
        <button type="submit" className="btn btn-primary" onClick={handleSignOut}>
            Đăng xuất
        </button>
    );
    }

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body">
            <div className="container-fluid" style={{ marginLeft: '50px', marginRight: '50px' }}>
                <img src="https://png.pngtree.com/png-vector/20190527/ourmid/pngtree-book-icon-png-image_1110447.jpg"
                    alt="BookPee Logo" width="50" height="50"/>
                <Link className="navbar-brand" to="/">
                    BookPee
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navItem}
                    </ul>
                    {renderSignIn}
                    {renderSignOut}
                </div>
            </div>
        </nav>
    )

}