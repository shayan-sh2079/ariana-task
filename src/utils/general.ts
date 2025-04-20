export const formatTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();

  // Convert to seconds
  const diffInSecs = Math.floor(diffInMs / 1000);

  // Less than a minute
  if (diffInSecs < 60) {
    return "just now";
  }

  // Less than an hour
  if (diffInSecs < 3600) {
    const minutes = Math.floor(diffInSecs / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  // Less than a day
  if (diffInSecs < 86400) {
    const hours = Math.floor(diffInSecs / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(diffInSecs / 86400);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
};
