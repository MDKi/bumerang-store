module.exports = {
  env: 'pi',
  db: 'mongodb://raspberrypi:27017/bumerang-store',
  port: process.env.PORT || 3000,
}
