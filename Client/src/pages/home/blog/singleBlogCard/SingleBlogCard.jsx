import React from "react";
import { formatDate } from "../../../../utils/formatedate/FormateDate";
import edjsHTML from "editorjs-html";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const edjsParser = edjsHTML();

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }
  if (halfStar)
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }
  return stars;
};

const SingleBlogCard = ({ blog }) => {
  const {
    title,
    description,
    content,
    coverImg,
    category,
    rating,
    author,
    createdAt,
  } = blog || {};
  const htmlContent = edjsParser.parse(content);

  return (
    <article className="prose prose-lg max-w-none text-gray-800">
      {/* Blog header */}
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold leading-tight">{title}</h1>
        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <img
              src={author?.avatar || "https://i.pravatar.cc/40"}
              alt={author?.name || "Author"}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
            <div>
              <p className="font-semibold hover:text-blue-600 cursor-pointer">
                {author?.name || "Admin 1"}
              </p>
              <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            </div>
          </div>
          <span className="uppercase text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {category || "General"}
          </span>
        </div>
      </header>

      {/* Cover Image */}
      {coverImg && (
        <figure className="mb-10 overflow-hidden rounded-lg shadow-md">
          <img
            src={coverImg}
            alt={`Cover for ${title}`}
            className="w-full h-[520px] object-cover transition-transform hover:scale-105 duration-300"
          />
        </figure>
      )}

      {/* Blog content */}
      <section
        className="mb-12"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Rating */}
      <section className="flex items-center space-x-3 mb-10">
        <div className="flex">{renderStars(rating || 0)}</div>
        <span className="text-gray-500 text-sm">
          {rating || 0} (based on 2,085 reviews)
        </span>
      </section>

    
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </section>
    </article>
  );
};

export default SingleBlogCard;
