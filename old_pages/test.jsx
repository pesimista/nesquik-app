import React from 'react'

export default function TestInput() {
  const count = React.useRef(0)
  const [value, setValue] = React.useState(true)

  React.useEffect(() => {
    count.current += 1
  }, [value])

  React.useEffect(() => {
    count.current += 1
  }, [count.current])

  const handleSubmit = (event) => {
    const numeric = +event.target.value.replace(/D/g, '')
    setValue(`$ ${(numeric / 100).toFixed(2)}`)
  }

  console.log(count.current)

  return (
    <div className='p-5'>
      <input type='text' value={value} onChange={handleSubmit} />
      <button onClick={() => setValue((i) => !i)}>{value.toString()}</button>
    </div>
  )
}
