const request = require('supertest');
const app = require('../app');
const { token } = require('../helpers');
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let customerData = {
    userName: "dayat",
    email: "google1@gmail.com",
    password: "123456",
    role: "Customer",
    phoneNumber: "02931932921",
    address: "Jalan Pinang 2"
}
let payload

beforeAll(() => {
    queryInterface.bulkDelete("Customers", null, {
        restartIdentity: true,
        truncate: true,
        cascade: true,
    });
});

describe('POST /pub/register', () => {
    test("201 - Success register", async () => {
        const response = await request(app)
            .post("/pub/register")
            .send(customerData);
        console.log(response.body)
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("customerId", 1)
        payload = { id: response.body.customerId };
        console.log(payload)
    });
    test("400 - Bad Request", async () => {
        const response = await request(app)
            .post("/pub/register")
            .send({
                ...customerData,
                email: null
            });
        console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Please input your email")
        payload = { id: response.body.customerId }
    });
    test("400 - Bad Request", async () => {
        const response = await request(app)
            .post("/pub/register")
            .send({
                ...customerData,
                email: ""
            });
        console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Format email must be valid")
    });
    test("400 - Bad Request", async () => {
        const response = await request(app)
            .post("/pub/register")
            .send({
                ...customerData,
                password: null
            });
        console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Please input your password")
    });
    test("400 - Bad Request", async () => {
        const response = await request(app)
            .post("/pub/register")
            .send({
                ...customerData,
                password: ""
            });
        console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Password must be at least 5 letters")
    });
    test("400 - Bad Request", async () => {
        const response = await request(app)
            .post("/pub/register")
            .send({
                ...customerData,
                email: "dayat"
            });
        console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Format email must be valid")
    });
    test("400 - Bad Request", async () => {
        const response = await request(app)
            .post("/pub/register")
            .send({
                ...customerData,
                email: "google1@gmail.com"
            });
        console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Email has been used")
    });
});

describe('POST /pub/login', () => {
    test("200 - Success login", async () => {
        let loginCustomer = {
            email: "google1@gmail.com",
            password: "123456"
        }
        const response = await request(app)
            .post("/pub/login")
            .send(loginCustomer);
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("acessToken", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyODIwNTMxfQ.my0695lhA-GH6SUHXudvCNJUWXoBlPGWNeLO48cD1ps', "userName", 'dayat')
        acesstoken=token(payload)
    });
    test("401 - Bad request", async () => {
        let loginCustomer = {
            email: "google1@gmail.com",
            password: "12345"
        }
        const response = await request(app)
            .post("/pub/login")
            .send(loginCustomer);
        console.log(response.body)
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "error invalid username or email or password")
    });
    test("401 - Bad request", async () => {
        let loginCustomer = {
            email: "google2@gmail.com",
            password: "123456"
        }
        const response = await request(app)
            .post("/pub/login")
            .send(loginCustomer);
        console.log(response.body)
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "error invalid username or email or password")
    });
});

describe('GET /pub/posts', () => {
    test("200 - Ok", async () => {
        const response = await request(app)
            .get("/pub/posts")
            console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
    test("200 - Ok", async () => {
        const response = await request(app)
            .get("/pub/posts?filter=25")
            console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
    test("200 - Ok", async () => {
        const response = await request(app)
            .get("/pub/posts?filter=25&page=1")
            console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('GET /pub/posts/:postId', () => {
    test("200 - Ok", async () => {
        const response = await request(app)
            .get("/pub/posts/10")
            console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id",10)

    });
    test("404 - Not Found", async () => {
        const response = await request(app)
            .get("/pub/posts/100")
            console.log(response.body)
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message")
    })
});

describe('GET /pub/likeposts', () => {
    test("200 - Ok", async () => {
        console.log(acesstoken)
        const response = await request(app)
            .get("/pub/likeposts")
            .set({acesstoken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyODM0MTQ0fQ.9r9Ei2RWmhJCEUk8Ix0Wg2T6GkSdlLUFu6qI8YrRUkQ"})
            console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    test("401 - Unauthorized", async () => {
        console.log(acesstoken)
        const response = await request(app)
            .get("/pub/likeposts")
            console.log(response.body)
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message","You have to login first")
    });
    test("401 - Unauthorized", async () => {
        console.log(acesstoken)
        const response = await request(app)
            .get("/pub/likeposts")
            .set({acesstoken:"yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyODM0MTQ0fQ.9r9Ei2RWmhJCEUk8Ix0Wg2T6GkSdlLUFu6qI8YrRUkQ"})
            console.log(response.body)
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message","You have to login first")
    });
});

describe('POST /pub/likePosts/:postId', () => {
    test("201 - created", async () => {
        console.log(acesstoken)
        const response = await request(app)
            .post("/pub/likePosts/3")
            .set({acesstoken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyODM0MTQ0fQ.9r9Ei2RWmhJCEUk8Ix0Wg2T6GkSdlLUFu6qI8YrRUkQ"})
            console.log(response.body)
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("CustomerId")
    });
    test("404 - Not Found", async () => {
        console.log(acesstoken)
        const response = await request(app)
            .post("/pub/likePosts/100")
            .set({acesstoken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyODM0MTQ0fQ.9r9Ei2RWmhJCEUk8Ix0Wg2T6GkSdlLUFu6qI8YrRUkQ"})
            console.log(response.body)
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message",'error not found')
    });
});