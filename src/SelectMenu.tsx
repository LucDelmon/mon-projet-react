import React, { useState } from 'react';
import './SelectMenu.css';  // We'll create this CSS file in the next step

interface SelectMenuProps {
    label: string; // You can pass a label for the select menu
}

const SelectMenu: React.FC<SelectMenuProps> = ({ label }) => {
    const [level, setLevel] = useState('Junior');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(event.target.value);
    };

    return (
        <div className="select-container">
            <label className="select-label">{label}</label>
            <select className="select-box" value={level} onChange={handleChange}>
                <option value="Junior">Junior</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
            </select>
            <p className="select-output">Selected: {level}</p>
        </div>
    );
};

export default SelectMenu;
