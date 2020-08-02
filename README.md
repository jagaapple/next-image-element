<h1 align="center">next-image-element</h1>

<h4 align="center">🖼️ Import paths or React elements from images in Next.js. 📦</h4>

```jsx
import { element as LogoSVG } from "./logo.svg";
import photoImagePath from "./photo.jpg";

export default (props) => (
  <div>
    <LogoSVG width="230" height="140" fill={props.color} />
    <img src={photoImagePath} alt="flower" />
  </div>
);
```

<div align="center">
<a href="https://www.npmjs.com/package/next-image-element"><img src="https://img.shields.io/npm/v/next-image-element.svg" alt="npm"></a>
<a href="https://github.com/jagaapple/next-image-element/actions"><img src="https://github.com/jagaapple/next-image-element/workflows/Build%20and%20test/badge.svg" alt="GitHub Actions"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/jagaapple/next-image-element.svg" alt="license"></a>
<a href="https://twitter.com/jagaapple_tech"><img src="https://img.shields.io/badge/contact-%40jagaapple_tech-blue.svg" alt="@jagaapple_tech"></a>
</div>

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
  - [`publicPath`](#publicpath)
  - [`outputPath`](#outputpath)
  - [`outputFileNamePattern`](#outputfilenamepattern)
- [Recipes](#recipes)
  - [Enables type checking in TypeScript](#enables-type-checking-in-typescript)
  - [Uses in other libraries such as Storybook](#uses-in-other-libraries-such-as-storybook)
- [Contributing to next-image-element](#contributing-to-next-image-element)
- [License](#license)

<!-- /TOC -->


## Features
| FEATURES                      | WHAT YOU CAN DO                                              |
|-------------------------------|--------------------------------------------------------------|
| ⚛️ **Designed for JSX**        | Import images as React element like `<MySVG fill={color} />` |
| 🎨 **Designed for CSS**       | Import images as some URL in not JavaScript files            |
| ✨ **Exported as plain image** | Import image paths or as inline image (Base64)               |
| 🎩 **Type Safe**              | You can use with TypeScript                                  |
| 🔧 **Built for Next.js**      | It's very easy to setup                                      |


## Quick Start
### Requirements
- npm or Yarn
- Next.js 5.0.0 or higher

### Installation
```bash
$ npm install -D next-image-element
```

If you are using Yarn, use the following command.

```bash
$ yarn add -D next-image-element
```

### Setup
Firstly setup your Next.js settings.

```js
// next.config.js
const withImageElement = require("next-image-element");

module.exports = withImageElement();
```

All you need is the above!


## Usage
This package depends on [react-image-element-loader](https://github.com/jagaapple/react-image-element-loader), for more detail,
see [here](https://github.com/jagaapple/react-image-element-loader#usage).

---

You can import file path or React element from images. It's possible to pass props such as HTMLAttributes, but `src` will be ignored.


```jsx
import { element as LogoSVG } from "./logo.svg";
import photoImagePath from "./photo.jpg";

export default (props) => (
  <div>
    <LogoSVG width="230" height="140" fill={props.color} />
    <img src={photoImagePath} alt="flower" />
  </div>
);
```

Also when you import images from not JavaScript files such as CSS, next-image-element imports them as same as using default
export, so it will be actual URL or inline image (Base64).

```css
.box {
  background-image: url("./icon.png");
}
```

next-image-element supports PNG (.png), JPEG (.jpg), GIF (.gif), and SVG (.svg).


## Options
### `sizeLimit`
Type: `Number` Default: `undefined`

This option is to specify the maximum size of image file in bytes.

If an image is greater than the limit or `sizeLimit` option specified `undefined`, `path` will be an actual URL. In that case,
[file-loader](https://github.com/webpack-contrib/file-loader) will be used and all query parameters are passed to it.
If an image is smaller than the limit, `path` will be Base64 encoded URL.

```js
module.exports = withImageElement({
  imageElementOptions: {
    sizeLimit: 10240, // 10kB
  },
});
```

The limit can be specified via loader options and defaults to no limit.

### `publicPath`
Type: `String` Default: `"/_next/static/images/"`

This option is to specify published image path used as actual URL. When you use next-image-element in Next.js projects, you
should start with `"/_next/static/"` .

```js
module.exports = withImageElement({
  imageElementOptions: {
    publicPath: "/static/images/",
  },
});
```

### `outputPath`
Type: `String` or `Function` Default: ``(isServer) => `${isServer ? "../" : ""}static/images/``

This option is to specify output image path. If you give string as this option, next-image-element will just use it. If you give
function as this option, next-image-element will call it with `isServer` boolean value as the first argument, so you have to
give function which returns string in this case.

```js
module.exports = withImageElement({
  imageElementOptions: {
    outputPath: "/static/images/",
  },
});
```

### `outputFileNamePattern`
Type: `String` Default: `"[name]-[hash].[ext]"`

This option is to specify a pattern of images' file name. For more detail, please check [this](https://github.com/webpack-contrib/file-loader#placeholders).

```js
module.exports = withImageElement({
  imageElementOptions: {
    outputFileNamePattern: "[hash].[ext]",
  },
});
```


## Recipes
For more detail, see [here](https://github.com/jagaapple/react-image-element-loader#recipes).

### Enables type checking in TypeScript
If you want to enable type checking in TypeScript for images, you should add the following to `next-env.d.ts` file.

```diff
/// <reference types="next" />
/// <reference types="next/types/global" />

+ /// <reference types="next-image-element" />
```

### Uses in other libraries such as Storybook
Libraries such as Storybook outside Next.js does not load `_next` directory automatically, but next-image-element uses `_next`
as published image path by default. So if you change the public path, the library can load images.

```js
// storybook/webpack.config.js
module.exports = async ({ config }) => {
  withImageElement({ imageElementOptions: { publicPath: "/static/images/" }}).webpack(config, { isServer: false });

  return config;
};
```


## Contributing to next-image-element
Bug reports and pull requests are welcome on GitHub at
[https://github.com/jagaapple/next-image-element](https://github.com/jagaapple/next-image-element). This project
is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.

Please read [Contributing Guidelines](./.github/CONTRIBUTING.md) before development and contributing.


## License
The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2020 Jaga Apple. All rights reserved.
