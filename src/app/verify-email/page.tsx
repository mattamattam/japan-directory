import { Suspense } from "react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import VerifyEmailClient from "./VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <Layout>
      <Suspense fallback={<VerifyEmailLoading />}>
        <VerifyEmailClient />
      </Suspense>
    </Layout>
  );
}

function VerifyEmailLoading() {
  return (
    <>
      <Breadcrumb
        items={[
          {
            label: "Verify Email",
          },
        ]}
      />
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Loading...
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-100">
              Please wait while we load the verification page...
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
