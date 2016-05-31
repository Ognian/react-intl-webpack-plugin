/**
 * Created by ogi on 27.05.16.
 */
function ReactIntlPlugin(options) {
}

ReactIntlPlugin.prototype.apply = function (compiler) {

    var messages = {};

    compiler.plugin("compilation", function (compilation) {
        // console.log("The compiler is starting a new compilation...");

        compilation.plugin("normal-module-loader", function (context, module) {
            // console.log("registering function: ", __dirname, "in loader context");
            context["metadataReactIntlPlugin"] = function (metadata) {
                // do something with metadata and module
                // console.log("module:",module,"collecting metadata:", metadata);
                messages[module.resource] = metadata["react-intl"].messages;
            };
        });
    });

    compiler.plugin('emit', function (compilation, callback) {
        // console.log("emitting messages");

        // check for duplicates and flatten
        var jsonMessages = [];
        var idIndex = {};
        Object.keys(messages).map(function (e) {
            messages[e].map(function (m) {
                if (!idIndex[m.id]) {
                    idIndex[m.id] = e;
                    jsonMessages.push(m);
                } else {
                    compilation.errors.push("ReactIntlPlugin -> duplicate id: '" + m.id + "'.Found in '" + idIndex[m.id] + "' and '" + e + "'.");
                }
            })
        });

        var jsonString = JSON.stringify(jsonMessages, undefined, 2);
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