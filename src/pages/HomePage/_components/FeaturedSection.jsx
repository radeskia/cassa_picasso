import FeaturedSingleSlider from "./FeaturedSingleSlider";

const FeaturedSection = () => {
    const images = [
        { image_src: "https://i.imgur.com/oBUx7oY.jpeg" },
        { image_src: "https://i.imgur.com/ELyAxb1.jpeg" },
        { image_src: "https://i.imgur.com/pPfALSM.jpeg" },
    ];
    return (
        <section className="max-w-[1300px] mx-auto py-[45px]">
            <h2 className="text-5xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-500  to-pink-700 text-center mb-[30px] leading-normal">
                Featured Game
            </h2>
            <div className="grid grid-cols-12 gap-[40px] my-[20px]">
                <div className="col-span-6">
                    <FeaturedSingleSlider images={images} />
                </div>
                <div className="col-span-6">
                    <div className="flex flex-col max-w-md">
                        <div>
                            <h1 className="text-4xl text-transparent bg-clip-text font-semibold bg-gradient-to-r from-cyan-800 via-white  to-sky-600 mb-[30px] leading-normal">
                                Cryptid
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Morbi viverra ut ante fringilla
                                gravida. Suspendisse lobortis mollis dapibus.
                                Nam efficitur urna nec feugiat convallis.
                                Curabitur ac tellus mi. Curabitur mattis
                                hendrerit leo. Nulla fringilla dignissim ipsum
                                et eleifend. Etiam viverra.
                            </p>
                        </div>

                        <div className="flex justify-end mt-[20px]">
                            <a className="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
