const fs = require('fs/promises')

const path = require('path')
const filePath = path.join(__dirname, 'db/contacts.json')

const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts))
}
module.exports = updateContacts
