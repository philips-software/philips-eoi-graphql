import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { GRAPHQL_WS_API_URL, GRAPHQL_API_URL, GRAPHQL_ACCESS_KEY } from "../config/config";

export const generateClient = () => {
    const cache = new InMemoryCache();
    const httpLink = new HttpLink({
        uri: GRAPHQL_API_URL,
        headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": GRAPHQL_ACCESS_KEY
        },
    });

    // Create a WebSocket link:
    const wsLink = new WebSocketLink(
        new SubscriptionClient(
            GRAPHQL_WS_API_URL,
            {
                timeout: 30000,
                lazy: true,
                reconnect: true,
                connectionParams: {
                    headers: {
                        "content-type": "application/json",
                        "x-hasura-access-key": GRAPHQL_ACCESS_KEY
                    },
                },
            },
        ),
    );

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink,
    );

    const graphqlClient = new ApolloClient({ link, cache });
    return graphqlClient
}