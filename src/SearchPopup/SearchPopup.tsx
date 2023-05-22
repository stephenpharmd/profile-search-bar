import React, { useEffect, useState } from "react";
import "./SearchPopup.css";
import { Profile, SearchPopupProps } from "../types";
import SearchResultCard from "../SearchResultCard/SearchResultCard";

function SearchPopup({ searchResults, showResults, input }: SearchPopupProps) {
  const [mentorCards, setMentorCards] = useState<React.ReactNode[]>([]);
  const [topicCards, setTopicCards] = useState<React.ReactNode[]>([]);
  const [articleCards, setArticleCards] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!searchResults) return;

    setMentorCards(
      searchResults.mentors.map((mentor: Profile) => (
        <SearchResultCard key={mentor.objectID} profile={mentor} />
      ))
    );
    setTopicCards(
      searchResults.topics.map((topic: Profile) => (
        <SearchResultCard key={topic.objectID} profile={topic} />
      ))
    );
    setArticleCards(
      searchResults.articles.map((article: Profile) => (
        <SearchResultCard key={article.objectID} profile={article} />
      ))
    );
  }, [searchResults]);

  const mentorSection = searchResults?.mentors.length ? (
    <section key="mentors-section" className="search-popup-section">
      <span>{input ? "Mentors" : "Popular mentors"}</span>
      {mentorCards}
    </section>
  ) : null;

  const topicSection = searchResults?.topics.length ? (
    <section key="topics-section" className="search-popup-section">
      <span>{input ? "Topics" : "Popular topics"}</span>
      {topicCards}
    </section>
  ) : null;

  const articleSection = searchResults?.articles.length ? (
    <section key="articles-section" className="search-popup-section">
      <span>{input ? "Articles" : "Popular Articles"}</span>
      {articleCards}
    </section>
  ) : null;

  // filter out null sections and put dividers in between if more than one section
  const sections = [mentorSection, topicSection, articleSection]
    .filter((section) => section)
    .map((section, i) =>
      i > 0 ? (
        <React.Fragment key={i}>
          <div className="thin-divider"></div>
          {section}
          </React.Fragment>
      ) : (
        section
      )
    );

  return showResults ? (
    <>
      <div className="search-popup">
        <div className="thin-divider no-padding"></div>
        <div className="content">
          {sections.length ? (
            sections
          ) : (
            <span className="no-results">No results for "{input}"</span>
          )}
        </div>
      </div>
    </>
  ) : null;
}

export default SearchPopup;
