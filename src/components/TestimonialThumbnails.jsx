const TestimonialThumbnails = ({ itemRef, activeImage, changeActiveImage}) => {

    function handleActiveImage() {
        if (activeImage !== itemRef.imgURI) {
            changeActiveImage(itemRef.imgURI);
        };
    };


    return (
        <img className="img-click" src={itemRef.imgURI} alt={itemRef.label} onClick={handleActiveImage} />
    );
};

export default TestimonialThumbnails;
