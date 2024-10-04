
// Validation middleware for Tour creation and updates
export const validateTourFields = (req:any, res: any, next:any) => {
    const { name, description, address, images, tips } = req.body;

    // Check if all required fields are present
    if (!name || !description || !address || !images || !tips) {
        console.log('hi');
        return res.status(400).json({ message: 'All fields are required: name, description, address, images, and tips.' });
    }else{
        next();
    }
};