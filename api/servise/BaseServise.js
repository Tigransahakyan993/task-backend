class BaseService {
  constructor(Model) {
    this.Model = Model
  }

  getAll(options) {
    return this.Model.findAndCountAll({
      ...options
    })
  }

  getById(id) {
    return this.Model.findByPk(id)
  }

  create(values) {
    return this.Model.create(values)
  }

  update(values, options) {
    return this.Model.update(values, options)
  }

  delete(options) {
    return this.Model.destroy(options)
  }
}

module.exports = BaseService;