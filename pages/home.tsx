import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Loader from "../components/Loader";
import { useRequiredUser } from "../lib/context";
import styles from "./home.module.scss";

export async function getStaticProps() {

  console.log('being called')

  return {
    props: { some: 'data' }
  }
}


export default function HomePage(props) {
  const { userDoc: user } = useRequiredUser()

  if (!user) {
    return <Loader loading={true} />
  }

  return (
    <div className="main-container">
      <UserCard userInfo={user} />
      <Link href='/stores' passHref>
        <Button> Go to stores</Button>
      </Link>
    </div>
  )
}

function UserCard({ userInfo }) {

  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <Image width={58} height={58} src='/images/user-balance-no-profile.svg' alt='quik-logo' />
      </div>
      <div>
        <span className={styles.name}>
          Hola! {userInfo.name}
        </span>
      </div>
      <div className={styles.points}>
        $ 0.00
      </div>
    </div >
  )
}