export const styles = _theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    container: {
        width: "100%",
        padding: 25,
    },
    item: {
        textAlign: "left",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "#f9f9f9",
        },
        cursor: "pointer",
    },
    separator: {
        textAlign: "left",
        margin: 5,
    },
    separatorTitle: {
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "16px",
        color: "#00762e",
        backgroundColor: "#c2d69b",
        padding: "7px",
        marginBottom: "7px"
    },
    title: {
        color: "#000000",
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        margin: 15,
        height: "60px",
        float: "left",
    },
    smallIcon: {
        margin: 15,
        height: "35px",
        float: "left",
    },
    description: {
        marginLeft: 15,
        marginRight: 15,
    },
    bottomLine: {},
});
