const express = require('express');
const User = require('../models/user');
const router = express.Router();

//handle Register
router.post('/register', async (req, res) => {
     User.findOne({ email: req.body.email }).then(async result => {
        if (!result) {
    const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        id: req.body.username,
    })

    try {
        const dataToSave = await newUser.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}
else {
    res.status(400).json({ message: 'User already exists!' })
};
    });
})

//Handle Login
router.post('/login', async (req, res) => {
    const query = { username: req.body.username, password: req.body.password };
    User.find(query).then(async result => {
        if (!result) { // user not found
        
            res.status(400).json({ message: !result })
        
        }
        else {
            res.status(200).json({ message: result })
        };
      
    });
})


//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;