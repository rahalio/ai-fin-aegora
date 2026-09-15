import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createAuditExport_Body = z
  .object({
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    purpose: z.enum(['help', 'protect', 'both']).optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const AuditId = z.string();
const AuditStatus = z.enum(['pending', 'ready', 'failed']);
const AuditExport = z
  .object({
    auditId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['pending', 'ready', 'failed']),
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    purpose: z.enum(['help', 'protect', 'both']).optional(),
    incompletePurposeTags: z.number().int().gte(0).optional(),
    integrityHash: z.string().optional(),
    downloadUri: z.string().url().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AuditListData = z
  .object({
    items: z.array(
      z
        .object({
          auditId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['pending', 'ready', 'failed']),
          periodFrom: z.string().datetime({ offset: true }),
          periodTo: z.string().datetime({ offset: true }),
          purpose: z.enum(['help', 'protect', 'both']).optional(),
          incompletePurposeTags: z.number().int().gte(0).optional(),
          integrityHash: z.string().optional(),
          downloadUri: z.string().url().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const AuditListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              auditId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['pending', 'ready', 'failed']),
              periodFrom: z.string().datetime({ offset: true }),
              periodTo: z.string().datetime({ offset: true }),
              purpose: z.enum(['help', 'protect', 'both']).optional(),
              incompletePurposeTags: z.number().int().gte(0).optional(),
              integrityHash: z.string().optional(),
              downloadUri: z.string().url().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AuditExportCreate = z
  .object({
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    purpose: z.enum(['help', 'protect', 'both']).optional(),
  })
  .passthrough();
const AuditResponse = z
  .object({
    data: z
      .object({
        auditId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['pending', 'ready', 'failed']),
        periodFrom: z.string().datetime({ offset: true }),
        periodTo: z.string().datetime({ offset: true }),
        purpose: z.enum(['help', 'protect', 'both']).optional(),
        incompletePurposeTags: z.number().int().gte(0).optional(),
        integrityHash: z.string().optional(),
        downloadUri: z.string().url().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createAuditExport_Body,
  Problem,
  AuditId,
  AuditStatus,
  AuditExport,
  AuditListData,
  ResponseMeta,
  AuditListResponse,
  AuditExportCreate,
  AuditResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/audits/exports',
    alias: 'listAuditExports',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  auditId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['pending', 'ready', 'failed']),
                  periodFrom: z.string().datetime({ offset: true }),
                  periodTo: z.string().datetime({ offset: true }),
                  purpose: z.enum(['help', 'protect', 'both']).optional(),
                  incompletePurposeTags: z.number().int().gte(0).optional(),
                  integrityHash: z.string().optional(),
                  downloadUri: z.string().url().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'post',
    path: '/v1/audits/exports',
    alias: 'createAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAuditExport_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            auditId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'ready', 'failed']),
            periodFrom: z.string().datetime({ offset: true }),
            periodTo: z.string().datetime({ offset: true }),
            purpose: z.enum(['help', 'protect', 'both']).optional(),
            incompletePurposeTags: z.number().int().gte(0).optional(),
            integrityHash: z.string().optional(),
            downloadUri: z.string().url().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'get',
    path: '/v1/audits/exports/:auditId',
    alias: 'getAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'auditId',
        type: 'Path',
        schema: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            auditId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'ready', 'failed']),
            periodFrom: z.string().datetime({ offset: true }),
            periodTo: z.string().datetime({ offset: true }),
            purpose: z.enum(['help', 'protect', 'both']).optional(),
            incompletePurposeTags: z.number().int().gte(0).optional(),
            integrityHash: z.string().optional(),
            downloadUri: z.string().url().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
