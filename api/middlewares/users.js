const jwt = require('jsonwebtoken');

const isValid = (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({error:'Access denied'})
    }

    const valid = jwt.verify(token, 'chat-cice')
    if(!valid){
        return res.json({error: 'Access denied'})
    }

    next()
}



module.exports = {
    isValid
}