import { TransactionService } from '../services/transaction-service';
import { Transaction } from '../models/transaction';
import Validator from '../util/validator';
import { 
    ResourceNotFoundError, 
    BadRequestError 
} from '../errors/errors';

jest.mock('../repos/transaction-repo', () => {
    
    return new class TransactionRepository {
            getAll = jest.fn();
            getById = jest.fn();
            save = jest.fn();
            update = jest.fn();
    }

});

describe('transactionService', () => {

    let sut: TransactionService;
    let mockRepo;

    let mockTransactions = [
        new Transaction(1, -800, 'Rent', 1),
        new Transaction(2, -20, 'Food', 1),
        new Transaction(3, 640, 'Deposit', 1)
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {
            return {
                getAll: jest.fn(),
                getById: jest.fn(),
                save: jest.fn(),
                update: jest.fn()
            }
        });

        sut = new TransactionService(mockRepo);

    });

    test('should resolve to Transaction[] when getAllTransactions() successfully retrieves transactions from the data source', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getAll = jest.fn().mockReturnValue(mockTransactions);

        // Act
        let result = await sut.getAllTransactions();

        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(3);

    });

    test('should reject with ResourceNotFoundError when getAllTransactions fails to get any transactions from the data source', async () => {

        // Arrange
        expect.assertions(1);
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        // Act
        try {
            await sut.getAllTransactions();
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

    test('should resolve to Transaction when getTransactionById is given a valid an known id', async () => {

        // Arrange
        expect.assertions(2);
        
        Validator.isValidId = jest.fn().mockReturnValue(true);

        mockRepo.getById = jest.fn().mockImplementation((id: number) => {
            return new Promise<Transaction>((resolve) => resolve(mockTransactions[id-1]));
        });


        // Act
        let result = await sut.getTransactionById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);

    });

    test('should reject with BadRequestError when getTransactionById is given a invalid value as an id (decimal)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getTransactionById(3.14);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getTransactionById is given a invalid value as an id (zero)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getTransactionById(0);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getTransactionById is given a invalid value as an id (NaN)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getTransactionById(NaN);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getTransactionById is given a invalid value as an id (negative)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getTransactionById(-1);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with ResourceNotFoundError if getByid is given an unknown id', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getTransactionById(258);
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });
    
    test('should throw BadRequestError when sending a bad value to addNewTransaction', async () => {
        
        //Arrange
        expect.hasAssertions();

        //Act
        try {
            await sut.addNewTransaction(null);
        } catch (e) {

            //Assert
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

});
