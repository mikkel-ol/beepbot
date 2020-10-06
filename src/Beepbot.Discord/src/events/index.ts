import * as Discord from 'discord.js';
import Fs from '../common/fs';

class Events {
  static attach(bot: Discord.Client) {
    const handlers = Fs.getFilesFullPath('events/handlers');

    handlers.forEach((handlerFile) => {
      const handler = require(handlerFile).default;
      handler.subscribe(bot);
    });
  }
}

export default Events;
