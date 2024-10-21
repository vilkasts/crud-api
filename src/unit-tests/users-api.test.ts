import { createServer } from 'node:http';
import request from 'supertest';

import { requestHandler } from '../helpers/request-handler';
import { Endpoints, ErrorMessages } from '../helpers/enums';
import {
  mockedDatabase,
  mockedInvalidEndpoint,
  mockedInvalidFormatUserId,
  mockedUser,
  mockedValidFormatUserId,
} from '../helpers/mocks';

const server = createServer((req, res) =>
  requestHandler(req, res, mockedDatabase),
);

describe('Testing Users endpoint', () => {
  afterEach(() => {
    mockedDatabase.length = 0;
  });

  describe('Testing GET method (all users)', () => {
    it('GET method should return an empty array if no users data with code 200', async () => {
      const getResponse = await request(server).get(Endpoints.UsersEndpoint);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toStrictEqual([]);
    });

    it('GET method should return an array of users with code 200', async () => {
      await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const getResponse = await request(server).get(Endpoints.UsersEndpoint);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toStrictEqual([
        { ...mockedUser, id: expect.any(String) },
        { ...mockedUser, id: expect.any(String) },
      ]);
    });

    it('GET method should return an error with code 404 if incorrect endpoint', async () => {
      const getResponse = await request(server).get(mockedInvalidEndpoint);

      expect(getResponse.status).toBe(404);
      expect(getResponse.body).toStrictEqual({
        message: ErrorMessages.NotFoundError,
      });
    });
  });

  describe('Testing GET method (user by id)', () => {
    it('GET method should return the user by ID with code 200', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const userId = postResponse.body.id;
      const getResponse = await request(server).get(
        `${Endpoints.UsersEndpoint}/${userId}`,
      );

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toStrictEqual({
        ...mockedUser,
        id: userId,
      });
    });

    it('GET method should return an error with code 400 if invalid format of userId', async () => {
      await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const getResponse = await request(server).get(
        `${Endpoints.UsersEndpoint}/${mockedInvalidFormatUserId}`,
      );

      expect(getResponse.status).toBe(400);
      expect(getResponse.body).toStrictEqual({
        message: ErrorMessages.InvalidUserId,
      });
    });

    it('GET method should return an error with code 404 if user not found', async () => {
      await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const getResponse = await request(server).get(
        `${Endpoints.UsersEndpoint}/${mockedValidFormatUserId}`,
      );

      expect(getResponse.status).toBe(404);
      expect(getResponse.body).toStrictEqual({
        message: ErrorMessages.UserNotFound,
      });
    });

    it('GET method should return an error with code 404 if incorrect endpoint', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const userId = postResponse.body.id;
      const getResponse = await request(server).get(
        `${mockedInvalidEndpoint}/${userId}`,
      );

      expect(getResponse.status).toBe(404);
      expect(getResponse.body).toStrictEqual({
        message: ErrorMessages.NotFoundError,
      });
    });
  });

  describe('Testing POST method', () => {
    it('POST method should create a new user and return code 201', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      expect(postResponse.status).toBe(201);
      expect(postResponse.body).toStrictEqual({
        ...mockedUser,
        id: expect.any(String),
      });
      expect(mockedDatabase.length).toBe(1);
      expect(mockedDatabase[0]).toStrictEqual({
        ...mockedUser,
        id: expect.any(String),
      });
    });

    it('POST method should return an error with code 400 if incorrect data types', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send({ ...mockedUser, age: '23' })
        .set('Content-Type', 'application/json');

      expect(postResponse.status).toBe(400);
      expect(postResponse.body).toStrictEqual({
        message: "Field 'age' must be of type 'number'",
      });
    });

    it('POST method should return an error with code 400 if no required field', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send({
          age: 38,
          username: 'Valera Alkash',
        })
        .set('Content-Type', 'application/json');

      expect(postResponse.status).toBe(400);
      expect(postResponse.body).toStrictEqual({
        message: "Field 'hobbies' is required.",
      });
    });

    it('POST method should return an error with code 404 if incorrect endpoint', async () => {
      const postResponse = await request(server)
        .post(mockedInvalidEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      expect(postResponse.status).toBe(404);
      expect(postResponse.body).toStrictEqual({
        message: ErrorMessages.NotFoundError,
      });
    });
  });

  describe('Testing PUT method', () => {
    it('PUT method should update the user and return code 200', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const userId = postResponse.body.id;
      const updatedUser = {
        ...mockedUser,
        role: 'Google CEO',
      };
      const putResponse = await request(server)
        .put(`${Endpoints.UsersEndpoint}/${userId}`)
        .send(updatedUser)
        .set('Content-Type', 'application/json');

      expect(putResponse.status).toBe(200);
      expect(putResponse.body).toStrictEqual({
        ...mockedUser,
        id: userId,
        role: 'Google CEO',
      });
      expect(mockedDatabase[0]).toStrictEqual({
        ...mockedUser,
        id: userId,
        role: 'Google CEO',
      });
    });

    it('PUT method should return an error with code 400 if invalid format of userId', async () => {
      await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const updatedUser = {
        ...mockedUser,
        role: 'Google CEO',
      };
      const putResponse = await request(server)
        .put(`${Endpoints.UsersEndpoint}/${mockedInvalidFormatUserId}`)
        .send(updatedUser)
        .set('Content-Type', 'application/json');

      expect(putResponse.status).toBe(400);
      expect(putResponse.body).toStrictEqual({
        message: ErrorMessages.InvalidUserId,
      });
    });

    it('PUT method should return an error with code 404 if user not found', async () => {
      await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const updatedUser = {
        ...mockedUser,
        role: 'Google CEO',
      };
      const putResponse = await request(server)
        .put(`${Endpoints.UsersEndpoint}/${mockedValidFormatUserId}`)
        .send(updatedUser)
        .set('Content-Type', 'application/json');

      expect(putResponse.status).toBe(404);
      expect(putResponse.body).toStrictEqual({
        message: ErrorMessages.UserNotFound,
      });
    });

    it('PUT method should return an error with code 400 if invalid data type', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const userId = postResponse.body.id;
      const updatedUser = {
        ...mockedUser,
        age: '132',
      };
      const putResponse = await request(server)
        .put(`${Endpoints.UsersEndpoint}/${userId}`)
        .send(updatedUser)
        .set('Content-Type', 'application/json');

      expect(putResponse.status).toBe(400);
      expect(putResponse.body).toStrictEqual({
        message: "Field 'age' must be of type 'number'",
      });
    });

    it('PUT method should return an error with code 404 if incorrect endpoint', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const userId = postResponse.body.id;
      const updatedUser = {
        ...mockedUser,
        role: 'Google CEO',
      };
      const putResponse = await request(server)
        .put(`${mockedInvalidEndpoint}/${userId}`)
        .send(updatedUser)
        .set('Content-Type', 'application/json');

      expect(putResponse.status).toBe(404);
      expect(putResponse.body).toStrictEqual({
        message: ErrorMessages.NotFoundError,
      });
    });
  });

  describe('Testing DELETE method', () => {
    it('DELETE method should delete the user and return code 204', async () => {
      const postResponse = await request(server)
        .post(Endpoints.UsersEndpoint)
        .send(mockedUser)
        .set('Content-Type', 'application/json');

      const userId = postResponse.body.id;
      const deleteResponse = await request(server).delete(
        `${Endpoints.UsersEndpoint}/${userId}`,
      );

      expect(deleteResponse.status).toBe(204);
      expect(mockedDatabase.length).toBe(0);
    });
  });

  it('DELETE method should return an error with code 400 if invalid format of userId', async () => {
    await request(server)
      .post(Endpoints.UsersEndpoint)
      .send(mockedUser)
      .set('Content-Type', 'application/json');

    const deleteResponse = await request(server).delete(
      `${Endpoints.UsersEndpoint}/${mockedInvalidFormatUserId}`,
    );

    expect(deleteResponse.status).toBe(400);
    expect(deleteResponse.body).toStrictEqual({
      message: ErrorMessages.InvalidUserId,
    });
  });

  it('DELETE method should return an error with code 404 if user not found', async () => {
    await request(server)
      .post(Endpoints.UsersEndpoint)
      .send(mockedUser)
      .set('Content-Type', 'application/json');

    const deleteResponse = await request(server).delete(
      `${Endpoints.UsersEndpoint}/${mockedValidFormatUserId}`,
    );

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toStrictEqual({
      message: ErrorMessages.UserNotFound,
    });
  });

  it('DELETE method should return an error with code 404 if incorrect endpoint', async () => {
    const postResponse = await request(server)
      .post(Endpoints.UsersEndpoint)
      .send(mockedUser)
      .set('Content-Type', 'application/json');

    const userId = postResponse.body.id;
    const deleteResponse = await request(server).delete(
      `${mockedInvalidEndpoint}/${userId}`,
    );

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toStrictEqual({
      message: ErrorMessages.NotFoundError,
    });
  });
});
