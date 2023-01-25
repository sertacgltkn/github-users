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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a GitHub username"
        />
        <button type="submit">Search</button>
      </form>
      {!searchTerm ? (
        <p>Please enter a GitHub username</p>
      ) : (
        <>
          {!items ? (
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
