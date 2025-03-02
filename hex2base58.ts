import bs58 from "bs58";

/**
 * 将十六进制字符串转换为 Base58 编码
 * @param hexString 十六进制字符串
 * @returns Base58 编码字符串
 */
export function hexToBase58(hexString: string): string {
  // 确保输入是偶数长度
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }

  // 将十六进制字符串转换为 Buffer
  const buffer = Buffer.from(hexString, "hex");

  // 使用 bs58 库进行 Base58 编码
  return bs58.encode(buffer);
}

// // 示例：转换一个十六进制字符串
// const hexString =
//   "010002044aca7b9dbfe6449f09dd699bb3843f30d3e017e66cbae1b697e24bbb50d32fe1240461c15f896fde8adf6584905f8750af5e7663896cff79a8382cc2b4477af600000000000000000000000000000000000000000000000000000000000000000306466fe5211732ffecadba72c39be7bc8ce5bbc5f7126b2c439b3a40000000000000000000000000000000000000000000000000000000000000000000000003020200010c02000000002465c70900000003000502ef01000003000903685b00000000000001198f1f4c3a452263d413b2cd17ebcbc1a0e5887364e6261a12a81792ea165a3e000402070003"; // "Hello Solana" 的十六进制表示
// const base58String = hexToBase58(hexString);

// console.log("Base58 编码:", base58String);
