import Image from 'next/image'

export default function UserCard({ userInfo }) {
  const textStyle = { fontSize: '24px' }
  const pointsStyle = {
    backgroundImage: 'linear-gradient(90deg, #8cc63e, #3bb44b)',
    fontSize: '22px',
  }

  return (
    <div className='inline-flex w-full bg-purple-1000 p-1 relative rounded-2xl rounded-br-lg rounded-tr-lg mb-1'>
      <div className='rounded-2xl mr-1 bg-purple-1100 h-14 w-14'>
        <Image
          width={58}
          height={58}
          src='/images/user-balance-no-profile.svg'
          alt='quik-logo'
        />
      </div>
      <div>
        <span className='mb-1 font-bold text-white' style={textStyle}>
          Hola! {userInfo.name}
        </span>
      </div>
      <div
        className='font-bold text-white absolute bottom-1 flex
      right-1 h-7 w-32 rounded-md justify-center items-center'
        style={pointsStyle}
      >
        $ 0.00
      </div>
    </div>
  )
}
