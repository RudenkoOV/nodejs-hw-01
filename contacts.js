import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.join('db', 'contacts.json');


async function listContacts() {
    try {
        const contactsList = await fs.readFile(contactsPath);
        return JSON.parse(contactsList);
        
    } catch (err) {
        console.log(err)
    }
}

async function getContactById(contactId) {
    try {
        const findContact = await listContacts();
        // console.log(findContact.find(list => list.id === contactId));
        return findContact.find(list => list.id === contactId)
    } catch (err) {
        console.log(err)
    }
}

async function removeContact(contactId) {
  try {
      const findContact = await listContacts();
      const newContacts = findContact.filter(list => list.id !== contactId);
        // console.log(findContact.filter(list => list.id !== contactId));
      await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
      return newContacts
    } catch (err) {
        console.log(err)
    }
}

async function addContact(name, email, phone) {
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone
    }
 try {
     const findContact = await listContacts();
     const newContacts = [...findContact, newContact];
     console.log(newContacts);
     await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
      return newContacts;
    } catch (err) {
        console.log(err)
    }
}


export {
    listContacts,    
    getContactById,      
    addContact,
    removeContact,      
};