const Item = require("../models/itemsModel");

exports.getItems = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort_by = "price", sort_order = "asc" } = req.query;

        //converting into int
        page = parseInt(page);
        
        limit = parseInt(limit);
        console.log("limit we r getting :",limit);
        sort_order = sort_order === "desc" ? -1 : 1; // converting to mongoi db formate

        const totalItems = await Item.countDocuments();

        const items = await Item.aggregate([
            { $sort: { [sort_by]: sort_order } }, // sorting based on field
            { $skip: (page - 1) * limit }, // skipping documents for pagination
            { $limit: limit } // limmiting documents per page
        ]);

        console.log("itemns we have:", items)

        res.status(200).json({
            message: "Items fetched successfully",
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            items,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
