import CategoriesSection from "./_components/CategoriesSection";
import FeaturedSection from "./_components/FeaturedSection";
import HomepageHero from "./_components/HomepageHero";

const HomePage = () => {
    return (
        <div>
            <HomepageHero />
            <FeaturedSection />
            <CategoriesSection />
        </div>
    );
};

export default HomePage;
