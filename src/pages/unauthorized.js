import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title={"Unauthorized Page"}>
      <h1 className="text-xl">Accecc Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}
