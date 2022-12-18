interface CreateProjectResponseInterface {
    id?: number, 
    application_name?: string, 
    local_git_repo?: string, 
    requestedAt?: string, 
    gitCreatedAt?: string,
    nginxConfCreatedAt?: string,
    applicationUpdatedAt?: string,
    error?: boolean | false
    message?: string

}
export default CreateProjectResponseInterface;