const express = require('express');
const router = express.Router();

const { getEntries, getEntry, createEntry, deleteEntry, updateEntry } = require('../controllers/diaryController');

router.delete('/:id', deleteEntry);
router.patch('/:id', updateEntry)
router.post('/', createEntry);
router.get('/:id', getEntry);
router.get('/', getEntries);

module.exports = router;