import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: '#FC8019',
    secondary: "#5F5FFF",
    background: '#1E1E1E',
    // colors
    black: "#000000",
    white: "#FFFFFF",
    lightgray: '#FAFAFA',
    lightgray1: '#86878B',
    red: '#EB121E',
    green: '#34B53A',
    green1: '#064441',
    text: "#613DC1",
    orange: '#FFB200',
    //others
    transparent: "transparent",
    yellow: '#F1D31A',
    lightyellow: "#FFFCEA",
    purple1: '#613DC1',
    purple2: '#858AE3',
    purple3: '#4E148C',
    purple4: '#514D6B',
    purple5: '#3C3758',
    purple6: '#CED0F4',
    purple7: '#4339F2',
    purple8: '#F5F5FF',
    //blue
    blue1: '#97DFFC'

};

export const STYLES = {
    justifyContent: 'center',
    alignItems: 'center'
}
export const FSTYLES = {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
}

export const SIZES = {
    // global sizes
    base: width * .03,
    base1: width * .02,
    base2: width * .01,
    font: 14,
    radius: 30,
    padding: width * .03,
    padding2: width * .05,

    // font sizes
    largeTitle: width * .14,
    mediumTitle: width * .1,
    h1: width * .08,
    h2: width * .065,
    h3: width * .055,
    h4: width * .045,
    h5: width * .03,
    h6: width * .026,
    h7: width * .020,
    // app dimensions
    width,
    height
};

export const FONTS = {
    h1: { fontSize: SIZES.h1, color: COLORS.black, fontWeight: '700', lineHeight: width * .09 },
    h2: { fontSize: SIZES.h2, color: COLORS.black, fontWeight: '700', lineHeight: width * .08 },
    h3: { fontSize: SIZES.h3, color: COLORS.black, fontWeight: '700', lineHeight: width * .07 },
    h4: { fontSize: SIZES.h4, color: COLORS.black, fontWeight: '700', lineHeight: width * .06 },
    h5: { fontSize: SIZES.h5, color: COLORS.black, fontWeight: '700', lineHeight: width * .05 },
    h6: { fontSize: SIZES.h6, color: COLORS.black, fontWeight: '700', lineHeight: width * .04 },
};
export const RFONTS = {
    h7: { fontSize: width * .02, color: COLORS.black, fontWeight: '700' },
    h6: { fontSize: width * .03, color: COLORS.black, fontWeight: '700' },
    h5: { fontSize: width * .04, color: COLORS.black, fontWeight: '700' },
    h4: { fontSize: width * .05, color: COLORS.black, fontWeight: '700' },
    h3: { fontSize: width * .06, color: COLORS.black, fontWeight: '700' },
    h2: { fontSize: width * .07, color: COLORS.black, fontWeight: '700' },
    h1: { fontSize: width * .09, color: COLORS.black, fontWeight: '700' },
};
export const NBFONTS = {
    h7: { fontSize: width * .02, color: COLORS.black, },
    h6: { fontSize: width * .03, color: COLORS.black, },
    h5: { fontSize: width * .04, color: COLORS.black, },
    h4: { fontSize: width * .05, color: COLORS.black, },
    h3: { fontSize: width * .06, color: COLORS.black, },
    h2: { fontSize: width * .07, color: COLORS.black, },
    h1: { fontSize: width * .09, color: COLORS.black, },
};
const appTheme = { COLORS, SIZES, FONTS, RFONTS };

export default appTheme;