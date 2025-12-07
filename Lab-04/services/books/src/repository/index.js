import BaseRepository from "./BaseRepository.js";
import { AddBookRepository } from "./AddBookRepository.js";

// Składamy repozytorium w całość
const CombinedRepository = AddBookRepository(BaseRepository);
const repository = new CombinedRepository();

export default repository;
