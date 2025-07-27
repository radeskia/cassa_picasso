const Slider = ({ title, value, setValue, maxValue }) => {
    return (
        <div className="flex flex-col gap-[10px]">
            <label className="text-neutral-100">{title}</label>
            <input
                type="range"
                min={0}
                max={maxValue}
                value={value}
                className="range"
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <label>Price: 0 mkd — {value.toLocaleString()} mkd</label>
        </div>
    );
};

export default Slider;
