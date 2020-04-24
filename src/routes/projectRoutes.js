const express = require('express');
const router = express.Router();
const multer = require('multer')

const {
    getAllProjects,
    createProject,
    getOneProject,
    updateProject,
    deleteProject,
    queryProject,
    uploadDocumentToProject,
    getDocumentFromProject
} = require('../projectApi')

const { authenticate } = require('../authApi')


const upload = multer({
    limits: {
        fileSize: 10000000
    }
})

router.get('/', authenticate, getAllProjects)
router.post('/', authenticate, createProject)

router.get('/:id', authenticate, getOneProject)
router.get('/:id/query', authenticate, queryProject)

router.put('/:id', authenticate, updateProject)
router.patch('/:id', authenticate, updateProject)
router.post('/:id', authenticate, updateProject)
router.delete('/:id', authenticate, deleteProject)

router.post('/upload/:id/', authenticate, upload.single('file'), uploadDocumentToProject)
router.get('/:id/files/:fileId/', authenticate, upload.single('file'), getDocumentFromProject)

module.exports = router;