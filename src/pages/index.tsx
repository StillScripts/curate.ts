import { type NextPage } from "next";
import Head from "next/head";
import { QuizProvider } from "../components/kyliesQuiz/app/QuizContext";
import Quiz from "../components/kyliesQuiz/Quiz";
import { quiz } from "../utils/curator/example";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <QuizProvider quiz={quiz}>
            <Quiz />
          </QuizProvider>
        </div>
      </main>
    </>
  );
};

export default Home;
