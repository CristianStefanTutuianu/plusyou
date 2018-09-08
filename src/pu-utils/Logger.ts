let date = require('date-and-time');

export default class Logger {
  private classType: string;

  public constructor(classType: string) {
    this.classType = classType;
  }

  public info(message: string) {
    console.log(this.getLogTimeMs() + this.classType + ": " + message);
  }

  public log(message: string) {
    console.log('\x1b[36m%s\x1b[0m', this.getLogTimeMs() + this.classType + ": " + message);
  }

  public warn(message: string) {
    console.log('\x1b[33m%s\x1b[0m', this.getLogTimeMs() + this.classType + ": " + message);
  }

  public error(message: string, error?: Error) {
    console.log('\x1b[31m%s\x1b[0m', this.getLogTimeMs() + this.classType + ": " + message + " " + error);
  }

  private getLogTimeMs() {
    const now = new Date();
    const logTime = "[" + date.format(now, 'YYYY/MM/DD HH:mm:ss:SSS').slice(0,22) + "ms] "; 

    return logTime;
  }
}
