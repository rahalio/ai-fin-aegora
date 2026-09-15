/**
 * Policies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/policies.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type PolicyEffect = components["schemas"]["PolicyEffect"];
export type PolicyId = components["schemas"]["PolicyId"];
export type PolicyListData = components["schemas"]["PolicyListData"];
export type PolicyRule = components["schemas"]["PolicyRule"];
export type PolicyRuleCreate = components["schemas"]["PolicyRuleCreate"];
export type Policy = components["schemas"]["PolicyResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePolicyRequestInput = NonNullable<operations["createPolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPoliciesParams = NonNullable<operations["listPolicies"]["parameters"]["query"]>;
export type GetPolicyParams = operations["getPolicy"]["parameters"]["path"];
export type ApprovePolicyParams = operations["approvePolicy"]["parameters"]["path"];
export type DisablePolicyParams = operations["disablePolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPoliciesResponse = operations["listPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreatePolicyResponse = operations["createPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetPolicyResponse = operations["getPolicy"]["responses"]["200"]["content"]["application/json"];
export type ApprovePolicyResponse = operations["approvePolicy"]["responses"]["200"]["content"]["application/json"];
export type DisablePolicyResponse = operations["disablePolicy"]["responses"]["200"]["content"]["application/json"];


