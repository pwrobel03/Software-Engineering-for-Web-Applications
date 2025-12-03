import BaseRepository from "./BaseRepository.js";

import { AddOrderRepository } from "./AddOrderRepository.js";

// Składamy repozytorium w całość
const CombinedRepository = AddOrderRepository(BaseRepository);
const repository = new CombinedRepository();

export default repository;
