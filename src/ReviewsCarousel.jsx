import { useEffect, useState } from "react";

const reviews = [
  { name: "Sarah J.", rating: 5, quote: "Absolutely amazing service." },
  { name: "Michael T.", rating: 4, quote: "Very helpful lessons." },
  { name: "Emily R.", rating: 5, quote: "Highly recommend!" },
  { name: "David K.", rating: 5, quote: "Best tutoring experience!" },
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(1); // start at 1 (middle)
  const [transition, setTransition] = useState(true);

  // clone first & last for seamless looping
  const extended = [
    reviews[reviews.length - 1],
    ...reviews,
    reviews[0],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev+1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    // if we hit the fake last slide
    if (index === extended.length - 1) {
      setTransition(false);
      setIndex(1); // jump back to real first
    }

    // if we hit fake first
    if (index === 0) {
      setTransition(false);
      setIndex(extended.length - 2);
    }
  };

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.track,
          transform: `translateX(-${index * 320}px)`,
          transition: transition
            ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extended.map((review, i) => {
          const isCenter = i-1 === index;

          return (
            <div
              key={i}
              style={{
                ...styles.card,
                transform: isCenter ? "scale(1)" : "scale(0.85)",
                opacity: isCenter ? 1 : 0.4,
              }}
            >
              <div style={styles.stars}>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p style={styles.quote}>"{review.quote}"</p>
              <p style={styles.name}>— {review.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    overflow: "hidden",
    maxWidth: "960px",
    margin: "60px auto",
  },
  track: {
    display: "flex",
    gap: "20px",
  },
  card: {
    flex: "0 0 300px",
    padding: "25px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "all 0.5s ease",
  },
  stars: {
    fontSize: "20px",
    color: "#FFD700",
    marginBottom: "10px",
  },
  quote: {
    fontStyle: "italic",
    marginBottom: "10px",
  },
  name: {
    fontWeight: "bold",
    color: "#555",
  },
};