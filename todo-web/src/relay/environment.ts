import { Environment, Network, RecordSource, Store, Observable } from "relay-runtime";
import type { RequestParameters, Variables, GraphQLResponse } from "relay-runtime";
import { createClient } from "graphql-ws";

const HTTP_URL = "http://localhost:5292/graphql";  // <-- your API URL
const WS_URL   = "ws://localhost:5292/graphql";
console.log(HTTP_URL);
console.log(WS_URL);

// HTTP for queries/mutations (keep your robust version if you added it)
async function fetchQuery(
  params: RequestParameters,
  variables: Variables
): Promise<GraphQLResponse> {
  const res = await fetch(HTTP_URL, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ query: params.text, variables }),
  });
  const raw = await res.text();
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status} ${res.statusText}: ${raw}`);
  return JSON.parse(raw);
}

// WS for subscriptions — MUST return a Relay Observable
const wsClient = createClient({ url: WS_URL });

function subscribe(operation: RequestParameters, variables: Variables) {
  return Observable.create<GraphQLResponse>((sink) => {
    // graphql-ws returns an unsubscribe function; return it for disposal
    const dispose = wsClient.subscribe(
      { query: operation.text as string, variables },
      {
        next: (data) => sink.next(data as GraphQLResponse),
        error: (err: Error) => sink.error(err),
        complete: () => sink.complete(),
      }
    );
    return dispose; // Relay will call this on unmount
  });
}

export default new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
});
