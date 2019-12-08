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
<a href="https://circleci.com/gh/jagaapple/next-image-element"><img src="https://img.shields.io/circleci/project/github/jagaapple/next-image-element/master.svg" alt="CircleCI"></a>
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
  - [`pathPrefix`](#pathprefix)
- [Recipes](#recipes)
  - [Enables type definitions for TypeScript](#enables-type-definitions-for-typescript)
- [Contributing to next-image-element](#contributing-to-next-image-element)
- [License](#license)

<!-- /TOC -->


## Features
| FEATURES                      | WHAT YOU CAN DO                                              |
|-------------------------------|--------------------------------------------------------------|
| ⚛️ **Designed for JSX**        | Import images as React element like `<MySVG fill={color} />` |
| ✨ **Exported as plain image** | Import image paths or as inline image (Base64)               |
| 🎩 **Type Safe**              | You can use with TypeScript                                  |
| 🔧 **Built for Next.js**      | It's very easy to setup                                      |


## Quick Start
### Requirements
- npm or Yarn
- Next.js 5.0.0 or higher

### Installation
```bash
$ npm install --save next-image-element
```

If you are using Yarn, use the following command.

```bash
$ yarn add next-image-element
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

next-image-element supports PNG (.png), JPEG (.jpg), GIF (.gif), and SVG (.svg).


## Options
### `sizeLimit`
Type: `Number` Default: `undefined`

A number specifying the maximum size of an image file in bytes.

If the image is greater than the limit or `sizeLimit` option specified `undefined`, `path` will be an actual URL. In that case,
[file-loader](https://github.com/webpack-contrib/file-loader) is used by default and all query parameters are passed to it.
Using an alternative to file-loader is enabled via the `fallback` option.

If the image is smaller than the limit, `path` will be a Base64 encoded URL.

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

### Enables type definitions for TypeScript
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

Copyright 2019 Jaga Apple. All rights reserved.
