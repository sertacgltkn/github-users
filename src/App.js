import { useState, useEffect } from "react";
import Loading from "./Loading";
import Profile from "./Profile";

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const res = await fetch(
      `https://api.github.com/users/${searchTerm}/repos?page=1&per_page=12&sort=updated`
    );
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-200 rounded-lg p-2 flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a GitHub username"
          className="px-3 py-2 rounded-lg text-gray-700 bg-white focus:outline-none focus:shadow-outline flex-1"
        />
        <button type="submit" className="px-5 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-900 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Search</button>
      </form>

      {!searchTerm ? (
        <p>Please enter a GitHub username</p>
      ) : (
        <>
          {items.length === 0 ? (
            <Loading />
          ) : (
            <>
              <section className="py-20 pb-20">
                <h1 className="text-2xl font-bold">
                  Viewing {searchTerm}'s repositories
                </h1>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
                  {items.map((item) => (
                    <Profile key={item.id} {...item} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );

}

export default App;