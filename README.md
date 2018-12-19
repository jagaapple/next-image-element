<!-- ======================================================================================================================= -->
<!-- README                                                                                                                  -->
<!-- ======================================================================================================================= -->
# next-image-element (Next.js + React friendly images importing)

[![npm](https://img.shields.io/npm/v/next-image-element.svg)](https://www.npmjs.com/package/next-image-element)
[![license](https://img.shields.io/github/license/jagaapple/next-image-element.svg)](https://opensource.org/licenses/MIT)
[![@jagaapple_tech](https://img.shields.io/badge/contact-%40jagaapple_tech-blue.svg)](https://twitter.com/jagaapple_tech)

Import React element or file path from images in [Next.js](https://github.com/zeit/next.js).


## Table of Contents

<!-- TOC depthFrom:2 -->

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
- [Options](#options)
  - [`sizeLimit`](#sizelimit)
  - [`pathPrefix`](#pathprefix)
- [Recipes](#recipes)
  - [Enables type definitions for `import` syntax for TypeScript](#enables-type-definitions-for-import-syntax-for-typescript)
- [Contributing to next-image-element](#contributing-to-next-image-element)
- [License](#license)

<!-- /TOC -->


## Features
```jsx
import styled from "styled-components";
import PhotoImage, { path as photoImagePath } from "./photo.jpg";
import LogoImage, { path as logoImagePath } from "./logo.svg";

const ContainerElement = styled.div`
  background-image: url("${photoImagePath}");
`;

export default () => (
  <ContainerElement>
    <PhotoImage alt="flower" />
    <LogoImage width="230" height="140" />
  </ContainerElement>
);
```

- Import images as inline images (Base 64) using JavaScript Module Syntax ( `import` or `require` )
  - When the image exceeds a specified size limit, it returns actual URL
- Import raster images as React element `<img src="xxx" />` using JavaScript Module Syntax
  - It is possible to pass HTMLAttributes props such as `alt`
- Import SVG images as React element `<svg>...</svg>` using JavaScript Module Syntax
  - It is possible to pass SVGAttributes props such as `fill`
- Supports type definitions for images for TypeScript
  - You should configure, see more detail [here](#enables-type-definitions-for-import-syntax-for-typescript)
- Ready for Next.js


## Quick Start
### Requirements
- npm or Yarn
- Next.js version 5.0.0 or higher

### Installation

```bash
$ npm install --save next-image-element
```

If you are using Yarn, use the following command.

```bash
$ yarn add next-image-element
```

### Setup
First, setup your Next.js settings.

```js
// next.config.js
const withImageElement = require("next-image-element");

module.exports = withImageElement();
```


## Usage
This package depends on [react-image-element-loader](https://github.com/jagaapple/react-image-element-loader), for more detail,
see [here](https://github.com/jagaapple/react-image-element-loader#usage).

---

You can import images as React element `<img />` or `<svg>...</svg>` . It is possible to pass some attribute, but `src`
will be ignored.

```jsx
import PhotoImage, { path as photoImagePath } from "./photo.jpg";
import LogoImage, { path as logoImagePath } from "./logo.svg";

export default () => (
  <div>
    <PhotoImage />
    <PhotoImage width="100" alt="flower" />
    <img src={logoImagePath} />

    <LogoImage width="230" height="140" />
    <LogoImage fill="red" />
    <img src={photoImagePath} />

    {/* src will be ignored. */}
    <PhotoImage src="other-image.jpg" />
  </div>
);
```

Raster images supported by next-image-element are PNG (.png), JPEG (.jpg), and GIF (.gif).

In generally, `path` is an actual image URL (through [file-loader](https://github.com/webpack-contrib/file-loader)). When you
use `sizeLimit` option and the image is smaller than `sizeLimit` , `path` is inline image (Base64 encoded URL). For more detail,
see [`sizeLimit` option](#sizelimit).


## Options
### `sizeLimit`
Type: `Number` Default: `undefined`

A number specifying the maximum size of an image file in bytes.

If the image is greater than the limit or `sizeLimit` option is specified `undefined`, `path` is actual URL. In that case,
[file-loader](https://github.com/webpack-contrib/file-loader) is used by default and all query parameters are passed to it.
Using an alternative to file-loader is enabled via the `fallback` option.

If the image is smaller than the limit, `path` is Base64 encoded URL.

```js
// next.config.js
const withImageElement = require("next-image-element");

module.exports = withImageElement({
  imageElementOptions: {
    sizeLimit: 10240,
  },
});
```

The limit can be specified via loader options and defaults to no limit.

### `pathPrefix`
Type: `String` Default: `""`

Specifies outputted image path prefix.

```js
// next.config.js
const withImageElement = require("next-image-element");

module.exports = withImageElement({
  imageElementOptions: {
    pathPrefix: "dist",
  },
});
```


## Recipes
For more detail, see [here](https://github.com/jagaapple/react-image-element-loader#recipes).

### Enables type definitions for `import` syntax for TypeScript
If you want to enable type definitions for TypeScript, you should add `"react-image-element-loader"` to your `tsconfig.json`
file.

```json
{
  "compilerOptions": {
    "types": [
      "react-image-element-loader"
    ]
  }
}
```


## Contributing to next-image-element
Bug reports and pull requests are welcome on GitHub at
[https://github.com/jagaapple/next-image-element](https://github.com/jagaapple/next-image-element). This project
is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.

Please read [Contributing Guidelines](./.github/CONTRIBUTING.md) before development and contributing.


## License
The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2018 Jaga Apple. All rights reserved.
