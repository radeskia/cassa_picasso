import { Route, Routes } from "react-router-dom";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { ROUTES } from "../routes/routes";

const Layout = () => {
    return (
        <>
            {/* Header */}

            <Header2 />
            <div className="pt-[69px] min-h-[70dvh]">
                <Routes>
                    {ROUTES.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />
                        );
                    })}
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
