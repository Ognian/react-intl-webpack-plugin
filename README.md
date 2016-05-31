# ReactIntlPlugin
# WORK IN PROGRESS

## Workflow

TBD

## Installation

`npm install ReactIntlPlugin --save-dev`

- this works only with babel-loader >= x.y.z (PR submitted, until it is approved you can use `"babel-loader": "git://github.com/Ognian/babel-loader.git#passthru_metadata"` )
- you will need also the babel plugin `react-intl`

changes to webpack.config.js:
- modify your babel-loader to contain the `metadataSubscribers` option
```
module: {
        loaders: [
                  ...
            {
                test: /\.js?$/, loader: 'babel-loader',
                query: {
                    "cacheDirectory": true,
                    "metadataSubscribers":["metadataReactIntlPlugin"],
                    "plugins": ["transform-runtime",
                        ["react-intl", {
                            "enforceDescriptions": false
                        }]],
                    "presets": ['react', "es2015", "stage-1"]
                }
            },
```
- add the plugin
```
var ReactIntlPlugin=require('./ReactIntlPlugin');
...
plugins: [
         ...
          new ReactIntlPlugin()
         ],
```
- the generated file is called `reactIntlMessages.json`


## Usage



## License

MIT (http://www.opensource.org/licenses/mit-license.php)