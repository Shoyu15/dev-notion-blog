const ReturnTopButton = () => {

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return <button onClick={returnTop}>Scroll to Top</button>
}

export default ReturnTopButton