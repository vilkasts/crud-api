type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

const usersData: User[] = [
  {
    id: 'bd7c5dec-9b47-48bc-adf3-8ba59ea85fd0',
    username: 'Chupapi',
    age: 99,
    hobbies: ['hobbyhorsing'],
  },
  {
    id: 'ea1b5d46-ee94-4433-b43c-d0dd86f8b2d7',
    username: 'Munyanio',
    age: 1,
    hobbies: [],
  },
  {
    id: 'edd66b25-e848-4813-b11a-4ad4f924507b',
    username: 'Valera Alkash',
    age: 48,
    hobbies: ['quadrobing', 'drinking of vodka'],
  },
];

export { usersData };
