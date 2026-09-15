/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@aegora/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  eventsId(): string;
  offersId(): string;
  alertsId(): string;
  holdsId(): string;
  casesId(): string;
  policiesId(): string;
  modelsId(): string;
  auditsId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
