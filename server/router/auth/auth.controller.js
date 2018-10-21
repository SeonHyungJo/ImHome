var Users = require('../../models/users');
var jwt = require('jsonwebtoken');

/*
    POST /api/login
    {
        id,
        password
    }
*/

exports.login = (req, res) => {
    const {id, password} = req.body
    const secret = req.app.get('jwt-secret')
    // check the user info & generate the jwt
    // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            id: user.id,
                            username: user.username,
                            branchCode : user.branchCode,
                            admin: user.admin || "false"
                        }, 
                        secret, 
                        {
                            expiresIn: '60s',
                            issuer: 'imhome.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    Users.findOneById(id)
    .then(check)
    .then(respond)
    .catch(onError)
}