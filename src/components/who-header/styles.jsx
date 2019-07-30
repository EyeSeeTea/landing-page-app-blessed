export const styles = _theme => ({
    header: {
        backgroundColor: "#0072bb",
        transition: "all 0.3s",
        display: "flex",
        justifyContent: "space-between",
        padding: "25px",
    },
    headerLogo: {
        verticalAlign: "middle",
        filter: "brightness(0) invert(1)",
        height: "100px",
        paddingLeft: "175px",
        cursor: "pointer",
    },
    headerTitle: {
        color: "white",
        lineHeight: "100px",
        cursor: "pointer",
    },
    headerLogout: {
        cursor: "pointer",
        color: "white",
        display: "flex",
        alignItems: "center",
        paddingRight: "300px",
        paddingLeft: "150px",
    },
});
