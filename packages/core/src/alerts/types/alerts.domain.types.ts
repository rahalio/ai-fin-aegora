/**
 * Alerts Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/alerts.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AlertAction = components["schemas"]["AlertAction"];
export type AlertId = components["schemas"]["AlertId"];
export type AlertListData = components["schemas"]["AlertListData"];
export type AlertStatus = components["schemas"]["AlertStatus"];
export type ProtectAlert = components["schemas"]["ProtectAlert"];
export type Alert = components["schemas"]["AlertResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateAlertRequestInput = NonNullable<operations["createAlert"]["requestBody"]>["content"]["application/json"];
export type SuppressAlertRequestInput = NonNullable<operations["suppressAlert"]["requestBody"]>["content"]["application/json"];
export type EscalateAlertRequestInput = NonNullable<operations["escalateAlert"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAlertsParams = NonNullable<operations["listAlerts"]["parameters"]["query"]>;
export type GetAlertParams = operations["getAlert"]["parameters"]["path"];
export type SuppressAlertParams = operations["suppressAlert"]["parameters"]["path"];
export type EscalateAlertParams = operations["escalateAlert"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAlertsResponse = operations["listAlerts"]["responses"]["200"]["content"]["application/json"];
export type CreateAlertResponse = operations["createAlert"]["responses"]["201"]["content"]["application/json"];
export type GetAlertResponse = operations["getAlert"]["responses"]["200"]["content"]["application/json"];
export type SuppressAlertResponse = operations["suppressAlert"]["responses"]["200"]["content"]["application/json"];
export type EscalateAlertResponse = operations["escalateAlert"]["responses"]["200"]["content"]["application/json"];


