import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPolicy_Body = z
  .object({
    name: z.string(),
    fromPurpose: z.enum(['help', 'protect']),
    toPurpose: z.enum(['help', 'protect']),
    effect: z.enum(['allow', 'deny', 'requireReview']),
    enabled: z.boolean().optional().default(true),
    feeIncentiveNote: z.string().optional(),
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
const PolicyId = z.string();
const Purpose = z.enum(['help', 'protect']);
const PolicyEffect = z.enum(['allow', 'deny', 'requireReview']);
const PolicyRule = z
  .object({
    policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    enabled: z.boolean(),
    fromPurpose: z.enum(['help', 'protect']),
    toPurpose: z.enum(['help', 'protect']),
    effect: z.enum(['allow', 'deny', 'requireReview']),
    approvalCount: z.number().int().gte(0).optional(),
    approved: z.boolean().optional(),
    silentReuseDetected: z.boolean().optional(),
    feeIncentiveNote: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PolicyListData = z
  .object({
    items: z.array(
      z
        .object({
          policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          enabled: z.boolean(),
          fromPurpose: z.enum(['help', 'protect']),
          toPurpose: z.enum(['help', 'protect']),
          effect: z.enum(['allow', 'deny', 'requireReview']),
          approvalCount: z.number().int().gte(0).optional(),
          approved: z.boolean().optional(),
          silentReuseDetected: z.boolean().optional(),
          feeIncentiveNote: z.string().optional(),
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
const PolicyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              enabled: z.boolean(),
              fromPurpose: z.enum(['help', 'protect']),
              toPurpose: z.enum(['help', 'protect']),
              effect: z.enum(['allow', 'deny', 'requireReview']),
              approvalCount: z.number().int().gte(0).optional(),
              approved: z.boolean().optional(),
              silentReuseDetected: z.boolean().optional(),
              feeIncentiveNote: z.string().optional(),
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
const PolicyRuleCreate = z
  .object({
    name: z.string(),
    fromPurpose: z.enum(['help', 'protect']),
    toPurpose: z.enum(['help', 'protect']),
    effect: z.enum(['allow', 'deny', 'requireReview']),
    enabled: z.boolean().optional().default(true),
    feeIncentiveNote: z.string().optional(),
  })
  .passthrough();
const PolicyResponse = z
  .object({
    data: z
      .object({
        policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        enabled: z.boolean(),
        fromPurpose: z.enum(['help', 'protect']),
        toPurpose: z.enum(['help', 'protect']),
        effect: z.enum(['allow', 'deny', 'requireReview']),
        approvalCount: z.number().int().gte(0).optional(),
        approved: z.boolean().optional(),
        silentReuseDetected: z.boolean().optional(),
        feeIncentiveNote: z.string().optional(),
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
  createPolicy_Body,
  Problem,
  PolicyId,
  Purpose,
  PolicyEffect,
  PolicyRule,
  PolicyListData,
  ResponseMeta,
  PolicyListResponse,
  PolicyRuleCreate,
  PolicyResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/policies',
    alias: 'listPolicies',
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
                  policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  enabled: z.boolean(),
                  fromPurpose: z.enum(['help', 'protect']),
                  toPurpose: z.enum(['help', 'protect']),
                  effect: z.enum(['allow', 'deny', 'requireReview']),
                  approvalCount: z.number().int().gte(0).optional(),
                  approved: z.boolean().optional(),
                  silentReuseDetected: z.boolean().optional(),
                  feeIncentiveNote: z.string().optional(),
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
    path: '/v1/policies',
    alias: 'createPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPolicy_Body,
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
            policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            enabled: z.boolean(),
            fromPurpose: z.enum(['help', 'protect']),
            toPurpose: z.enum(['help', 'protect']),
            effect: z.enum(['allow', 'deny', 'requireReview']),
            approvalCount: z.number().int().gte(0).optional(),
            approved: z.boolean().optional(),
            silentReuseDetected: z.boolean().optional(),
            feeIncentiveNote: z.string().optional(),
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
    path: '/v1/policies/:policyId',
    alias: 'getPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            enabled: z.boolean(),
            fromPurpose: z.enum(['help', 'protect']),
            toPurpose: z.enum(['help', 'protect']),
            effect: z.enum(['allow', 'deny', 'requireReview']),
            approvalCount: z.number().int().gte(0).optional(),
            approved: z.boolean().optional(),
            silentReuseDetected: z.boolean().optional(),
            feeIncentiveNote: z.string().optional(),
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
    path: '/v1/policies/:policyId/approve',
    alias: 'approvePolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            enabled: z.boolean(),
            fromPurpose: z.enum(['help', 'protect']),
            toPurpose: z.enum(['help', 'protect']),
            effect: z.enum(['allow', 'deny', 'requireReview']),
            approvalCount: z.number().int().gte(0).optional(),
            approved: z.boolean().optional(),
            silentReuseDetected: z.boolean().optional(),
            feeIncentiveNote: z.string().optional(),
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
    method: 'post',
    path: '/v1/policies/:policyId/disable',
    alias: 'disablePolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            enabled: z.boolean(),
            fromPurpose: z.enum(['help', 'protect']),
            toPurpose: z.enum(['help', 'protect']),
            effect: z.enum(['allow', 'deny', 'requireReview']),
            approvalCount: z.number().int().gte(0).optional(),
            approved: z.boolean().optional(),
            silentReuseDetected: z.boolean().optional(),
            feeIncentiveNote: z.string().optional(),
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
