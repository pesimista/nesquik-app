import Image from 'next/image'
import styles from '../../styles/home.module.scss'

export default function UserCard({ userInfo }) {
  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <Image
          width={58}
          height={58}
          src='/images/user-balance-no-profile.svg'
          alt='quik-logo'
        />
      </div>
      <div>
        <span className={styles.name}>Hola! {userInfo.name}</span>
      </div>
      <div className={styles.points}>$ 0.00</div>
    </div>
  )
}
