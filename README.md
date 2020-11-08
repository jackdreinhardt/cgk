# Config Generation Kit

The **Config Generation Kit (CGK)** is a framework for defining and generating configuration resources in JSON or YAML imperatively, taking advantage of power of modern high level programming languages.

It offers an interface to generate many types of configuration resources and allows for a DRY configuration experience, leveraging reusability already present in popular high level programming languages. Able to be written in many popular languages, it is more accessible than other custom configuration generation languages or frameworks. Developers can generate complex, reusable configurations in a language they are already comfortable with.

The CGK is available in the following languages:

* JavaScript, TypeScript
* Python (Not yet Implemented, on the Roadmap)
* Java (Not yet Implemented, on the Roadmap)
* .NET (Not yet Implemented, on the Roadmap)

# Getting Started

## Installation

*Coming soon!*

<!-- ```bash
npm install -g cgk
```

## Initialize a Project

```bash
cgk init --language typescript
``` -->

# Example

```typescript
import { FileExtension } from '@cgk/core'
import * as gitlab from '@cgk/gitlab-ci'

const world: string = 'World'
const config = new gitlab.GitlabCIConfiguration({
    variables: {
        hello: world,
    },
    stages: ["build"],
    jobs: {
        print: {
            stage: "build",
            script: `echo "Hello ${world}"`
        }
    }
})

console.log(config.serialize(FileExtension.YML))
```

Becomes

```yaml
variables:
  hello: World
  number: 1
stages:
  - build
print:
  stage: build
  script: echo "Hello World"
```

# FAQ

**The example seems to just define the configuration file as an argument of an object. How is this useful?**

Yes, for now. In the future, higher level constructs will be built on top of the base types. This will allow less code to do more. For example, common GitlabCI jobs like building and publishing a docker image, or an organization wide .prettierrc that is both customized but extendable. Consider contributing to expedite this process!

**How is this different from other configuration generation solutions like [`jsonnet`](https://jsonnet.org/) or [`dhall`](https://dhall-lang.org/)?**

The CGK does not require the developer to learn a new language to generate their configurations. They can generate configurations quicker and more confidently when they can leverage their existing knowledge in a language.

**How is the CGK helpful when I can just write a small config file and be done with it?**

The CGK is built to ease operational burden of large, hard to maintain, configuration files. The benefits are not as great when configuration files are small and easy to manage. However, even small files can benefit, as organizational standards can be built, packaged, and shared to developers.

**Maintaining the CGK in 4 languages must be difficult and hard to maintain. How will the CGK maintain feature parity in all languages?**

[`JSii`](https://github.com/aws/jsii) to the rescue. It allows many languages to the CGK from one repository of source code.\*

\* This is a future feature, and the CGK is only available in JavaScript and TypeScript.

**How can I contribute?**

Find or create an issue, and create a Pull Request.