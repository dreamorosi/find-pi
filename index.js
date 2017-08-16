const execa = require('execa')

// Format result string by extracting IP address between ( )
const formatResult = string => {
  let startPos = string.indexOf('(')
  let endPos = string.indexOf(')')
  return string.substring(startPos + 1, endPos)
}

// Execute command and return result
module.exports = () => execa.shell('arp -na | grep -i B8:27:EB')
  .then(res => formatResult(res.stdout))
  .catch(() => 'No Rasperry Pi found on the local network')
