import { listFiles } from "../files"

//checks for files in localStorage and gets if present, if not gets it from files.js
export const getFiles = async () => {
  if (localStorage.getItem('files')) {
    const files = JSON.parse(localStorage.getItem('files'))
    return files.map(file => {
      return new File([file.text], file.name, {
        lastModified: file.lastModified,
        type: file.type
      })
    })
  } else {
    const files = listFiles()
    const toStorage = Promise.all(files.map(file => {
      return (async () => {
        return {
          lastModified: file.lastModified,
          name: file.name,
          text: await file.text(),
          type: file.type
        }
      })()
    }))
    localStorage.setItem('files', JSON.stringify(await toStorage))
    return files
  }
}


//deletes files by matching index with the active file from localStorage  
export const deleteFile = (file, files, del, setDel) => {

  const index = files.findIndex(f => {
    return f.name === file.name
  })
  files.splice(index, 1)
  const localStorateFiles = JSON.parse(localStorage.getItem('files'))
  localStorateFiles.splice(index, 1)
  localStorage.setItem('files', JSON.stringify(localStorateFiles))
  setDel(!del)
}

//saves the file to localStorage
export const write = (file, value, files) => {
  console.log('Writing soon... ', file)

  // TODO: Write the file to the `files` array
  const index = files.findIndex(f => {
    return f.name === file.name
  })
  files[index] = new File([value], file.name, { lastModified: new Date(), type: file.type })
  const localStorateFiles = JSON.parse(localStorage.getItem('files'))
  localStorateFiles[index].text = value
  localStorateFiles[index].lastModified = Date.now()
  localStorage.setItem('files', JSON.stringify(localStorateFiles))
}