import { Route, Routes } from "react-router-dom";
import CustomerHeader from "../components/customer-header";
import Footer from "../components/Footer";
import { ADMIN_ROUTES, ROUTES } from "../routes/routes";
import { useAuth } from "../providers/auth-context";
import AdminHeader from "../components/admin-header";

const Layout = () => {
    const { currentUser } = useAuth();

    return (
        <>
            {currentUser ? <AdminHeader /> : <CustomerHeader />}
            <div className="pt-[69px] min-h-[100dvh]">
                <Routes>
                    {currentUser
                        ? [...ROUTES, ...ADMIN_ROUTES].map((route) => {
                              return (
                                  <Route
                                      key={route.path}
                                      path={route.path}
                                      element={route.element}
                                  />
                              );
                          })
                        : ROUTES.map((route) => {
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
