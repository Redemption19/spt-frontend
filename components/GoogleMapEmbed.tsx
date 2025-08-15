import styles from './GoogleMapEmbed.module.css';

interface GoogleMapEmbedProps {
  src: string;
  title?: string;
}

const GoogleMapEmbed = ({ src, title = "Location Map" }: GoogleMapEmbedProps) => {
  if (!src) {
    return <div>Error: Map source URL is missing.</div>;
  }

  return (
    <div className={styles.mapContainer}>
      <iframe
        className={styles.mapIframe}
        src={src}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;
