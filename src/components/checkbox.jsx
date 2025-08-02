const Checkbox = ({ title, value, handleValue }) => {
    return (
        <div className="flex items-center gap-[10px]">
            <input
                type="checkbox"
                value={value}
                onChange={() => handleValue()}
                className="checkbox checkbox-primary"
                name={title}
                checked={value}
            />
            <label>{title}</label>
        </div>
    );
};

export default Checkbox;
