import { HomePage } from "@/pages/home/HomePage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Toast from "react-native-toast-message";

const client = new ApolloClient({
  uri: "http://192.168.1.24:4000", // ❗️PAS localhost
  cache: new InMemoryCache(),
});
export default function Index() {
  return (
    <>
      <ApolloProvider client={client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <HomePage />
        </ApplicationProvider>
      </ApolloProvider>
      <Toast />
    </>
  );
}
