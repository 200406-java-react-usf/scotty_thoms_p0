import { UserRepository } from '../repos/user-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { User } from '../models/user';
import { InternalServerError } from '../errors/errors';

jest.mock('..', () => {
    return {
        connectionPool: {
            connect: jest.fn()
        }
    }
});

jest.mock('../util/result-set-mapper', () => {
    return {
        mapUserResultSet: jest.fn()
    }
});

describe('userRepo', () => {
    let sut = new UserRepository();
    let mockConnect = mockIndex.connectionPool.connect;

    beforeEach( () => {
        (mockConnect as jest.Mock).mockClear().mockImplementation( () => {
            return {
                query: jest.fn().mockImplementation( () => {
                    return { 
                        rows: [
                            {
                            id: 1,
                            username: 'sthoms',
                            password: 'password',
                            first_name: 'Scotty',
                            last_name: 'Thoms',
                            role_id: 1
                            }
                        ]
                    }
                }),
                release: jest.fn()
            }
        });
        (mockMapper.mapUserResultSet as jest.Mock).mockClear();
    })


    test('should resolve to an array of Users when getAll retrieves records from data source', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'username', 'password', 'firstName', 'lastName', 'Locked');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.getAll();

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should resolve to an empty array when getAll retrieves no records from data source', async () => {

        //Arrange
        expect.hasAssertions();
        (mockConnect as jest.Mock).mockImplementation( () => {
            return {
                query: jest.fn().mockImplementation( () => {return {rows: [] } }),
                release: jest.fn()
            }
        });

        //Act
        let result = await sut.getAll();

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(0);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should resolve to a User object when getById retrieves a record from data source', async () => {
        
        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'username', 'password', 'firstName', 'lastName', 'Locked');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.getById(1);

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should resolve to a User object when getByCredentials is called', async () => {
       
        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'username', 'password', 'firstName', 'lastName', 'Locked');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.getbyCredentials("username", "password");

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should resolve to a new User object when save is called', async () => {
        
        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'username', 'password', 'firstName', 'lastName', 'Locked');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.save(mockUser);

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should resolve to a User object when checkOwenerExists is called with valid user id', async () => {
        
        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'username', 'password', 'firstName', 'lastName', 'Locked');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.checkUsername("username");

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should return InternalServerError when getById runs into an error adding to the db', async () => {

        expect.hasAssertions();

        let mockUser = new User(0, 'un', 'pw', 'fn', 'ln', 'User');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return false;
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.getById(400);
        } catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }

    });

    test('should return InternalServerError when save runs into an error adding to the db', async () => {

        // Arrange
        expect.hasAssertions();

        let mockUser = new User(0, 'un', 'pw', 'fn', 'ln', 'User');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return false;
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.save(mockUser);
        } catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }

    });

    test('should return the updated user when update is given a valid user to update', async() => {

        expect.hasAssertions();

        let mockUser = new User(3, 'un', 'pw', 'fn', 'ln', 'User');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return mockUser;
                }),
                release: jest.fn()
            };
        });

        let result = await sut.update(mockUser);

        expect(result).toBeTruthy();

    });

    test('should return true when deleteById is given a valid id to delete', async() => {

        expect.hasAssertions();

        let mockUser = new User(3, 'un', 'pw', 'fn', 'ln', 'User');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return true;
                }),
                release: jest.fn()
            };
        });

        let result = await sut.delete(mockUser);

        expect(result).toBeTruthy();
        expect(result).toBe(true);

    });

//    test('should resolve to a User object when getUserByUniqueKey is called', async() => {
//        // Arrange
//        expect.hasAssertions();
//        let mockUser = new User(1, 'testUsername', 'password', 'firstName', 'lastName', 'Locked');
//        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

//        //Act
//        let result = await sut.getUserByUniqueKey("username","password");

//        //Assert
//         expect(result).toBeTruthy();
//         expect(result instanceof User).toBe(true);
//         expect(mockConnect).toBeCalledTimes(1);
       
//    });
});