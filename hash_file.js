var fs = require('fs')

var hash_file = function(fileName, method, callback) {
  // method is optional
  if (arguments.length == 2 && typeof method == 'function') {
    callback = method
    method = 'md5'
  }

  switch (method) {
    case 'md4':
    case 'md5':
    case 'sha1':
    case 'sha256':
      break
    default:
      var err = new Error('unsupported method:' + method)
      if (callback)
        return callback(err)
      throw err
  }


var shasum = require('crypto').createHash(method)

function end () {
  var digest = shasum.digest('hex')
  if (callback)
    callback(null, digest)
  return digest
}

// passed in a Buffer, not a filename
if (Buffer.isBuffer(fileName)) {
  shasum.update(fileName)
  return end()
}

if (typeof callback != 'function')
  throw new Error('must supply a callback function')

var stream = fs.ReadStream(fileName, {
  bufferSize: 4024 * 1024
})

stream.on('data', function(data) {
  shasum.update(data)
})

  stream.on('error', function(err) {
    callback(err)
  })

  stream.on('end', end)
}

module.exports = hash_file
