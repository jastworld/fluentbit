var winston = require('winston');
var fs = require( 'fs' );
var path = require('path');
var logDir = 'log'; // directory path you want to set
if ( !fs.existsSync( logDir ) ) {
    fs.mkdirSync( logDir );
}
const infolog = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'info.log'), level: 'info' })
  ]
});

const errlog = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [ new winston.transports.File({ filename: path.join(logDir,'error.log'), level: 'error' }) ]
});


(function repeatMe() {
  setTimeout(() => {
    infolog.log("info",`${Date.now()} is a great time to work`);
    errlog.log("error","Tayo placed this in error")
    repeatMe();
  }, 10000)
})();