import React from "react";
import { format } from "date-fns";

export default function Profile({
  owner,
  name,
  private: isPrivate,
  created_at,
  html_url,
  homepage,
  forks_count,
  stargazers_count,
  watchers_count,
  language,
  topics,
  open_issues
}) {
  const languageColor = (language) => {
    switch (language) {
      case "JavaScript":
        return "bg-yellow-500";
      case "TypeScript":
        return "bg-blue-500";
      default:
        return "bg-emerald-400";
    }
  };
  return (
    <>
      <article className="p-5 bg-white rounded-lg shadow shadow-pink-300">
        <img
          src={owner.avatar_url}
          alt={owner.login}
          className="w-20 h-20 rounded-full shadow"
        />
        <article className="flex items-center justify-start">
          <div className="ml-2">
            <h2 className="text-lg font-bold capitalize">
              {owner.login}
            </h2>
            <p className="text-sm mb-1">{name}</p>
            {isPrivate ? (
              <p className="bg-rose-400 py-1 px-2 text-xs text-white shadow rounded-lg inline-block">
                Private
              </p>
            ) : (
              <p className="bg-green-400 py-1 px-2 text-xs text-zinc-900 shadow rounded-lg inline-block">
                Public
              </p>
            )}
          </div>
        </article>

        <div className="my-5">
          <p>
            This repository was created on{" "}
            {format(new Date(created_at), "dd MMM yyyy")} by {owner.login}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <a
            href={html_url}
            target="_blank"
            rel="noreferrer"
            className="bg-green-900 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full mr-2"
          >
            View Repo
          </a>
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noreferrer"
              className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full"
            >
              Visit Site
            </a>
          )}
          <ul>
            <li>{forks_count} forks</li>
            <li>{stargazers_count.toLocaleString()} stars</li>
            <li>{watchers_count.toLocaleString()} watchers</li>
          </ul>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center">
            <span
              className={`w-3 h-3 rounded-full mr-2 ${languageColor(language)}`}
            ></span>
            <p className="text-sm">{language}</p>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2 bg-rose-400"></span>
            <p className="text-sm">{open_issues.toLocaleString()} open issues</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-5">
          {topics.map((topic) => (
            <span

              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-full mr-2 mb-2"
            >
              {topic}
            </span>
          ))}
        </div>
      </article>
    </>
  );
}

