const cors = () => {
  return (req, res, next) => {
    if (req.get('Origin')) {
      res.setHeader('Access-Control-Allow-Origin', req.get('Origin'))
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Client-Id, X-Request-Id')
    }
    if (req.method === 'OPTIONS') {
      res.end()
      return
    }
    next()
  }
}

export default cors
