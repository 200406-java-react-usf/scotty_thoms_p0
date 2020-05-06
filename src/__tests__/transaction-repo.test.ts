import { TransactionRepository } from '../repos/transaction-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Transaction } from '../models/transaction';
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
        mapTransactionResultSet: jest.fn()
    }
});

describe('transactionRepo', () => {
    let sut = new TransactionRepository();
    let mockConnect = mockIndex.connectionPool.connect;

    beforeEach( () => {
        (mockConnect as jest.Mock).mockClear().mockImplementation( () => {
            return {
                query: jest.fn().mockImplementation( () => {
                    return { 
                        rows: [
                            {
                            id: 1,
                            amount: 20,
                            description: "test",
                            account_id: 1
                            }
                        ]
                    }
                }),
                release: jest.fn()
            }
        });
        (mockMapper.mapTransactionResultSet as jest.Mock).mockClear();
    })


    test('should resolve to an array of Transactions when getAll retrieves records from data source', async () => {

        //Arrange
        expect.hasAssertions();

        let mockTransaction = new Transaction(1, 20, 'test', 1);
        (mockMapper.mapTransactionResultSet as jest.Mock).mockReturnValue(mockTransaction);

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

    test('should resolve to an transaction object when getById retrieves a record from data source', async () => {
        
        //Arrange
        expect.hasAssertions();

        let mockTransaction = new Transaction(1, 20, 'test', 1);
        (mockMapper.mapTransactionResultSet as jest.Mock).mockReturnValue(mockTransaction);

        //Act
        let result = await sut.getById(1);

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof Transaction).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should resolve to a true when checkAccountExists is called with valid acct id', async () => {
        
        //Arrange
        expect.hasAssertions();

        
        (mockMapper.mapTransactionResultSet as jest.Mock).mockReturnValue(true);

        //Act
        let result = await sut.checkAccountExists(0);

        //Assert
        expect(result).toBeTruthy();
        expect(mockConnect).toBeCalledTimes(1);
    });

    test('should return InternalServerError when checkAccountExists runs into an error adding to the db', async () => {

        expect.hasAssertions();

        let mockTransaction = new Transaction(1, 20, 'test', 1);
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return false;
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.checkAccountExists(400);
        } catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }

    });

    test('should return InternalServerError when getById runs into an error adding to the db', async () => {

        expect.hasAssertions();

        let mockTransaction = new Transaction(1, 20, 'test', 1);
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

        expect.hasAssertions();

        let mockTransaction = new Transaction(1, 20, 'test', 1);
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return false;
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.save(mockTransaction);
        } catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }

    });

    test('should return true when update is called', async() => {
        expect.hasAssertions();

        let mockTransaction = new Transaction(1, 20, 'test', 1);
        let result = await sut.update(mockTransaction);

        expect(result).toBeTruthy();
    })

    test('should resolve to a new transaction object when save is called', async () => {
        
        //Arrange
        expect.hasAssertions();

        let mockTransaction = new Transaction(1, 20, 'test', 1);
        (mockMapper.mapTransactionResultSet as jest.Mock).mockReturnValue(mockTransaction);

        //Act
        let result = await sut.save(mockTransaction);

        //Assert
        expect(result).toBeTruthy();
        expect(mockConnect).toBeCalledTimes(1);
    });

    
});