import Account from '../models/account'
import Farm from '../models/farm'

exports.CheckEmailExist = async (req, res) => {
    console.log('CheckEmailExist called');
    //attempt to search for accounts registered with this email
    const email = req.body.params.email;
    await Account.find({ email: email }, (err, accounts) => {
        if(err)
        {
            console.log(err);
            res.status(403).send(
                {
                    msg: 'error'
                }
            );
        }
        else
        {
            var msg;
            if(accounts.length)
            {
                msg = 'email has been registered!';
            }
            else
            {
                msg = 'not exist';
            }
            res.status(200).send(
                {
                    msg: msg
                }
            );
        }
    });
};

exports.CheckUserExist = async (req, res) => {
    console.log('CheckUserExist called');
    const username = req.body.params.username;
    await Account.find({ accountName: username }, (err, accounts) => {
        if(err)
        {
            console.log(err);
            res.status(403).send(
                {
                    msg: 'error'
                }
            )
        }
        else
        {
            var msg;
            if(accounts.length)
            {
                msg = 'User exists';
            }
            else
            {
                msg = 'not exist';
            }
            res.status(200).send(
                {
                    msg: msg
                }
            );
        }
    });
};

exports.GetFriendList = async (req, res) => {
    console.log('GetFriendList called');
    const username = req.body.params.username;
    await Account.find({ accountName: username }, (err, accounts) => {
        if(err || accounts.length !== 1)
        {
            if(err)
            {
                console.log(err);
            }
            else if(accounts.length === 0)
            {
                console.log('Account not found');
            }
            else
            {
                console.log('Multiple accounts found');
            }
            res.status(403).send(
                {
                    msg: 'error'
                }
            )
        }
        else if(accounts.length === 1)
        {
            res.status(200).send(
                {
                    msg: 'success',
                    friendList: accounts[0].friends
                }
            )
        }
    })
};

exports.CreateUser = async (req, res) => {
    console.log('CreateUser called')
    console.log(req.body.params);
    const email = req.body.params.email;
    const username = req.body.params.username;
    const hashValue = req.body.params.hashValue;
    const account = new Account(
        {
            accountName: username,
            accountHash: hashValue,
            email: email,
            friends: []
        }
    );
    account.save((err) => {
        if(err)
        {
            // console.log(err);
        }
        else
        {
            res.status(200).send(
                {
                    msg: 'success'
                }
            )
        }
    })
};