/*
Waits for a given number of seconds.
Useful for recording the final state of a test video.
*/
export async function wait(seconds = 1) {
  await new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}
