/**
 * @generated SignedSource<<1ce0add776bac8c5c4336213cee3a99b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type Status = "COMPLETED" | "PENDING" | "%future added value";
export type CreateTaskInput = {
  description?: string | null | undefined;
  title: string;
};
export type NewTaskFormCreateMutation$variables = {
  input: CreateTaskInput;
};
export type NewTaskFormCreateMutation$data = {
  readonly createTask: {
    readonly task: {
      readonly description: string;
      readonly id: string;
      readonly status: Status;
      readonly title: string;
    };
  };
};
export type NewTaskFormCreateMutation = {
  response: NewTaskFormCreateMutation$data;
  variables: NewTaskFormCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TaskPayload",
    "kind": "LinkedField",
    "name": "createTask",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewTaskFormCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewTaskFormCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c936583ad83f009c6fbfb9f9f43538d9",
    "id": null,
    "metadata": {},
    "name": "NewTaskFormCreateMutation",
    "operationKind": "mutation",
    "text": "mutation NewTaskFormCreateMutation(\n  $input: CreateTaskInput!\n) {\n  createTask(input: $input) {\n    task {\n      id\n      title\n      description\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "27c0a662c4df93536302d87c81f35e2a";

export default node;
