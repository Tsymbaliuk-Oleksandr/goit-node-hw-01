const { listContacts } = require('./contacts')
const { getContactById } = require('./contacts')
const { addContact } = require('./contacts')
const { removeContact } = require('./contacts')

const { Command } = require('commander')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.log(contacts)
      break

    case 'get':
      const contact = await getContactById(id)
      if (!contact) {
        throw new Error(`Product with id ${id} not found`)
      }
      console.log(contact)
      break

    case 'add':
      const newContact = await addContact(name, email, phone)
      console.log(newContact)
      break

    case 'remove':
      const remove = await removeContact(id)
      console.log(remove)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}
invokeAction(argv)
