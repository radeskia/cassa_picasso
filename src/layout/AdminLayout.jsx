import { Link, useLocation } from "react-router-dom";
// import { capitalizeFirstLetter } from "../lib/utils";

const AdminLayout = ({ children }) => {
    const NAV_LINKS = [
        { text: "Dashboard", path: "/admin" },
        { text: "Products", path: "/admin/products" },
        { text: "Categories", path: "/admin/categories" },
    ];

    const location = useLocation();

    // const routes = location.pathname.split("/").filter((item) => item);

    return (
        <div className="relative">
            <div className="w-[300px] bg-slate-800 fixed top-0 mt-[68px] bottom-0 left-0">
                <div className="flex flex-col gap-[10px] p-[30px]">
                    {NAV_LINKS.map((item) => {
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`hover:bg-slate-600 px-[10px] py-[5px] rounded-lg ${location.pathname === item.path ? "bg-slate-600" : ""}`}
                            >
                                {item.text}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="ml-[320px] mt-[20px] mr-[20px]">
                {/* TODO: CRUMBS */}
                {/* <div className="w-full flex gap-[10px]">
                    {location.pathname
                        .split("/")
                        .filter((item) => item)
                        .map((item, index) => {
                            return (
                                <div key={index} className="flex gap-[5px]">
                                    <Link
                                        key={index}
                                        to={
                                            index === 0
                                                ? "/admin"
                                                : `/admin/${item}`
                                        }
                                    >
                                        {capitalizeFirstLetter(item)}
                                    </Link>
                                    {index !== routes.length - 1 ? (
                                        <span>/</span>
                                    ) : null}
                                </div>
                            );
                        })}
                </div> */}
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
