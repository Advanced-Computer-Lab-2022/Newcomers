const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
	rating: Number,
	review: String,
	trainee: Schema.ObjectId, //Reference trainee.
});

const exerciseSchema = new Schema({
	number: Number,
	title: String,
	questions: [{ question: String, grade: Number }],
});

const reportSchema = new Schema({
	title: String,
	type: {
		type: String,
		required: true,
		enum: ["Technical", "Financial", "Other"],
	},
	resolved: { type: Boolean, default: false },
	seen: { type: Boolean, default: false },
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		// Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
		// will look at the `onModel` property to find the right model.
		refPath: "reports.traineeType",
	},
	traineeType: {
		type: String,
		required: true,
		enum: ["Trainee", "CorprateTrainee"],
	},
});

function calculatePopularity(ratings) {
	this.popularity = ratings.length;
	return ratings;
}

const courseSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subjects: {
			type: [String],
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		originalPrice: {
			type: Number,
			required: true,
			set: (originalPrice) => {
				this.price = this.originalPrice - (this.originalPrice * this.discount) / 100;
				return originalPrice;
			},
		},
		price: Number,
		discount: {
			type: Number,
			required: false,
			set: (discount) => {
				this.price = this.originalPrice - (this.originalPrice * this.discount) / 100;
				return discount;
			},
		},
		totalHours: {
			type: Number,
			required: true,
		},
		previewVid: {
			type: String,
			required: true,
		},
		instructors: {
			type: [{ type: Schema.ObjectId, ref: "Instructor" }],
			required: true,
		},
		subtitle: {
			type: [String],
			required: true,
		},
		vids: {
			type: [String],
			required: false,
		},
		rating: Number,
		reviews: {
			type: [ratingSchema],
			required: false,
			set: calculatePopularity,
		},
		exercises: {
			type: [exerciseSchema],
			required: false,
		},
		reports: {
			type: [reportSchema],
			required: false,
		},
		popularity: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
