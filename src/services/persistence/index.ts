import type { PersistenceService } from './types';
import { localPersistenceService } from './local/service';

export const persistenceService: PersistenceService = localPersistenceService;
