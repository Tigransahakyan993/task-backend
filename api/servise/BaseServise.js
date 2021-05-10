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

  getBy(params) {
    return this.Model.findOne(params)
  }

  create(values) {
    return this.Model.create(values)
  }

  update(values, options) {
    return this.Model.update(values, options)
  }

  delete(id) {
    const options = {where: {id}}
    return this.Model.destroy(options)
  }
}

module.exports = BaseService;