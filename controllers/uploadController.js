const csv = require("csv-parser");
const { Readable } = require("stream");//importing 


exports.uploadCSV = async (req, res) => {
    try {
        //we will take the file if uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        const results = [];
        const fileStream = Readable.from(req.file.buffer.toString()); // converting buffer to stream

        fileStream.pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                if (results.length === 0) {
                    return res.status(400).json({ message: "CSV file is empty!" });
                }

                const numRows = results.length;
                const numColumns = Object.keys(results[0]).length;

                res.status(200).json({
                    message: "File processed successfully",
                    totalRows: numRows,
                    totalColumns: numColumns,
                    preview: results.slice(0, 5), // showing first 5 rows
                });
            })
            .on("error", (err) => {
                res.status(500).json({ message: "Error processing CSV", error: err.message });
            });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
