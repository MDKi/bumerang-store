const newDateCheck = toleranceTime => date => {
  const now = new Date().toJSON();
  const toleranceTimeAgo = new Date(Date.now() - toleranceTime).toJSON();
  expect(date < now).toBe(true);
  expect(date > toleranceTimeAgo).toBe(true);
}

export default newDateCheck(5000);
