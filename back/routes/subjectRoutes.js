const express = require('express')
const router = express.Router()
const subjectController = require("../controllers/subjectController")

router.route("")
    .post(subjectController.addSubject)
    .get(subjectController.getAllSubjects)
router.route("/:subjectId")
    .get(subjectController.getSubjectById)
    .patch(subjectController.updateSubject)
    .delete(subjectController.deleteSubject)
router.route("/getSubjects")
    .get(subjectController.getSubjectsByTeacher)

module.exports=router

