const Employee = require('./models/Employee');
const User = require('./models/User');

const seedDatabase = async () => {
  const empCount = await Employee.countDocuments();
  console.log("Current Employee count:", Employee,empCount);
  if (empCount === 0) {
    console.log("🌱 Seeding Employees...");
    const dummyData = [];
    for (let i = 1; i <= 50; i++) {
      dummyData.push({
        name: `Employee ${i}`,
        role: i % 5 === 0 ? 'ADMIN' : 'EMPLOYEE',
        age: 20 + (i % 30),
        class: ['10A', '10B', '11A'][i % 3],
        subjects: ['Math', 'Physics', 'CS'].slice(0, (i % 3) + 1),
        attendance: { percentage: 60 + (i % 40) },
        email: `emp${i}@company.com`,
        phone: `+1 555-01${i}`
      });
    }
    await Employee.insertMany(dummyData);
    console.log("✅ Employees Seeded!");
  }

  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log("🌱 Seeding Users...");
    await User.create({ username: "admin", password: "admin123", role: "ADMIN" });
    await User.create({ username: "employee", password: "employee123", role: "EMPLOYEE" });
    console.log("✅ Users Seeded!");
  }
};

module.exports = seedDatabase;
