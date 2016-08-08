import moment from 'moment'
import mkdirp from 'mkdirp'
import path from 'path'
import fs from 'fs'


import config from './config'
import appendFile from './appendFile'

const logFilePath = config.logFile
const logFileDir = path.dirname(logFilePath)
if (!fs.existsSync(logFileDir)) {
  mkdirp.sync(logFileDir)
}

const wrapLog = (level) => (msg) => {
  appendFile(logFilePath,
    `${moment().format('HH:mm:ss')}[${level}]: ${msg}`)
}

const info = wrapLog('info')
const error = wrapLog('erro')
const warn = wrapLog('warn')

export default {
  info,
  error,
  warn,
}
