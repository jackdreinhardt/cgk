import { Config } from '@cgk/core'
import * as gitlab from '../gitlab-ci-generated'

export interface Jobs {
    [jobName: string]: gitlab.Job
}

export interface GitlabCIConfigurationProps extends gitlab.GitlabCi{
    jobs: Jobs
}

export class GitlabCIConfiguration extends Config {
    public contents: object

    constructor(props: GitlabCIConfigurationProps) {
        super()

        // bring jobs to top level of YAML
        const {jobs, ...properties} = props
        this.contents = {...properties, ...jobs}
    }

    filename(): string {
        return "generated-gitlab-ci"
    }
}