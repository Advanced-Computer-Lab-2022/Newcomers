const CorporateTrainee = require("../models/corperateTraineeModel");
const mongoose = require("mongoose");

// get all CorporateTrainees
const getCorporateTrainees = async (req, res) => {
	const corporateTrainees = await CorporateTrainee.find({}).sort({
		createdAt: -1,
	});

	res.status(200).json(corporateTrainees);
};

// get a single corporateTrainee
const getCorporateTrainee = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such corporate trainee" });
	}

	const corporateTrainee = await CorporateTrainee.findById(id);

	if (!corporateTrainee) {
		return res.status(404).json({ error: "No such corporate trainee" });
	}

	res.status(200).json(corporateTrainee);
};

// create a new corporate trainee
const createCorporateTrainee = async (req, res) => {
	const { username, password, email, country, courses } = req.body;

	// add to the database
	try {
		const corporateTrainee = await CorporateTrainee.create({
			username,
			password,
			email,
			country,
			courses,
		});
		res.status(200).json(corporateTrainee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a corporate trainee
const deleteCorporateTrainee = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	const corporateTrainee = await CorporateTrainee.findOneAndDelete({ _id: id });

	if (!corporateTrainee) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	res.status(200).json(corporateTrainee);
};

// update a corporate trainee
const updateCorporateTrainee = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	const corporateTrainee = await CorporateTrainee.findOneAndUpdate(
		{ _id: id },
		req.body,
		{
			new: true,
		}
	);

	if (!corporateTrainee) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	res.status(200).json(corporateTrainee);
};

module.exports = {
	getCorporateTrainees,
	getCorporateTrainee,
	createCorporateTrainee,
	deleteCorporateTrainee,
	updateCorporateTrainee,
};
