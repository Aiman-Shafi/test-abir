const styles = {
  container: {
    minHeight: "500px",
    display: "flex",
    width: "100%",
    flexDirection: ["column", "column", "row"],
    border: "1px solid",
    borderColor: "brand.100",
    margin: "40px 0px",
    borderRadius: "10px",
  },
  firstColumn: {
    flexBasis: "100%",
    justifyContent: "center",
    padding: ["20px", "30px", "40px"],
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "10px",
  },
  secondColumn: {
    flexBasis: "100%",
    display: "flex",
    justifyContent: "end",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    paddingRight: "70px",
  },
  heading1: {
    fontSize: ["24px", "32px", "48px"],
    marginBottom: 4,
  },
  heading2: {
    fontSize: ["20px", "24px", "28px"],
    marginBottom: 4,
    color: "brand.100",
    fontWeight: "400",
  },
  paragraph: {
    fontSize: "18px",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "brand.100",
    color: "white",
    padding: "20px 30px",
  },
  divider: {
    borderColor: "brand.200",
    borderWidth: 1,
    maxWidth: "1300px",
  },
  buttonLarge: {
    width: { base: "100%", lg: "300px" },
    height: "40px",
    fontSize: "20px",
    padding: "24px",
  },
};

export default styles;
