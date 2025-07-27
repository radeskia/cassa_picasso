import boardGameHero from "../../../assets/images/board_game_hero.avif";
import { useCartStore } from "../../../store/cart-store";

const HomepageHero = () => {
    const addItemToCart = useCartStore((state) => state.addItemToCart);

    const handleTest = () => {
        addItemToCart({
            product_id: 1,
            amount: 1,
            name: "Gloomhaven",
            slug: "gloomhaven",
            image: "https://m.media-amazon.com/images/I/71KfUf4ySkL._UF1000,1000_QL80_.jpg",
            price: 19.99,
        });
    };

    const handleTest2 = () => {
        addItemToCart({
            product_id: 2,
            amount: 1,
            name: "Terraforming Mars: Ares Expedition",
            slug: "terraforming-mars-ares-expedition",
            image: "https://cf.geekdo-images.com/eT_Atcy_vRJvuUMgYakNrQ__imagepage/img/wbls1BSh2bRThnsjd3xuVyEH4xk=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6260098.jpg",
            price: 27.99,
        });
    };
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${boardGameHero})`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <h1 className="text-6xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-500  to-pink-700 p-2">
                        Cassa Picasso
                    </h1>
                    <p className="text-3xl text-white">Game time zone</p>
                    <p className="mb-5 text-white">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleTest();
                        }}
                    >
                        Add First
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleTest2();
                        }}
                    >
                        Add Second
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomepageHero;
