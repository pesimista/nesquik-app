import Image from 'next/image'
import { ReactNode } from 'react'

export function QuikTag() {
  return (
    <div className='h-4 mr-1 bg-gray-1000 px-2 rounded-2xl text-white font-bold text-xs flex items-center'>
      Solo en
      <span className='pl-0.5 pt-2'>
        <Image
          src={'/images/logo-quik.svg'}
          height={16}
          width={40}
          alt='quik'
        />
      </span>
    </div>
  )
}

type TagProps = {
  label?: string
  color?: string
  textColor?: string
  height?: string
  className?: string
  onClick?: VoidFunction
  children?: ReactNode
}

export function Tag({
  label,
  color = 'bg-purple-1100',
  textColor = 'white',
  height = 'h-4',
  className = '',
  children,
  onClick,
}: TagProps) {
  return (
    <div
      onClick={onClick}
      className={`${height} ${color} px-2 rounded-2xl text-${textColor} font-bold text-xs ${className}`}
    >
      {children ?? label}
    </div>
  )
}
