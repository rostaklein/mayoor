import React from "react";
import { useDateFormatter } from "../../hooks/useDateFormatter";

export const DisplayTime: React.FC<{ date: string }> = ({ date }) => {
  const { f } = useDateFormatter();
  return <span>{f(date, "datetime")}</span>;
};
