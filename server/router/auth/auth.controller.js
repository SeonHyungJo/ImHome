var Users = require('../../models/users');
var jwt = require('jsonwebtoken');


/*
    POST /api/register
    {
        id,
        password
    }
*/
exports.register = (req, res) => {
    const { id } = req.body

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('id exists');
        } else {
            return Users.create(req.body);
        }
    }

    // respond to the client
    const respond = () => {
        res.status(200).json({
            message: 'registered successfully',
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    Users.findOneById(id)
    .then(create)
    .then(respond)
    .catch(onError)
}

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

    console.log(secret);

    // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            console.log(user);
            if(user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            id: user.id,
                            username: user.username,
                            branchCode : user.branchCode,
                            admin: user.checkAdmin || "false"
                        }, 
                        secret, 
                        {
                            expiresIn: '5m',
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
            imhomeToken : token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    Users.findOne(id)
    .then(check)
    .then(respond)
    .catch(onError)
}

/*
    GET /api/check
*/
exports.check = (req, res) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
}