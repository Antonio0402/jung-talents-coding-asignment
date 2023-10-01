import { createGlobalStyle } from "styled-components";
import { COLORS } from "./constants";

const GlobalStyles = createGlobalStyle`
/*
1. Use a more-intuitive box-sizing model.
*/
*,
*::before,
*::after {
  box-sizing: border-box;
}
/*
2. Remove default margin
*/
* {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}
/*
Typographic tweaks!
3. Add accessible line-height and improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
  font-family: 'Raleway', sans-serif;
  background: #f1f1f1;
  min-height: 100svh;
}
/* 
4. Set core root defaults
*/
html:focus-within {
  scroll-behavior: smooth;
}

/* 
5. A elements that don't have a class get default styles
*/
a {
  color: inherit;
  text-decoration: none;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

/*
6. Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed
*/
ul[class],
ol[class],
nav :where(ol, ul) {
  list-style: none;
}

/*
7. Improve media defaults
*/
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
/*
8. Remove built-in form typography styles
*/
input,
button,
textarea,
select {
  font: inherit;
  color: currentColor;
}
/*
9. Avoid text overflows
*/
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
/*
10. Create a root stacking context
*/
#root,
#__next {
  isolation: isolate;
}

/* 
11. Remove all animations, transitions and smooth scroll for people that prefer not to see them 
*/
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
:root {
  --color-white: hsl(${COLORS.white});
  --color-primary: hsl(${COLORS.primary});
  --color-secondary: hsl(${COLORS.secondary});
  --color-gray-100: hsl(${COLORS.gray[100]});
  --color-gray-300: hsl(${COLORS.gray[300]});
  --color-gray-500: hsl(${COLORS.gray[500]});
  --color-gray-700: hsl(${COLORS.gray[700]});
  --color-gray-900: hsl(${COLORS.gray[900]});
  
  --color-backdrop: hsl(${COLORS.gray[700]} / 0.8);
}

/* General layout */
#root {
  height: 100%;
}
`

export default GlobalStyles;