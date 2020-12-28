module.exports = function lastModified(schema, options) {
  schema.add({
    lastModified: Date
  })
  schema.pre('save', function(next) {
    this.lastModified = new Date()
    next()
  })
}