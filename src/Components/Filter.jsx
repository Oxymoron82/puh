import React from 'react';

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} style={{ backgroundColor: '#74e48' }} />
  </div>
);

export default Filter;
