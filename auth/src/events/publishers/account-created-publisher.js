const { Publisher, Subjects } = require("@deanery-common/shared");

class AccountCreatedPublisher extends Publisher {
  subject = Subjects.AccountCreated;
}

module.exports = AccountCreatedPublisher;
