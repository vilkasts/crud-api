import { User } from './models';

const mockedUser: User = {
  age: 38,
  hobbies: ['hobby horsing', 'drinking of vodka'],
  username: 'Valera Alkash',
};

const mockedDatabase: User[] = [];

const mockedValidFormatUserId = '488527a2-3f49-43e8-b0f6-6f84d8668321';
const mockedInvalidFormatUserId = 'some-incorrect-user-id';
const mockedInvalidEndpoint = '/some/invalid/endpoint';

export {
  mockedDatabase,
  mockedInvalidEndpoint,
  mockedInvalidFormatUserId,
  mockedUser,
  mockedValidFormatUserId,
};
