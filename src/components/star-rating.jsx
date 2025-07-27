const StarRating = ({ rating }) => {
    const totalStars = 5;
    const percentage =
        Math.max(0, Math.min(rating, totalStars)) * (100 / totalStars) - 1;

    return (
        <div className="rating rating--lg mr--10">
            <div
                className="rating__percentage"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default StarRating;
