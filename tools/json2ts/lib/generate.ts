import axios from 'axios'
import camelCase from 'camelcase'
import { paramCase } from 'param-case'
import fs from 'fs'
import { quicktype, InputData, JSONSchemaInput, JSONSchemaStore } from "quicktype-core";

async function quicktypeJSONSchema(typeName: string, jsonSchemaString: string) {
    const schemaInput = new JSONSchemaInput(new JSONSchemaStore());
    await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });
  
    const inputData = new InputData();
    inputData.addInput(schemaInput);
  
    return await quicktype({
      inputData,
      lang: 'typescript',
    });
}

interface Schema {
    name: string
    url: string
}

async function generate(schema: Schema) {
    axios.get(schema.url)
        .then(response => {
            const configName: string = camelCase(schema.name, {pascalCase: true})
            const dirName: string = `./${paramCase(schema.name)}-generated`
            quicktypeJSONSchema(configName, JSON.stringify(response.data))
                .then(result => {
                    if (!fs.existsSync(dirName)) {
                        fs.mkdirSync(dirName)
                    }
                    fs.writeFileSync(`${dirName}/index.ts`, result.lines.join('\n'))
                })
                .catch(error => console.log(error, error.body))
        })
        .catch(error => console.error(error, error.body))
}

interface Settings {
    fetchAllSchemas: boolean
}

export async function generateSchemas(settings: Settings) {
    let schemas: Array<Schema>
    if (settings.fetchAllSchemas) {
        schemas = await axios.get('https://www.schemastore.org/api/json/catalog.json')
            .then(response => response.data.schemas)
            .catch(error => console.error(error, error.body))
    } else {
        schemas = [
            { name: 'gitlab-ci', url: 'https://json.schemastore.org/gitlab-ci' },
            { name: 'JSON Resume', url: 'https://json.schemastore.org/resume' }
        ]
    }

    schemas.forEach(async schema => await generate(schema))
}
