"use client";

import posthog from "posthog-js";

type LogAttributes = Record<string, string | number | boolean | string[]>;

export const eventDirectoryLogger = {
  info(message: string, attributes: LogAttributes) {
    posthog.logger.info(message, attributes);
  },
};
