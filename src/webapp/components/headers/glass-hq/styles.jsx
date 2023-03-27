export const styles = _theme => ({
    container: {
        backgroundColor: "#ffffff",
        transition: "all 0.3s",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px",
        boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        marginBottom: "50px",
    },
    logo: {
        verticalAlign: "middle",
        width: "150px",
        margin: "auto",
    },
    exitIcon: {
        color: "#ffffff",
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        gap: "30px",
    },
    title: {
        color: "#0099DE",
        lineHeight: "1.5",
        cursor: "pointer",
        textAlign: "center",
        margin: "0",
        fontSize: "35px",
    },
    logout: {
        marginLeft: "10px",
        padding: "18px",
        backgroundColor: "#0099DE",
        fontWeight: "bold",
        color: "#ffffff",
    },
});
