const { v4 } = require('uuid')
const updateContacts = require('./updateContacts')
const fs = require('fs/promises')

const path = require('path')
const filePath = path.join(__dirname, 'db/contacts.json')
console.log(filePath)
const listContacts = async () => {
  const data = await fs.readFile(filePath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = contacts.find((item) => item.id === id)
  if (!result) {
    return null
  }
  return result
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContacts = { name, email, phone, id: v4() }
  console.log(newContacts)
  contacts.push(newContacts)
  await updateContacts(contacts)
  return newContacts
}

const removeContact = async (id) => {
  const contacts = await listContacts()
  const newContacts = contacts.find((item) => item.id === id)
  if (newContacts === -1) {
    return null
  }
  contacts.splice(newContacts, 1)
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}
