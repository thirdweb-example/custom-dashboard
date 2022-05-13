import styles from "../../styles/Thirdweb.module.css";
import React from "react";

type Props = {
  onLearnMore: () => void;
};

const githubUrl = "https://github.com/thirdweb-example/custom-dashboard";

export default function ThirdwebGuideFooter({ onLearnMore }: Props) {
  return (
    <div className={styles.footerContainer}>
      {/* Left Side column */}
      <div className={styles.left}>
        <div>
          <a
            href={"https://thirdweb.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`/logo.png`} alt="Thirdweb Logo" width={135} />
          </a>
        </div>
      </div>

      {/* Right Side column */}
      <div className={styles.right}>
        <a className={styles.secondaryButton} onClick={onLearnMore}>
          Learn More
        </a>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.secondaryButton} ${styles.noUnderline}`}
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
