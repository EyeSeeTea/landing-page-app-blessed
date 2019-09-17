export const styles = theme => ({
    container: {
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
    },
    header: {
        marginRight: "auto",
        marginLeft: "auto",
        width: "95%",
        [theme.breakpoints.up(1200)]: {
            width: "92%",
        },
        [theme.breakpoints.up(1400)]: {
            width: "80%",
        },
        [theme.breakpoints.up(1600)]: {
            width: "65%",
        },
        [theme.breakpoints.up(1800)]: {
            width: "60%",
        },
    },
    box: {
        backgroundColor: "#4AB08D",
        position: "relative",
        border: "1px solid transparent",
        borderRadius: "4px",
        margin: 15,
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
