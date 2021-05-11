
exports.getBy = async (service, converter, params) => {
    const data = await service.getBy(params);
    return converter.fromDto(data);
}

exports.getById = async (service, converter, id) => {
    const data = await service.getById(id);
    return data ? converter.fromDto(data) : {};
}

exports.getAll = async (service, converter, args) => {
    const data = await service.getAll(args);
    return data ? exports.convertAll(data, converter) : exports.convertAll({}, converter)
}

exports.convertAll = async (data, converter) => {
    if (!Array.isArray(data.rows)) {
        throw "Data should be array";
    }
    return data.rows.map((item) => converter.fromDto(item))
}

exports.create = async (service, converter, args) => {
    const dataToDto = converter.toDto(args, 'create');
    const data = await service.create(dataToDto, 'create');
    return converter.fromDto(data);
}

exports.update = async (service, converter, args) => {
    const dataToDto = converter.toDto(args.data);
    const data = await service.update({value: dataToDto, options: args.options});
    return converter.fromDto(data);
}

exports.delete = async (service, id) => {
    return await service.delete(id);
}