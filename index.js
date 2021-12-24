const fsp = require('fs').promises;
const demoFileLocation = "D:/Steam/steamapps/common/Team Fortress 2/tf/demos/";
const killStreakIndexLocation = "_events.txt";
const re = /^\>\n[^\"]*\"([^\"]*)\"/gm;

(async () => {
    const readKillStreakIndex = await fsp.readFile(demoFileLocation + killStreakIndexLocation,'utf8');
    const killStreakIndex = await readKillStreakIndex.matchAll(re);
    console.log(killStreakIndex);
})();
