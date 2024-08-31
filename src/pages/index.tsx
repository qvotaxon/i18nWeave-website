import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="h-screen flex items-center justify-center bg-blue-500 snap-start">
        <h1 className="text-white text-4xl">Section 1</h1>
      </section>
      <section className="h-screen flex items-center justify-center bg-green-500 snap-start">
        <h1 className="text-white text-4xl">Section 2</h1>
      </section>
      <section className="h-screen flex items-center justify-center bg-red-500 snap-start">
        <h1 className="text-white text-4xl">Section 3</h1>
      </section>
      <section className="h-screen flex items-center justify-center bg-yellow-500 snap-start">
        <h1 className="text-white text-4xl">Section 4</h1>
      </section>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
