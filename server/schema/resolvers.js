// schema/resolvers.js
const Employee = require('../models/Employee');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    getEmployees: async (_, { page = 1, limit = 10 }) => {
      const skip = (page - 1) * limit;

      const totalCount = await Employee.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);

      const employees = await Employee.find()
        .skip(skip)
        .limit(limit);

      const mappedEmployees = employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        role: emp.role,
        age: emp.age,
        class: emp.class,
        subjects: emp.subjects,
        attendance: emp.attendance,
        email: emp.email,
        phone: emp.phone
      }));

      return {
        employees: mappedEmployees,
        totalCount,
        totalPages
      };
    }
  },

  Mutation: {
    signup: async (_, { username, password, role }) => {
  const exists = await User.findOne({ username });
  if (exists) throw new Error("User already exists");

  const user = new User({
    username,
    password,
    role: role || "EMPLOYEE"
  });

  await user.save();

  return {
    id: user._id.toString(),
    username: user.username,
    role: user.role
  };
},


    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      // password comparison via bcrypt
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Incorrect password");

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          role: user.role
        }
      };
    },

    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted";
    },

    updateEmployee: async (_, args) => {
      const { id, ...updateData } = args;
      const updated = await Employee.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) throw new Error("Employee not found");

      return {
        id: updated._id.toString(),
        ...updated._doc
      };
    }
  }
};

module.exports = resolvers;
