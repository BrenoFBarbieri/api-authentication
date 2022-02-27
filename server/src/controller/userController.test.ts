import { describe, test, expect } from '@jest/globals';

import 'jest'
import * as request from 'supertest'

describe('New User Flow', () => {
    test('/signup post', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send({
                name: 'User Test',
                email: 'user.test@gmail.com',
                password: '123456'
            })
            .then(response => {
                expect(response.status).toBe(201)
                expect(typeof response.body.id).toBe("number")
                expect(response.body.name).toBe('User Test')
                expect(response.body.email).toBe('user.test@gmail.com')
                expect(response.body.password).not.toBe('123456')
            })
    })

    test('/signup No Data Post ', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send({
                name: '', 
                email: '', 
                password: ''
            })
            .then(response => {
                expect(response.status).toBe(204)
            })
    })

    test('/signup Validating Full Name', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send({
                name: 'User',
                email: 'user.test@gmail.com',
                password: '123456'
            })
            .then(response => {
                expect(response.status).toBe(204)
            })
    })

    test('/signup Validating Email', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send({
                name: 'User Test',
                email: 'user.testasfasg',
                password: 'test'
            })
            .then(response => {
                expect(response.status).toBe(204)
            })
    })

    test('/signup Validating Password', () => {
        return request('http://localhost:3333')
            .post('/signup')
            .send({
                name: 'User Test',
                email: 'user.test@gmail.com',
                password: '12345'
            })
            .then(response => {
                expect(response.status).toBe(204)
            })
    })  
})