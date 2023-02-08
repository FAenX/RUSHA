export interface CreateProjectResponseInterface {
    id?: number, 
    application_name?: string, 
    local_git_repo?: string, 
    date_created: Date, 
    error?: boolean | false
    message?: string,
    framework?: String,
    description?: String,
    domain_name?: String,
    tag?: String,
    application_port?: Number,
    proxy_host_name_and_or_port?: String | Number


}

export interface ProjectCacheInterface {
        user_id?: string;
        project: {
            project_name: string;
            id: string;
            description: string;
            tag: string[];
            applications: Array<{
                application_name: string;
                id: string;
                framework: string;
                description: string;
                domain_name: string;
                tag: string;
                local_git_repo: string;
                
            }>
        }
    }
export interface Content{
        supported_frameworks: Array<{
            framework_name: string;
            id: string;
            description: string;
            tag: string[];
        }>
}

export interface Repository{
        name: string;
        icon: string;
}

export interface SetActiveStepFunction{
    (): void;
}
    


