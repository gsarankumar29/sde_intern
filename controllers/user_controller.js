// const User = require('../models/user');

// module.exports.Profile = function(req,res){
//     return res.render('profile', {
//         title: 'Profile'
//     })
// }
// module.exports.signup = function(req, res){
//     if(req.isAuthenticated()){
//         return res.redirect('/');
//     }
//     return res.render('signup', {
//         title: "SignUp"
//     })
// }
// module.exports.signin = function(req,res){
//     if(req.isAuthenticated()){
//         return res.redirect('/');
//     }
//     return res.render('signin', {
//         title: "SignIn"
//     })
// }

// module.exports.create = function(req,res){
//     if(req.body.password != req.body.confirm_password){
//         console.log("Not matching passwords while signup");
//         return res.redirect('back');
//     }

//     User.findOne({email:req.body.email},function(err,user){
//         if(err){
//             console.log("Error in finding in databse")
//             return;
//         }

//         if(!user){
//             User.create(req.body,function(err,user){
//                 if(err){
//                     console.log("Error in creating");
//                     return;
//                 }
//                 console.log("Created User in database for signup");
//                 return res.redirect('/users/signin');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     })
// }

// module.exports.createsession = function(req,res){
//     return res.redirect('/');
// }

// module.exports.destroysession = function(req,res){
//     req.logout(req.user, err => {
//         if(err) return next(err);
//         res.redirect("/");
//     });
// }

const User = require('../models/user');

module.exports.Profile = function(req, res) {
    return res.render('profile', {
        title: 'Profile'
    });
};

module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/sign');
    }
    return res.render('signup', {
        title: "SignUp"
    });
};

module.exports.signin = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signin', {
        title: "SignIn"
    });
};

// module.exports.create = function(req, res) {
//     if (req.body.password !== req.body.confirm_password) {
//         console.log("Passwords do not match during signup");
//         return res.redirect('back');
//     }

//     User.findOne({ email: req.body.email }, function(err, user) {
//         if (err) {
//             console.log("Error in finding user in database: ", err);
//             return res.redirect('back');
//         }

//         if (!user) {
//             User.create(req.body, function(err, user) {
//                 if (err) {
//                     console.log("Error in creating user: ", err);
//                     return res.redirect('back');
//                 }
//                 console.log("User created successfully in database");
//                 return res.redirect('/users/signin');
//             });
//         } else {
//             console.log("User already exists");
//             return res.redirect('back');
//         }
//     });
// };

module.exports.create = function(req, res) {
    const { username, email, password, confirm_password } = req.body;

    // Validate required fields
    if (!username || !email || !password || !confirm_password) {
        console.log("Missing required fields during signup");
        return res.redirect('back');
    }

    if (password !== confirm_password) {
        console.log("Passwords do not match during signup");
        return res.redirect('back');
    }

    // Check if the user with the given email or username already exists
    User.findOne({ $or: [{ email: email }, { username: username }] }, function(err, user) {
        if (err) {
            console.log("Error in finding user in database: ", err);
            return res.redirect('back');
        }

        if (!user) {
            // If user does not exist, create a new user
            User.create(req.body, function(err, newUser) {
                if (err) {
                    console.log("Error in creating user: ", err);
                    return res.redirect('back');
                }
                console.log("User created successfully in database");
                return res.redirect('/users/signin');
            });
        } else {
            console.log("User already exists with this email or username");
            return res.redirect('back');
        }
    });
};



module.exports.createsession = function(req, res) {
    return res.redirect('/');
};

module.exports.destroysession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
