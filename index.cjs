const {IdenticalFilesFinder} = require("./src/identical-files-finder.cjs")
const identicalFilesFinder = new IdenticalFilesFinder()

identicalFilesFinder.scan("/Users/kaspernj/Dropbox").then(() => {
  const duplicates = identicalFilesFinder.duplicates()

  console.log(duplicates)
})
