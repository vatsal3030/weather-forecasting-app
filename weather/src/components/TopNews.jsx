import React, { useState, useEffect } from "react";

const dummyNews = [
  {
    id: 1,
    title: "Heavy Rainfall Expected in North Region",
    description:
      "The meteorological department has issued a warning for heavy rainfall in the northern region over the weekend. Residents are advised to stay indoors and take necessary precautions.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 2,
    title: "Heatwave Strikes Southern States",
    description:
      "Temperatures have soared to record highs in the southern states. Authorities are urging people to stay hydrated and avoid outdoor activities during peak hours.",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 3,
    title: "Snowstorm Alert for Mountainous Areas",
    description:
      "A strong snowstorm is predicted in the mountainous areas this week. Tourists and residents are advised to avoid travel and stay safe.",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
];

const TopNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Simulating API call delay
    setTimeout(() => {
      setNews(dummyNews);
    }, 1000);
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Top News</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300 mb-4">
                  {item.description.substring(0, 100)}...
                </p>
                <a
                  href={item.link}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">Loading news...</p>
        )}
      </div>
    </div>
  );
};

export default TopNews;
