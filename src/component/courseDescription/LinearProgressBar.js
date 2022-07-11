function LinearProgressBar({ completed, text, content }) {
    const containerStyles = {
        height: 12,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 30,
    };

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "rgba(99, 70, 157, 1)",
        borderRadius: 'inherit',
        textAlign: 'right',
    };

    const labelStyles = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: "80%",
        margin: 0,
        marginLeft: "3%"
    };

    return (
        <div style={{ marginRight: "5%" }}>
            <span >{`${text}`}</span>
            <div className="linearBar">
                <div style={containerStyles}>
                    <div style={fillerStyles}></div>
                </div>
                <p style={labelStyles}>{`${content}`}</p>
            </div>
        </div>
    );
}

export default LinearProgressBar;
