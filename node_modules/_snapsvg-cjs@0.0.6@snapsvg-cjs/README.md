# SnapSVG in CommonJS (for Webpack)

This project simply unwraps the excellent [SnapSVG](https://github.com/adobe-webplatform/Snap.svg) from its published AMD format and hosts it on NPM as CommonJS in a package called `snapsvg-cjs`. This package then works out-of-the-box with Webpack, without needing any [import-loader hax](https://github.com/adobe-webplatform/Snap.svg/issues/341#issuecomment-143267637).

### Running

```
npm install
npm run build
npm run start
```

Now hit `http://localhost:3474/test/test.html` to run SnapSVG's own test suite against this project.
