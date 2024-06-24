// News.js

import React, { useEffect, useState } from 'react';

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const apiKey = 'your api'; // Replace with your actual API key
            const apiUrl = `https://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setArticles(data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold text-center mb-8">Tech News</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {articles.map(article => (
                        <div key={article.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover object-center" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                                <p className="text-gray-700 mb-2 line-clamp-3">{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
