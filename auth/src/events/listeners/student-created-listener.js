const { Listener, Subjects, Roles } = require("@deanery-common/shared");
const User = require("../../models/User");
const queueGroupName = require("./queueGroupName");

class StudentCreatedListener extends Listener {
  subject = Subjects.StudentCreated;
  queueGroupName = queueGroupName;
  constructor(client) {
    // Call the super constructor before accessing 'this'
    super();

    this.client = client;
  }
  async onMessage(data, msg) {
    try {
      const studentId = data.userId;

      const user = await User.findById(studentId);
      user.roles = [Roles.Student];

      await user.save();
    } catch (error) {}

    msg.ack();
  }
}

module.exports = StudentCreatedListener;
