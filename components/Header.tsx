import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div>
          <Link href="/">
            <Image
              width={135}
              height={25}
              src="/logo.png"
              alt="Thirdweb Logo"
              className={styles.headerLogo}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
