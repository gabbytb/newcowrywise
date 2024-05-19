import { Link } from "react-router-dom";



const TestimonialQuotes = ({ textQuote, textAuthor, linkURL, linkText }) => {

    function myFunction() {
        const clipz = document.querySelector('#sectionOneAnim img');
        console.log('Clips: ', clipz);
    }
    myFunction();


    return (
        <div className="testimonial-quotes">
            <blockquote>{textQuote}</blockquote>
            <div className="mt-6 testimonial-author">
                <span>{textAuthor}</span>
                <Link to={linkURL} target="_blank">{linkText}</Link>
            </div>
        </div>
    );
};

export default TestimonialQuotes;
