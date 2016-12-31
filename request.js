let request = require('request')
let userInfo = require('./config.json')

let baseUrl = userInfo.baseJiraUrl
let loginStr = 'http://' + baseUrl + '/rest/auth/1/session'
let timeSheetURL = 'http://' + baseUrl + '/secure/TempoUserBoard!timesheet.jspa'

function onRequest() {
    request.post(loginStr, {
        json: {
            "username": userInfo.username,
            "password": userInfo.password
        }
    }, (err, response, body) => {
        if (err) throw err
        console.log('Server responded with:', body);
        let session = body.session
        getTimeSheet(session)
    });
}

function getTimeSheet(cookie) {
    request.get(timeSheetURL, {
        headers: {
            Cookie: cookie.name + '=' + cookie.value
        }
    }, (err, response, body) => {
        if (err) throw error
        console.log(body)
    })
}

exports.start = onRequest
