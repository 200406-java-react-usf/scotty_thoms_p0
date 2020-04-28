import { User } from '../models/user';
let id = 1;

export default [
    new User (id++, 'sthoms', 'scotty', 'Scotty', 'Thoms', 'email@tester.com', 'Admin'),
    new User (id++, 'mdubya', 'maeve', 'Maeve', 'Dubya', 'maeve@tester.com', 'User'),
    new User (id++, 'jacksonb', 'jackson', 'Jackson', 'Brown', 'jbrown4@email.com', 'User')
];