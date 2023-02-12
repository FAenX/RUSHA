
interface links {
    id?: string;
}


export default (args?: links)=>({
    home: {title: 'Home', link: '/'},
    // applications: {title: 'applications', link: '/applications'},
    createNewProject:{title: 'New project', link: '/project/new'},
    project: {title: `Project ${args?.id}`, link: '/project/:id'},
    projectSettings: {title: 'Project settings', link: '/projects/:id/settings'},
    projectSettingsGeneral: {title: `Application settings ${args?.id}`, link: '/applications/:id/settings/general'},
    logout: {title: 'Logout', link: '/logout'},
    deployment: {title: 'Create Application', link: '/create-application'},
});