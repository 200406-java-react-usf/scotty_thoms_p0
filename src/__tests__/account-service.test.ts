import { AccountService } from '../services/account-service';
import { Account } from '../models/account';
import Validator from '../util/validator';
import { 
    ResourceNotFoundError, 
    BadRequestError 
} from '../errors/errors';

jest.mock('../repos/account-repo', () => {
    
    return new class AccountRepository {
            getAll = jest.fn();
            getById = jest.fn();
            save = jest.fn();
            update = jest.fn();
            delete = jest.fn();
    }

});

describe('accountService', () => {

    let sut: AccountService;
    let mockRepo;

    let mockAccounts = [
        new Account(1, 100, 'Savings', 1),
        new Account(2, 200, 'Checking', 1),
        new Account(3, 300, 'Checking', 2),
        new Account(4, 400, 'Savings', 3)
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {
            return {
                getAll: jest.fn(),
                getById: jest.fn(),
                save: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            }
        });

        sut = new AccountService(mockRepo);
    
    });

    test('should resolve to Account[] when getAllAccounts() successfully retrieves accounts from the data source', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getAll = jest.fn().mockReturnValue(mockAccounts);

        // Act
        let result = await sut.getAllAccounts();

        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(4);

    });

    test('should reject with ResourceNotFoundError when getAllAccounts fails to get any accounts from the data source', async () => {

        // Arrange
        expect.assertions(1);
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        // Act
        try {
            await sut.getAllAccounts();
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

    test('should resolve to Account when getAccountById is given a valid and known id', async () => {

        // Arrange
        expect.assertions(2);
        
        Validator.isValidId = jest.fn().mockReturnValue(true);

        mockRepo.getById = jest.fn().mockImplementation((id: number) => {
            return new Promise<Account>((resolve) => resolve(mockAccounts[id-1]));
        });


        // Act
        let result = await sut.getAccountById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);

    });

    test('should reject with BadRequestError when getAccountById is given a invalid value as an id (decimal)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getAccountById(3.14);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getAccountById is given a invalid value as an id (zero)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getAccountById(0);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getAccountById is given a invalid value as an id (NaN)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getAccountById(NaN);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getAccountById is given a invalid value as an id (negative)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getAccountById(-1);
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
            await sut.getAccountById(5000);
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });
    
    test('should throw BadRequestError when sending a bad value to addNewAccount', async () => {
        
        //Arrange
        expect.hasAssertions();

        //Act
        try {
            await sut.addNewAccount(null);
        } catch (e) {

            //Assert
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should resolve to updating a account given the correct information', async () => {

        //Arrange
        expect.hasAssertions();
        sut.getAccountById = jest.fn().mockReturnValue({});
        mockRepo.update = jest.fn().mockReturnValue({})

        //Act
        let result = sut.updateAccount(new Account(1, 100, 'Checking', 1));

        //Assert
        expect(result).toBeTruthy();
    });

    test('should throw BadRequestError when sending a bad value to updateAccount', async () => {
        
        //Arrange
        expect.hasAssertions();

        //Act
        try {
            await sut.updateAccount(null);
        } catch (e) {

            //Assert
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('should resolve to deleting an account given the correct information to delete', async () => {

        //Arrange
        expect.hasAssertions();
        sut.getAccountById = jest.fn().mockReturnValue({});
        mockRepo.delete = jest.fn().mockReturnValue({})

        //Act
        let result = sut.deleteAccount(new Account(1, 100, 'Checking', 1));

        //Assert
        expect(result).toBeTruthy();
    });

    test('should throw BadRequestError when sending a bad value to deleteAccount', async () => {
        
        //Arrange
        expect.hasAssertions();

        //Act
        try {
            await sut.deleteAccount(null);
        } catch (e) {

            //Assert
            expect(e instanceof BadRequestError).toBe(true);
        }
    });
});

