import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

const ProductImageSlider = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: {
            perView: 1,
            spacing: 20,
        },
        loop: false,
        slideChanged: (event) => {
            setCurrentSlide(event.track.details.abs);
        },
    });

    return (
        <div className="flex w-full gap-[20px] px-[40px]">
            {/* Small Image Previews */}
            <div className="flex flex-col gap-[20px]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => instanceRef.current?.moveToIdx(index)}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            className={`rounded-[4px] ${
                                currentSlide === index
                                    ? "ring-4 ring-sky-300/70"
                                    : ""
                            }`}
                            src={image.image_src}
                            alt={`Gallery small image preview ${index + 1}`}
                            width="100"
                        />
                    </div>
                ))}
            </div>

            {/* Main Slider */}
            <div className="keen-slider max-w-[700px]" ref={sliderRef}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="keen-slider__slide"
                        style={{ cursor: "grab" }}
                    >
                        <img
                            src={image.image_src}
                            alt={`Gallery active image ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImageSlider;
