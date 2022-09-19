export const styles = _theme => ({
    container: {
        backgroundColor: "#0072bb",
        transition: "all 0.3s",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        alignItems: "center",
        justifyItems: "center",
        padding: "25px",
        marginBottom: "50px",
    },
    logo: {
        verticalAlign: "middle",
        height: "40px",
        cursor: "pointer",
        margin: "auto",
    },
    titleContainer: {
        display: "flex",
    },
    title: {
        color: "white",
        lineHeight: "1.5",
        cursor: "pointer",
        textAlign: "center",
        margin: "auto",
        marginLeft: "15px",
        fontSize: "35px",
    },
    logout: {
        margin: "auto",
        padding: "15px",
    },
});
