import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Component to inject JSON-LD structured data into the page
 * @param {Object|Array} data - Schema.org structured data object(s)
 */
const StructuredData = ({ data }) => {
  const schemas = Array.isArray(data) ? data : [data];
  
  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;

