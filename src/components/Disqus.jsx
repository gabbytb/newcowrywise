const Disqus = ({ title, subtitle }) => {

  return (
    <div className="disqus">
        <span className="disqus-q">{title}</span>
        <span className="disqus-a">{subtitle}</span>
    </div>
  );
};

export default Disqus;
