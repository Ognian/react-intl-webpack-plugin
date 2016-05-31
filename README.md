# react-intl-webpack-plugin

This plugin helps when using react-intl for internationalization of react apps.

## Workflow

1. Use `<FormattedMessage id="newItem" defaultMessage="Add item" />` for adding text in your react components.
2. Use the babel plugin `babel-plugin-react-intl` to extract them from your source code.
3. Use `react-intl-webpack-plugin` to combine them into one message file called `reactIntlMessages.json` and put this file into the webpack output path.
4. Use CAT (Computer Aided Translation) tools (like the cloud based memsource.com or okapi) to translate this file into the translated file. These tools use a concept called Translation Memory (TM) . This is a separate file where all translations are stored and with this file all translations can be reapplied to a newly generated `reactIntlMessages.json` file.
5. Save the TM file and the translated json file in a separate directory of your source code.
6. Use `reactIntlJson-loader` to load the translated files and convert them to messages.

## Installation

`npm install react-intl-webpack-plugin --save-dev`

- this works only with babel-loader >= x.y.z (PR submitted, until it is approved you can use `"babel-loader": "git://github.com/Ognian/babel-loader.git#passthru_metadata"` )
- you will need also the babel plugin `babel-plugin-react-intl`

webpack.config.js:
- add the plugin
```
var ReactIntlPlugin=require('react-intl-webpack-plugin');
...
plugins: [
         ...
          new ReactIntlPlugin()
         ],
```
- modify your babel-loader to contain the `metadataSubscribers` option
```
module: {
        loaders: [
                  ...
            {
                test: /\.js?$/, loader: 'babel-loader',
                query: {
                    "cacheDirectory": true,
                    "metadataSubscribers":[ReactIntlPlugin.metadataContextFunctionName],
                    "plugins": ["transform-runtime",
                        ["react-intl", {
                            "enforceDescriptions": false
                        }]],
                    "presets": ['react', "es2015", "stage-1"]
                }
            },
```

- the generated file is called `reactIntlMessages.json`

## License

MIT (http://www.opensource.org/licenses/mit-license.php)