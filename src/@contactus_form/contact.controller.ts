import asyncHandler from 'express-async-handler';
import Contact, { IContact } from './contact.model';

// Create Contact
export const createContact = asyncHandler(async (req: any, res: any) => {
  const { first_name, last_name,phone, email, message } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !phone || !email || !message) {
    res.status(400).json({ message: 'All fields are required: First name, Last name,Phone, email, and message.' });
    return;
  }

  // Create and save the contact
  const contact: IContact = new Contact({
    first_name,
    last_name,
    phone,
    email,
    message
  });

  const savedContact = await contact.save();
  res.status(201).json({
    message: 'Your message has been sent successfully!',
    contact: savedContact
  });
});

// Get All Contacts (Optional)
export const getAllContacts = asyncHandler(async (req: any, res: any) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(contacts);
});
