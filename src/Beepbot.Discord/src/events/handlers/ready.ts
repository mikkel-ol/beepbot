import Logger from '../../common/logger';

class ReadyHandler {
  static subscribe() {
    Logger.getInstance().success('Beep Bot - fired up and ready to serve!');
  }
}

export default ReadyHandler;
