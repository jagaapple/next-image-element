import Head from "next/head";

// eslint-disable-next-line import/no-relative-parent-imports
import startImagePath, { element as StarImage } from "../images/star.png";
// eslint-disable-next-line import/no-relative-parent-imports
import polygonImagePath, { element as PolygonSVG } from "../images/polygon.svg";

const Page = () => (
  <>
    <Head>
      <title>next-image-element Example</title>
    </Head>

    <h1>Hello, world!</h1>
    <img src={startImagePath} width="256" />
    <StarImage width="256" />

    <hr />

    <img src={polygonImagePath} width="256" />
    <PolygonSVG fill="red" />
  </>
);

export default Page;
