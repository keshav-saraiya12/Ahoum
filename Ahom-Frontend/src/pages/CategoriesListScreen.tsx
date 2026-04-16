import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/products';

export default function CategoriesListScreen() {
  const navigate = useNavigate();

  return (
    <div className="pb-6">
      <div className="sticky top-0 bg-white z-30 px-4 pt-4 pb-3 flex items-center gap-3 md:px-0 md:static">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-grey-light transition-colors md:hidden"
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-dark">Explore Categories</h1>
      </div>

      <div className="px-4 md:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${encodeURIComponent(cat.name)}`}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 ${cat.borderColor} ${cat.color}
                        hover:shadow-card transition-all group`}
          >
            <span className="text-5xl group-hover:scale-110 transition-transform">{cat.image}</span>
            <span className="text-sm font-semibold text-dark text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
