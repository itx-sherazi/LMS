import { deleteMediaToCloudinary, uploadMediaToCloudinary } from '../helper/Cloudinary.js';


export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const uploadResult = await uploadMediaToCloudinary(req.file.path);


        if (!uploadResult) {
            return res.status(500).json({ error: "Upload failed" });
        }

        return res.json({
            success: true,
            message: "File uploaded successfully",
            data: uploadResult
 
        });
    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        await deleteMediaToCloudinary(id);

        res.status(200).json({
            success: true,
            message: 'File deleted successfully'
        });
    } catch (error) {
        console.error("Error in deleting file:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

 export const bulkUploadHandler = async (req, res) => {
  try {
    const uploadPromises = req.files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );
    const result = await Promise.all(uploadPromises);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error in bulk uploading files:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


