import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FilterCommCenter from './filters/FilterCommCenter';
import FilterLibrary from './filters/FilterLibrary';
import FilterSandbox from './filters/FilterSandbox';
import PlaygroundCard from './PlaygroundCard';
// import { libraryFilter, commCenterFilter, sandboxFilter } from '../api/filterData';

export default function FilterBar() {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showCommCenter, setShowCommCenter] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);

  return (
    <>
      <Button onClick={() => setShowLibrary(!showLibrary)}>library</Button>
      <Button onClick={() => setShowCommCenter(!showCommCenter)}>community center</Button>
      <Button onClick={() => setShowSandbox(!showSandbox)}>sandbox</Button>

      <div>
        {playgrounds.map((playground) => (
          <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} />
        ))}
      </div>

      {showCommCenter && <FilterCommCenter setPlaygrounds={setPlaygrounds} />}
      {showLibrary && <FilterLibrary setPlaygrounds={setPlaygrounds} />}
      {showSandbox && <FilterSandbox setPlaygrounds={setPlaygrounds} />}
    </>
  );
}
