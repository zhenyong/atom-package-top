/**
 * since fs.appendFile is async, here maybe happen:
 *
 * ```
 * fs.appendFile('a.txt', '1')
 * fs.appendFile('a.txt', '2')
 * fs.appendFile('a.txt', '3')
 * ```
 * then `a.txt` at last append `132`
 *
 * Here provide new appendFile method and guarantee
 * that writing order is always follow calling ones.
 *
 * Btw, since it use queue to write baches,
 * it can reduce writing times.
 *
 * note: first time append use writeFile that
 * means it cover original
 *
 */
import fs from 'fs'
import os from 'os'

const queueMap = Object.create(null)
const pendingMap = Object.create(null)
let method = (...args) => {
  method = fs.appendFile
  return fs.writeFile(...args)
}

const flush = (filePath) => {
  let lines
  const queue = queueMap[filePath]
  if (queue && queue.length) {
    lines = queue.join(os.EOL) + os.EOL
    pendingMap[filePath] = true
    method(filePath, lines, (err) => {
      pendingMap[filePath] = false
      if (err) {
        // TODO
        return
      }
      flush(filePath)
    })
    queueMap[filePath] = []
  }
}

export default function appendFile(filePath, line) {
  const queue = queueMap[filePath] || (queueMap[filePath] = [])
  queue.push(line)
  if (!pendingMap[filePath]) {
    flush(filePath)
  }
}
