import * as graphStore from "../projectApi/graphApi/graphdb"
import * as docStore from '../projectApi/documentApi/mongodb'

interface IWriteCommands {
    [x: string]: IValue
}

interface IValue {
    done: any,
    undoArgs: any[]
}

async function undoDatabaseActions(writeCommands: IWriteCommands) {
    try {
        for (const [key, value] of Object.entries(writeCommands)) {
            if (writeCommands[key]) {
                console.log("reversing", key)
                await reverseActions[key](...value.undoArgs)
            }
        }
    } catch (error) {
        error.message = (`Unable to undo all the changes made previously; ${error.message}`)
        throw error
    }
}

const reverseActions = {
    createProjectRepository: graphStore.deleteRepository,
    createProjectMetadata: graphStore.deleteNamedGraph,
    createProjectAcl: graphStore.deleteNamedGraph,
    createProjectDoc: docStore.deleteProjectDoc,
    saveProjectToUser: docStore.deleteProjectFromUser,
    deleteProjectDoc: docStore.createProjectDoc,
    deleteProjectFromUser: docStore.saveProjectToUser
}

export default undoDatabaseActions