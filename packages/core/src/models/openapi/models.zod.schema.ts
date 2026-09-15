import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createModel_Body = z
  .object({
    channel: z.enum(['help', 'protect']),
    name: z.string(),
    lineage: z.string().optional(),
  })
  .passthrough();
const Purpose = z.enum(['help', 'protect']);
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
const ModelId = z.string();
const ModelStatus = z.enum(['candidate', 'production', 'retired']);
const ModelVersion = z
  .object({
    modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    channel: z.enum(['help', 'protect']),
    name: z.string().optional(),
    status: z.enum(['candidate', 'production', 'retired']),
    lineage: z.string().optional(),
    lineageComplete: z.boolean().optional(),
    unsafeFeaturePromotion: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ModelListData = z
  .object({
    items: z.array(
      z
        .object({
          modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          channel: z.enum(['help', 'protect']),
          name: z.string().optional(),
          status: z.enum(['candidate', 'production', 'retired']),
          lineage: z.string().optional(),
          lineageComplete: z.boolean().optional(),
          unsafeFeaturePromotion: z.boolean().optional(),
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
const ModelListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              channel: z.enum(['help', 'protect']),
              name: z.string().optional(),
              status: z.enum(['candidate', 'production', 'retired']),
              lineage: z.string().optional(),
              lineageComplete: z.boolean().optional(),
              unsafeFeaturePromotion: z.boolean().optional(),
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
const ModelCreate = z
  .object({
    channel: z.enum(['help', 'protect']),
    name: z.string(),
    lineage: z.string().optional(),
  })
  .passthrough();
const ModelResponse = z
  .object({
    data: z
      .object({
        modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        channel: z.enum(['help', 'protect']),
        name: z.string().optional(),
        status: z.enum(['candidate', 'production', 'retired']),
        lineage: z.string().optional(),
        lineageComplete: z.boolean().optional(),
        unsafeFeaturePromotion: z.boolean().optional(),
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
  createModel_Body,
  Purpose,
  Problem,
  ModelId,
  ModelStatus,
  ModelVersion,
  ModelListData,
  ResponseMeta,
  ModelListResponse,
  ModelCreate,
  ModelResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/models',
    alias: 'listModels',
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
      {
        name: 'channel',
        type: 'Query',
        schema: z.enum(['help', 'protect']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  channel: z.enum(['help', 'protect']),
                  name: z.string().optional(),
                  status: z.enum(['candidate', 'production', 'retired']),
                  lineage: z.string().optional(),
                  lineageComplete: z.boolean().optional(),
                  unsafeFeaturePromotion: z.boolean().optional(),
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
    path: '/v1/models',
    alias: 'createModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createModel_Body,
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
            modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            channel: z.enum(['help', 'protect']),
            name: z.string().optional(),
            status: z.enum(['candidate', 'production', 'retired']),
            lineage: z.string().optional(),
            lineageComplete: z.boolean().optional(),
            unsafeFeaturePromotion: z.boolean().optional(),
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
    path: '/v1/models/:modelId',
    alias: 'getModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            channel: z.enum(['help', 'protect']),
            name: z.string().optional(),
            status: z.enum(['candidate', 'production', 'retired']),
            lineage: z.string().optional(),
            lineageComplete: z.boolean().optional(),
            unsafeFeaturePromotion: z.boolean().optional(),
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
  {
    method: 'post',
    path: '/v1/models/:modelId/promote',
    alias: 'promoteModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            channel: z.enum(['help', 'protect']),
            name: z.string().optional(),
            status: z.enum(['candidate', 'production', 'retired']),
            lineage: z.string().optional(),
            lineageComplete: z.boolean().optional(),
            unsafeFeaturePromotion: z.boolean().optional(),
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
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
  {
    method: 'post',
    path: '/v1/models/:modelId/rollback',
    alias: 'rollbackModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            modelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            channel: z.enum(['help', 'protect']),
            name: z.string().optional(),
            status: z.enum(['candidate', 'production', 'retired']),
            lineage: z.string().optional(),
            lineageComplete: z.boolean().optional(),
            unsafeFeaturePromotion: z.boolean().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
