import { openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";

export const frames = createFrames({

  basePath: "/frames",
  middleware: [
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: {
        isValidPayload: (body) => isXmtpFrameActionPayload(body),
        getFrameMessage: async (body) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getXmtpFrameMessage(body);
          console.log(result.walletAddress());
          return result;
        },
      },
    }),
  ],
});

// url: string; // The URL of the Frame that was clicked. May be different from the URL that the data was posted to.
// unixTimestamp: number; // Unix timestamp in milliseconds
// buttonIndex: number; // The button that was clicked
// inputText ?: string; // Input text for the Frame's text input, if present. Undefined if no text input field is present
// state ?: string; // State that was passed from the frame, passed back to the frame, serialized to a string. Max 4kB.q
// address ?: string // Address of connected wallet
// transactionId ?: string