import type { PartialTree, PartialTreeFile, PartialTreeFolder, PartialTreeFolderNode } from "@uppy/core/lib/Uppy"
import type { CompanionFile } from "@uppy/utils/lib/CompanionFile"

const afterScrollFolder = (
  oldPartialTree: PartialTree,
  currentFolderId: string | null,
  items: CompanionFile[],
  nextPagePath: string | null,
  validateSingleFile: (file: CompanionFile) => string | null,
) : PartialTree => {
  const currentFolder = oldPartialTree.find((i) => i.id === currentFolderId) as PartialTreeFolder

  let newFolders = items.filter((i) => i.isFolder === true)
  let newFiles = items.filter((i) => i.isFolder === false)

  // just doing `scrolledFolder.nextPagePath = ...` in a non-mutating way
  const scrolledFolder : PartialTreeFolder = { ...currentFolder, nextPagePath }
  const partialTreeWithUpdatedScrolledFolder = oldPartialTree.map((folder) =>
    folder.id === scrolledFolder.id ? scrolledFolder : folder
  )
  const isParentFolderChecked = scrolledFolder.type === 'folder' && scrolledFolder.status === 'checked'
  const folders : PartialTreeFolderNode[] = newFolders.map((folder) => ({
    type: 'folder',
    id: folder.requestPath,

    cached: false,
    nextPagePath: null,

    status: isParentFolderChecked ? 'checked' : 'unchecked',
    parentId: scrolledFolder.id,
    data: folder,
  }))
  const files : PartialTreeFile[] = newFiles.map((file) => {
    const restrictionError = validateSingleFile(file)
    return {
      type: 'file',
      id: file.requestPath,

      restrictionError,

      status: isParentFolderChecked && !restrictionError ? 'checked' : 'unchecked',
      parentId: scrolledFolder.id,
      data: file,
    }
  })

  const newPartialTree : PartialTree = [
    ...partialTreeWithUpdatedScrolledFolder,
    ...folders,
    ...files
  ]
  return newPartialTree
}

export default afterScrollFolder