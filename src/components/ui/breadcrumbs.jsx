import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumb navigation component
 * @param {Array} items - Array of breadcrumb items: [{ name: 'Home', path: '/' }, ...]
 */
const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        <li>
          <Link 
            to="/" 
            className="flex items-center text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={item.path || index}>
              <ChevronRight className="w-4 h-4 text-[#C9CBD1]/50" />
              <li>
                {isLast ? (
                  <span 
                    className="text-[#E6D9C8] font-medium"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-[#C9CBD1] hover:text-[#E6D9C8] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

