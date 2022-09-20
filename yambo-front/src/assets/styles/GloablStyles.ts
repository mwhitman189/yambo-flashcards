import { createGlobalStyle } from "styled-components";

declare module "styled-components" {
  interface DefaultTheme {
    colors: {
      backgroundPrimary?: string;
      backgroundSecondary?: string;
      textPrimary?: string;
      textSecondary?: string;
      inputBackground?: string;
      highlightPrimary?: string;
      highlightPrimaryLight?: string;
      highlightSecondary?: string;
      grayPrimary?: string;
    };
  }
}

export const theme1 = {
  colors: {
    backgroundPrimary: "#28546B",
    backgroundSecondary: "#0B3345",
    textPrimary: "#F7F7F7",
    textSecondary: "#002231",
    inputBackground: "#fff",
    highlightPrimary: "#ba68c9",
    highlightPrimaryLight: "#e0bde6",
    highlightSecondary: "#14AE5C",
    grayPrimary: "#6a6a6a"
  }
};

const sizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tabletS: "600px",
  tabletM: "768px",
  tabletL: "850px",
  laptop: "1024px",
  laptopL: "1440px"
};

export const devices = {
  mobileS: `only screen and (min-width: ${sizes.mobileS})`,
  mobileM: `only screen and (min-width: ${sizes.mobileM})`,
  mobileL: `only screen and (min-width: ${sizes.mobileL})`,
  tabletS: `only screen and (min-width: ${sizes.tabletS})`,
  tabletM: `only screen and (min-width: ${sizes.tabletM})`,
  tabletL: `only screen and (min-width: ${sizes.tabletL})`,
  laptop: `only screen and (min-width: ${sizes.laptop})`,
  laptopL: `only screen and (min-width: ${sizes.laptopL})`
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.backgroundPrimary};
  }
`;
