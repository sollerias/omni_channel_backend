const opts = {
  errorEventName: 'error',
  logDirectory: './file-test.log', // NOTE: folder must exist and be writable...
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD',
};
export default opts;
