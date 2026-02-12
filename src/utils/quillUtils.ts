import Quill from "quill";

/**
 * Converts an HTML string to a Quill Delta object.
 *
 * @param The HTML string to convert.
 * @returns The Quill Delta representation of the HTML.
 * @throws If the input HTML is not a string.
 */
export function htmlToDelta(html: string) {
  if (typeof html !== "string") {
    throw new TypeError("The input HTML must be a string.");
  }

  // Create a temporary container
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "absolute",
    visibility: "hidden",
    height: "0",
  });
  document.body.appendChild(container);

  let delta;
  try {
    // Initialize Quill instance
    const quill = new Quill(container, {
      theme: "bubble",
      modules: {
        clipboard: {
          matchVisual: false,
        },
      },
    });

    // Convert HTML to Delta
    quill.clipboard.dangerouslyPasteHTML(html);
    delta = quill.getContents();
  } finally {
    // Ensure cleanup
    container.remove();
  }

  return delta;
}

/**
 * Checks if a Quill Delta object is not empty.
 *
 * @param The Delta object to check.
 * @returns Returns `true` if the Delta is not empty, otherwise `false`.
 */
export function isDeltaNotEmpty(delta: any): boolean {
  if (!delta || !Array.isArray(delta.ops)) {
    return false;
  }

  return delta.ops.some((op: any) => {
    if (typeof op.insert === "string") {
      return op.insert.trim() !== "";
    }
    return typeof op.insert === "object" && op.insert !== null;
  });
}
