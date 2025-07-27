import CartDrawer from "./cart-drawer";

const Header2 = () => {
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
                            {/* <li>
                                <a>Item 1</a>
                            </li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a>Item 3</a>
                            </li> */}
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
                    <CartDrawer />
                </div>
            </div>
        </>
    );
};

export default Header2;
