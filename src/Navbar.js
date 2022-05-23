import  React from 'react';

const Navbar = props => {
    return(
        <div className="menu">
            {props.categories && props.categories.map((category, i) => (
                <div key={i} className="nav-item" onClick={()=> props.setCategory(i,category.name,category.shortedName)}>
                    <div className='text'>{category.shortedName}</div>
                </div>
            ))}
        </div>
    );
}

export default  Navbar;
