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
const tl = require("azure-pipelines-task-lib/task");
const utils_1 = require("../utils");
const core = require('@actions/core');
const fs = require('fs');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const csproj = tl.getInput('csproj');
            const version = tl.getInput('version') || ' ';
            const displayVersion = tl.getInput('displayVersion') || ' ';
            const printFile = tl.getInput('printFile') || false;
            console.log(csproj);
            console.log(version);
            console.log(displayVersion);
            console.log(printFile);
            // match <ApplicationVersion> followed by any sequence of characters that are not a '<', followed by </ApplicationVersion>
            const applicationVersionPattern = /<ApplicationVersion>[^<]*<\/ApplicationVersion>/g;
            const applicationDisplayVersionPattern = /<ApplicationDisplayVersion>[^<]*<\/ApplicationDisplayVersion>/g;
            if (version.trim()) {
                // Read the file contents
                const updatedApplicationVersion = (0, utils_1.updateApplicationVersion)(fs, { csproj, version }, applicationVersionPattern);
                // Write the updated contents back to the file
                (0, utils_1.writeUpdateApplicationVersion)(fs, csproj, updatedApplicationVersion);
            }
            if (displayVersion.trim()) {
                // Read the file contents
                const updatedApplicationVersion = (0, utils_1.updateApplicationVersion)(fs, { csproj, displayVersion }, applicationDisplayVersionPattern);
                // Write the updated contents back to the file
                (0, utils_1.writeUpdateApplicationVersion)(fs, csproj, updatedApplicationVersion);
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
