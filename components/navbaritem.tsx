import React from 'react';

interface NavbarItemProps{
    label:string;
}


const NavbarItem = ({label})=>{
    return (
        <div className="text-white cursor-pointer hover:text-gray-300">  
        {label}         
        </div>
    )
}

export default NavbarItem;