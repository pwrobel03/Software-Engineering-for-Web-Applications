import BaseRepository from "./BaseRepository.js";
import { AddUserRepository } from "./AddUserRepository.js";

// Składamy repozytorium w całość
const CombinedRepository = AddUserRepository(BaseRepository);
const repository = new CombinedRepository();

export default repository;
