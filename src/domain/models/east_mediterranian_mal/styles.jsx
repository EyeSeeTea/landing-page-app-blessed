export const styles = _theme => ({
    heading: {
        color: "#0067b2",
        fontSize: "20px",
        fontWeight: "bold",
    },
    subHeading: {
        color: "#0067b2",
        fontWeight: "bold",
    },
    list: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        listStyleType: "none",
        gap: "16px",
    },
    noListStyle: {
        listStyleType: "none",
        marginLeft: "-32px",
    },
    rowSpan3: {
        gridRow: "span 3 / span 3",
    },
    verticalSpace: {
        paddingBottom: "40px",
    },

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
        display: "flex",
        flexDirection: "column",
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
        color: "#0067b2",
        fontWeight: "bold",
    },
    iconContainer: {
        order: -9999,
    },
    icon: {
        margin: 15,
        height: "72px",
    },
    smallIcon: {
        margin: 15,
        height: "35px",
    },
    description: {},
    small: {},
    bottomLine: {},
});
