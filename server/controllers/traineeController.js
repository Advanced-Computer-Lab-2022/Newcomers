const Trainee = require("../models/traineeModel");
const mongoose = require("mongoose");
const Course = require("../models/courseModel");

// create a new trainee
const createTrainee = async (req, res) => {
	// add to the database
	try {
		const trainee = await Trainee.create(req.body);
		res.status(200).json(trainee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getTrainees = async (req, res) => {
	const trainees = await Trainee.find();

	res.status(200).json(trainees);
};

//get a trainee by id
const getTrainee = async (req, res) => {
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(404).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findById(traineeId);

	if (!trainee) {
		return res.status(404).json({ error: "No such trainee" });
	}

	res.status(200).json(trainee);
};

//update a trainee's data
const updateTrainee = async (req, res) => {
	// add to the database
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findOneAndUpdate(
		{ _id: traineeId },
		req.body,
		{
			new: true,
		}
	);

	if (!trainee) {
		return res.status(400).json({ error: "No such trainee" });
	}

	res.status(200).json(trainee);
};

//delete a trainee
const deleteTrainee = async (req, res) => {
	// add to the database
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findOneAndDelete({ _id: traineeId });

	if (!trainee) {
		return res.status(400).json({ error: "No such trainee" });
	}

	res.status(200).json(trainee);
};

// create a new trainee
const payCourse = async (req, res) => {
	// input: id of course and id of trainee and selected payment method.
	// the function should find course by id and get price, discount and exercises.
	// it should also get trainee by id, use the selected payment method and deduct the (price - discount * price).
	// it then create a new object:
	// {
	// 	course: { type: Schema.ObjectId, ref: "Course" },
	// 	exercises: [exerciseSchema],
	// 	// exercises: [[questions]]
	// },
	// the course attribute should be the id of the course to be able to reference it later.
	// the exercises should be the array of exercises of the course.
	// when a trainee chooses to solve an exercise, there should be a route that handles getting the specific exrercise by exercise id.
	// after solving the exercise, each question should get a grade and the total grade of the exercise should be calculated from summing up the grades of the questions.
	// the calculated grade should be saved in the recievedGrade.

	// add to the database
	try {
		const trainee = await Trainee.create(req.body);
		res.status(200).json(trainee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Subscribe a student to a course
const subscribeTraineeToCourse = async (traineeId, courseId) => {
	const course = await Course.findById(courseId);
	const trainee = await Trainee.findByIdAndUpdate(
		traineeId,
		{
			$push: {
				courses: {
					course: courseId,
					subtitles: course.subtitles,
					exam: course.exam,
				},
			},
		},
		{ new: true }
	);
	return trainee;
};

module.exports = {
	createTrainee,
	getTrainees,
	getTrainee,
	updateTrainee,
	deleteTrainee,
	subscribeTraineeToCourse,
};
