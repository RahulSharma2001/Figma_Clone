import React from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "./liveblocks.config";
import { LiveObject } from "@liveblocks/client";

export function Room({ children }) {
  return (
    <>
      <RoomProvider
        id="my-room"
        initialPresence={{}}
        initialStorage={{
          scientist: new LiveObject({
            message: "Write any Message to broadcast",
          }),
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </>
  );
}
