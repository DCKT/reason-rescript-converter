import { useState } from "react";
import axios from "axios";
import Head from "next/head";

const convertCode = (code) => {
  return axios
    .post("/api/reason-converter", {
      code,
    })
    .then(({ data: { result } }) => result);
};

const codeExample = `type test('a) = {
  value: 'a
}
`;

export default function ReScriptReasonFormat() {
  const [value, setValue] = useState("");
  const [{ loading, error, data }, setRequest] = useState({
    loading: false,
    error: null,
    data: null,
  });

  return (
    <div className="p-4 h-screen">
      <h1 className="text-4xl font-bold text-red-500 border-b mb-4 text-center pb-2 flex flex-row justify-center items-center">
        <img
          className="w-8 mr-4"
          src="https://rescript-lang.org/static/nav-logo@2x.png"
        />
        ReasonML > ReScript converter
      </h1>
      <div className="flex flex-row  h-2/3">
        <form
          className="w-1/2"
          onSubmit={(e) => {
            e.preventDefault();
            setRequest((state) => ({ ...state, loading: true }));
            convertCode(value)
              .then((data) =>
                setRequest((r) => ({ error: null, loading: false, data }))
              )
              .catch((error) =>
                setRequest((r) => ({ error, loading: false, data: null }))
              );
          }}
        >
          <textarea
            required={true}
            className="border w-full h-full p-2 mb-2 rounded"
            value={value}
            placeholder={codeExample}
            onChange={(event) => {
              const value = event.target.value;

              setValue((_) => value);
            }}
          ></textarea>
          <button
            type="submit"
            className="bg-red-400 p-2 px-4 rounded text-2xl text-white shadow border border-red-500 ml-auto block flex flex-row items-center"
          >
            {loading ? (
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            Convert
          </button>
        </form>
        <div className="border-l ml-4 pl-4 w-1/2">
          <h2 className="text-3xl font-bold border-b mb-4">Result</h2>
          {error ? (
            <p className="text-danger-400 font-semibold">{error}</p>
          ) : null}
          <pre>
            <code className="bg-gray-100 w-full p-4 block">{data}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
