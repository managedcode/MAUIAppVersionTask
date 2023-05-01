"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeUpdateApplicationVersion = exports.updateApplicationVersion = void 0;
const updateApplicationVersion = (fs, data, updateSegment) => {
    const fileContents = fs.readFileSync(data.csproj, 'utf8');
    let updatedApplicationVersion;
    if (data === null || data === void 0 ? void 0 : data.version) {
        updatedApplicationVersion = fileContents.replace(updateSegment, `<ApplicationVersion>${data.version}</ApplicationVersion>`);
        return updatedApplicationVersion;
    }
    updatedApplicationVersion = fileContents.replace(updateSegment, `<ApplicationDisplayVersion>${data === null || data === void 0 ? void 0 : data.displayVersion}</ApplicationDisplayVersion>`);
    return updatedApplicationVersion;
};
exports.updateApplicationVersion = updateApplicationVersion;
const writeUpdateApplicationVersion = (fs, csproj, updateSegment) => {
    fs.writeFileSync(csproj, updateSegment, 'utf8');
};
exports.writeUpdateApplicationVersion = writeUpdateApplicationVersion;
