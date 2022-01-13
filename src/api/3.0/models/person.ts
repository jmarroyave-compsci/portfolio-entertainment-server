import mongoose from 'mongoose';

const Person = new mongoose.Schema({
	_id: String,
	name: { type: String, required: true},
	birthYear: Number,
	deathYear: Number,
	profession: [ String ],
	awards: [ {  
		festival: { type: String, ref: 'festival' }, 
		year: Number,
		category: String,
		won: Boolean,
		film: String,
	} ], 
	directed: [{
		id: { type: String, ref: 'entity' }, 
	}], 
	produced: [{
		id: { type: String, ref: 'entity' }, 
	}], 
	wrote: [{
		id: { type: String, ref: 'entity' }, 
	}], 
	acted: [{
		id: { type: String, ref: 'entity' },
		as: String, 
	}], 
	crew: [{
		id: { type: String, ref: 'entity' },
		cat: String,
		job: String,
		as: String, 
	}], 
	directedTo: [{
		p: { type: String, ref: 'person' },
		n: Number, 
	}], 
	directedBy: [{
		p: { type: String, ref: 'person' },
		n: Number, 
	}], 
	actedWith: [{
		p: { type: String, ref: 'person' },
		n: Number, 
	}], 
}, { 
	collection: 'person',
	timestamps: false,
})


export default mongoose.model("person", Person);