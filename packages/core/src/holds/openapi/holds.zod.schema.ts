import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createHold_Body = z
  .object({
    customerId: z.string().min(1).max(128),
    alertId: z.string().optional(),
    reason: z.string(),
    customerSafeRationale: z.string().optional(),
  })
  .passthrough();
const releaseHold_Body = z
  .object({ reasonCode: z.string(), note: z.string().optional() })
  .passthrough();
const resolveDispute_Body = z
  .object({ resolution: z.string(), restoreService: z.boolean().optional() })
  .passthrough();
const CustomerId = z.string();
const HoldStatus = z.enum(['active', 'confirmed', 'released', 'expired']);
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
const HoldId = z.string();
const ProvisionalHold = z
  .object({
    holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
    customerId: z.string().min(1).max(128),
    alertId: z.string().optional(),
    status: z.enum(['active', 'confirmed', 'released', 'expired']),
    reason: z.string().optional(),
    customerSafeRationale: z.string().optional(),
    disputeWindowEndsAt: z.string().datetime({ offset: true }).optional(),
    falsePositive: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const HoldListData = z
  .object({
    items: z.array(
      z
        .object({
          holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
          customerId: z.string().min(1).max(128),
          alertId: z.string().optional(),
          status: z.enum(['active', 'confirmed', 'released', 'expired']),
          reason: z.string().optional(),
          customerSafeRationale: z.string().optional(),
          disputeWindowEndsAt: z.string().datetime({ offset: true }).optional(),
          falsePositive: z.boolean().optional(),
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
const HoldListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
              customerId: z.string().min(1).max(128),
              alertId: z.string().optional(),
              status: z.enum(['active', 'confirmed', 'released', 'expired']),
              reason: z.string().optional(),
              customerSafeRationale: z.string().optional(),
              disputeWindowEndsAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              falsePositive: z.boolean().optional(),
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
const HoldCreate = z
  .object({
    customerId: z.string().min(1).max(128),
    alertId: z.string().optional(),
    reason: z.string(),
    customerSafeRationale: z.string().optional(),
  })
  .passthrough();
const HoldResponse = z
  .object({
    data: z
      .object({
        holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
        customerId: z.string().min(1).max(128),
        alertId: z.string().optional(),
        status: z.enum(['active', 'confirmed', 'released', 'expired']),
        reason: z.string().optional(),
        customerSafeRationale: z.string().optional(),
        disputeWindowEndsAt: z.string().datetime({ offset: true }).optional(),
        falsePositive: z.boolean().optional(),
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
const HoldRelease = z
  .object({ reasonCode: z.string(), note: z.string().optional() })
  .passthrough();
const DisputeId = z.string();
const DisputeStatus = z.enum(['open', 'resolved', 'expired', 'escalated']);
const Dispute = z
  .object({
    disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
    holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['open', 'resolved', 'expired', 'escalated']),
    resolution: z.string().optional(),
    windowEndsAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DisputeListData = z
  .object({
    items: z.array(
      z
        .object({
          disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
          holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['open', 'resolved', 'expired', 'escalated']),
          resolution: z.string().optional(),
          windowEndsAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const DisputeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
              holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['open', 'resolved', 'expired', 'escalated']),
              resolution: z.string().optional(),
              windowEndsAt: z.string().datetime({ offset: true }).optional(),
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
const DisputeCreate = z.object({ note: z.string() }).partial().passthrough();
const DisputeResponse = z
  .object({
    data: z
      .object({
        disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
        holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['open', 'resolved', 'expired', 'escalated']),
        resolution: z.string().optional(),
        windowEndsAt: z.string().datetime({ offset: true }).optional(),
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
const DisputeResolve = z
  .object({ resolution: z.string(), restoreService: z.boolean().optional() })
  .passthrough();

export const schemas: any = {
  createHold_Body,
  releaseHold_Body,
  resolveDispute_Body,
  CustomerId,
  HoldStatus,
  Problem,
  HoldId,
  ProvisionalHold,
  HoldListData,
  ResponseMeta,
  HoldListResponse,
  HoldCreate,
  HoldResponse,
  HoldRelease,
  DisputeId,
  DisputeStatus,
  Dispute,
  DisputeListData,
  DisputeListResponse,
  DisputeCreate,
  DisputeResponse,
  DisputeResolve,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/disputes/:disputeId/resolve',
    alias: 'resolveDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: resolveDispute_Body,
      },
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['open', 'resolved', 'expired', 'escalated']),
            resolution: z.string().optional(),
            windowEndsAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/holds',
    alias: 'listHolds',
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
        name: 'customerId',
        type: 'Query',
        schema: z.string().min(1).max(128).optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['active', 'confirmed', 'released', 'expired'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
                  customerId: z.string().min(1).max(128),
                  alertId: z.string().optional(),
                  status: z.enum([
                    'active',
                    'confirmed',
                    'released',
                    'expired',
                  ]),
                  reason: z.string().optional(),
                  customerSafeRationale: z.string().optional(),
                  disputeWindowEndsAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  falsePositive: z.boolean().optional(),
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
    path: '/v1/holds',
    alias: 'createHold',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createHold_Body,
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
            holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            alertId: z.string().optional(),
            status: z.enum(['active', 'confirmed', 'released', 'expired']),
            reason: z.string().optional(),
            customerSafeRationale: z.string().optional(),
            disputeWindowEndsAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            falsePositive: z.boolean().optional(),
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
    path: '/v1/holds/:holdId',
    alias: 'getHold',
    requestFormat: 'json',
    parameters: [
      {
        name: 'holdId',
        type: 'Path',
        schema: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            alertId: z.string().optional(),
            status: z.enum(['active', 'confirmed', 'released', 'expired']),
            reason: z.string().optional(),
            customerSafeRationale: z.string().optional(),
            disputeWindowEndsAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            falsePositive: z.boolean().optional(),
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
    path: '/v1/holds/:holdId/confirm',
    alias: 'confirmHold',
    requestFormat: 'json',
    parameters: [
      {
        name: 'holdId',
        type: 'Path',
        schema: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            alertId: z.string().optional(),
            status: z.enum(['active', 'confirmed', 'released', 'expired']),
            reason: z.string().optional(),
            customerSafeRationale: z.string().optional(),
            disputeWindowEndsAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            falsePositive: z.boolean().optional(),
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
    path: '/v1/holds/:holdId/disputes',
    alias: 'listHoldDisputes',
    requestFormat: 'json',
    parameters: [
      {
        name: 'holdId',
        type: 'Path',
        schema: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['open', 'resolved', 'expired', 'escalated']),
                  resolution: z.string().optional(),
                  windowEndsAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/holds/:holdId/disputes',
    alias: 'createHoldDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ note: z.string() }).partial().passthrough(),
      },
      {
        name: 'holdId',
        type: 'Path',
        schema: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['open', 'resolved', 'expired', 'escalated']),
            resolution: z.string().optional(),
            windowEndsAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/holds/:holdId/release',
    alias: 'releaseHold',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: releaseHold_Body,
      },
      {
        name: 'holdId',
        type: 'Path',
        schema: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            holdId: z.string().regex(/^hld_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            alertId: z.string().optional(),
            status: z.enum(['active', 'confirmed', 'released', 'expired']),
            reason: z.string().optional(),
            customerSafeRationale: z.string().optional(),
            disputeWindowEndsAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            falsePositive: z.boolean().optional(),
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
