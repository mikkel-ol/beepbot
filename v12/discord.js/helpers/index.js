const fs = global.fs;

class HelperDispatcher {
    constructor() {
        this.helpers = fs.getFilesFullPath('/discord.js/helpers/handlers/');
    }

    attach() {
        this.helpers.forEach((helperFile) => {
            const Helper = require(helperFile);

            const helper = new Helper();

            const helperName = fs.getFileName(helperFile);

            global[helperName] = helper;
        });
    }
}

module.exports = HelperDispatcher;
