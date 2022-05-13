import React from "react";
import styles from "../../styles/Thirdweb.module.css";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function ThirdwebGuideOverlay({ show, setShow }: Props) {
  return (
    <div
      className={styles.overlayBackground}
      style={{
        display: show ? "flex" : "none",
      }}
    >
      <div className={styles.overlayGuide}>
        <div className={styles.overlayLogo}>
          <a
            href={"https://thirdweb.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`/logo.png`} alt="Thirdweb Logo" width={135} />
          </a>
        </div>

        <div onClick={() => setShow(false)} className={styles.closeGuide}>
          <span>&times;</span>
        </div>

        <h1 className={styles.guideHeader}>
          thirdweb Custom Dashboard Example
        </h1>
        <p>
          An example repository to demonstrate how to use the thirdweb SDK to
          programatically view and deploy any of thirdweb&apos;s pre-built smart
          contracts.
        </p>

        <p>
          Have more questions?{" "}
          <a
            href="https://discord.gg/thirdweb"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.joinDiscordLink}
          >
            <b>Join our Discord!</b>
          </a>
        </p>
      </div>
    </div>
  );
}
