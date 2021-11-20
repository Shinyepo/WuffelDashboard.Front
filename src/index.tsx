import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { GetGuildsDocument, GetGuildsQuery, LogoutMutation, MeDocument, MeQuery } from "./generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
const client = createClient({
  
  url: "http://192.168.1.14:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.logout) {
                  return {
                    me: null,
                  };
                } else {
                  return query
                }
              }
            );
            betterUpdateQuery<LogoutMutation, GetGuildsQuery>(
              cache,
              { query: GetGuildsDocument },
              _result,
              (result, query) => {
                if (result.logout) {
                  return {
                    guilds: null,
                  };
                } else {
                  return query
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

ReactDOM.render(
  // <React.StrictMode>
  <Provider value={client}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>,
  /* <App /> */
  /* </React.StrictMode>, */
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
