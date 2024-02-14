export function print(data: any) {
  console.warn('🚀 ~ print ~ data:', data);
}

export async function testSleep(time = 2) {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), time * 1000));
}
