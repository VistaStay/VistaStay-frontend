function LocationTab(props) {
    const handleClick = () => {
        props.onClick(props.name);
    };

    return (
        <div
            className={`text-base border rounded-md px-2 py-1 cursor-pointer ${
                props.selectedLocation === props.name ? 'bg-gray-200' : ''
            }`}
            onClick={handleClick}
        >
            {props.name}
        </div>
    );
}

export default LocationTab;