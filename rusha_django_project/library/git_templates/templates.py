


def react_post_receive_template(tempdir, project_path, git_dir_path, port):
 return \
f'''
# create a post-receive file
#!/bin/bash
# generated automatically

# Deploy the content to the temporary directory
mkdir -p {tempdir}
mkdir -p {project_path}
git --work-tree={tempdir} --git-dir={git_dir_path} checkout -f || exit;

cd {tempdir}

npm install
npm run build

# clean up and copy files to static folder
rm -rf {project_path}/*
cp -r build/* {project_path}/

rm -rf {tempdir} || exit;
'''  
