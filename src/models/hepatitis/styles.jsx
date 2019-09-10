export const styles = _theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    container: {
        width: "70%",
        padding: 10,
        paddingBottom: "80px",
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
    iconContainer: {},
    icon: {
        margin: 15,
        height: "60px",
    },
    smallIcon: {
        margin: 15,
        height: "35px",
    },
    description: {},
    bottomLine: {
        marginTop: "20px",
        border: 0,
        borderTop: "0px",
        height: "3px",
        width: "40px",
        backgroundColor: "#BE9E21",
    },
});
