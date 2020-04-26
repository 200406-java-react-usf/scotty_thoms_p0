import { User } from '../models/user';
let id = 1;

export default [
    new User (id++, 'firstUsername', 'password', 'Scotty', 'Thoms', 'email@tester.com', 'Admin'),
    new User (id++, 'secondUser', 'password', 'Maeve', 'Other', 'maeve@tester.com', 'User'),
    new User (id++, 'jacksonB', 'jackson444', 'Jackson', 'Brown', 'jbrown4@email.com', 'User')
];