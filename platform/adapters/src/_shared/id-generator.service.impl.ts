/**
 * ID Generator Service Implementation — starter prefixes.
 */

import type { DomainCode } from '@aegora/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@aegora/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@aegora/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  eventsId(): string {
    return this.generateIdForDomain('events');
  }
  offersId(): string {
    return this.generateIdForDomain('offers');
  }
  alertsId(): string {
    return this.generateIdForDomain('alerts');
  }
  holdsId(): string {
    return this.generateIdForDomain('holds');
  }
  casesId(): string {
    return this.generateIdForDomain('cases');
  }
  policiesId(): string {
    return this.generateIdForDomain('policies');
  }
  modelsId(): string {
    return this.generateIdForDomain('models');
  }
  auditsId(): string {
    return this.generateIdForDomain('audits');
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
