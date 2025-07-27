import { useMemo } from "react";
import { useGetCategories } from "../../api/categories";
import { useGetFourInCategory } from "../../api/products";

const CategoriesPage = () => {
    const { isLoading, data } = useGetCategories();

    const categoryDetails = useMemo(() => {
        if (isLoading || !data || !data.items) return [];

        return data.items.map((item) => {
            return {
                name: item.name,
                slug: item.slug,
                count: item.productsCount,
            };
        });
    }, [data, isLoading]);

    const { isLoading: productsLoading, data: productsData } =
        useGetFourInCategory(categoryDetails.map((item) => item.slug));

    const MAPPED_PRODUCTS_DATA = useMemo(() => {
        if (productsLoading || !categoryDetails.length) return [];

        const mapped = productsData.map((category, index) => {
            return {
                name: categoryDetails[index].name,
                slug: categoryDetails[index].slug,
                products: category.items,
                count: categoryDetails[index].count,
            };
        });

        return mapped;
    }, [productsLoading, productsData, categoryDetails]);

    return (
        <div className="max-w-[1300px] mx-auto pt-[40px]">
            <div>
                <h1 className="text-center text-5xl">Categories</h1>
            </div>
            <div>
                {MAPPED_PRODUCTS_DATA.length
                    ? MAPPED_PRODUCTS_DATA.map((category) => {
                          return (
                              <div key={category.slug}>
                                  <a
                                      href={`/category/${category.slug}`}
                                      className="flex w-fit"
                                  >
                                      <h1 className="text-3xl mb-[20px] w-fit flex items-end gap-[10px]">
                                          <span>{category.name} </span>
                                          <span className="opacity-60 text-2xl">
                                              ({category.count})
                                          </span>
                                      </h1>
                                  </a>
                                  <div className="border-b leading-[60px] border-opacity-20 mb-[30px]"></div>
                                  <div className="flex justify-between gap-[20px] mb-[40px]">
                                      <div className="grid grid-cols-9 w-full gap-[20px]">
                                          {category.products.map((item) => {
                                              const productImage =
                                                  item.images.find(
                                                      (image) => image.isPrimary
                                                  );
                                              return (
                                                  <a
                                                      href={`/product/${item.slug}`}
                                                      className="w-full col-span-2"
                                                      key={`random-${Math.random()}`}
                                                  >
                                                      <div className="flex flex-col justify-between items-center h-full">
                                                          <div className="w-full h-full flex justify-center items-center p-[20px] rounded-md bg-[#2a323860] overflow-hidden mb-[10px]">
                                                              {productImage ? (
                                                                  <img
                                                                      src={
                                                                          productImage.url
                                                                      }
                                                                  />
                                                              ) : null}
                                                          </div>
                                                          <div className="text-lg">
                                                              {item.name}
                                                          </div>
                                                      </div>
                                                  </a>
                                              );
                                          })}
                                          <a
                                              href={`/category/${category.slug}`}
                                              className="flex items-end justify-center"
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
