const subject = require("../models/subject");

const SubjectDb = require("../models").Subject

const subjectController = {
    getAllSubjects: async (req, res) => {
        try {
            let subjects = await SubjectDb.findAll()
            if (!subjects.length) {
                return res.status(404).send("No subjects existing yet!");
            } 
            return res.status(200).send(subjects)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    getSubjectById: async (req, res) => {
        let subjectId = req.params.subjectId
        try {
            let subject = await SubjectDb.findOne({ where: { subjectId } })
            if (!subject) {
                return res.status(404).send({message:"Subject does not exist"})
             }
            return res.status(200).send(subject)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
        
    },
    addSubject: async (req, res) => {
        try {
            let {
                name,typeOfSubject,teacherId
            } = req.body
            let subject = await SubjectDb.create({ ...req.body})
            return res.status(201).send({ message: "subject created", subject })
        } catch (err) {
            console.log(err)
            return res.status(500).send({ message: "Server error!" });
        }
    },
    updateSubject: async (req, res) => {
        try {
            let { subjectId } = req.params
            if (!subjectId) {
                return res.status(400).send("provide a subjectid")
            }
            let subject = await SubjectDb.findByPk(subjectId)
            if (!subject) {
                return res.status(404).send("subject does not exist")
            }
            await subject.update({ ...req.body })
            subject = await subject.save()
            return res.status(200).send({ message: "subject updated" }, subject)
        } catch {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    deleteSubject: async (req, res) => {
        let { subjectId } = req.params;
        try {
            let subject = await SubjectDb.findByPk(subjectId);
            if (!subject) {
                return res.status(404).send({ message: `subject does not exist` });
            }
            await subject.destroy();
            return res.status(200).send("subject deleted");
        } catch (err) {
            return res.status(500).send({ message: "Server Error!" });
        }
    },
    getSubjectsByTeacher: async (req, res) => {
        try {
            console.log(req.user)
            let subjects = await SubjectDb.findAll({where:{teacherId:req.user}})
            if (!subjects.length) {
                return res.status(404).send(`No subjects existing for teacher`);
            } 
            return res.status(200).send(subjects)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
    }
}

module.exports = subjectController
