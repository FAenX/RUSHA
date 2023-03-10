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

export interface UserHomePageCache {
            application_name: string;
            id: string;
            framework: string;
            description: string;
            domain_name: string;
            tag: string;
            local_git_repo: string;
            project_name: string;
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

export interface AppData{
    application_name?: string;
    framework?: string;
    description?: string;
    tag?: string;
}

export interface Frameworks{
    name: string;
    id: string;
    description: string;
    tag: string[];
    icon: string;
}

export interface StepProps {
    repositories?: Repository[];
    frameworks?: Frameworks[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // on click handler for the submit button
    handleSubmit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
   
    applicationName?: string;
    reviewProps?: {
        applicationName: string;
        githubRepo: string;
        url: string;
      };

}


