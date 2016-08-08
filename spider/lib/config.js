import path from 'path'


export default {
  sortTypes: ['downloads', 'stars', 'updated_at'],
  date: new Date(),
  pageLimit: 10,
  logFile: path.resolve(__dirname, '../../.log/log.txt'),
  cacheDir: path.resolve(__dirname, '../../.cache'),
}
