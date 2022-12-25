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

