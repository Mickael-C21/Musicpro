import { Layout } from "./Layout";
import { NotFound } from "../pages/NotFound";

export function ErrorBoundary() {
  return (
    <Layout>
      <NotFound />
    </Layout>
  );
}
