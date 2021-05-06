<div align="center">
  <img src="assets/filemanager.png" />
  <h1>FileManager Webpack Plugin</h1>
  <p>This Webpack plugin allows you to copy, archive (.zip/.tar/.tar.gz), move, delete files and directories before and after builds</p>
  <p>
    <a href="https://github.com/gregnb/filemanager-webpack-plugin/actions?query=workflow%3ATests" alt="Testst">
      <img src="https://github.com/gregnb/filemanager-webpack-plugin/workflows/Tests/badge.svg">
    </a>
    <a href="https://npmcharts.com/compare/filemanager-webpack-plugin?minimal=true" alt="NPM weekly downloads">
      <img src="https://badgen.net/npm/dw/filemanager-webpack-plugin">
    </a>
    <a href="https://www.npmtrends.com/filemanager-webpack-plugin" alt="NPM total downloads">
      <img src="https://badgen.net/npm/dt/filemanager-webpack-plugin">
    </a>
    <a href="https://npmjs.com/filemanager-webpack-plugin" alt="NPM version">
      <img src="https://badgen.net/npm/v/filemanager-webpack-plugin">
    </a>
    <a href="https://david-dm.org/gregnb/filemanager-webpack-plugin" alt="Dependencies status">
      <img src="https://david-dm.org/gregnb/filemanager-webpack-plugin/status.svg">
    </a>
    <a href="https://packagephobia.com/result?p=filemanager-webpack-plugin" alt="Dependencies status">
      <img src="https://badgen.net/packagephobia/install/filemanager-webpack-plugin">
    </a>
  </p>
</div>

## Install

```bash
npm install filemanager-webpack-plugin --save-dev
# or
yarn add filemanager-webpack-plugin --dev
```

## Usage

```js
// webpack.config.js:

const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
            { source: '/path/**/*.js', destination: '/path' },
          ],
          move: [
            { source: '/path/from', destination: '/path/to' },
            { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
          ],
          delete: ['/path/to/file.txt', '/path/to/directory/'],
          mkdir: ['/path/to/directory/', '/another/directory/'],
          archive: [
            { source: '/path/from', destination: '/path/to.zip' },
            { source: '/path/**/*.js', destination: '/path/to.zip' },
            { source: '/path/fromfile.txt', destination: '/path/to.zip' },
            { source: '/path/fromfile.txt', destination: '/path/to.zip', format: 'tar' },
            {
              source: '/path/fromfile.txt',
              destination: '/path/to.tar.gz',
              format: 'tar',
              options: {
                gzip: true,
                gzipOptions: {
                  level: 1,
                },
                globOptions: {
                  nomount: true,
                },
              },
            },
          ],
        },
      },
    }),
  ],
};
```

# Options

```js
new FileManagerPlugin({
  events: {
    onStart: {},
    onEnd: {},
  },
  runTasksInSeries: false,
});
```

## File Events

- `onStart`: Commands to execute before Webpack begins the bundling process

**Note:**

OnStart might execute twice for file changes in webpack context.

```js
new webpack.WatchIgnorePlugin({
  paths: [/copied-directory/],
});
```

- `onEnd`: Commands to execute after Webpack has finished the bundling process

## File Actions

### Copy

Copy individual files or entire directories from a source folder to a destination folder. Also supports glob pattern.

```js
[
  { source: '/path/from', destination: '/path/to' },
  { source: '/path/**/*.js', destination: '/path' },
  { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
  { source: '/path/**/*.{html,js}', destination: '/path/to' },
  { source: '/path/{file1,file2}.js', destination: '/path/to' },
];
```

**Options**

- source[`string`] - a file or a directory or a glob
- destination[`string`] - a file or a directory.

**Caveats**

- if source is a `glob`, destination must be a directory
- if souce is a `file` and destination is a directory, the file will be copied into the directory

### Delete

Delete individual files or entire directories. Also supports glob pattern

```js
['/path/to/file.txt', '/path/to/directory/', '/another-path/to/directory/**.js'];
```

or

```js
[
  {
    source: '/path/to/file.txt',
    options: {
      force: true,
    },
  },
];
```

### Move

Move individual files or entire directories.

```js
[
  { source: '/path/from', destination: '/path/to' },
  { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
];
```

**Options**

- source[`string`] - a file or a directory or a glob
- destination[`string`] - a file or a directory.

### Mkdir

Create a directory path with given path

```js
['/path/to/directory/', '/another/directory/'];
```

### Archive

Archive individual files or entire directories. Defaults to .zip unless 'format' and 'options' provided. Uses [node-archiver](https://github.com/archiverjs/node-archiver)

```js
[
  { source: '/path/from', destination: '/path/to.zip' },
  { source: '/path/**/*.js', destination: '/path/to.zip' },
  { source: '/path/fromfile.txt', destination: '/path/to.zip' },
  { source: '/path/fromfile.txt', destination: '/path/to.zip', format: 'tar' },
  {
    source: '/path/fromfile.txt',
    destination: '/path/to.tar.gz',
    format: 'tar', // optional
    options: {
      // see https://www.archiverjs.com/archiver
      gzip: true,
      gzipOptions: {
        level: 1,
      },
      globOptions: {
        nomount: true,
      },
    },
  },
];
```

- source[`string`] - a file or a directory or a glob
- destination[`string`] - a file.
- format[`string`] - Optional. Defaults to extension in destination filename.
- options[`object`] - Refer https://www.archiverjs.com/archiver

### Order of execution

If you need to preserve the order in which operations will run you can set the onStart and onEnd events to be Arrays. In this example below, in the onEnd event the copy action will run first, and then the delete after:

```js
{
  onEnd: [
    {
      copy: [{ source: './dist/bundle.js', destination: './newfile.js' }],
    },
    {
      delete: ['./dist/bundle.js'],
    },
  ];
}
```

## Other Options

- **runTasksInSeries** [`boolean`] - Run tasks in series. Defaults to false

For Example, the following will run one after the other

```js
copy: [
  { source: 'dist/index.html', destination: 'dir1/' },
  { source: 'dir1/index.html', destination: 'dir2/' },
];
```

- **context** [`string`] - The directory, an absolute path, for resolving files. Defaults to [webpack context](https://webpack.js.org/configuration/entry-context/#context).
