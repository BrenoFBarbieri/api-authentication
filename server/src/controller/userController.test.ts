import { describe, test, expect } from '@jest/globals';

import 'jest'
import * as request from 'supertest'

const user = {
    name: 'User Test',
    email: 'user.test@gmail.com',
    password: 'test'
}

describe('new user flow', () => {
    test('/signup post', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send(user)
            .then(response => {
                expect(response.status).toBe(201)
                expect(typeof response.body.id).toBe("number")
                expect(response.body.name).toBe(user.name)
                expect(response.body.email).toBe(user.email)
                expect(response.body.password).not.toBe(user.password)
            })
    })

    test('/signup no data post ', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send({
                name: '', 
                email: '', 
                password: ''
            })
            .then(response => {
                expect(response.status).toBe(204)
                expect(typeof response.body.id).not.toBe("number")
                expect(response.body.name).not.toBe(user.name)
                expect(response.body.email).not.toBe(user.email)
                expect(response.body.password).not.toBe(user.password)
            })
    })

    test('/signup full name', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send({
                name: 'User',
                email: 'user.test@gmail.com',
                password: 'test'
            })
            .then(response => {
                expect(response.status).toBe(204)
                expect(typeof response.body.id).not.toBe("number")
                expect(response.body.name).not.toBe(user.name)
                expect(response.body.email).not.toBe(user.email)
                expect(response.body.password).not.toBe(user.password)
            })
    })
})