import React from "react";
import Cursor from "./Cursor";

const LiveCursors = ({ others }) => {
  return others?.map(({ connectionId, presence }) => {
    if (!presence) return null;
    return (
      <Cursor
        key={connectionId}
        color="gold"
        x={presence.cursor?.x}
        y={presence.cursor?.y}
        message={presence.message}
      />
    );
  });
};

export default LiveCursors;
