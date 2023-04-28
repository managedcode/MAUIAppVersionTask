"use strict";
exports.__esModule = true;
var path = require("path");
var assert = require("assert");
var ttm = require("azure-pipelines-task-lib/mock-test");
describe('Sample task tests', function () {
    before(function () {
    });
    after(function () {
    });
    it('should succeed with simple inputs', function (done) {
        this.timeout(1000);
        var tp = path.join(__dirname, 'success.js');
        var tr = new ttm.MockTestRunner(tp);
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, true, 'should have succeeded');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 0, "should have no errors");
        console.log(tr.stdout);
        assert.equal(tr.stdout.indexOf('Hello human') >= 0, true, "should display Hello human");
        done();
    });
    it('it should fail if tool returns 1', function (done) {
        this.timeout(1000);
        var tp = path.join(__dirname, 'failure.js');
        var tr = new ttm.MockTestRunner(tp);
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, false, 'should have failed');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
        assert.equal(tr.errorIssues[0], 'Bad input was given', 'error issue output');
        assert.equal(tr.stdout.indexOf('Hello bad'), -1, "Should not display Hello bad");
        done();
    });
});
