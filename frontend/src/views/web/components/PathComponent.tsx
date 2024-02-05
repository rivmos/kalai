import { Link } from 'react-router-dom';

const PathComponent = ({ title = 'Home', link = '/' }: { title?: string; link?: string }) => {
  return (
    <div className="service-banner">
      <div className="container">
        <h2>{title}</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <span className="capitalize">{title}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PathComponent;
