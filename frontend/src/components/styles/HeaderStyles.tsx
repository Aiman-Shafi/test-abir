export const FlexStyle = {
  width: "100%",
  maxW: "1380px",
  margin: "auto",
  height: "90",
  px: { base: 6, md: 50, lg: 75 },
  py: "2",
  alignItems: "center",
  justifyContent: "space-between",
  bg: "brand.100",
  gap: ["0", "0", "10"],
};

export const LogoStyle = {
  height: { base: "50px", md: "66px", lg: "66px" },
  width: { base: "50px", md: "120px", lg: "60px" },
  display: "flex",
  flexShrink: 0,
};

export const LogoText = {
  color: "white",
  fontSize: { base: "24px", md: "30px", lg: "36px" },
  fontWeight: "700",
  lineHeight: "normal",
  pl: "2",
  display: ["none", "none", "block"],
};

export const NavItem = {
  textAlign: "center",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  color: "white",
};

export const NavLink = {
  py: "2",
  px: "2",
  borderRadius: "md",
};

export const NavItemHover = {
  textDecoration: "none",
  bg: "white",
  color: "brand.100",
  borderRadius: "md",
};

export const HambugerIconHover = {
  color: "brand.100",
  bg: "white",
};

export default {
  FlexStyle,
  LogoStyle,
  LogoText,
  NavItem,
  NavItemHover,
  NavLink,
  HambugerIconHover,
};
