let username = 'AYang'
let password = 'ayang'
let baseJiraUrl = 'jira.edudyn.com'
let loginStr = 'http://jira.edudyn.com/login.jsp?os_username=' + username +
    '&os_password=' + password + '&os_destination=/TempoUserBoard!timesheet.jspa&user_role=&atl_token=&login=Log+In'
let timeSheetURL = baseJiraUrl + '/TempoUserBoard!timesheet.jspa'


let http = require("http"),
    superagent = require("superagent"),
    cheerio = require("cheerio");

function onRequest() {
    let cookie
    superagent.post(loginStr)
        .type("form")
        .end((err, response) => {
            if (err) throw err;
            cookie = response.header['set-cookie'].join(' ')
            if (cookie) {
                console.log(cookie)
                getTimeSheet(timeSheetURL, cookie)
            }
        })
}

function getTimeSheet(timeSheetURL, cookie) {
    superagent.get(timeSheetURL)
        .set("Cookie", cookie)
        .end((err, response) => {
            if (err) throw err
            const $ = cheerio.load(response.text)
            console.log(response.text)
        })
}

exports.start = onRequest
