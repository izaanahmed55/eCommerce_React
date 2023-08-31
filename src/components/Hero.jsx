import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <>
            <div className="dark:bg-gray-800 bg-white relative overflow-hidden">
                <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
                    <div className="container mx-auto px-6 flex relative py-16">
                        <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
                            <h1 className="font-bebas-neue uppercase text-xl sm:text-7xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                                Shop at Bliss Bazaar
                            </h1>
                            <p className="text-sm sm:text-base pt-4 text-gray-700 dark:text-white">
                            Unlock a World of Shopping Delight: Explore Our Exquisite Collection Today!
                            </p>
                            <div className="flex mt-8">
                                <Link
                                    to="/product/7"
                                    className="uppercase py-2 px-4 rounded-lg text-sm bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-500"
                                >
                                    Get Our Latest Galaxy Book Now
                                </Link>
                            </div>
                        </div>
                        <div className="hidden justify-center sm:block sm:w-1/3 lg:w-3/5 relative">
                            <img
                                src="https://i.dummyjson.com/data/products/7/thumbnail.jpg"
                                className="max-w-s h-full md:max-w-m m-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
