import { User } from '../models/user';
let id = 1;

export default [
    new User (id++, 'sthoms', 'scotty', 'Scotty', 'Thoms', 'Admin'),
    new User (id++, 'mdubya', 'maeve', 'Maeve', 'Dubya', 'User'),
    new User (id++, 'jacksonb', 'jackson', 'Jackson', 'Brown', 'User')
];