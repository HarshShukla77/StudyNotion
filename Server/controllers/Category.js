const Category = require("../models/Category");
const { create } = require("../models/User");

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "all fields are required",
                success: false
            })
        }

        //create entry in dp 
        constCategoryDetails = await Category.create({ name: name, description: description })

        return res.status(200).json({
            message: "Category created succesfully",
            success: true
        })
        return res.status(400).json({
            message: "password and confirm doest match",
            success: false
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

exports.showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true })

        return res.status(200).json({
            message: "got Category successfully",
            success: false
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false
        })
    }
}

exports.CategoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const { categoryId } = req.body;
        //get courses for specify actergoryID
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "data not found"
            })
        }
        //get coursefor diffrrent catgores
        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        }).populate("courses").exec();
        //get top selling course 
        //hw

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "faled to fetch details "
        });
    }
}