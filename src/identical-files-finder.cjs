const {digg} = require("@kaspernj/object-digger")
const fs = require("fs").promises
const path = require("path")

class IdenticalFilesFinder {
  constructor() {
    this.files = {}
  }

  async scan(pathToScan) {
    const files = await fs.readdir(pathToScan)

    for (const file of files) {
      const fullPath = `${pathToScan}/${file}`
      const stat = await fs.lstat(fullPath)

      if (stat.isDirectory()) {
        this.scan(fullPath)
      } else {
        const ext = path.extname(file).toLowerCase()
        const size = digg(stat, "size")

        if (!this.files[ext]) this.files[ext] = {}
        if (!this.files[ext][size]) this.files[ext][size] = []

        this.files[ext][size].push(fullPath)
      }
    }
  }

  duplicates() {
    const duplicates = []

    for (const ext in this.files) {
      for (const size in this.files[ext]) {
        const files = digg(this, "files", ext, size)

        if (files.length >= 2) {
          duplicates.push(files)
        }
      }
    }

    return duplicates
  }
}

module.exports = {
  IdenticalFilesFinder
}