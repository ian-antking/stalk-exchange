import FinkHeavyRegular from "./FinkHeavyRegular.woff";
import FinkHeavyRegular2 from "./FinkHeavyRegular.woff2";
import { css } from '@emotion/core';

const finkHeavy = {
  fontFamily: "FinkHeavy",
  src: css` 
    url(${FinkHeavyRegular2}) format('woff2'),
    url(${FinkHeavyRegular}) format('woff')
    `,
  fontWeight: "normal",
  fontStyle: "normal",
};

export default finkHeavy;
