import { useState } from 'react';
import '../css/SearchBar.css'

export default function SearchBar({ onSearch }) {

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
        placeholder="ID, Usuario"
        value={query}
        onChange={handleChange}
        />
    </div>
    
  )
}