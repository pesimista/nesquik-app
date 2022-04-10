type MarketItemProps = {
  image: string
  label: string
  onClick?: () => void
}

export default function CategoryItem({
  image,
  label,
  onClick,
}: MarketItemProps) {
  return (
    <div className='w-16 flex flex-col items-center mx-1' onClick={onClick}>
      <div
        className='bg-cover bc-center w-14 h-14 rounded-xl'
        style={{ backgroundImage: `url('${image}')` }}
      ></div>

      <p className='text-gray-400 text-center font-semibold text-xs w-16 overflow-hidden overflow-ellipsis mb-0 whitespace-nowrap'>
        {label}
      </p>
    </div>
  )
}
