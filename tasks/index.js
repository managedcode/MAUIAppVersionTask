"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeUpdateApplicationVersion = exports.updateApplicationVersion = void 0;
const tl = require("azure-pipelines-task-lib/task");
const fs = require('fs');
const updateApplicationVersion = (data, updateSegment) => {
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
const writeUpdateApplicationVersion = (csproj, updateSegment) => {
    fs.writeFileSync(csproj, updateSegment, 'utf8');
};
exports.writeUpdateApplicationVersion = writeUpdateApplicationVersion;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const csproj = tl.getInput('csproj');
            const version = tl.getInput('version') || ' ';
            const displayVersion = tl.getInput('displayVersion') || ' ';
            const printFile = tl.getInput('printFile') || false;
            // match <ApplicationVersion> followed by any sequence of characters that are not a '<', followed by </ApplicationVersion>
            const applicationVersionPattern = /<ApplicationVersion>[^<]*<\/ApplicationVersion>/g;
            const applicationDisplayVersionPattern = /<ApplicationDisplayVersion>[^<]*<\/ApplicationDisplayVersion>/g;
            if (version.trim()) {
                // Read the file contents
                const updatedApplicationVersion = (0, exports.updateApplicationVersion)({ csproj, version }, applicationVersionPattern);
                // Write the updated contents back to the file
                (0, exports.writeUpdateApplicationVersion)(csproj, updatedApplicationVersion);
            }
            if (displayVersion.trim()) {
                // Read the file contents
                const updatedApplicationVersion = (0, exports.updateApplicationVersion)({ csproj, displayVersion }, applicationDisplayVersionPattern);
                // Write the updated contents back to the file
                (0, exports.writeUpdateApplicationVersion)(csproj, updatedApplicationVersion);
            }
            if (Boolean(printFile)) {
                const fileContents = fs.readFileSync(csproj, 'utf8');
                console.log('');
                console.log(fileContents);
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
