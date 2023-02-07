import styles from "./theme.scss?inline";

export const ThemeCss = new CSSStyleSheet();
ThemeCss.replaceSync(styles);
