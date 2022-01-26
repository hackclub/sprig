// In game-lab, a game is called a 'cartridge'. you can save the content of your
// editor to a cartridge, download someone else's cartridge, etc.

import { latestEngineVersion } from "./github.js"

// import { md5 } from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.min.js"
// in a more perfect world i understand js imports enought to actually import this correctly. this world is not that world...
// TODO
import md5 from "https://cdn.skypack.dev/md5"

const DEFAULT_CARTRIDGE = '26adf4e5d670589fac5418b76c92d930'

class Cartridge {
  constructor({id=null, previousID=null, content="", engineVersion=null}={}) {
    this.content = content
    this.previousID = previousID || id || DEFAULT_CARTRIDGE
    this.initialID = id || DEFAULT_CARTRIDGE
    this.needsToInitialize = id != null
    this.engineVersion = engineVersion
    this.projectType = "game-lab"
    
    this.initialize()
  }

  async initialize() {
    if (this.previousID) {
      await this.download()
    }
    if (!this.engineVersion) {
      this.engineVersion = await latestEngineVersion()
    }
    return this
  }

  async getEngineVersion() {
    return this.engineVersion || await latestEngineVersion()
  }

  async id() {
    // an md5 of the whole project, that DOES NOT INCLUDE ID
    return md5(JSON.stringify(await this.serialize(false)))
  }

  async generateUploadURL() {
    const result = await fetch(`https://vt4x133ukg.execute-api.eu-west-1.amazonaws.com/default/getPresignedURL?id=${await this.id()}`).then(r => r.json())

    // { exists, uploadURL, jsonFilename, id }
    return result
  }

  async generateDownloadURL() {
    return `https://project-bucket-hackclub.s3.eu-west-1.amazonaws.com/${this.initialID || await this.id()}.json`
  }

  async shareLink(id = this.id()) {
    return `${window.location}?id=${await id}`
  }

  async serialize(includeID = false) {
    return {
      previousID: this.previousID,
      id: includeID ? await this.id() : undefined,
      name: this.name,
      content: this.content,
      engineVersion: await this.getEngineVersion(),
    }
  }

  async upload() {
    try {
      const { exists, uploadURL, _jsonFilename, _id } = await this.generateUploadURL()

      if (exists == true) {
        // the file already exists on s3, skip uploading
        return this
      }
      await fetch(uploadURL, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(await this.serialize(true))
      }).then(r => r.json())
    } finally {
      return this
    }
  }

  async getPrevious() {
    return new Cartridge({id: this.previousID})
  }

  async download() {
    const json = await fetch(await this.generateDownloadURL(), { mode: 'cors' }).then(r => r.json())

    this.content = json.content
    this.previousID = json.id
    this.engineVersion = json.engineVersion

    return this
  }
}

export { Cartridge }