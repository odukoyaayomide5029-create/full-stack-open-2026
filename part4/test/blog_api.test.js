const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
await api
    .post('/api/blogs')
    .send({
      title: 'Test Blog One',
      author: 'Ayo',
      url: 'http://example.com/one',
      likes: 3
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send({
      title: 'Test Blog Two',
      author: 'Ayo',
      url: 'http://example.com/two',
      likes: 5
    })
    .expect(201)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
  })

after(async () => {
  await mongoose.connection.close()
})