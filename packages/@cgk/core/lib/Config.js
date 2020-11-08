"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var fs = __importStar(require("fs"));
var YAML = __importStar(require("yaml"));
var FileExtensions_1 = require("./FileExtensions");
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.prototype.filename = function () { return 'config-file'; };
    Config.prototype.serialize = function (type) {
        var fileContents;
        switch (type) {
            case FileExtensions_1.FileExtension.JSON: {
                fileContents = JSON.stringify(this.contents, function (key, value) { if (value !== null)
                    return value; }, 2);
                break;
            }
            case FileExtensions_1.FileExtension.YML:
            case FileExtensions_1.FileExtension.YAML: {
                fileContents = YAML.stringify(this.contents);
                break;
            }
            default: {
                throw new Error("Filetype " + type + " not supported");
            }
        }
        var file = this.filename() + '.' + type;
        fs.writeFile(file, fileContents, function (err) {
            if (err)
                throw err;
            console.log("Successfully written to " + file);
        });
    };
    return Config;
}());
exports.Config = Config;
