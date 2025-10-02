import { useState } from 'react';
import '../css/SearchBar.css'

export default function SearchBar({ onSearch, holder }) {

    const [query,setQuery] = useState("")

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // send value back to parent
    };

  return (
    <div className='search'>
        <img src='/icons/search.svg' />
        <input
        type="text"
        placeholder={holder}
        value={query}
        onChange={handleChange}
        />
    </div>
    
  )
}