
//shell script 사용을 위함
var shell = require('shelljs')
 
shell.cd('./')
 
if(shell.exec('./gcode-cli file1.gcode').code !== 0) {
  shell.echo('Error: command failed')
  shell.exit(1)
}