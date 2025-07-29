import { UserIcon } from "lucide-react";
import CartDrawer from "./cart-drawer";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    const NAV_ITEMS = [
        { text: "Home", path: "/" },
        { text: "Catalog", path: "/catalog" },
        { text: "Categories", path: "/categories" },
        { text: "About", path: "/about" },
    ];

    return (
        <>
            <div className="navbar bg-[#131c23] bg-opacity-80 fixed top-0 z-50 backdrop-blur-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {NAV_ITEMS.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a href={item.path}>{item.text}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl" href="/">
                        Cassa Picasso
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {NAV_ITEMS.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href={item.path}>{item.text}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex gap-[10px]">
                        <CartDrawer />
                        <Link
                            to="/admin"
                            className="w-10 h-10 p-2 bg-primary flex items-center justify-center text-black rounded-lg cursor-pointer"
                        >
                            <UserIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHeader;
