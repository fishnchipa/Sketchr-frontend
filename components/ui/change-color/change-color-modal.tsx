"use client"


import React, { useEffect } from 'react'

const ChangeColorModal = () => {

  useEffect(() => {

    const test = window.DOMMatrix || window.WebKitCSSMatrix 
    console.log(test); 
  })

  return (
    <>
      <div>hello</div>
    </>
  )
}

export default ChangeColorModal