import Image from 'next/image'
import React from 'react'
import profileImage from "images/about.jpg";

function About() {
  return (
    <main className="container mx-auto max-w-4xl">
      <h2 className='mt-20'>こんにちわ</h2>
      <figure className='mt-10'>
        <Image
          className='w-full'
          src={profileImage}
          alt=""
          height={900} // 画像の高さ
          width={1024} // 画像の幅
        />
      </figure>
    </main>
  )
}

export default About