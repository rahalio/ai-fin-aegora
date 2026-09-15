/**
 * Holds Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/holds.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Dispute = components["schemas"]["Dispute"];
export type DisputeCreate = components["schemas"]["DisputeCreate"];
export type DisputeId = components["schemas"]["DisputeId"];
export type DisputeListData = components["schemas"]["DisputeListData"];
export type DisputeResolve = components["schemas"]["DisputeResolve"];
export type DisputeStatus = components["schemas"]["DisputeStatus"];
export type HoldCreate = components["schemas"]["HoldCreate"];
export type HoldId = components["schemas"]["HoldId"];
export type HoldListData = components["schemas"]["HoldListData"];
export type HoldRelease = components["schemas"]["HoldRelease"];
export type HoldStatus = components["schemas"]["HoldStatus"];
export type ProvisionalHold = components["schemas"]["ProvisionalHold"];
export type Hold = components["schemas"]["HoldResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateHoldRequestInput = NonNullable<operations["createHold"]["requestBody"]>["content"]["application/json"];
export type ReleaseHoldRequestInput = NonNullable<operations["releaseHold"]["requestBody"]>["content"]["application/json"];
export type CreateHoldDisputeRequestInput = NonNullable<operations["createHoldDispute"]["requestBody"]>["content"]["application/json"];
export type ResolveDisputeRequestInput = NonNullable<operations["resolveDispute"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListHoldsParams = NonNullable<operations["listHolds"]["parameters"]["query"]>;
export type GetHoldParams = operations["getHold"]["parameters"]["path"];
export type ConfirmHoldParams = operations["confirmHold"]["parameters"]["path"];
export type ReleaseHoldParams = operations["releaseHold"]["parameters"]["path"];
export type ListHoldDisputesParams = operations["listHoldDisputes"]["parameters"]["path"];
export type CreateHoldDisputeParams = operations["createHoldDispute"]["parameters"]["path"];
export type ResolveDisputeParams = operations["resolveDispute"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListHoldsResponse = operations["listHolds"]["responses"]["200"]["content"]["application/json"];
export type CreateHoldResponse = operations["createHold"]["responses"]["201"]["content"]["application/json"];
export type GetHoldResponse = operations["getHold"]["responses"]["200"]["content"]["application/json"];
export type ConfirmHoldResponse = operations["confirmHold"]["responses"]["200"]["content"]["application/json"];
export type ReleaseHoldResponse = operations["releaseHold"]["responses"]["200"]["content"]["application/json"];
export type ListHoldDisputesResponse = operations["listHoldDisputes"]["responses"]["200"]["content"]["application/json"];
export type CreateHoldDisputeResponse = operations["createHoldDispute"]["responses"]["201"]["content"]["application/json"];
export type ResolveDisputeResponse = operations["resolveDispute"]["responses"]["200"]["content"]["application/json"];


