const Diary = require("../models/diary");

const getEntries = async (req, res) => {
    try {
        let entries = await Diary.find({ userId: req.user });
        res.status(200).json(entries);
    } catch (error) {
        console.log(error);
        res.status(400).json({ "error": "Couldn't Get The Data" });
    }
}

const getEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Diary.findOne({ _id: id, userId: req.user });
        res.status(200).json(entry);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const createEntry = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Diary.create({ title, description, userId: req.user });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Couldn't Create Note in DB" });
    }
}

const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await Diary.findOneAndUpdate({ _id: id, userId: req.user }, {
            title, description, updatedAt: Date.now()
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ "error": "Couldn't Update the note" });
    }
}

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Diary.findOneAndDelete({ _id: id, userId: req.user });
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 'failure' });
    }
}

module.exports = { getEntries, getEntry, createEntry, updateEntry, deleteEntry };