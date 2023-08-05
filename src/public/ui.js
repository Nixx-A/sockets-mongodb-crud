import { saveNote, deleteNote, getNoteById, updateNote } from './sockets.js'

const notesList = document.querySelector('#notes')
const title = document.querySelector('#title')
const description = document.querySelector('#description')

let saveId = ''

const noteUI = note => {
  const div = document.createElement('div')

  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${note._id}">delete</button>
              <button class="btn btn-secondary update" data-id="${note._id}">update</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>
    `

  const btnDelete = div.querySelector('.delete')
  const btnUpdate = div.querySelector('.update')

  btnDelete.addEventListener('click', () => deleteNote(btnDelete.dataset.id))
  btnUpdate.addEventListener('click', () => getNoteById(btnUpdate.dataset.id))

  return div
}

export const renderNotes = notes => {
  notesList.innerHTML = ''
  notes.forEach(note => notesList.append(noteUI(note)))
}

export const fillForm = note => {
  title.value = note.title
  description.value = note.description
  saveId = note._id
}

export const onHandleSubmit = e => {
  e.preventDefault()
  if (saveId) {
    updateNote(saveId, title.value, description.value)
  } else {
    saveNote(title.value, description.value)
  }

  title.value = ''
  description.value = ''
  saveId = ''
}

export const appendNote = notes => {
  notesList.append(noteUI(notes))
} 