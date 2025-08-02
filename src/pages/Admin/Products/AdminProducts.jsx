import { PlusIcon } from "lucide-react";
import { useGetProducts } from "../../../api/products";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminProducts = () => {
    const { data, isLoading } = useGetProducts();

    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    const handleShowModal = (itemSlug) => {
        const foundItem = data.items.find((item) => item.slug === itemSlug);
        setModalItem(foundItem);

        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
        setModalItem(null);
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <div className="flex justify-end w-full">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/admin/products/new")}
                >
                    <PlusIcon />
                    <span>Create</span>
                </button>
            </div>

            {showModal ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-slate-950/40">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[85dvw] max-h-[90dvh] bg-slate-950 rounded-lg border border-slate-700 overflow-scroll">
                            <div className="flex justify-end mt-[20px] mr-[20px]">
                                <button
                                    className="btn btn-outline"
                                    onClick={() => handleHideModal()}
                                >
                                    Close
                                </button>
                            </div>
                            <div className="flex flex-col justify-between w-full h-full p-[30px]">
                                <div className="flex flex-col justify-center items-center gap-[20px]">
                                    <h1 className="text-6xl text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-500  to-pink-700 p-2">
                                        {modalItem.name}
                                    </h1>
                                    <img
                                        src={
                                            modalItem.images.find(
                                                (image) => image.isPrimary
                                            ).url
                                        }
                                        className="max-w-[300px]"
                                    />
                                    <div className="max-w-[900px]">
                                        {modalItem.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="bg-slate-950/30 p-[10px] mt-[40px] rounded-xl border border-slate-800/90">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Players</th>
                            <th>Complexity</th>
                            <th>Rating</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && data && data.items
                            ? data.items.map((item, index) => {
                                  const primaryImage = item.images.find(
                                      (item) => item.isPrimary
                                  );
                                  return (
                                      <tr
                                          key={index}
                                          className={
                                              index % 2 === 0
                                                  ? "bg-slate-950/30 px-[30px] "
                                                  : ""
                                          }
                                      >
                                          <td
                                              className={`${index === 0 ? "pt-[30px]" : ""}`}
                                          >
                                              <img
                                                  src={primaryImage.url}
                                                  className="max-w-[50px] py-[5px]"
                                              />
                                          </td>
                                          <td>{item.name}</td>
                                          <td>{item.numberOfPlayers}</td>
                                          <td>{item.complexity}</td>
                                          <td>{item.rating}</td>
                                          <td>{item.price}</td>
                                          <td>{item.stock}</td>
                                          <td className="max-w-[70px]">
                                              <div className="grid grid-cols-2 gap-[5px]">
                                                  <button
                                                      className="btn btn-outline w-[70px] py-[5px]"
                                                      onClick={() =>
                                                          handleShowModal(
                                                              item.slug
                                                          )
                                                      }
                                                  >
                                                      View
                                                  </button>
                                                  <Link
                                                      to={`/admin/products/${item.slug}/edit`}
                                                      className="btn btn-primary w-[70px] py-[5px]"
                                                  >
                                                      Edit
                                                  </Link>
                                              </div>
                                          </td>
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
