import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openCase_Body = z
  .object({
    hostIds: z.array(z.string()).optional(),
    summary: z.string(),
    alertId: z.string().optional(),
  })
  .passthrough();
const closeCase_Body = z
  .object({ resolution: z.string(), siemTicketId: z.string() })
  .partial()
  .passthrough();
const CaseStatus = z.enum(['open', 'investigating', 'closed']);
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
const CaseId = z.string();
const IntrusionCase = z
  .object({
    caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
    hostIds: z.array(z.string()).optional(),
    status: z.enum(['open', 'investigating', 'closed']),
    summary: z.string(),
    hostTimeline: z.array(z.object({}).partial().passthrough()).optional(),
    assignedTo: z.string().optional(),
    siemTicketId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CaseListData = z
  .object({
    items: z.array(
      z
        .object({
          caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
          hostIds: z.array(z.string()).optional(),
          status: z.enum(['open', 'investigating', 'closed']),
          summary: z.string(),
          hostTimeline: z
            .array(z.object({}).partial().passthrough())
            .optional(),
          assignedTo: z.string().optional(),
          siemTicketId: z.string().optional(),
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
const CaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
              hostIds: z.array(z.string()).optional(),
              status: z.enum(['open', 'investigating', 'closed']),
              summary: z.string(),
              hostTimeline: z
                .array(z.object({}).partial().passthrough())
                .optional(),
              assignedTo: z.string().optional(),
              siemTicketId: z.string().optional(),
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
const CaseCreate = z
  .object({
    hostIds: z.array(z.string()).optional(),
    summary: z.string(),
    alertId: z.string().optional(),
  })
  .passthrough();
const CaseResponse = z
  .object({
    data: z
      .object({
        caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
        hostIds: z.array(z.string()).optional(),
        status: z.enum(['open', 'investigating', 'closed']),
        summary: z.string(),
        hostTimeline: z.array(z.object({}).partial().passthrough()).optional(),
        assignedTo: z.string().optional(),
        siemTicketId: z.string().optional(),
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
const CaseAssign = z.object({ assignedTo: z.string() }).passthrough();
const CaseClose = z
  .object({ resolution: z.string(), siemTicketId: z.string() })
  .partial()
  .passthrough();

export const schemas: any = {
  openCase_Body,
  closeCase_Body,
  CaseStatus,
  Problem,
  CaseId,
  IntrusionCase,
  CaseListData,
  ResponseMeta,
  CaseListResponse,
  CaseCreate,
  CaseResponse,
  CaseAssign,
  CaseClose,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/cases',
    alias: 'listCases',
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
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'investigating', 'closed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
                  hostIds: z.array(z.string()).optional(),
                  status: z.enum(['open', 'investigating', 'closed']),
                  summary: z.string(),
                  hostTimeline: z
                    .array(z.object({}).partial().passthrough())
                    .optional(),
                  assignedTo: z.string().optional(),
                  siemTicketId: z.string().optional(),
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
    path: '/v1/cases',
    alias: 'openCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openCase_Body,
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
            caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
            hostIds: z.array(z.string()).optional(),
            status: z.enum(['open', 'investigating', 'closed']),
            summary: z.string(),
            hostTimeline: z
              .array(z.object({}).partial().passthrough())
              .optional(),
            assignedTo: z.string().optional(),
            siemTicketId: z.string().optional(),
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
    path: '/v1/cases/:caseId',
    alias: 'getCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
            hostIds: z.array(z.string()).optional(),
            status: z.enum(['open', 'investigating', 'closed']),
            summary: z.string(),
            hostTimeline: z
              .array(z.object({}).partial().passthrough())
              .optional(),
            assignedTo: z.string().optional(),
            siemTicketId: z.string().optional(),
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
    path: '/v1/cases/:caseId/assign',
    alias: 'assignCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ assignedTo: z.string() }).passthrough(),
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
            hostIds: z.array(z.string()).optional(),
            status: z.enum(['open', 'investigating', 'closed']),
            summary: z.string(),
            hostTimeline: z
              .array(z.object({}).partial().passthrough())
              .optional(),
            assignedTo: z.string().optional(),
            siemTicketId: z.string().optional(),
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
    path: '/v1/cases/:caseId/close',
    alias: 'closeCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: closeCase_Body,
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
            hostIds: z.array(z.string()).optional(),
            status: z.enum(['open', 'investigating', 'closed']),
            summary: z.string(),
            hostTimeline: z
              .array(z.object({}).partial().passthrough())
              .optional(),
            assignedTo: z.string().optional(),
            siemTicketId: z.string().optional(),
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
