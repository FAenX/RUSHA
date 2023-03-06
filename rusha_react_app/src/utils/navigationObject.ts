interface Links {
    id: string;
  }
  
  
class NavigationLinks {
    private args?: Links;
  
    constructor(args?: Links) {
      this.args = args;
    }
  
    public home = {title: 'Home', link: '/'};
    // public applications = {title: 'Applications', link: '/applications'};
    public login = {title: 'Login', link: '/login'};
    public createNewProject = {title: 'New project', link: '/project/new'};
    public project = {title: `Project ${this.args?.id}`, link: '/project/:id'};
    public projectSettings = {title: 'Project settings', link: '/projects/:id/settings'};
    public projectSettingsGeneral = {title: `Application settings ${this.args?.id}`, link: '/applications/:id/settings/general'};
    public logout = {title: 'Logout', link: '/logout'};
    public deployment = {title: 'Create Application', link: '/create-application'};
  }
  
  export default NavigationLinks;