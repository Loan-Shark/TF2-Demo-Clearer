const fsp = require('fs').promises;
const demoFileLocation = "D:/Steam/steamapps/common/Team Fortress 2/tf/demos/";
const eventsFile = "_events.txt";
const re = /^>[^"]*"([^"]*)/gm;

(async () => {
    try {
        const [files , streakIndex] = await Promise.all([
            fsp.readdir(demoFileLocation),
            fsp.readFile(demoFileLocation + eventsFile , 'utf8')
        ]);
        const parsedStreaks = [...streakIndex.matchAll(re)].map(column => column[1]);
        for (const file of files)
            if (!parsedStreaks.includes(file.replace(/.(dem|json)/,'')) && file != '_events.txt')
                fsp.rm(demoFileLocation + file);
    } catch (err) {
        console.error(err);
    }
})();