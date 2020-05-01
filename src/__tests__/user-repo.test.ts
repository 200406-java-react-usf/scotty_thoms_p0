import { UserRepository as sut } from '../repos/user-repo';
// import { User } from '../models/user';
// import  Validator  from '../util/validator';
// import { WipError, ResourceNotFoundError } from '../errors/errors';

// describe( 'user-repo', () => {

//     test('should be a singleton', () => {
        
//         //Arrange
//         expect.assertions(1);

//         //Act
//         let ref1 = sut.getInstance();
//         let ref2 = sut.getInstance();

//         //Assert
//         expect(ref1).toEqual(ref2);
//     });

//     test('should return all users (without passwords) when getAll is called', async () => {
        
//         //Arrange
//         expect.assertions(3);

//         //Act
//         let result = await sut.getInstance().getAll();

//         //Assert
//         expect(result).toBeTruthy();
//         expect(result.length).toBeGreaterThan(0);
//         expect(result[0].password).toBeUndefined();
//     })

//     test('should ')

// });