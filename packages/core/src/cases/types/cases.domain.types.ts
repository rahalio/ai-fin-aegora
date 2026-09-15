/**
 * Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/cases.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CaseAssign = components["schemas"]["CaseAssign"];
export type CaseClose = components["schemas"]["CaseClose"];
export type CaseCreate = components["schemas"]["CaseCreate"];
export type CaseId = components["schemas"]["CaseId"];
export type CaseListData = components["schemas"]["CaseListData"];
export type CaseStatus = components["schemas"]["CaseStatus"];
export type IntrusionCase = components["schemas"]["IntrusionCase"];
export type Case = components["schemas"]["CaseResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenCaseRequestInput = NonNullable<operations["openCase"]["requestBody"]>["content"]["application/json"];
export type AssignCaseRequestInput = NonNullable<operations["assignCase"]["requestBody"]>["content"]["application/json"];
export type CloseCaseRequestInput = NonNullable<operations["closeCase"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCasesParams = NonNullable<operations["listCases"]["parameters"]["query"]>;
export type GetCaseParams = operations["getCase"]["parameters"]["path"];
export type AssignCaseParams = operations["assignCase"]["parameters"]["path"];
export type CloseCaseParams = operations["closeCase"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCasesResponse = operations["listCases"]["responses"]["200"]["content"]["application/json"];
export type OpenCaseResponse = operations["openCase"]["responses"]["201"]["content"]["application/json"];
export type GetCaseResponse = operations["getCase"]["responses"]["200"]["content"]["application/json"];
export type AssignCaseResponse = operations["assignCase"]["responses"]["200"]["content"]["application/json"];
export type CloseCaseResponse = operations["closeCase"]["responses"]["200"]["content"]["application/json"];


