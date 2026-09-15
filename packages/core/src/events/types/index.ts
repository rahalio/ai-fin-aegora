/**
 * Events Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/events.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Event = components["schemas"]["Event"];
export type EventId = components["schemas"]["EventId"];
export type EventIngest = components["schemas"]["EventIngest"];
export type EventListData = components["schemas"]["EventListData"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IngestEventRequestInput = NonNullable<operations["ingestEvent"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListEventsParams = NonNullable<operations["listEvents"]["parameters"]["query"]>;
export type GetEventParams = operations["getEvent"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListEventsResponse = operations["listEvents"]["responses"]["200"]["content"]["application/json"];
export type IngestEventResponse = operations["ingestEvent"]["responses"]["202"]["content"]["application/json"];
export type GetEventResponse = operations["getEvent"]["responses"]["200"]["content"]["application/json"];


