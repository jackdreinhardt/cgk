import * as fs from 'fs';
import * as YAML from 'yaml';
import { FileExtension } from './FileExtensions';

export abstract class Config {
    abstract contents: object
    filename(): string { return 'config-file'}

    serialize(type: FileExtension) {
        let fileContents: string
        switch(type) {
            case FileExtension.JSON: {
                fileContents = JSON.stringify(this.contents, (key, value) => { if (value !== null) return value }, 2)
                break
            }
            case FileExtension.YML:
            case FileExtension.YAML: {
                fileContents = YAML.stringify(this.contents)
                break
            }
            default: {
                throw new Error(`Filetype ${type} not supported`)
            }
        }
        const file = this.filename() + '.' + type

        fs.writeFile(file, fileContents, (err) => {
            if (err) throw err;
            console.log(`Successfully written to ${file}`);
        });
    }
}