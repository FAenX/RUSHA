import React, { useEffect } from "react";

import {CreateProjectResponseInterface} from '../types'

const SuccessFulDeploymentComponent = (props?: CreateProjectResponseInterface) => {
    // projectInfo state
    const [projectInfo, setProjectInfo] = React.useState<CreateProjectResponseInterface>();

    useEffect(() => {
        console.log(props);
        if (props) {
            setProjectInfo(props);
        }
    }, [props]);
    return (
        <div className="content border d-flex flex-column p-2">           
            <p className="h4">{projectInfo?.application_name}</p>
            <p className="text-muted">Git repo: {projectInfo?.local_git_repo}</p>
            {/* <p className="text-muted">Created date: {projectInfo?.date_created}</p>            */}
        </div>
    );
}


const SuccessfulDeployment = (props: CreateProjectResponseInterface) => {


    return (
        <div className="content border d-flex flex-column p-2">
            <div className="d-flex">
                <i className="bi bi-check2-circle border d-flex align-items-center" style={{fontSize: 50}}></i>
                <div className="m-2 p-2 border d-flex align-items-start  flex-column lh-1 flex-grow-1">           
                    <p className="display-6">
                        Succes
                    </p>
                    <p className="text-muted">
                        created
                    </p>
                   
                </div>
            </div>
           <SuccessFulDeploymentComponent {...props} />
        </div>
    );
}


export  {SuccessfulDeployment, SuccessFulDeploymentComponent};