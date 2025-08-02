const RangePicker = ({
    min = 0,
    max = 2000,
    step = 1,
    ranges,
    handleValueChange,
    formatCurrency,
    label,
    noMax,
}) => {
    const rangeRatio = max - min;

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative mb-[20px]">
                {/* Track */}
                <div className="absolute top-1 transform -translate-y-1/2 w-full h-2 bg-gray-300 rounded" />

                {/* Range Highlight */}
                <div
                    className="absolute top-1 transform -translate-y-1/2 h-2 bg-primary rounded"
                    style={{
                        left: `${((ranges.startValue - min) / rangeRatio) * 100}%`,
                        width: `${((ranges.endValue - ranges.startValue) / rangeRatio) * 100}%`,
                    }}
                />

                {/* Left Thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={ranges.startValue}
                    onChange={(e) => {
                        const val = Math.min(
                            Number(e.target.value),
                            ranges.endValue - 1
                        );
                        handleValueChange({ ...ranges, startValue: val });
                    }}
                    className="absolute pointer-events-none appearance-none w-full h-2 bg-transparent"
                />
                {/* Right Thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={ranges.endValue}
                    onChange={(e) => {
                        const val = Math.max(
                            Number(e.target.value),
                            ranges.startValue + 1
                        );
                        handleValueChange({ ...ranges, endValue: val });
                    }}
                    className="absolute pointer-events-none appearance-none w-full h-2 bg-transparent"
                />
            </div>

            {/* Values Display */}
            {label ? (
                <div className="flex gap-[5px]">
                    <label>{label}: </label>
                    <div className="flex gap-[10px]">
                        <span>
                            {formatCurrency
                                ? `$${ranges.startValue.toLocaleString()}`
                                : ranges.startValue}
                        </span>
                        —
                        <span>
                            {formatCurrency
                                ? `$${ranges.endValue.toLocaleString()}`
                                : ranges.endValue}
                            {ranges.endValue === max && noMax ? "+" : ""}
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default RangePicker;
