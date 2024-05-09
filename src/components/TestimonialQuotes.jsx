import { Link } from "react-router-dom";



const TestimonialQuotes = ({ textQuote, textAuthor, linkURL, linkText }) => {
    return (
        <div className="absolute testimonial-quotes">
            <blockquote>{textQuote}</blockquote>
            <div className="mt-6 testimonial-author">
                <span>{textAuthor}</span>
                <Link to={linkURL} target="_blank">{linkText}</Link>
            </div>
        </div>
    );
};

export default TestimonialQuotes;
