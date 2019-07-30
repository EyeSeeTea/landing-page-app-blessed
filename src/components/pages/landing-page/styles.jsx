export const styles = _theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    container: {
        width: "70%",
        padding: 10,
    },
    item: {
        textAlign: "center",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "#f9f9f9",
        },
        cursor: "pointer",
    },
    separator: {
        textAlign: "center",
        margin: 20,
    },
    separatorTitle: {
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    title: {
        margin: 15,
        color: "#000000",
    },
    icons: {
        margin: 15,
        height: "40px",
    },
    bottomLine: {
        marginTop: "20px",
        border: 0,
        borderTop: "0px",
        height: "3px",
        width: "40px",
        backgroundColor: "#BE9E21",
    },
});
