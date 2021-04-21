exports.writeStatus = (res, status, data) => {
  res.status(status).json(data)
}
