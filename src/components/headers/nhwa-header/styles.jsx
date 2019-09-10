export const styles = theme => ({
    container: {
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
    },
    header: {
        width: "95%",
        [theme.breakpoints.up("sm")]: {
            width: "90%",
        },
        [theme.breakpoints.up("md")]: {
            width: "75%",
        },
        [theme.breakpoints.up("lg")]: {
            width: "55%",
        },
    },
    box: {
        backgroundColor: "#4AB08D",
        position: "relative",
    },
    containerFluid: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10px",
        backgroundImage: "url(img/bg-nhwa.svg)",
        boxSizing: "border-box",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 0",
        MsBackgroundSize: "cover",
        backgroundSize: "cover",
        zIndex: "0",
        opacity: "0.2",
        display: "block",
        position: "absolute",
    },
    title: {
        color: "#fff",
        fontSize: "30px",
        textAlign: "center",
        margin: 0,
        padding: "20px",
    },
    logo: {
        width: "200px",
        marginRight: "15px",
        marginBottom: "10px",
    },
    logoBox: {
        textAlign: "right",
        padding: "10px",
    },
});
