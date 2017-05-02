function validateMiddleware() {
  return (req, res, next) => {
    console.log('VALIDATE MIDDLEWARE ', req.url)
    next()
  }
}

export { validateMiddleware }