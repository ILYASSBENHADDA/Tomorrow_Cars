// const { loginClient } = require('../controllers/auth.controllers')
const { sum } = require('./sum')

it("First test", () => {
     expect(sum).toBe(3)
})