import { useState, useEffect } from "react";
import Loading from "./Loading";
import Profile from "./Profile";

function App() {
  const [items, setItems] = useState([]);
  const [users] = useState("sertacgltkn");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.github.com/users/${users}/repos?page=1&per_page=10&sort=updated`
      );
      const data = await res.json();
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {!items ? (
        <Loading />
      ) : (
        <>
          <section className="py-20 pb-20">
            <h1 className="text-2xl font-bold">
              Viewing {users}'s repositories
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
  );
}

export default App;
