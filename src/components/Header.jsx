import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const NAV_ITEMS = [
        { text: "Home", path: "/" },
        { text: "Catalog", path: "/catalog" },
        { text: "Categories", path: "/categories" },
        { text: "About", path: "/about" },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 bg-slate-800 text-slate-200">
            <div className="flex mx-auto max-w-[1440px] justify-between py-[15px] items-center">
                <div className="text-lg">Cassa Picasso</div>
                <div className="flex gap-[30px]">
                    {NAV_ITEMS.map((item, index) => {
                        return (
                            <NavLink key={index} to={item.path}>
                                {item.text}
                            </NavLink>
                        );
                    })}
                </div>
                <div>
                    <ShoppingCart size={20} />
                </div>
            </div>
        </div>
    );
};

export default Header;
