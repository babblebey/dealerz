import { FC, useEffect, useState } from "react";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import ProductCard from "../components/ProductCard";
import { useGetCategoriesQuery, useGetProductsQuery } from "../app/services/FakeStoreAPI";
import Loading from "../components/Loading";
import { Product } from "../types";
import { useFilterByCategory, useFilterBySearch } from "../app/features/filter";

interface ShopProps {
    
}
 
const Shop: FC<ShopProps> = () => {
    const { data: products, error, isLoading, isFetching } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();

    // Initialising State with Products List
    const initState = products
    const [shopProducts, setShopProducts] = useState(initState);

    // Set Products on product data change
    useEffect(() => setShopProducts(initState), [products])

    // // While Data is Fetching or Loading
    // if ( isLoading || isFetching ) return <Loading variant="full" />;
    
    return ( 
        <>
            <Hero 
                title="Home Shopping, Your Choice!"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    <br/> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."    
            />

            {/* Content */}
            <div className="bg-dgrey-light py-8 md:py-28">
                <div className="container md:grid md:grid-cols-3 md:gap-x-10">
                    {/* Filter */}
                    <div className="space-y-20">
                        {/* Search Form */}
                        <div className="w-full h-14 pl-4 flex items-center rounded border border-dblue-dark">
                            {/* Input Field */}
                            <input type="text"
                                className="w-full h-full bg-transparent focus-visible:outline-none"
                                placeholder="Search products"
                                onChange={(e) => useFilterBySearch(
                                        products!, e.target.value,
                                        (filteredProducts) => setShopProducts(filteredProducts)
                                    )
                                }
                            />

                            {/* Button */}
                            <button className="flex-none w-12 flex justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.707 20.293L18.025 16.611C19.4651 14.8095 20.1607 12.5249 19.9688 10.2265C19.777 7.92817 18.7123 5.79051 16.9935 4.25267C15.2746 2.71483 13.0321 1.89357 10.7267 1.95758C8.42118 2.0216 6.22773 2.96603 4.59688 4.59688C2.96603 6.22773 2.0216 8.42118 1.95758 10.7267C1.89357 13.0321 2.71483 15.2746 4.25267 16.9935C5.79051 18.7123 7.92817 19.777 10.2265 19.9688C12.5249 20.1607 14.8095 19.4651 16.611 18.025L20.293 21.707L21.707 20.293ZM11 18C9.61557 18 8.26219 17.5895 7.11104 16.8203C5.9599 16.0512 5.06269 14.9579 4.53288 13.6788C4.00307 12.3997 3.86444 10.9923 4.13454 9.6344C4.40464 8.27654 5.07132 7.02926 6.05029 6.05029C7.02926 5.07132 8.27654 4.40464 9.6344 4.13454C10.9923 3.86444 12.3997 4.00307 13.6788 4.53288C14.9579 5.06269 16.0512 5.9599 16.8203 7.11104C17.5895 8.26219 18 9.61557 18 11C17.9979 12.8559 17.2597 14.6351 15.9474 15.9474C14.6351 17.2597 12.8559 17.9979 11 18Z" fill="#9A9AB0"/>
                                </svg>
                            </button>
                        </div>

                        {/* Price */}
                        

                        {/* Product Categories - Renders when catergories are ready */}
                        {categories && (
                            <div className="font-bold text-dblue-dark space-y-6">
                                <p className=" text-2xl">
                                    Product Categories
                                </p>
                                <div className="space-y-6">
                                    {/* All Products */}
                                    <div className="flex items-center justify-between group cursor-pointer"
                                            onClick={() => setShopProducts(initState)}
                                        >
                                        <span className="capitalize group-hover:text-dorange-light">
                                            All Products
                                        </span>
                                        <span className="bg-transparent p-2 rounded group-hover:bg-dorange-light">
                                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.861816 1.13798L5.72382 5.99998L0.861816 10.862L1.80448 11.8046L7.60915 5.99998L1.80448 0.195312L0.861816 1.13798Z" fill="black"/>
                                            </svg>
                                        </span>
                                    </div>

                                    {/* Categories - Renders When Products are Ready */}
                                    { products && categories?.map((category: string, i: number) => (
                                        <div key={i} className="flex items-center justify-between group cursor-pointer"
                                            onClick={() => useFilterByCategory(
                                                    products, category, 
                                                    (filteredProducts) => setShopProducts(filteredProducts)
                                                )
                                            }
                                        >
                                            <span className="capitalize group-hover:text-dorange-light">
                                                { category }
                                            </span>
                                            <span className="bg-transparent p-2 rounded group-hover:bg-dorange-light">
                                                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.861816 1.13798L5.72382 5.99998L0.861816 10.862L1.80448 11.8046L7.60915 5.99998L1.80448 0.195312L0.861816 1.13798Z" fill="black"/>
                                                </svg>
                                            </span>
                                        </div>
                                    )) }
                                </div>
                            </div>
                        )}

                        {/* Featured Product */}

                    </div>

                    {/* Products */}
                    <div className="col-span-2 space-y-10">
                        { (isLoading && !shopProducts) ? (
                            <Loading variant="full" />
                        ) : (
                            <>
                                {/* Renders Products - When shop Products are ready */}
                                <div className="md:grid md:grid-cols-2 md:gap-6">
                                    { shopProducts?.map((item: Product, i: number) => (
                                            <ProductCard key={i} data={ item } />
                                        )
                                    ) }
                                </div>
                            </>
                        ) }

                        {/* Renders when No product is found */}
                        { shopProducts && (shopProducts.length < 1) && (
                            <div className="w-full text-center">
                                <span className="text-center">
                                    No Product found!
                                </span>
                            </div>
                        )  }

                        <div className="flex justify-center">
                            <button className="h-14 px-6 flex items-center font-bold rounded-lg bg-dorange-light text-white">
                                <span>
                                    See More
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Newsletter />
        </>
    );
}
 
export default Shop;