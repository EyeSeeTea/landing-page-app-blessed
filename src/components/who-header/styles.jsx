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
        cursor: "pointer",
        margin: "auto",
    },
    headerTitle: {
        color: "white",
        lineHeight: "1.5",
        cursor: "pointer",
        margin: "auto",
        padding: "25px",
        textAlign: "center",
    },
    headerLogout: {
        cursor: "pointer",
        color: "white",
        margin: "auto",
    },
});
