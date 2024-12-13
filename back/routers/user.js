const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multers");
const User = require("../model/user");

router.post("/", upload.single("image"), async(req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        let user = new User({
            name: req.body.name,
            company: req.body.company,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            zip: req.body.zip,
            state: req.body.state,
            phone: req.body.phone,
            photo: req.body.photo,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        });
        await user.save();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

router.get("/", async(req, res) => {
    try{
        let user = await User.find();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

router.delete("/:id", async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        await cloudinary.uploader.destory(user.cloudinary_id);
        await user.deleteOne();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

router.put("/:id", upload.single("image"),async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        await cloudinary.uploader.destory(user.cloudinary_id);
        let result;
        if(req.file){
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            name: req.body.name || user.name,
            company: req.body.company || user.company,
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            address: req.body.address || user.address,
            zip: req.body.zip || user.zip,
            state: req.body.state || user.state,
            phone: req.body.phone || user.phone,
            photo: req.body.photo || user.photo,
            avatar: result?.secure_url || user.avatar,
            cloudinary_id: result?.public_id || user.cloudinary_id,
        };
        user = await User.findByIdAndUpdate(req.params.id, data, {new: true});
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

router.get("/id:", async(req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;