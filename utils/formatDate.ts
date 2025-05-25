export function formatFirebaseTimestamp(timestamp: any, format = "default") {
  // Convert Firebase timestamp to JavaScript Date
  const milliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
  const date = new Date(milliseconds);

  switch (format) {
    case "short":
      // MM/DD/YYYY HH:MM AM/PM
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    case "long":
      // January 25, 2025 at 10:35:30 AM
      return date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

    case "iso":
      // 2025-01-25T10:35:30.410Z
      return date.toISOString();

    case "relative":
      // "2 hours ago", "yesterday", etc.
      return getRelativeTime(date);

    case "date-only":
      // January 25, 2025
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    case "time-only":
      // 10:35:30 AM
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

    default:
      // Jan 25, 2025, 10:35:30 AM
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
  }
}

export function getRelativeTime(date: any) {
  const now: any = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}

// Example usage:
const firebaseTimestamp = { seconds: 1748156130, nanoseconds: 410000000 };

console.log("Default:", formatFirebaseTimestamp(firebaseTimestamp));
console.log("Short:", formatFirebaseTimestamp(firebaseTimestamp, "short"));
console.log("Long:", formatFirebaseTimestamp(firebaseTimestamp, "long"));
console.log("ISO:", formatFirebaseTimestamp(firebaseTimestamp, "iso"));
console.log(
  "Relative:",
  formatFirebaseTimestamp(firebaseTimestamp, "relative")
);
console.log(
  "Date only:",
  formatFirebaseTimestamp(firebaseTimestamp, "date-only")
);
console.log(
  "Time only:",
  formatFirebaseTimestamp(firebaseTimestamp, "time-only")
);

// For arrays of timestamps
const timestamps = [
  { seconds: 1748156130, nanoseconds: 410000000 },
  { seconds: 1748152530, nanoseconds: 0 },
  { seconds: 1748149000, nanoseconds: 500000000 },
];

console.log("\nFormatted array:");
timestamps.forEach((timestamp, index) => {
  console.log(`${index + 1}: ${formatFirebaseTimestamp(timestamp, "long")}`);
});
