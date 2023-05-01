export const updateApplicationVersion = (fs:any,data:any,updateSegment:RegExp) => {
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
export const writeUpdateApplicationVersion = (fs:any,csproj:string | undefined,updateSegment:any) => {
  fs.writeFileSync(csproj, updateSegment, 'utf8');
}
