import React from "react";
import { format } from "date-fns";

export default function Profile(props) {
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
      <article className="p-5 bg-white rounded-lg shadow shadow-emerald-300">
        <img
          src={props.owner.avatar_url}
          alt={props.owner.login}
          className="w-20 h-20 rounded-full shadow"
        />
        <article className="flex items-center justify-start">
          <div className="ml-2">
            <h2 className="text-lg font-bold capitalize">
              {props.owner.login}
            </h2>
            <p className="text-sm mb-1">{props.name}</p>
            {props.private ? (
              <p className="bg-rose-400 py-1 px-2 text-xs text-white shadow rounded-lg inline-block">
                Private
              </p>
            ) : (
              <p className="bg-emerald-400 py-1 px-2 text-xs text-white shadow rounded-lg inline-block">
                Public
              </p>
            )}
          </div>
        </article>

        <div className="my-5">
          <p>
            This repository was created on{" "}
            {format(new Date(props.created_at), "dd MMM yyyy")} by{" "}
            {props.owner.login}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <a
            href={props.html_url}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          >
            View Repo
          </a>
          {props.homepage && (
            <a
              href={props.homepage}
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Visit Site
            </a>
          )}
          <ul>
            <li>{props.stargazers_count.toLocaleString()} stars</li>
            <li>{props.watchers_count.toLocaleString()} watchers</li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-5">
          <p className="bg-emerald-400 opacity-75 text-white py-1 px-2 rounded-lg shadow text-xs">
            {props.language}
          </p>
          <ul className="text-right">
            {props.topics.map((topic, index) => (
              <li
                key={index}
                className="bg-emerald-400 opacity-75 text-white py-1 px-2 rounded-lg shadow text-xs inline-block mx-1"
              >
                {topic}
              </li>
            ))}
          </ul>
          <p className="text-xs">{props.open_issues} issues</p>
        </div>
      </article>
    </>
  );
}
