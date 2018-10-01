const newDateCheck = toleranceTime => date => {
  const now = new Date().toJSON();
  const fiveSecondsAgo = new Date(Date.now() - toleranceTime).toJSON();
  expect(date < now).toBe(true);
  expect(date > fiveSecondsAgo).toBe(true);
}

module.exports = newDateCheck(5000);
