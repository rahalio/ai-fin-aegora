import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createOffer_Body = z
  .object({
    customerId: z.string().min(1).max(128),
    productCode: z.string().optional(),
    contentObjectId: z.string().optional(),
    channel: z.string().optional(),
  })
  .passthrough();
const overrideOffer_Body = z
  .object({
    reasonCode: z.string(),
    note: z.string().optional(),
    action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
  })
  .passthrough();
const createConsentRecord_Body = z
  .object({
    customerId: z.string().min(1).max(128),
    purpose: z.enum(['help', 'protect']),
    legalBasis: z.string().optional(),
    basisPresent: z.boolean(),
  })
  .passthrough();
const CustomerId = z.string();
const OfferStatus = z.enum([
  'ranked',
  'delivered',
  'blocked',
  'overridden',
  'heldForRm',
]);
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
const OfferId = z.string();
const ConsentRecordId = z.string();
const Offer = z
  .object({
    offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
    customerId: z.string().min(1).max(128),
    productCode: z.string().optional(),
    contentObjectId: z.string().optional(),
    status: z.enum([
      'ranked',
      'delivered',
      'blocked',
      'overridden',
      'heldForRm',
    ]),
    predictedUptake: z.number().optional(),
    constraintFlags: z
      .array(z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock']))
      .optional(),
    explanation: z.string().optional(),
    consentBasisPresent: z.boolean(),
    consentRecordId: z
      .string()
      .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    probabilityOfDefault: z.number().gte(0).lte(1).optional(),
    policyBlockReason: z.string().optional(),
    activeProtectHold: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const OfferListData = z
  .object({
    items: z.array(
      z
        .object({
          offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
          customerId: z.string().min(1).max(128),
          productCode: z.string().optional(),
          contentObjectId: z.string().optional(),
          status: z.enum([
            'ranked',
            'delivered',
            'blocked',
            'overridden',
            'heldForRm',
          ]),
          predictedUptake: z.number().optional(),
          constraintFlags: z
            .array(
              z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock'])
            )
            .optional(),
          explanation: z.string().optional(),
          consentBasisPresent: z.boolean(),
          consentRecordId: z
            .string()
            .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          probabilityOfDefault: z.number().gte(0).lte(1).optional(),
          policyBlockReason: z.string().optional(),
          activeProtectHold: z.boolean().optional(),
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
const OfferListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
              customerId: z.string().min(1).max(128),
              productCode: z.string().optional(),
              contentObjectId: z.string().optional(),
              status: z.enum([
                'ranked',
                'delivered',
                'blocked',
                'overridden',
                'heldForRm',
              ]),
              predictedUptake: z.number().optional(),
              constraintFlags: z
                .array(
                  z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock'])
                )
                .optional(),
              explanation: z.string().optional(),
              consentBasisPresent: z.boolean(),
              consentRecordId: z
                .string()
                .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              probabilityOfDefault: z.number().gte(0).lte(1).optional(),
              policyBlockReason: z.string().optional(),
              activeProtectHold: z.boolean().optional(),
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
const OfferCreate = z
  .object({
    customerId: z.string().min(1).max(128),
    productCode: z.string().optional(),
    contentObjectId: z.string().optional(),
    channel: z.string().optional(),
  })
  .passthrough();
const OfferResponse = z
  .object({
    data: z
      .object({
        offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
        customerId: z.string().min(1).max(128),
        productCode: z.string().optional(),
        contentObjectId: z.string().optional(),
        status: z.enum([
          'ranked',
          'delivered',
          'blocked',
          'overridden',
          'heldForRm',
        ]),
        predictedUptake: z.number().optional(),
        constraintFlags: z
          .array(z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock']))
          .optional(),
        explanation: z.string().optional(),
        consentBasisPresent: z.boolean(),
        consentRecordId: z
          .string()
          .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        probabilityOfDefault: z.number().gte(0).lte(1).optional(),
        policyBlockReason: z.string().optional(),
        activeProtectHold: z.boolean().optional(),
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
const OfferDeliver = z.object({ channel: z.string() }).partial().passthrough();
const OverrideId = z.string();
const Override = z
  .object({
    overrideId: z.string().regex(/^ovr_[0-9A-HJKMNP-TV-Z]{26}$/),
    offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
    reasonCode: z.string(),
    note: z.string().optional(),
    action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const OverrideListData = z
  .object({
    items: z.array(
      z
        .object({
          overrideId: z.string().regex(/^ovr_[0-9A-HJKMNP-TV-Z]{26}$/),
          offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
          reasonCode: z.string(),
          note: z.string().optional(),
          action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const OverrideListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              overrideId: z.string().regex(/^ovr_[0-9A-HJKMNP-TV-Z]{26}$/),
              offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
              reasonCode: z.string(),
              note: z.string().optional(),
              action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
              createdAt: z.string().datetime({ offset: true }),
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
const OverrideCreate = z
  .object({
    reasonCode: z.string(),
    note: z.string().optional(),
    action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
  })
  .passthrough();
const OverrideResponse = z
  .object({
    data: z
      .object({
        overrideId: z.string().regex(/^ovr_[0-9A-HJKMNP-TV-Z]{26}$/),
        offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
        reasonCode: z.string(),
        note: z.string().optional(),
        action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
        createdAt: z.string().datetime({ offset: true }),
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
const Purpose = z.enum(['help', 'protect']);
const ConsentRecord = z
  .object({
    consentRecordId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    customerId: z.string().min(1).max(128),
    purpose: z.enum(['help', 'protect']),
    legalBasis: z.string().optional(),
    basisPresent: z.boolean(),
    withdrawnAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ConsentListData = z
  .object({
    items: z.array(
      z
        .object({
          consentRecordId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
          customerId: z.string().min(1).max(128),
          purpose: z.enum(['help', 'protect']),
          legalBasis: z.string().optional(),
          basisPresent: z.boolean(),
          withdrawnAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ConsentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              consentRecordId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
              customerId: z.string().min(1).max(128),
              purpose: z.enum(['help', 'protect']),
              legalBasis: z.string().optional(),
              basisPresent: z.boolean(),
              withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
const ConsentRecordCreate = z
  .object({
    customerId: z.string().min(1).max(128),
    purpose: z.enum(['help', 'protect']),
    legalBasis: z.string().optional(),
    basisPresent: z.boolean(),
  })
  .passthrough();
const ConsentRecordResponse = z
  .object({
    data: z
      .object({
        consentRecordId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
        customerId: z.string().min(1).max(128),
        purpose: z.enum(['help', 'protect']),
        legalBasis: z.string().optional(),
        basisPresent: z.boolean(),
        withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
  createOffer_Body,
  overrideOffer_Body,
  createConsentRecord_Body,
  CustomerId,
  OfferStatus,
  Problem,
  OfferId,
  ConsentRecordId,
  Offer,
  OfferListData,
  ResponseMeta,
  OfferListResponse,
  OfferCreate,
  OfferResponse,
  OfferDeliver,
  OverrideId,
  Override,
  OverrideListData,
  OverrideListResponse,
  OverrideCreate,
  OverrideResponse,
  Purpose,
  ConsentRecord,
  ConsentListData,
  ConsentListResponse,
  ConsentRecordCreate,
  ConsentRecordResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/consent-records',
    alias: 'listConsentRecords',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  consentRecordId: z
                    .string()
                    .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                  customerId: z.string().min(1).max(128),
                  purpose: z.enum(['help', 'protect']),
                  legalBasis: z.string().optional(),
                  basisPresent: z.boolean(),
                  withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/consent-records',
    alias: 'createConsentRecord',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createConsentRecord_Body,
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
            consentRecordId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            purpose: z.enum(['help', 'protect']),
            legalBasis: z.string().optional(),
            basisPresent: z.boolean(),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/offers',
    alias: 'listOffers',
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
          .enum(['ranked', 'delivered', 'blocked', 'overridden', 'heldForRm'])
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
                  offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  customerId: z.string().min(1).max(128),
                  productCode: z.string().optional(),
                  contentObjectId: z.string().optional(),
                  status: z.enum([
                    'ranked',
                    'delivered',
                    'blocked',
                    'overridden',
                    'heldForRm',
                  ]),
                  predictedUptake: z.number().optional(),
                  constraintFlags: z
                    .array(
                      z.enum([
                        'travel',
                        'protectHold',
                        'consentGap',
                        'policyBlock',
                      ])
                    )
                    .optional(),
                  explanation: z.string().optional(),
                  consentBasisPresent: z.boolean(),
                  consentRecordId: z
                    .string()
                    .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  probabilityOfDefault: z.number().gte(0).lte(1).optional(),
                  policyBlockReason: z.string().optional(),
                  activeProtectHold: z.boolean().optional(),
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
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
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
    path: '/v1/offers',
    alias: 'createOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createOffer_Body,
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
            offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            productCode: z.string().optional(),
            contentObjectId: z.string().optional(),
            status: z.enum([
              'ranked',
              'delivered',
              'blocked',
              'overridden',
              'heldForRm',
            ]),
            predictedUptake: z.number().optional(),
            constraintFlags: z
              .array(
                z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock'])
              )
              .optional(),
            explanation: z.string().optional(),
            consentBasisPresent: z.boolean(),
            consentRecordId: z
              .string()
              .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            probabilityOfDefault: z.number().gte(0).lte(1).optional(),
            policyBlockReason: z.string().optional(),
            activeProtectHold: z.boolean().optional(),
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
    method: 'get',
    path: '/v1/offers/:offerId',
    alias: 'getOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'offerId',
        type: 'Path',
        schema: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            productCode: z.string().optional(),
            contentObjectId: z.string().optional(),
            status: z.enum([
              'ranked',
              'delivered',
              'blocked',
              'overridden',
              'heldForRm',
            ]),
            predictedUptake: z.number().optional(),
            constraintFlags: z
              .array(
                z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock'])
              )
              .optional(),
            explanation: z.string().optional(),
            consentBasisPresent: z.boolean(),
            consentRecordId: z
              .string()
              .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            probabilityOfDefault: z.number().gte(0).lte(1).optional(),
            policyBlockReason: z.string().optional(),
            activeProtectHold: z.boolean().optional(),
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
    path: '/v1/offers/:offerId/block',
    alias: 'blockOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'offerId',
        type: 'Path',
        schema: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            productCode: z.string().optional(),
            contentObjectId: z.string().optional(),
            status: z.enum([
              'ranked',
              'delivered',
              'blocked',
              'overridden',
              'heldForRm',
            ]),
            predictedUptake: z.number().optional(),
            constraintFlags: z
              .array(
                z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock'])
              )
              .optional(),
            explanation: z.string().optional(),
            consentBasisPresent: z.boolean(),
            consentRecordId: z
              .string()
              .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            probabilityOfDefault: z.number().gte(0).lte(1).optional(),
            policyBlockReason: z.string().optional(),
            activeProtectHold: z.boolean().optional(),
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
    path: '/v1/offers/:offerId/deliver',
    alias: 'deliverOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ channel: z.string() }).partial().passthrough(),
      },
      {
        name: 'offerId',
        type: 'Path',
        schema: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().min(1).max(128),
            productCode: z.string().optional(),
            contentObjectId: z.string().optional(),
            status: z.enum([
              'ranked',
              'delivered',
              'blocked',
              'overridden',
              'heldForRm',
            ]),
            predictedUptake: z.number().optional(),
            constraintFlags: z
              .array(
                z.enum(['travel', 'protectHold', 'consentGap', 'policyBlock'])
              )
              .optional(),
            explanation: z.string().optional(),
            consentBasisPresent: z.boolean(),
            consentRecordId: z
              .string()
              .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            probabilityOfDefault: z.number().gte(0).lte(1).optional(),
            policyBlockReason: z.string().optional(),
            activeProtectHold: z.boolean().optional(),
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
    method: 'get',
    path: '/v1/offers/:offerId/overrides',
    alias: 'listOfferOverrides',
    requestFormat: 'json',
    parameters: [
      {
        name: 'offerId',
        type: 'Path',
        schema: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  overrideId: z.string().regex(/^ovr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  reasonCode: z.string(),
                  note: z.string().optional(),
                  action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/offers/:offerId/overrides',
    alias: 'overrideOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: overrideOffer_Body,
      },
      {
        name: 'offerId',
        type: 'Path',
        schema: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            overrideId: z.string().regex(/^ovr_[0-9A-HJKMNP-TV-Z]{26}$/),
            offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
            reasonCode: z.string(),
            note: z.string().optional(),
            action: z.enum(['veto', 'soften', 'forceDeliver', 'defer']),
            createdAt: z.string().datetime({ offset: true }),
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
