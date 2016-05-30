
/**
 * Created by ogi on 27.05.16.
 */
function ReactIntlPlugin(options) {
}

ReactIntlPlugin.prototype.apply = function (compiler) {

    var messages={};

    compiler.plugin("compilation", function(compilation) {
        // console.log("The compiler is starting a new compilation...");

        compilation.plugin("normal-module-loader", function (context, module) {
            // console.log("registering function: ", __dirname, "in loader context");
            context["metadataReactIntlPlugin"] = function (metadata) {
                // do something with metadata and module
                // console.log("module:",module,"collecting metadata:", metadata);
                messages[module.resource]=metadata["react-intl"].messages;
            };
        });
    });

    compiler.plugin('emit', function (compilation, callback) {
        // console.log("emitting messages");

        // TODO check for duplicates and flatten


        // Create a header string for the generated file:
        var jsonString = JSON.stringify(messages,undefined,2);
        // console.log("jsonString:",jsonString);

        // Insert this list into the Webpack build as a new file asset:
        compilation.assets['reactIntlMessages.json'] = {
            source: function () {
                return jsonString;
            },
            size: function () {
                return jsonString.length;
            }
        };

        callback();
    });
};

module.exports = ReactIntlPlugin;
module.exports.metadataContextFunctionName = "metadataReactIntlPlugin";
