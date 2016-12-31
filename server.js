let userInfo = require('./config.json')
let http = require("http"),
    superagent = require("superagent"),
    cheerio = require("cheerio");

require('superagent-proxy')(superagent)

let username = userInfo.username
let password = userInfo.password
let baseJiraUrl = userInfo.baseJiraUrl

let loginStr = baseJiraUrl + '/login.jsp'
let timeSheetURL = baseJiraUrl + '/TempoUserBoard!timesheet.jspa'
let setCookie = ''
let cookie = 'JSESSIONID=' + setCookie + '; Path=/; HttpOnly'


let proxy = process.env.http_proxy || 'http://127.0.0.1:1080'

function onRequest() {
    let cookie
    superagent.post(loginStr)
        .proxy(proxy)
        .type("form")
        .send({'os_username': username})
        .send({'os_password': password})
        .send({'login': 'Log+In'})
        .end((err, response) => {
            if (err) throw err
            console.log(response.text)
            cookie = response.header['set-cookie']
                // if (cookie) {
                //     let newCookie = cookie[1] + ' ' + cookie[0]
                //     console.log(newCookie)
                //     getTimeSheet(timeSheetURL, newCookie)
                // }
        })
}

function getTimeSheet(timeSheetURL, cookie) {
    superagent.get(timeSheetURL)
        .set("Cookie", cookie)
        .end((err, response) => {
            if (err) throw err
            const $ = cheerio.load(response.text)
                // console.log(response.text)
        })
}

exports.start = onRequest
