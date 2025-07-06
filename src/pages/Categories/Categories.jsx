import { useEffect, useMemo } from "react";
import { useGetCategories } from "../../api/categories";
import { handleFetch } from "../../api/handleFetch";
import { useGetFourInCategory } from "../../api/products";

const CategoriesPage = () => {
    const { isLoading, data } = useGetCategories();

    const categoryIds = useMemo(() => {
        if (isLoading || !data || !data.items) return [];

        return data.items.map((item) => item.id);
    }, [data, isLoading]);

    const { isLoading: productsLoading, data: productsData } =
        useGetFourInCategory(categoryIds);

    // const {} = useGetFourInCategory();
    // TODO: Replace product images, links, names after API data & add 'fetch-multiple' feature
    return (
        <div className="max-w-[1300px] mx-auto pt-[40px]">
            <div>
                <h1 className="text-center text-5xl">Categories</h1>
            </div>
            <div>
                {data && data.items && data.items.length
                    ? data.items.map((item, index) => {
                          return (
                              <div key={item.slug}>
                                  <a
                                      href={`/category/${item.slug}`}
                                      className="flex w-fit"
                                  >
                                      <h1 className="text-3xl mb-[20px] w-fit flex items-end gap-[10px]">
                                          <span>{item.name} </span>
                                          <span className="opacity-60 text-2xl">
                                              ({item.productsCount})
                                          </span>
                                      </h1>
                                  </a>
                                  <div className="border-b leading-[60px] border-opacity-20 mb-[30px]"></div>
                                  <div className="flex justify-between gap-[20px] mb-[40px]">
                                      <div className="grid grid-cols-9 w-full gap-[20px]">
                                          {[
                                              "Game Name",
                                              "Game Name",
                                              "Game Name",
                                              "Game Name",
                                          ].map((item, index) => {
                                              return (
                                                  <a
                                                      href={`/product/${item}`}
                                                      className="w-full col-span-2"
                                                      key={index}
                                                  >
                                                      <div className="w-full h-[180px] rounded-md bg-[#2a323880] overflow-hidden mb-[10px]">
                                                          <img src="/src/assets/images/board_game_hero.avif" />
                                                      </div>
                                                      <div className="text-lg">
                                                          {item}
                                                      </div>
                                                  </a>
                                              );
                                          })}
                                          <a
                                              href={`/category/${item.slug}`}
                                              className="flex items-end"
                                          >
                                              SEE MORE
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default CategoriesPage;
