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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-yellow-400 text-black hover:bg-amber-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Search
        </button>
      </form>

      {!searchTerm ? (
        <p className="text-yellow-400	">Please enter a GitHub username</p>
      ) : (
        <>
          {items.length === 0 ? (
            <Loading />
          ) : (
            <div className="flex justify-end">
              <section className="py-20 pb-20">
                <h1 className="text-2xl font-bold text-yellow-400	">
                  Viewing {searchTerm}'s repositories
                </h1>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
                  {items.map((item) => (
                    <Profile key={item.id} {...item} />
                  ))}
                </div>
              </section>
              <button className="fixed bottom-0 right-10 mb-4 ml-4 text-yellow-400 font-medium py-1 px-2 rounded-full border border-yellow-400 hover:text-neutral-900 hover:bg-yellow-400 rounded-full" onClick={scrollToTop}>Go to top</button>
            </div>
          )}
          
        </>
      )}
      
    </>
  );
}

export default App;
