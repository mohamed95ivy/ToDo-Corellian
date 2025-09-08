/**
 * @generated SignedSource<<f46ed1d60cf6c8372e49004d53abf4e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type Status = "COMPLETED" | "PENDING" | "%future added value";
export type TaskSubscriptionsUpdatedSubscription$variables = Record<PropertyKey, never>;
export type TaskSubscriptionsUpdatedSubscription$data = {
  readonly taskUpdated: {
    readonly id: string;
    readonly status: Status;
  };
};
export type TaskSubscriptionsUpdatedSubscription = {
  response: TaskSubscriptionsUpdatedSubscription$data;
  variables: TaskSubscriptionsUpdatedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "taskUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskSubscriptionsUpdatedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TaskSubscriptionsUpdatedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ff6fb860a64cbf87da6c0a2741f606ab",
    "id": null,
    "metadata": {},
    "name": "TaskSubscriptionsUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription TaskSubscriptionsUpdatedSubscription {\n  taskUpdated {\n    id\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "0fecdec268399feefa32a2bf2b3f6718";

export default node;
