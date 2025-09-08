/**
 * @generated SignedSource<<32815acfd5bd1e0acd88899a6c5c5450>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type Status = "COMPLETED" | "PENDING" | "%future added value";
export type TaskSubscriptionsCreatedSubscription$variables = Record<PropertyKey, never>;
export type TaskSubscriptionsCreatedSubscription$data = {
  readonly taskCreated: {
    readonly description: string;
    readonly id: string;
    readonly status: Status;
    readonly title: string;
  };
};
export type TaskSubscriptionsCreatedSubscription = {
  response: TaskSubscriptionsCreatedSubscription$data;
  variables: TaskSubscriptionsCreatedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "taskCreated",
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
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "TaskSubscriptionsCreatedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TaskSubscriptionsCreatedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3b0b3d2d913c811f34c45b4f1ce6bb12",
    "id": null,
    "metadata": {},
    "name": "TaskSubscriptionsCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription TaskSubscriptionsCreatedSubscription {\n  taskCreated {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "36e4f860ff460a81a72069aec6b96d7e";

export default node;
