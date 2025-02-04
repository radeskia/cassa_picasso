import {
    CopyPlus,
    Gift,
    PersonStanding,
    Puzzle,
    Spade,
    Swords,
} from "lucide-react";

const CategoriesSection = () => {
    return (
        <div className="bg-[#1c2934] w-full">
            <section className="max-w-[1300px] mx-auto py-[45px]">
                <h2 className="text-5xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-400  to-pink-600 text-center mb-[30px] leading-normal">
                    Categories
                </h2>
                <div className="grid grid-cols-12">
                    {/* Cards Start */}
                    <div className="col-span-2">
                        <div className="flex flex-col justify-center items-center gap-[15px] group cursor-pointer">
                            <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#131c23] rounded-md group-hover:shadow-[8px_4px_6px_0px_rgba(0,_0,_0,_0.3)] transition-all duration-300">
                                <Swords
                                    size={45}
                                    className="group-hover:-translate-y-[10px] transition-all duration-300 text-[#bcbcbc] group-hover:text-orange-500"
                                />
                            </div>
                            <div className="text-center">Board Games</div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-col justify-center items-center gap-[15px] group cursor-pointer">
                            <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#131c23] rounded-md group-hover:shadow-[8px_4px_6px_0px_rgba(0,_0,_0,_0.3)] transition-all duration-300">
                                <CopyPlus
                                    size={45}
                                    className="group-hover:-translate-y-[10px] transition-all duration-300 text-[#bcbcbc] group-hover:text-orange-500"
                                />
                            </div>
                            <div className="text-center">Expansions</div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-col justify-center items-center gap-[15px] group cursor-pointer">
                            <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#131c23] rounded-md group-hover:shadow-[8px_4px_6px_0px_rgba(0,_0,_0,_0.3)] transition-all duration-300">
                                <Puzzle
                                    size={45}
                                    className="group-hover:-translate-y-[10px] transition-all duration-300 text-[#bcbcbc] group-hover:text-orange-500"
                                />
                            </div>
                            <div className="text-center">Puzzles</div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-col justify-center items-center gap-[15px] group cursor-pointer">
                            <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#131c23] rounded-md group-hover:shadow-[8px_4px_6px_0px_rgba(0,_0,_0,_0.3)] transition-all duration-300">
                                <Spade
                                    size={45}
                                    className="group-hover:-translate-y-[10px] transition-all duration-300 text-[#bcbcbc] group-hover:text-orange-500"
                                />
                            </div>
                            <div className="text-center">Card Games</div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-col justify-center items-center gap-[15px] group cursor-pointer">
                            <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#131c23] rounded-md group-hover:shadow-[8px_4px_6px_0px_rgba(0,_0,_0,_0.3)] transition-all duration-300">
                                <PersonStanding
                                    size={45}
                                    className="group-hover:-translate-y-[10px] transition-all duration-300 text-[#bcbcbc] group-hover:text-orange-500"
                                />
                            </div>
                            <div className="text-center">Figures</div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-col justify-center items-center gap-[15px] group cursor-pointer">
                            <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#131c23] rounded-md group-hover:shadow-[8px_4px_6px_0px_rgba(0,_0,_0,_0.3)] transition-all duration-300">
                                <Gift
                                    size={45}
                                    className="group-hover:-translate-y-[10px] transition-all duration-300 text-[#bcbcbc] group-hover:text-orange-500"
                                />
                            </div>
                            <div className="text-center">Gifts</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoriesSection;
