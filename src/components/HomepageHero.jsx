import boardGameHero from "../assets/images/board_game_hero.avif";

const HomepageHero = () => {
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
                    <h1 className="text-6xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-400  to-pink-600 p-2">
                        Cassa Picasso
                    </h1>
                    <p className="text-3xl text-white">Game time zone</p>
                    <p className="mb-5 text-white">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Game Catalog</button>
                </div>
            </div>
        </div>
    );
};

export default HomepageHero;
