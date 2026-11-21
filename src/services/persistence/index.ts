import type { PersistenceService } from './types';
import { localPersistenceService } from './local/service';

export type { PersistenceService } from './types';

export const persistenceService: PersistenceService = localPersistenceService;
