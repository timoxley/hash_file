var fs = require('fs')

/// Buffering Version ///
var sha1_file_buffered = function(fileName, callback) {
  require('fs').readFile(fileName, function(err, data){
    if (err) { return callback(err) }
    var sha1 = require('crypto').createHash('sha1')
    var update = sha1.update(data)
    var digest = update.digest('hex')
    callback(null, digest)
  })
}

/// Non-buffering Version ///
var sha1_file = function(fileName, callback) {

  var sha1 = require('crypto').createHash('sha1')

  fs.stat(fileName, function(err, stats) {
		if (err) {
			return callback(err)
		}
    fs.open(fileName, 'r', 666 , function(err, fd) {
  		if (err) {
  			return callback(err)
  		}

		  var read_len = 1024 * 1024 || stats.blksize, offset = 0
      var data = new Buffer(read_len)

			var do_read = function() {
				fs.read(fd, data, 0, read_len, offset, function(err, readlen) {
  				if (err) {
  					return cb(err)
  				}
  				sha1.update(data)

  				offset += read_len

  				//less than blksize bytes left
  				if (read_len > stats.size - offset && offset < stats.size) {
  					read_len = stats.size - offset
  					data = new Buffer(read_len)
  				}
				
  				if(offset >= stats.size) {
            //read complete
  					fs.closeSync(fd)
  					//Close and go home
  					var digest = sha1.digest('hex')
  					return callback(null, digest)
  				}
          do_read()
        })
      }
      do_read()
    })
  })
}

module.exports = sha1_file
module.exports.buffered = sha1_file_buffered
