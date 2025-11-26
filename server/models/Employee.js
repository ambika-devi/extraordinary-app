const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  age: Number,
  class: String,
  subjects: [String],
  attendance: { percentage: Number },
  email: String,
  phone: String
});

module.exports = mongoose.model('EmployeeData', EmployeeSchema);
