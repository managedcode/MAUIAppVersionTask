import tl = require('azure-pipelines-task-lib/task');
import {updateApplicationVersion,writeUpdateApplicationVersion} from '../utils';
const core = require('@actions/core');
const fs = require('fs');

async function run() {
  try {
    const csproj:string | undefined = tl.getInput('csproj');
    const version:string = tl.getInput('version') || ' ';
    const displayVersion:string = tl.getInput('displayVersion') || ' ';
    const printFile:boolean | string = tl.getInput('printFile') || false;

    if (!version.trim()) {
      tl.setResult(tl.TaskResult.Failed, "Parameter csproj is required.");
      return;
    }

    // match <ApplicationVersion> followed by any sequence of characters that are not a '<', followed by </ApplicationVersion>
    const applicationVersionPattern = /<ApplicationVersion>[^<]*<\/ApplicationVersion>/g; 
    const applicationDisplayVersionPattern = /<ApplicationDisplayVersion>[^<]*<\/ApplicationDisplayVersion>/g; 

     // Read and update the file contents
    const updatedApplicationVersion = updateApplicationVersion(fs,{csproj,version},applicationVersionPattern);

    // Write the updated contents back to the file
    writeUpdateApplicationVersion(fs,csproj,updatedApplicationVersion)

    if (displayVersion.trim()) {
      // Read the file contents
      const updatedApplicationVersion = updateApplicationVersion(fs,{csproj,displayVersion},applicationDisplayVersionPattern);

      // Write the updated contents back to the file
      writeUpdateApplicationVersion(fs,csproj,updatedApplicationVersion)
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