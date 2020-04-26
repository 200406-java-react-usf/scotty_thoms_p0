import { User } from '../models/user';
let id = 1;

export default [
    new User (id++, 'firstUsername', 'scotty', 'Scotty', 'Thoms', 'email@tester.com', 'Admin'),
    new User (id++, 'secondUser', 'maeve', 'Maeve', 'Dubya', 'maeve@tester.com', 'User'),
    new User (id++, 'jacksonB', 'jackson', 'Jackson', 'Brown', 'jbrown4@email.com', 'User')
];