import React from "react";

export default function Header({ username, image }) {
  return (
    <header className='flex justify-between items-center'>
      <div className='flex'>
        <h2 className='font-title text-2xl me-2'>Musical Mystery</h2>
      </div>
      <div className='flex items-center'>
        <p>Hi {username}!</p>
        <img
          className='h-10 w-10 rounded-full ms-4 object-cover object-center'
          src={image}
          alt='User spotify profile image'
        />
      </div>
    </header>
  );
}
