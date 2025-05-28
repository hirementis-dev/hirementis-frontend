export function formatFirebaseTimestamp(timestamp: any, format = "default") {
  if (!timestamp || typeof timestamp !== "object") {
    return "Invalid timestamp";
  }

  const seconds = timestamp.seconds || timestamp._seconds || 0;
  const nanoseconds = timestamp.nanoseconds || timestamp.nanoseconds || 0;

  if (typeof seconds !== "number") {
    return "Invalid timestamp format";
  }

  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
  const date = new Date(milliseconds);

  switch (format) {
    case "short":
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    case "long":
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
      return date.toISOString();

    case "relative":
      return getRelativeTime(date);

    case "date-only":
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    case "time-only":
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

    default:
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

function getTimestampMilliseconds(timestamp: any) {
  if (!timestamp || typeof timestamp !== "object") {
    return 0;
  }

  const seconds = timestamp.seconds || timestamp._seconds || 0;
  const nanoseconds = timestamp.nanoseconds || timestamp._nanoseconds || 0;

  return seconds * 1000 + Math.floor(nanoseconds / 1000000);
}

export function sortByTimestamp(
  array: any,
  dateField = "date",
  order = "desc"
) {
  if (!Array.isArray(array)) {
    console.warn("sortByTimestamp: Input must be an array");
    return [];
  }

  return [...array].sort((a, b) => {
    // Get timestamps from objects
    const timestampA = a[dateField];
    const timestampB = b[dateField];

    // Convert to milliseconds for comparison
    const millisecondsA = getTimestampMilliseconds(timestampA);
    const millisecondsB = getTimestampMilliseconds(timestampB);

    // Sort based on order parameter
    if (order === "asc") {
      return millisecondsA - millisecondsB;
    } else {
      return millisecondsB - millisecondsA;
    }
  });
}

function sortByDate(array: any, options: any = {}) {
  const { field = "createdAt", order = "desc", mutate = false } = options;

  if (!Array.isArray(array)) {
    console.warn("sortByDate: Input must be an array");
    return [];
  }

  const targetArray = mutate ? array : [...array];

  return targetArray.sort((a, b) => {
    const timestampA = a[field];
    const timestampB = b[field];

    const millisecondsA = getTimestampMilliseconds(timestampA);
    const millisecondsB = getTimestampMilliseconds(timestampB);

    return order === "asc"
      ? millisecondsA - millisecondsB
      : millisecondsB - millisecondsA;
  });
}

function groupByDate(array: any, field = "createdAt") {
  if (!Array.isArray(array)) {
    return {};
  }

  const grouped: any = {};

  array.forEach((item) => {
    const timestamp = item[field];
    const date = new Date(getTimestampMilliseconds(timestamp));
    const dateKey = date.toDateString(); // "Mon Jan 25 2025"

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(item);
  });

  // Sort items within each group (latest first)
  Object.keys(grouped).forEach((dateKey) => {
    grouped[dateKey] = sortByTimestamp(grouped[dateKey], field, "desc");
  });

  return grouped;
}
