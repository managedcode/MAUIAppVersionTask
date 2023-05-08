import tl = require('azure-pipelines-task-lib/task');
const fs = require('fs');

export const updateApplicationVersion = (data:any,updateSegment:RegExp) => {
  const fileContents = fs.readFileSync(data.csproj, 'utf8');
  let updatedApplicationVersion;

  if(data?.version) {
    updatedApplicationVersion = fileContents.replace(updateSegment, 
      `<ApplicationVersion>${data.version}</ApplicationVersion>`
    );
    return updatedApplicationVersion;
  }

  updatedApplicationVersion = fileContents.replace(updateSegment, 
    `<ApplicationDisplayVersion>${data?.displayVersion}</ApplicationDisplayVersion>`
  );
  return updatedApplicationVersion;
}
export const writeUpdateApplicationVersion = (csproj:string | undefined,updateSegment:any) => {
  fs.writeFileSync(csproj, updateSegment, 'utf8');
}



async function run() {
  try {
    const csproj:string | undefined = tl.getInput('csproj');
    const version:string = tl.getInput('version') || ' ';
    const displayVersion:string = tl.getInput('displayVersion') || ' ';
    const printFile:boolean | string = tl.getInput('printFile') || false;

    // match <ApplicationVersion> followed by any sequence of characters that are not a '<', followed by </ApplicationVersion>
    const applicationVersionPattern = /<ApplicationVersion>[^<]*<\/ApplicationVersion>/g; 
    const applicationDisplayVersionPattern = /<ApplicationDisplayVersion>[^<]*<\/ApplicationDisplayVersion>/g; 

    if (version.trim()) {
      // Read the file contents
      const updatedApplicationVersion = updateApplicationVersion({csproj,version},applicationVersionPattern);

      // Write the updated contents back to the file
      writeUpdateApplicationVersion(csproj,updatedApplicationVersion)
    }

    if (displayVersion.trim()) {
      // Read the file contents
      const updatedApplicationVersion = updateApplicationVersion({csproj,displayVersion},applicationDisplayVersionPattern);

      // Write the updated contents back to the file
      writeUpdateApplicationVersion(csproj,updatedApplicationVersion)
    }

    if(Boolean(printFile)) {
      const fileContents = fs.readFileSync(csproj, 'utf8');
      console.log('');
      console.log(fileContents);
    }

  } catch (err:any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();