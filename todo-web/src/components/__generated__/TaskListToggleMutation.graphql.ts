/**
 * @generated SignedSource<<479f6ef3295b599f8819093e4eb5b3bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type Status = "COMPLETED" | "PENDING" | "%future added value";
export type TaskListToggleMutation$variables = {
  id: string;
  status: Status;
};
export type TaskListToggleMutation$data = {
  readonly updateTaskStatus: {
    readonly task: {
      readonly id: string;
      readonly status: Status;
    };
  };
};
export type TaskListToggleMutation = {
  response: TaskListToggleMutation$data;
  variables: TaskListToggleMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "status",
        "variableName": "status"
      }
    ],
    "concreteType": "TaskPayload",
    "kind": "LinkedField",
    "name": "updateTaskStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "task",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskListToggleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskListToggleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ad5bd05691b3c176283c90963d961814",
    "id": null,
    "metadata": {},
    "name": "TaskListToggleMutation",
    "operationKind": "mutation",
    "text": "mutation TaskListToggleMutation(\n  $id: ID!\n  $status: Status!\n) {\n  updateTaskStatus(id: $id, status: $status) {\n    task {\n      id\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b73ad6fbbd431dc1a6d810106e183d56";

export default node;
