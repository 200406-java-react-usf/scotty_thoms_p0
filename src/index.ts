import { UserRepository } from './repos/user-repo';

const userRepo = UserRepository.getInstance();

let a = async () => {
    let output = await userRepo.getAll(); 
    console.log(output);
};