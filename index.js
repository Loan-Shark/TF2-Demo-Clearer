const fileSystemPromises = require('fs').promises
const demoFileLocation = "D:/Steam/steamapps/common/Team Fortress 2/tf/demos/"
const eventsFile = "_events.txt"
const dateRegex = /^>[^"]*"([^"]*)/gm;

(async () => {
    try {
        const [files, streaksFile] = await Promise.all([
            fileSystemPromises.readdir(demoFileLocation),
            fileSystemPromises.readFile(demoFileLocation + eventsFile , 'utf8')
        ])

        files.splice(files.indexOf(eventsFile),1)
        
        const parsedStreaks = [...streaksFile.matchAll(dateRegex)].map(column => column[1])

        files.filter(file => parsedStreaks.includes(file.replace(/.(dem|json)/,'')))
            .map(file => fileSystemPromises.rm(demoFileLocation + file))
    } catch (err) { console.error(err) }
})()